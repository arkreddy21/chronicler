/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from "uuid";

export default function AddEntry() {
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>();
  const router = useRouter();
  
  const insertEntry = async () => {
    const supabase = createClientComponentClient<DB>();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const newid = uuidv4()

    const uploadedImage = user && file && await supabase.storage
      .from("images")
      .upload(`${user.id}/${newid}`, file);

    const { data } = await supabase.from("journals").insert({
      description: desc,
      title: title,
      user_id: user?.id || "",
      id: newid,
      img_path: uploadedImage?.data?.path
    });

    console.log("insert done");
    console.log(data);
    router.push("/app");
  };

  return (
    <div className="flex flex-col gap-4 justify-center px-4 h-screen py-4">
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
        className="resize-none grow"
      />
      <Label htmlFor="picture" className="text-blue-500 cursor-pointer" >Add picture</Label>
      <input
        id="picture"
        type="file"
        accept="image/png, image/jpeg"
        className="invisible h-0"
        onChange={(e) => e.target.files && setFile(e.target.files[0])}
      />
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="preview"
          className="h-32 w-32 object-contain"
        />
      )}
      <Button onClick={insertEntry}>Done</Button>
    </div>
  );
}
