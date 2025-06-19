
"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import GoalForm from "@/components/GoalForm";
import GoalCard from "@/components/GoalCard";
import { fetchExchangeRate } from "@/lib/exchangeRate";
import { Goal } from "@/types/goal";

export default function Home() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const handleAddGoal = (goal: Goal) => {
    setGoals((prev) => [...prev, goal]);
  };

  const handleContribution = (goalId: string, amount: number, date: string) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              contributions: [...goal.contributions, { amount, date }],
            }
          : goal
      )
    );
  };

  const refreshRate = async () => {
    try {
      const { rate, time } = await fetchExchangeRate();
      setExchangeRate(rate);
      setLastUpdated(time);
    } catch {
      alert("Failed to fetch exchange rate");
    }
  };

  useEffect(() => {
    refreshRate();
  }, []);

  return (
    <main className="p-6 md:p-10 max-w-5xl mx-auto space-y-6">
      <DashboardHeader
        goals={goals}
        exchangeRate={exchangeRate}
        lastUpdated={lastUpdated}
        onRefresh={refreshRate}
      />

      <h2 className="text-xl font-bold text-gray-700">Your Goals</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            exchangeRate={exchangeRate}
            onAddContribution={handleContribution}
          />
        ))}
      </div>

      <div className="my-6">
        <GoalForm onAdd={handleAddGoal} />
      </div>

      <button
        onClick={refreshRate}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg text-lg hover:bg-blue-700"
      >
        ➕ Add Goal
      </button>
    </main>
  );
}
