"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { buttonVariants, Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("sign-in");
  const router = useRouter();
  const supabase = createClientComponentClient<DB>();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setView("check-email");
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.push("/app");
  };

  return (
    <div className="py-12 px-16 bg-primary dark:bg-primarydark h-screen">
      <Link href="/" className={buttonVariants({ variant: "secondary" }) +"bg-primary2 dark:bg-primarydark2"}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Link>
      {view === "check-email" ? (
        <p className="text-center text-foreground">
          Check <span className="font-bold">{email}</span> to continue signing
          up
        </p>
      ) : (
        <form
          className="flex flex-col w-full justify-center gap-2 mt-6 mx-auto max-w-xl"
          onSubmit={view === "sign-in" ? handleSignIn : handleSignUp}
        >
          <p className="text-accent text-xl mx-auto" >Login to continue</p>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="bg-primary dark:bg-primarydark"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="••••••••"
            className="bg-primary dark:bg-primarydark"
          />
          {view === "sign-in" && (
            <>
              <Button className="bg-accent" >Sign In</Button>
              <p className="text-sm text-center">
                Don&apos;t have an account?
                <button
                  className="ml-1 underline"
                  onClick={() => setView("sign-up")}
                >
                  Sign Up Now
                </button>
              </p>
            </>
          )}
          {view === "sign-up" && (
            <>
              <Button className="bg-accent w-md mx-auto">Sign Up</Button>
              <p className="text-sm text-center">
                Already have an account?
                <button
                  className="ml-1 underline"
                  onClick={() => setView("sign-in")}
                >
                  Sign In Now
                </button>
              </p>
            </>
          )}
        </form>
      )}
    </div>
  );
}
