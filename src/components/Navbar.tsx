"use client";
import Link from "next/link";
import { Book, ListTodo, CalendarDays, Moon, Sun, Plus } from "lucide-react";
import LogoutButton from "./LogoutButton";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import MenuButton from "./MenuButton";

export default function Navbar({
  userEmail,
}: {
  userEmail: string | undefined;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="lg:hidden fixed bottom-0 flex flex-row items-center justify-evenly h-20 w-full bg-white dark:bg-primarydark3">
        <Link href="/app">
          <Book />
        </Link>
        <Link href="/app/todos">
          <ListTodo />
        </Link>
        <Link href="/app/calendar">
          <CalendarDays />
        </Link>
        <MenuButton userEmail={userEmail} />
      </div>

      <div className="hidden lg:visible w-96 p-4 h-screen lg:flex flex-col gap-4 bg-white dark:bg-primarydark3">
        <p>Hey, {userEmail}</p>
        <Link href="/app" className="flex flex-row gap-2">
          <Book /> {"Journals"}
        </Link>
        <Link href="/app/todos" className="flex flex-row gap-2">
          <ListTodo /> {"Todo-list"}
        </Link>
        <Link href="/app/calendar" className="flex flex-row gap-2">
          <CalendarDays /> {"Calendar"}
        </Link>
        <div className="grow">
          <Button asChild className="bg-accent">
            <Link href="/app/newentry">
              <Plus />
              {"New journal"}
            </Link>
          </Button>
        </div>
        <div className="flex flex-row items-center justify-around gap-4 py-2">
          <LogoutButton />
          <Button
            size="icon"
            className="bg-primary2 dark:bg-primarydark2"
            onClick={() => {
              setTheme(theme === "light" ? "dark" : "light");
            }}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </>
  );
}
