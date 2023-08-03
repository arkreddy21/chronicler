import type { Database } from "@/lib/database.types";

declare global {
  type DB = Database;
  type Journal = Database["public"]["Tables"]["journals"]["Row"];
  type Todo = Database["public"]["Tables"]["todos"]["Row"];
}
