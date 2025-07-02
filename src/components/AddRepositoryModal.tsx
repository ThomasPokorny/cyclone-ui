
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GitBranch } from "lucide-react";

interface AddRepositoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddRepository: (name: string, reviewStrength: string, customPrompt: string) => void;
}

const AddRepositoryModal = ({ open, onOpenChange, onAddRepository }: AddRepositoryModalProps) => {
  const [name, setName] = useState("");
  const [reviewStrength, setReviewStrength] = useState("balanced");
  const [customPrompt, setCustomPrompt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onAddRepository(name.trim(), reviewStrength, customPrompt.trim());
    
    // Reset form
    setName("");
    setReviewStrength("balanced");
    setCustomPrompt("");
    setIsSubmitting(false);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setName("");
    setReviewStrength("balanced");
    setCustomPrompt("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <GitBranch className="w-5 h-5 text-primary" />
            Add New Repository
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="repo-name">Repository Name *</Label>
            <Input
              id="repo-name"
              type="text"
              placeholder="Enter repository name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-3">
            <Label>Review Strength</Label>
            <RadioGroup value={reviewStrength} onValueChange={setReviewStrength}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="balanced" id="balanced" />
                <Label htmlFor="balanced" className="cursor-pointer">
                  <div className="font-medium">Balanced</div>
                  <div className="text-sm text-muted-foreground">Standard code review depth</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="thorough" id="thorough" />
                <Label htmlFor="thorough" className="cursor-pointer">
                  <div className="font-medium">Thorough</div>
                  <div className="text-sm text-muted-foreground">Comprehensive analysis with detailed feedback</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="strict" id="strict" />
                <Label htmlFor="strict" className="cursor-pointer">
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
          
          <div className="flex gap-3 justify-end pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90" 
              disabled={!name.trim() || isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Repository"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRepositoryModal;
