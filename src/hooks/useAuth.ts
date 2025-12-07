import { supabase } from "@/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [session, setSession] = useState<Session>();

  useEffect(() => {
    const fetchUser = async () => {
      const currentSession = await supabase.auth.getSession();
      if (currentSession.data.session) {
        setSession(currentSession.data.session);
      }
    };
    fetchUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    // sign in logic

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  };

  const signUp = async (email: string, password: string, name: string) => {
    // sign up logic
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: name,
        },
      },
    });

    return { data, error };
  };
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { signIn, signUp, session, signOut };
};
