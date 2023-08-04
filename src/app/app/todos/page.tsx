"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Archive,
  CheckCircle,
  MinusCircle,
  Hourglass,
} from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function Todos() {
  const supabase = createClientComponentClient<DB>();
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [newTodo, setNewTodo] = useState("");
  const [state, setState] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("todos")
        .select()
        .order("created_at", { ascending: false });
      return data;
    };
    fetchData().then((data) => setTodos(data));
  }, [supabase, state]);

  const addTodo = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from("todos")
        .insert({ user_id: user.id, title: newTodo });
    }
    setState((state) => !state);
  };

  const updateTodo = async (id: string) => {
    const { error } = await supabase
      .from("todos")
      .update({ is_done: true })
      .eq("id", id);
    setState((state) => !state);
  };

  const deleteTodo = async (id: string) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    setState((state) => !state);
  };

  return (
    <div className="min-h-screen bg-primary dark:bg-primarydark px-4 pb-60">
      <header className="flex flex-row items-center justify-center gap-2 px-12 py-2">
        <Hourglass />
        <p>Chronicler</p>
      </header>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus />
              add
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add new todo</DialogTitle>
            </DialogHeader>
            <div>
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button type="submit" onClick={addTodo}>
                Done
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button
          className={showArchive ? "bg-accent" : ""}
          onClick={() => setShowArchive((showArchive) => !showArchive)}
        >
          <Archive />
          archive
        </Button>
      </div>
      <div className="flex flex-col max-w-3xl mx-auto mt-4 justify-center gap-3">
        {todos?.map((item: Todo) => {
          if (item.is_done === false && showArchive === false ) {
            return (
              <div
                key={item.id}
                className="rounded-xl p-4 flex flex-row gap-2 bg-primary2 dark:bg-primarydark2 shadow-sm"
              >
                <p className="grow">{item.title}</p>
                <CheckCircle
                  color="#3d99ff"
                  onClick={() => updateTodo(item.id)}
                />
                <MinusCircle
                  color="#ef4444"
                  onClick={() => deleteTodo(item.id)}
                />
              </div>
            );
          } else if (item.is_done === true && showArchive === true) {
            return (
              <div
                key={item.id}
                className="rounded-xl p-4 flex flex-row gap-2 bg-primary2 dark:bg-primarydark2 shadow-sm"
              >
                <p className="grow">{item.title}</p>
                <Badge variant="outline" >done</Badge>
                <MinusCircle
                  color="#ef4444"
                  onClick={() => deleteTodo(item.id)}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
