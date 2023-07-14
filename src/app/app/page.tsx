import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import DayView from "@/components/DayView";
import { Plus, Book, StickyNote, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function App() {
  const supabase = createServerComponentClient<DB>({ cookies });

  const { data } = await supabase
    .from("journals")
    .select()
    .order("created_at", { ascending: false });
  var groupedData: Journal[][] = [[]];
  var currentDate = data && new Date(data[0].created_at).toDateString();
  data?.forEach((item) => {
    if (new Date(item.created_at).toDateString() === currentDate) {
      groupedData.at(-1)?.push(item);
    } else {
      currentDate = item.created_at;
      groupedData.push([]);
      groupedData.at(-1)?.push(item);
    }
  });  

  return (
    <main className="min-h-screen bg-blue-50 dark:bg-blue-900 pb-60">
      <header className="flex flex-row items-center justify-around gap-4 px-12 py-2">
        <p>Hey, user!</p>
        <LogoutButton />
      </header>

      {groupedData.map((item)=>(
        <DayView key={new Date(item[0].created_at).toDateString()} entries={item} />
      ))}
      
      <div className="fixed bottom-2 flex flex-row items-center justify-evenly h-20 w-[calc(100%_-_1rem)] mx-2 rounded-xl bg-blue-100">
        <Link href="/app">
          <Book />
        </Link>
        <Link href="/app/notes">
          <StickyNote />
        </Link>
        <Link href="/app/calendar">
          <CalendarDays />
        </Link>
      </div>

      <Button
        asChild
        variant="outline"
        className=" w-12 h-12 border-2 p-0 z-1 fixed right-6 bottom-28 rounded-3xl hover:rounded-xl hover:bg-[#e2e8f0] transition-all"
      >
        <Link href="/app/newentry">
          <Plus />
        </Link>
      </Button>
    </main>
  );
}
