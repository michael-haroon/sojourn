
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const EditProfile = () => {
  const { user, profile, loading } = useAuth();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
    if (profile) {
      setName(profile.name || "");
      setAddress(profile.address || "");
      setBirthdate(profile.birthdate ? profile.birthdate.split("T")[0] : "");
    }
  }, [profile, loading, user, navigate]);

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);

    const updates = {
      id: user.id,
      name,
      address,
      birthdate,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("profiles")
      .upsert(updates)
      .select()
      .single();

    setIsSaving(false);
    if (error) {
      toast({
        title: "Error",
        description: "Could not update profile. Please try again later.",
        variant: "destructive",
      });
    } else {
      toast({ title: "Profile updated successfully!" });
      navigate("/account");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-md">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoCapitalize="on"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              placeholder="123 Main St, City, State ZIP"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthdate">Birthdate</Label>
            <Input
              id="birthdate"
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="w-full bg-gradient-to-r from-ocean-500 to-forest-500 hover:opacity-90">
            Save Changes
          </Button>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;

