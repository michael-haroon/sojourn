
import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";

const AccountPage = () => {
  const { profile, user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Account</h1>
        <div className="bg-muted/40 rounded-lg border p-5 space-y-2">
          <div>
            <span className="font-semibold">Name: </span>
            {profile?.name || "No name (edit coming soon)"}
          </div>
          <div>
            <span className="font-semibold">Email: </span>
            {profile?.email}
          </div>
          <div className="text-xs text-muted-foreground pt-2">
            Coming soon: Edit profile, preferences, payment, etc.
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
