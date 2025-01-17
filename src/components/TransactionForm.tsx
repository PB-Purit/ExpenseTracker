import React, { useState, useEffect } from 'react';
import { PlusCircle, X } from 'lucide-react';
import type { Transaction } from '../types/Transaction';
import { TransactionButton } from './TransactionButton';

interface TransactionFormProps {
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
  editingTransaction: Transaction | null;
  onCancelEdit: () => void;
}

export function TransactionForm({ onAdd, editingTransaction, onCancelEdit }: TransactionFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  useEffect(() => {
    if (editingTransaction) {
      setDescription(editingTransaction.description);
      setAmount(editingTransaction.amount.toString());
      setType(editingTransaction.type);
    }
  }, [editingTransaction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      description,
      amount: parseFloat(amount),
      type,
      date: editingTransaction?.date || new Date().toISOString(),
    });

    resetForm();
  };

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setType('expense');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">
          {editingTransaction ? 'Edit Transaction' : 'New Transaction'}
        </h3>
        {editingTransaction && (
          <button
            type="button"
            onClick={() => {
              onCancelEdit();
              resetForm();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        )}
      </div>
      <div className="space-y-3">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B76E79]"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B76E79]"
        />
        <div className="flex gap-2">
          <TransactionButton
            variant="expense"
            onClick={() => setType('expense')}
            active={type === 'expense'}
          >
            Expense
          </TransactionButton>
          <TransactionButton
            variant="income"
            onClick={() => setType('income')}
            active={type === 'income'}
          >
            Income
          </TransactionButton>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-[#B76E79] text-white px-4 py-2 rounded-lg hover:bg-[#a25c66] transition-colors flex items-center justify-center gap-2"
      >
        <PlusCircle size={20} />
        <span>{editingTransaction ? 'Update' : 'Add'} Transaction</span>
      </button>
    </form>
  );
}