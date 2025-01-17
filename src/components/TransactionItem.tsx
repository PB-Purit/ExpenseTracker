import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Transaction } from '../types/Transaction';
import { formatDate } from '../utils/dateUtils';
import { cn } from '../utils/cn';

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export function TransactionItem({ transaction, onEdit, onDelete }: TransactionItemProps) {
  const { type, amount, description, date, id } = transaction;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-800">{description}</h3>
          <p className={cn(
            "text-lg font-semibold",
            type === 'income' ? 'text-green-600' : 'text-red-600'
          )}>
            {type === 'income' ? '+' : '-'}${Math.abs(amount).toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">{formatDate(date)}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(transaction)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Pencil size={20} />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}