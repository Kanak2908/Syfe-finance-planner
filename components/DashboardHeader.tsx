
import { Goal } from "@/types/goal";

interface Props {
  goals: Goal[];
  exchangeRate: number;
  lastUpdated: string;
  onRefresh: () => void;
}

const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

const formatUSD = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

export default function DashboardHeader({ goals, exchangeRate, lastUpdated, onRefresh }: Props) {
  const totalTarget = goals.reduce((sum, goal) => {
    const converted = goal.currency === "INR" ? goal.target : goal.target * exchangeRate;
    return sum + converted;
  }, 0);

  const totalSaved = goals.reduce((sum, goal) => {
    const saved = goal.contributions.reduce((acc, c) => acc + c.amount, 0);
    const converted = goal.currency === "INR" ? saved : saved * exchangeRate;
    return sum + converted;
  }, 0);

  const averageProgress =
    goals.length === 0 ? 0 : Math.min((totalSaved / totalTarget) * 100, 100);

  return (
    <div className="bg-gradient-to-r from-pink-100 to-amber-800 text-gray-900 p-6 rounded-2xl shadow-md space-y-4">

      <div className="flex justify-between items-start flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Syfe Savings Planner</h1>
          <p className="text-sm opacity-80">Track your financial goals and build your future</p>
        </div>
        <button
          onClick={onRefresh}
          className="bg-white text-blue-700 px-4 py-2 rounded-full font-medium hover:bg-gray-100"
        >
          🔁 Refresh Rates
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm opacity-80">Total Targets</p>
          <p className="text-xl font-bold">{formatINR(totalTarget)}</p>
          <p className="text-sm">{formatUSD(totalTarget / exchangeRate)}</p>
        </div>
        <div>
          <p className="text-sm opacity-80">Total Saved</p>
          <p className="text-xl font-bold">{formatINR(totalSaved)}</p>
          <p className="text-sm">{formatUSD(totalSaved / exchangeRate)}</p>
        </div>
        <div>
          <p className="text-sm opacity-80">Overall Progress</p>
          <p className="text-xl font-bold">{averageProgress.toFixed(1)}%</p>
          <p className="text-sm">Total goals completion</p>
        </div>
      </div>

      <p className="text-xs opacity-70 mt-2 text-right">
        Exchange Rate: 1 USD = ₹{exchangeRate.toFixed(2)} • Last updated: {lastUpdated}
      </p>
    </div>
  );
}
