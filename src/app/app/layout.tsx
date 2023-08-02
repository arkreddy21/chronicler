import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<DB>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div>
        <Login />
      </div>
    );
  }

  return (
    <html lang="en">
      <body>
        <div className="lg:flex flex-row">
          <Navbar userEmail={user.email} />
          <div className="h-screen grow overflow-y-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
