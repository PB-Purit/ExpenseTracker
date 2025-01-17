import React from 'react';
import { cn } from '../utils/cn';

interface TransactionButtonProps {
  onClick: () => void;
  variant: 'income' | 'expense' | 'edit';
  children: React.ReactNode;
  active?: boolean;
}

export function TransactionButton({ onClick, variant, children, active }: TransactionButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg transition-colors flex items-center gap-2";
  const variantStyles = {
    income: cn(
      "border",
      active
        ? "bg-green-500 hover:bg-green-600 text-white border-green-600"
        : "text-green-600 border-green-500 hover:bg-green-50"
    ),
    expense: cn(
      "border",
      active
        ? "bg-red-500 hover:bg-red-600 text-white border-red-600"
        : "text-red-600 border-red-500 hover:bg-red-50"
    ),
    edit: "bg-blue-500 hover:bg-blue-600 text-white"
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(baseStyles, variantStyles[variant])}
    >
      {children}
    </button>
  );
}