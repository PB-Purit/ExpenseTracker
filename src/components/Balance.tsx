import React from 'react';
import type { Transaction } from '../types/Transaction';
import { calculateTotals } from '../utils/calculations';
import { formatCurrency } from '../utils/formatters';

interface BalanceProps {
  transactions: Transaction[];
}

export function Balance({ transactions }: BalanceProps) {
  const { total, income, expenses, recentIncome, recentExpenses } = calculateTotals(transactions);

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <h3 className="text-green-600 font-medium">Income</h3>
            <p className="text-xl font-bold text-green-600">{formatCurrency(income)}</p>
            <div className="mt-2 text-sm text-green-500">
              Last 7 days: {formatCurrency(recentIncome)}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <h3 className="text-red-600 font-medium">Expenses</h3>
            <p className="text-xl font-bold text-red-600">{formatCurrency(expenses)}</p>
            <div className="mt-2 text-sm text-red-500">
              Last 7 days: {formatCurrency(recentExpenses)}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-4 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-[#B76E79]">Total Balance</h2>
        <p className="text-3xl font-bold text-[#B76E79] mt-2">
          {formatCurrency(total)}
        </p>
      </div>
    </div>
  );
}