import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import AddEntry from "@/components/AddEntry";
import { Plus, Book, StickyNote, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function App() {
  const supabase = createServerComponentClient<DB>({ cookies });
  
  //TODO: refresh data after new entry
  const { data } = await supabase.from("journals").select();

  return (
    <main className="min-h-screen">
      <header className="flex flex-row items-center justify-around gap-4 px-12 py-2">
        <p>Hey, user!</p>
        <LogoutButton />
      </header>
      

      <div>
        {data?.map((item: Journal) => (
          <p key={item.id}>{item.description}</p>
        ))}
      </div>

      <div className="fixed bottom-2 flex flex-row items-center justify-evenly h-20 w-[calc(100%_-_1rem)] mx-2 rounded-xl bg-slate-300" >
          <Link href="/" ><Book/></Link>
          <Link href="/notes" ><StickyNote/></Link>
          <Link href="/calendar" ><CalendarDays/></Link>
      </div>

      <Button asChild variant="outline" className=" w-12 h-12 border-2 p-0 z-1 fixed right-6 bottom-28 rounded-3xl hover:rounded-xl hover:bg-[#e2e8f0] transition-all" >
        <Link href="/app/newentry" ><Plus/></Link>
      </Button>
    </main>
  );
}