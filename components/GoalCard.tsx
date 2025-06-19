// components/GoalCard.tsx
"use client";

import { useState } from "react";
import { Goal } from "@/types/goal";
import AddContributionModal from "./AddContributionModal";

interface Props {
  goal: Goal;
  exchangeRate: number;
  onAddContribution: (id: string, amount: number, date: string) => void;
}

export default function GoalCard({ goal, exchangeRate, onAddContribution }: Props) {
  const [showModal, setShowModal] = useState(false);
  const totalSaved = goal.contributions.reduce((sum, c) => sum + c.amount, 0);
  const remaining = goal.target - totalSaved;
  const progress = Math.min((totalSaved / goal.target) * 100, 100).toFixed(0);

  const currencySymbol = goal.currency === "INR" ? "₹" : "$";
  const convertedTarget = goal.currency === "INR"
    ? `$${(goal.target / exchangeRate).toFixed(2)}`
    : `₹${(goal.target * exchangeRate).toFixed(2)}`;

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-3 relative">
      <div className="absolute top-2 right-2 bg-gray-100 text-sm px-2 py-0.5 rounded-full font-medium">
        {progress}%
      </div>
      <h2 className="text-lg font-semibold">{goal.name}</h2>
      <p className="text-xl font-bold text-blue-600">{currencySymbol}{goal.target}</p>
      <p className="text-sm text-gray-500">{convertedTarget}</p>

      <div className="h-2 bg-gray-200 rounded">
        <div className="h-2 bg-blue-600 rounded" style={{ width: `${progress}%` }}></div>
      </div>

      <p className="text-sm">
        {goal.contributions.length} contributions • {currencySymbol}{totalSaved} saved
      </p>
      <p className="text-sm text-gray-500">{currencySymbol}{remaining} remaining</p>

      <button
        onClick={() => setShowModal(true)}
        className="w-full mt-2 py-2 border rounded-md hover:bg-gray-50"
      >
        ➕ Add Contribution
      </button>

      {showModal && (
        <AddContributionModal
          onClose={() => setShowModal(false)}
          onSave={(amount, date) => {
            onAddContribution(goal.id, amount, date);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

