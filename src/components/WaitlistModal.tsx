
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, CheckCircle } from "lucide-react";
import { addToWaitlist } from "../../app/actions/waitlist";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WaitlistModal = ({ open, onOpenChange }: WaitlistModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError("");
    
    const result = await addToWaitlist(formData);
    
    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onOpenChange(false);
      }, 2000);
    } else {
      setError(result.error);
    }
    
    setIsSubmitting(false);
  };

  const roles = [
    "Software Engineer",
    "Software Architect", 
    "Product Owner",
    "Engineering Manager",
    "DevOps Engineer",
    "QA Engineer",
    "Tech Lead",
    "CTO",
    "Other"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold mb-2">
            Get Early Access
          </DialogTitle>
          <p className="text-center text-muted-foreground">
            Join our waitlist to be among the first to experience Cyclone AI's revolutionary code review platform.
          </p>
        </DialogHeader>
        
        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Welcome to the waitlist!</h3>
            <p className="text-muted-foreground">
              Thanks for joining! We'll be in touch soon with early access.
            </p>
          </div>
        ) : (
        <form action={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select name="role" required>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((roleOption) => (
                  <SelectItem key={roleOption} value={roleOption}>
                    {roleOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {error && (
            <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded">
              {error}
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Joining Waitlist..." : "Join Waitlist"}
            {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;
