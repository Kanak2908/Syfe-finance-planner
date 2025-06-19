
"use client";

import { useState } from "react";

interface Props {
  onClose: () => void;
  onSave: (amount: number, date: string) => void;
}

export default function AddContributionModal({ onClose, onSave }: Props) {
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");

  const handleSave = () => {
    if (amount <= 0 || !date) {
      alert("Enter valid amount and date");
      return;
    }
    onSave(amount, date);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Add Contribution</h2>
        <input
          type="number"
          className="w-full mb-2 p-2 border rounded"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <input
          type="date"
          className="w-full mb-4 p-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-1 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-1 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
