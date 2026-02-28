"use client";

import { useState, useEffect } from "react";
import { InputField } from "../../components/UI/InputField";
import { Header } from "../../components/Header";
import { Button } from "../../components/UI/Button";
import { EmptyState } from "../../components/UI/EmptyState";
import { AuthEmptyState } from "../../components/UI/AuthEmptyState";
import { TodoItem, type Todo } from "../../components/UI/TodoItem";
import { LayoutView } from "../../components/LayoutView";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getTodos, addTodo as addTodoAction, deleteTodo as deleteTodoAction } from "../actions/todo";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      getTodos().then(setTodos).catch(console.error);
    }
  }, [isAuthenticated]);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    const text = newTodo;
    setNewTodo("");
    try {
      const addedTodo = await addTodoAction(text);
      setTodos((prev) => [addedTodo, ...prev]);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTodo = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo?.completed) {
      router.push(`/workspace/${id}`);
    }
  };

  const deleteTodo = async (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    try {
      await deleteTodoAction(id);
    } catch (error) {
      console.error(error);
      // Re-fetch on error to ensure sync
      getTodos().then(setTodos);
    }
  };

  return (
    <LayoutView>
      {/* Header Alanı */}
        <Header title="Focus_Flow // Terminal" description="Görev Protokolü"/>
        
        {status === "loading" ? (
          <div className="flex justify-center p-12">
            <div className="w-8 h-8 rounded-full border-t-2 border-emerald-500 animate-spin" />
          </div>
        ) : !isAuthenticated ? (
          <AuthEmptyState onLogin={() => signIn("google")} />
        ) : (
          <div className="flex flex-col mt-4">
            {/* Ekleme Formu */}
            <form onSubmit={handleAddTodo} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-emerald-500/0 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
              <div className="relative flex flex-col sm:flex-row items-center bg-[#0a0a0a] rounded-xl border border-zinc-800/80 p-2 focus-within:border-emerald-500/50 transition-colors gap-2 sm:gap-0">
                <InputField
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Yeni bir görev tanımla..."
                />
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  disabled={!newTodo.trim()}
                >
                  EKLE
                </Button>
              </div>
            </form>

            <div className="h-6"></div>

            {/* Liste */}
            <ul className="flex flex-col gap-3">
              {todos.map((todo) => (
                <TodoItem 
                  key={todo.id} 
                  todo={todo} 
                  onToggle={toggleTodo} 
                  onDelete={deleteTodo} 
                />
              ))}
              {todos.length === 0 && <EmptyState />}
            </ul>
          </div>
        )}
    </LayoutView>
  );
}
