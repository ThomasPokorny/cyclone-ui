import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GitBranch, Loader2, CheckCircle, Trash2 } from "lucide-react";
import { updateRepository, deleteRepository } from "../../app/actions/repositories";

interface Repository {
  id: string;
  name: string;
  custom_prompt: string;
}

interface EditRepositoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  repository: Repository | null;
  onUpdateRepository?: () => void;
}

const EditRepositoryModal = ({ open, onOpenChange, repository, onUpdateRepository }: EditRepositoryModalProps) => {
  const [name, setName] = useState("");
  const [reviewStrength, setReviewStrength] = useState("balanced");
  const [customPrompt, setCustomPrompt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Update form fields when repository changes
  React.useEffect(() => {
    if (repository) {
      setName(repository.name);
      setCustomPrompt(repository.custom_prompt || "");
    }
  }, [repository]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !repository) return;
    
    setIsSubmitting(true);
    setError("");
    
    try {
      const result = await updateRepository(repository.id, name.trim(), customPrompt.trim());
      
      if (result.success) {
        // Show success message
        setSuccess(true);
        
        // Close modal and refresh after showing success
        setTimeout(() => {
          setName("");
          setCustomPrompt("");
          setSuccess(false);
          onOpenChange(false);
          
          // Callback to refresh the repositories list
          if (onUpdateRepository) {
            onUpdateRepository();
          }
          
          window.location.reload();
        }, 200);
      } else {
        setError(result.error || "Failed to update repository");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!repository || !window.confirm(`Are you sure you want to delete "${repository.name}"? This action cannot be undone.`)) {
      return;
    }
    
    setIsDeleting(true);
    setError("");
    
    try {
      const result = await deleteRepository(repository.id);
      
      if (result.success) {
        // Show success and close modal
        setSuccess(true);
        
        setTimeout(() => {
          setSuccess(false);
          onOpenChange(false);
          
          if (onUpdateRepository) {
            onUpdateRepository();
          }
          
          window.location.reload();
        }, 300);
      } else {
        setError(result.error || "Failed to delete repository");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setName("");
    setReviewStrength("balanced");
    setCustomPrompt("");
    setError("");
    setSuccess(false);
    setIsDeleting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <GitBranch className="w-5 h-5 text-primary" />
            Edit Repository
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="repo-name">Repository Name</Label>
            <Input
              id="repo-name"
              type="text"
              value={name}
              disabled
              className="bg-muted text-muted-foreground cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">Repository name cannot be changed</p>
          </div>
          
          <div className="space-y-3 opacity-50">
            <div className="flex items-center justify-between">
              <Label>Review Strength</Label>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Coming Soon</span>
            </div>
            <RadioGroup value={reviewStrength} onValueChange={setReviewStrength} disabled>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="balanced" id="balanced" disabled />
                <Label htmlFor="balanced" className="cursor-not-allowed">
                  <div className="font-medium">Balanced</div>
                  <div className="text-sm text-muted-foreground">Standard code review depth</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="thorough" id="thorough" disabled />
                <Label htmlFor="thorough" className="cursor-not-allowed">
                  <div className="font-medium">Thorough</div>
                  <div className="text-sm text-muted-foreground">Comprehensive analysis with detailed feedback</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="strict" id="strict" disabled />
                <Label htmlFor="strict" className="cursor-not-allowed">
                  <div className="font-medium">Strict</div>
                  <div className="text-sm text-muted-foreground">Rigorous standards with strict compliance checks</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="custom-prompt">Custom Prompt</Label>
            <Textarea
              id="custom-prompt"
              placeholder="Add specific instructions for code review (optional)"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              rows={3}
            />
          </div>

          {error && (
            <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="text-sm text-green-500 bg-green-50 p-3 rounded-md flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Changes have been saved successfully!
            </div>
          )}
          
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleDelete}
              disabled={isSubmitting || isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Unlinking...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Unlink
                </>
              )}
            </Button>
            
            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel}
                disabled={isSubmitting || isDeleting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90" 
                disabled={!name.trim() || isSubmitting || isDeleting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Repository"
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditRepositoryModal;