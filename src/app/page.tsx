import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  return (
    <main className="flex flex-col lg:flex-row gap-4 pt-16 px-16 min-h-screen">
      <div className="flex flex-col justify-center gap-4">
        <h1 className="text-8xl font-extrabold">
          Introducing <span className="text-accent">Chronicler</span>
        </h1>
        <p className="text-4xl font-bold">
          Your Daily Journal and Todo Manager
        </p>
        <p className="text-xl">
          The ultimate companion with intutive daily journal, seamless todo
          management and secure cloud sync
        </p>
        <p className="text-xl">
          Begin your journey with Chronicler today and unlock the transformative
          potential of journaling and mindful task management. Your life, your
          story, empowered by our app.
        </p>
        <Link
          href="/app"
          className="bg-accent rounded-xl flex flex-row gap-2 p-4 w-40 mx-auto"
        >
          Get started
          <ArrowRight />
        </Link>
      </div>
      <div className="flex justify-center items-center" >
        <img
          className="w-[600px] object-contain rounded-xl shadow-xl"
          src="https://uuckvacumhquqfvsosdf.supabase.co/storage/v1/object/public/screenshots/f1/chr_home.png"
          alt="screenshot"
        />
      </div>
    </main>
  );
}
