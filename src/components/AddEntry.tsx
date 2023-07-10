"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function AddEntry({ uid }: { uid: string }) {
  const [desc, setDesc] = useState("");
  const router = useRouter();

  const insertEntry = async (desc: String) => {
    let data = await fetch(`${location.origin}/api`, {
      method: "post",
      body: JSON.stringify({ desc: desc, uid:uid }),
    });
    console.log("insert done");
    console.log(data);
    router.refresh();
  };

  return (
    <div>
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
