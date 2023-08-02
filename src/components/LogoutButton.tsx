"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const router = useRouter();

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient<DB>();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Button  className="bg-primary2 dark:bg-primarydark2" onClick={signOut}>
      Logout
    </Button>
  );
}
