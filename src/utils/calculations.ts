interface Totals {
  total: number;
  income: number;
  expenses: number;
  recentIncome: number;
  recentExpenses: number;
}

export function calculateTotals(transactions: Array<{ type: string; amount: number; date: string }>): Totals {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return transactions.reduce((acc, curr) => {
    const transactionDate = new Date(curr.date);
    const amount = curr.amount;
    const isRecent = transactionDate >= sevenDaysAgo;

    if (curr.type === 'income') {
      acc.income += amount;
      acc.total += amount;
      if (isRecent) acc.recentIncome += amount;
    } else {
      acc.expenses += amount;
      acc.total -= amount;
      if (isRecent) acc.recentExpenses += amount;
    }

    return acc;
  }, {
    total: 0,
    income: 0,
    expenses: 0,
    recentIncome: 0,
    recentExpenses: 0,
  });
}