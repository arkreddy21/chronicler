"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AddEntry() {
  const [desc, setDesc] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient<DB>();


  const insertEntry = async (desc: String) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    let data = await fetch(`${location.origin}/api`, {
      method: "post",
      body: JSON.stringify({ desc: desc, uid:user?.id }),
    });
    console.log("insert done");
    console.log(data);
    router.push("/app");
  };

  return (
    <div className="flex flex-col gap-4 w-10/12" >
      <h3>Add new entry</h3>
      <Textarea
        placeholder="Type here"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
      />
      <Button onClick={() => insertEntry(desc)}>Done</Button>
    </div>
  );
}
