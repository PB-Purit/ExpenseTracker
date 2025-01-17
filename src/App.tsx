import { useState } from 'react';
import { Wallet } from 'lucide-react';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { Balance } from './components/Balance';
import type { Transaction } from './types/Transaction';

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    if (editingTransaction) {
      // Update existing transaction
      setTransactions(transactions.map(t =>
        t.id === editingTransaction.id
          ? { ...newTransaction, id: editingTransaction.id }
          : t
      ));
      setEditingTransaction(null);
    } else {
      // Add new transaction
      const transaction = {
        ...newTransaction,
        id: crypto.randomUUID(),
      };
      setTransactions([...transactions, transaction]);
    }
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <Wallet size={32} className="text-[#B76E79]" />
            <h1 className="text-3xl font-bold text-[#B76E79]">Expense Tracker</h1>
          </div>
          <p className="text-gray-600 mt-2">Keep track of your income and expenses</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Balance transactions={transactions} />
            <TransactionForm
              onAdd={handleAddTransaction}
              editingTransaction={editingTransaction}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
            <TransactionList
              transactions={transactions}
              onDelete={handleDeleteTransaction}
              onEdit={handleEditTransaction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}