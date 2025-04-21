
import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AccountPage = () => {
  const { profile, user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Account</h1>
          <Button variant="outline" asChild>
            <Link to="/edit-profile">Edit Profile</Link>
          </Button>
        </div>
        <div className="bg-muted/40 rounded-lg border p-5 space-y-2">
          <div>
            <span className="font-semibold">Name: </span>
            {profile?.name || "Not provided"}
          </div>
          <div>
            <span className="font-semibold">Email: </span>
            {user.email}
          </div>
          <div>
            <span className="font-semibold">Address: </span>
            {profile?.address || "Not provided"}
          </div>
          <div>
            <span className="font-semibold">Birthdate: </span>
            {profile?.birthdate ? new Date(profile.birthdate).toLocaleDateString() : "Not provided"}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
