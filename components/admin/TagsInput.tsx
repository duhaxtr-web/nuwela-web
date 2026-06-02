"use client";
import { useState } from "react";
import { X } from "lucide-react";

export function TagsInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");
  function add() {
    const v = input.trim();
    if (!v || value.includes(v)) return;
    onChange([...value, v]);
    setInput("");
  }
  function remove(t: string) {
    onChange(value.filter((x) => x !== t));
  }
  return (
    <div className="border border-border bg-white px-3 py-2 min-h-[44px] flex flex-wrap items-center gap-2 focus-within:border-primary">
      {value.map((t) => (
        <span key={t} className="inline-flex items-center gap-1 bg-surface text-xs uppercase tracking-widest px-2 py-1">
          {t}
          <button type="button" onClick={() => remove(t)} className="hover:text-error">
            <X size={12} />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") { e.preventDefault(); add(); }
          if (e.key === "Backspace" && !input && value.length) remove(value[value.length - 1]);
        }}
        placeholder={placeholder || "Enter ile ekle"}
        className="flex-1 min-w-[120px] outline-none text-sm bg-transparent"
      />
    </div>
  );
}
