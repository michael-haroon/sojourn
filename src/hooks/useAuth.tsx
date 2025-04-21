
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setProfile(null); // reset, will fetch
      if (session?.user) {
        setTimeout(() => fetchProfile(session.user.id), 0);
      } else {
        setLoading(false);
      }
    });

    // Get current session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user || null);
      if (data.session?.user) {
        fetchProfile(data.session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };

    async function fetchProfile(id: string) {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
      if (!error && data) setProfile(data);
      setLoading(false);
    }
  }, []);

  return { session, user, profile, loading };
}
