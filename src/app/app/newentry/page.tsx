"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Input } from "@/components/ui/input";

export default function AddEntry() {
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient<DB>();


  const insertEntry = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    let data = await fetch(`${location.origin}/api`, {
      method: "post",
      body: JSON.stringify({ desc, title, uid:user?.id }),
    });
    console.log("insert done");
    console.log(data);
    router.push("/app");
  };
  console.log(new Date().getTimezoneOffset())

  return (
    <div className="flex flex-col gap-4 w-screen justify-center px-4" >
      <h3>Add new entry</h3>
      <Input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Type here"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
        className="resize-none h-36"
      />
      <Button onClick={insertEntry}>Done</Button>
    </div>
  );
}
