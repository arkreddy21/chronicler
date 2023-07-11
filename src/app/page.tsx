import { buttonVariants } from "@/components/ui/button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Login from "@/components/Login"

export default async function Home() {

  return (
    <main>
      <p>This is the homepage of the app</p>
      <p>this will be the hero page for the app</p>
      <Link href="/app" >go to app</Link>
    </main>
  );
}
