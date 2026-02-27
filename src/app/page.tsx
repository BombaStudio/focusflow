"use client";

import { useState } from "react";
import { InputField } from "../../components/UI/InputField";
import { Header } from "../../components/Header";
import { Button } from "../../components/UI/Button";
import { EmptyState } from "../../components/UI/EmptyState";
import { TodoItem, type Todo } from "../../components/UI/TodoItem";
import { LayoutView } from "../../components/LayoutView";
export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", text: "Sistem bileşenlerini optimize et", completed: false },
    { id: "2", text: "Protokol alfa güncellemesini tamamla", completed: true },
    { id: "3", text: "Ana ağ (mainnet) bağlantısını test et", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    setTodos([
      { id: crypto.randomUUID(), text: newTodo, completed: false },
      ...todos,
    ]);
    setNewTodo("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <LayoutView>
      {/* Header Alanı */}
        <Header />

        {/* Ekleme Formu */}
        <form onSubmit={addTodo} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-emerald-500/0 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
          <div className="relative flex items-center bg-[#0a0a0a] rounded-xl border border-zinc-800/80 p-2 focus-within:border-emerald-500/50 transition-colors">
            <InputField
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Yeni bir görev tanımla..."
            />
            <Button
              type="submit"
              disabled={!newTodo.trim()}
            >
              EKLE
            </Button>
          </div>
        </form>

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
    </LayoutView>
  );
}
