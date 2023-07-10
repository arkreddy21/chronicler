import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
  return (
    <>
      <div className="mb-6" >
        <Link href="/login" className={buttonVariants({ variant: "outline" })}>
          Login
        </Link>
      </div>
      <p>About page</p>
    </>
  );
}
