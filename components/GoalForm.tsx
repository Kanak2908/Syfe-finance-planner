"use client";

import { useState } from "react";
import { Currency, Goal } from "@/types/goal";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onAdd: (goal: Goal) => void;
}

export default function GoalForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState<number>(0);
  const [currency, setCurrency] = useState<Currency>("INR");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || target <= 0) return alert("Fill valid inputs");

    onAdd({
      id: uuidv4(),
      name,
      target,
      currency,
      contributions: [],
    });

    setName("");
    setTarget(0);
    setCurrency("INR");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-xl shadow-md space-y-4 max-w-xl">
  <h2 className="text-xl font-semibold">Add New Goal</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <input
      className="w-full p-2 border border-gray-300 rounded-md"
      placeholder="Goal Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <input
      className="w-full p-2 border border-gray-300 rounded-md"
      type="number"
      placeholder="Target Amount"
      value={target}
      onChange={(e) => setTarget(Number(e.target.value))}
    />
    <select
      className="w-full p-2 border border-gray-300 rounded-md"
      value={currency}
      onChange={(e) => setCurrency(e.target.value as Currency)}
    >
      <option value="INR">INR</option>
      <option value="USD">USD</option>
    </select>
  </div>
  <button
    type="submit"
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
  >
    Add Goal
  </button>
</form>

  );
}