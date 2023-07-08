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
  const supabase = createClientComponentClient();

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
    router.push("/");
    router.refresh();
  };

  return (
    <div className="p-12 mx-auto w-8/12">
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
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
          className="flex-1 flex flex-col w-full justify-center gap-2 mt-6 text-foreground"
          onSubmit={view === "sign-in" ? handleSignIn : handleSignUp}
        >
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="••••••••"
          />
          {view === "sign-in" && (
            <>
              <Button>Sign In</Button>
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
              <Button>Sign Up</Button>
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
