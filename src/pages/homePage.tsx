import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/supabase/client";
import type { Session } from "@supabase/supabase-js";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const HomePage = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentSession(session);
    });
  }, []);

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <p>
        {currentSession?.user?.user_metadata.display_name}, Welcome to HubCredo
      </p>
      <div>
        <Button
          onClick={async () => {
            await signOut();
            toast.success("Signed out successfully!");
            navigate("/sign-in");
          }}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};
