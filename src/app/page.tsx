"use client";

import { useState } from "react";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

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
    <div className="flex min-h-screen items-center justify-center bg-[#050505] font-sans selection:bg-emerald-500/30">
      {/* Arka plan ambiyans ışıkları */}
      <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/10 blur-[120px]" />
      </div>

      <main className="relative z-10 flex w-full max-w-xl flex-col gap-8 p-6 sm:p-10">
        {/* Header Alanı */}
        <header className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <h1 className="text-sm font-medium tracking-[0.2em] text-emerald-400/80 uppercase">
              Focus_Flow // Terminal
            </h1>
          </div>
          <h2 className="text-4xl font-light tracking-tight text-zinc-100">
            Görev <span className="font-semibold text-emerald-400 shadow-emerald-400/20">Protokolü</span>
          </h2>
        </header>

        {/* Ekleme Formu */}
        <form onSubmit={addTodo} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-emerald-500/0 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
          <div className="relative flex items-center bg-[#0a0a0a] rounded-xl border border-zinc-800/80 p-2 focus-within:border-emerald-500/50 transition-colors">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Yeni bir görev tanımla..."
              className="w-full bg-transparent px-4 py-2 text-zinc-200 placeholder-zinc-600 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-zinc-900 text-emerald-400 rounded-lg border border-zinc-800 hover:bg-emerald-400 hover:text-zinc-950 font-medium transition-all shadow-[0_0_15px_rgba(52,211,153,0)] hover:shadow-[0_0_15px_rgba(52,211,153,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!newTodo.trim()}
            >
              EKLE
            </button>
          </div>
        </form>

        {/* Liste */}
        <ul className="flex flex-col gap-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`group flex items-center justify-between gap-4 p-4 rounded-xl border transition-all duration-300 ${
                todo.completed
                  ? "bg-[#0a0a0a]/50 border-emerald-900/20 text-zinc-500"
                  : "bg-[#0a0a0a] border-zinc-800/80 text-zinc-200 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(52,211,153,0.06)]"
              }`}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className="flex items-center gap-4 flex-1 text-left focus:outline-none"
              >
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    todo.completed
                      ? "bg-emerald-400/10 border-emerald-500/50 text-emerald-400"
                      : "border-zinc-700 bg-zinc-900 group-hover:border-emerald-500/50 text-transparent"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`w-3.5 h-3.5 ${todo.completed ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span
                  className={`text-[15px] leading-snug transition-all ${
                    todo.completed ? "line-through opacity-60" : ""
                  }`}
                >
                  {todo.text}
                </span>
              </button>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-zinc-600 hover:text-red-400/80 transition-colors rounded-lg hover:bg-zinc-900 focus:opacity-100 focus:outline-none"
                aria-label="Sil"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
              </button>
            </li>
          ))}
          {todos.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-zinc-800 rounded-xl bg-[#0a0a0a]/50">
              <div className="w-12 h-12 rounded-full bg-emerald-500/5 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-zinc-500">Tüm görevler tamamlandı.</p>
              <p className="text-zinc-600 text-sm mt-1">Sistem beklemede.</p>
            </div>
          )}
        </ul>
      </main>
    </div>
  );
}
