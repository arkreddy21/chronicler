"use client";
import DayView from "@/components/DayView";
import { PageWrapper } from "@/components/PageWrapper";
import { Calendar } from "@/components/ui/calendar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Hourglass } from "lucide-react";
import { useEffect, useState } from "react";

export default function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [entries, setEntries] = useState<Journal[]>([]);
  const supabase = createClientComponentClient<DB>();

  useEffect(() => {
    date &&
      (async () => {
        let startOfDay = new Date(date).setHours(0, 0, 0, 0);
        let endOfDay = new Date(date).setHours(23, 59, 59, 999);

        const { data } = await supabase
          .from("journals")
          .select()
          .gte("created_at", new Date(startOfDay).toISOString())
          .lte("created_at", new Date(endOfDay).toISOString())
          .order("created_at", { ascending: false });
        data && setEntries(data);
      })();
  }, [date, supabase]);

  return (
    <PageWrapper>
      <div className="bg-primary dark:bg-primarydark min-h-screen px-4 pb-60">
        <header className="flex flex-row items-center justify-center gap-2 px-12 py-2">
          <Hourglass />
          <p>Chronicler</p>
        </header>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border mx-auto w-72 mt-4"
        />
        {entries.length > 0 ? <DayView entries={entries} /> : <p>no entries</p>}
      </div>
    </PageWrapper>
  );
}
