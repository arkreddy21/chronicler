/* eslint-disable @next/next/no-img-element */
"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";

export default function DayView({ entries }: { entries: Journal[] }) {
  return (
    <div className="pb-4 pt-2 mx-4">
      <p className="text-blue-500 font-semibold">
        {new Date(entries[0].created_at).toDateString()}
      </p>
      <div className="rounded-xl bg-blue-100">
        {entries.map((journal) => (
          <div key={journal.id} className={"py-2 px-4" + (journal.img_path ? " grid grid-cols-[1fr,96px]" : "")}>
            <div className="col-[1]" >
              <p className="text-teal-600 text-sm" suppressHydrationWarning>
                {new Date(journal.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="font-semibold">{journal.title}</p>
              <p className="">{journal.description}</p>
            </div>
            {journal.img_path && <AsyncImage src={journal.img_path} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function AsyncImage({ src }: { src: string }) {
  const [image, setImage] = useState<Blob>();

  const getImage = useCallback(async (src: string) => {
    const supabase = createClientComponentClient<DB>();
    const data = await supabase.storage.from("images").download(src);
    data.data && setImage(data.data);
  }, []);

  useEffect(() => {
    getImage(src);
  }, [getImage, src]);

  if (image) {
    return (
      <img
        className="h-24 w-24 col-[2]"
        src={URL.createObjectURL(image)}
        alt="preview"
      />
    );
  } else {
    return <img className="h-24 w-24 col-[2]" alt="loading" />;
  }
}
