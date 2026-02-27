import React from 'react';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li
      className={`group flex items-center justify-between gap-4 p-4 rounded-xl border transition-all duration-300 ${
        todo.completed
          ? "bg-[#0a0a0a]/50 border-emerald-900/20 text-zinc-500"
          : "bg-[#0a0a0a] border-zinc-800/80 text-zinc-200 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(52,211,153,0.06)]"
      }`}
    >
      <button
        onClick={() => onToggle(todo.id)}
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
        onClick={() => onDelete(todo.id)}
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
  );
};
