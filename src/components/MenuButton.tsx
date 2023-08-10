import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings2, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import LogoutButton from "./LogoutButton";

export default function MenuButton({
  userEmail,
}: {
  userEmail: string | undefined;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Settings2 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuLabel>{userEmail}</DropdownMenuLabel>
        <DropdownMenuItem>
          <Button
            variant="ghost"
            onClick={() => {
              setTheme(theme === "light" ? "dark" : "light");
            }}
          >
            Toggle theme
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem><LogoutButton/></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
