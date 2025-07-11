
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GitBranch, Loader2, CheckCircle } from "lucide-react";
import { createRepository, getAvailableGitHubRepositories } from "../../app/actions/repositories";

interface AddRepositoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizationId: string;
  onAddRepository?: () => void;
}

interface GitHubRepository {
  id: string;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
}

const AddRepositoryModal = ({ open, onOpenChange, organizationId, onAddRepository }: AddRepositoryModalProps) => {
  const [selectedRepository, setSelectedRepository] = useState<string>("");
  const [reviewStrength, setReviewStrength] = useState("balanced");
  const [customPrompt, setCustomPrompt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [githubRepos, setGithubRepos] = useState<GitHubRepository[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);

  useEffect(() => {
    if (open && organizationId) {
      loadGitHubRepositories();
    }
  }, [open, organizationId]);

  const loadGitHubRepositories = async () => {
    setIsLoadingRepos(true);
    setError("");
    
    try {
      const result = await getAvailableGitHubRepositories(organizationId);
      
      if (result.success && result.data) {
        setGithubRepos(result.data);
      } else {
        setError(result.error || "Failed to load GitHub repositories");
      }
    } catch (err) {
      setError("Failed to load repositories");
    } finally {
      setIsLoadingRepos(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRepository) return;
    
    const selectedRepo = githubRepos.find(repo => repo.name === selectedRepository);
    if (!selectedRepo) return;
    
    setIsSubmitting(true);
    setError("");
    
    try {
      const result = await createRepository(organizationId, selectedRepo.name, customPrompt.trim());
      
      if (result.success) {
        // Show success message
        setSuccess(true);
        
        // Close modal and refresh after showing success
        setTimeout(() => {
          setSelectedRepository("");
          setCustomPrompt("");
          setSuccess(false);
          onOpenChange(false);
          
          // Callback to refresh the repositories list
          if (onAddRepository) {
            onAddRepository();
          }
          
          window.location.reload();
        }, 500);
      } else {
        setError(result.error || "Failed to create repository");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setSelectedRepository("");
    setReviewStrength("balanced");
    setCustomPrompt("");
    setError("");
    setSuccess(false);
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
            <Label htmlFor="repo-select">Select Repository *</Label>
            {isLoadingRepos ? (
              <div className="flex items-center gap-2 p-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading repositories...
              </div>
            ) : githubRepos.length === 0 ? (
              <div className="p-2 text-sm text-muted-foreground border rounded-md">
                No available repositories found. Make sure the Cyclone app has access to your repositories.
              </div>
            ) : (
              <Select value={selectedRepository} onValueChange={setSelectedRepository}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a repository to link" />
                </SelectTrigger>
                <SelectContent>
                  {githubRepos.map((repo) => (
                    <SelectItem key={repo.id} value={repo.name}>
                      <div className="flex flex-col">
                        <span className="font-medium">{repo.name}</span>
                        <span className="text-xs text-muted-foreground">{repo.full_name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
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
              Repository created successfully!
            </div>
          )}
          
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
              disabled={!selectedRepository || isSubmitting || isLoadingRepos}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Linking...
                </>
              ) : (
                "Link Repository"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRepositoryModal;
