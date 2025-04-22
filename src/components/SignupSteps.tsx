
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SignupStepsProps {
  onSubmit: (data: {
    email: string;
    password: string;
    address: string;
    birthdate: string;
  }) => void;
  isSubmitting: boolean;
}

const SignupSteps = ({ onSubmit, isSubmitting }: SignupStepsProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    address: "",
    birthdate: "",
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && formData.email && formData.password) {
      setStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 2) {
      onSubmit(formData);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className={cn(
          "flex transition-transform duration-300 ease-in-out",
          step === 2 ? "-translate-x-full" : "translate-x-0"
        )}
        style={{ width: "200%" }}
      >
        <form onSubmit={handleNext} className="w-full flex-shrink-0 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              autoComplete="username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input
              id="signup-password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              minLength={8}
              autoComplete="new-password"
            />
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long
            </p>
          </div>
          <Button type="submit" className="w-full">
            Next
          </Button>
        </form>

        <form onSubmit={handleSubmit} className="w-full flex-shrink-0 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-address">Address</Label>
            <Input
              id="signup-address"
              placeholder="123 Main St, City, State ZIP"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-birthdate">Birthdate</Label>
            <Input
              id="signup-birthdate"
              type="date"
              value={formData.birthdate}
              onChange={(e) =>
                setFormData({ ...formData, birthdate: e.target.value })
              }
              required
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setStep(1)}
            >
              Back
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              <UserPlus size={16} className="mr-2" /> Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupSteps;
