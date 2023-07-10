import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import AddEntry from "@/components/AddEntry";

export default async function Home() {
  const supabase = createServerComponentClient<DB>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/about");
  }
  //TODO: refresh data after new entry
  const { data } = await supabase.from("journals").select();

  return (
    <main className="min-h-screen p-12">
      <div className="flex items-center gap-4">
        Hey, {user.email}!
        <LogoutButton />
      </div>

      <AddEntry uid={user.id} />

      <div>
        {data?.map((item: Journal) => (
          <p key={item.id}>{item.description}</p>
        ))}
      </div>
    </main>
  );
}
