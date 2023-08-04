import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import DayView from "@/components/DayView";
import { Plus, Hourglass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function App() {
  const supabase = createServerComponentClient<DB>({ cookies });

  const { data } = await supabase
    .from("journals")
    .select()
    .order("created_at", { ascending: false });
  var groupedData: Journal[][] = [[]];
  var currentDate = data && data[0] && new Date(data[0].created_at).toDateString();
  data?.forEach((item) => {
    if (new Date(item.created_at).toDateString() === currentDate) {
      groupedData.at(-1)?.push(item);
    } else {
      currentDate = new Date(item.created_at).toDateString();
      groupedData.push([]);
      groupedData.at(-1)?.push(item);
    }
  });
  if( groupedData[0].length ===0) {groupedData=[]}

  return (
    <main className="min-h-screen bg-primary dark:bg-primarydark pb-60">
      <header className="flex flex-row items-center justify-center gap-2 px-12 py-2">
        <Hourglass />
        <p>Chronicler</p>
      </header>

      {groupedData.map((item) => (
        <DayView
          key={new Date(item[0].created_at).toDateString()}
          entries={item}
        />
      ))}

      <Button
        asChild
        className="bg-accent w-12 h-12 border-0 p-0 z-1 fixed right-6 bottom-28 lg:invisible rounded-3xl active:rounded-xl transition-all"
      >
        <Link href="/app/newentry">
          <Plus />
        </Link>
      </Button>
    </main>
  );
}
