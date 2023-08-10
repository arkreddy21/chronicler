"use client";
import Link from "next/link";
import { Book, ListTodo, CalendarDays, Moon, Sun, Plus } from "lucide-react";
import LogoutButton from "./LogoutButton";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import MenuButton from "./MenuButton";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar({
  userEmail,
}: {
  userEmail: string | undefined;
}) {
  const { theme, setTheme } = useTheme();
  const path = usePathname();
  const pathanim = (
    <motion.span
      layoutId="activepath"
      className="absolute left-0 top-0 block h-full w-full rounded-md bg-opacity-20 bg-accent"
    />
  );
  const pathanimlg = (
    <motion.span
      layoutId="activepathlg"
      className="absolute left-0 top-0 block h-full w-full rounded-md bg-opacity-20 bg-accent"
    />
  );
  return (
    <>
      <div className="lg:hidden z-10 fixed bottom-0 flex flex-row items-center justify-evenly h-20 w-full bg-white dark:bg-primarydark3">
        <Link
          className="relative p-2 flex items-center justify-center"
          href="/app"
        >
          {path === "/app" && pathanim}
          <Book color={path === "/app" ? "#3d99ff" : "currentColor"} />
        </Link>
        <Link
          className="relative p-2 flex items-center justify-center"
          href="/app/todos"
        >
          {path === "/app/todos" && pathanim}
          <ListTodo
            color={path === "/app/todos" ? "#3d99ff" : "currentColor"}
          />
        </Link>
        <Link
          className="relative p-2 flex items-center justify-center"
          href="/app/calendar"
        >
          {path === "/app/calendar" && pathanim}
          <CalendarDays
            color={path === "/app/calendar" ? "#3d99ff" : "currentColor"}
          />
        </Link>
        <MenuButton userEmail={userEmail} />
      </div>

      <div className="hidden lg:visible z-10 w-96 p-4 h-screen lg:flex flex-col gap-4 bg-white dark:bg-primarydark3">
        <p>Hey, {userEmail}</p>
        <Link href="/app" className="relative p-3 flex flex-row gap-2">
          {path === "/app" && pathanimlg}
          <Book color={path === "/app" ? "#3d99ff" : "currentColor"} />{" "}
          {"Journals"}
        </Link>
        <Link href="/app/todos" className="relative p-3 flex flex-row gap-2">
          {path === "/app/todos" && pathanimlg}
          <ListTodo
            color={path === "/app/todos" ? "#3d99ff" : "currentColor"}
          />{" "}
          {"Todo-list"}
        </Link>
        <Link href="/app/calendar" className="relative p-3 flex flex-row gap-2">
          {path === "/app/calendar" && pathanimlg}
          <CalendarDays
            color={path === "/app/calendar" ? "#3d99ff" : "currentColor"}
          />{" "}
          {"Calendar"}
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
