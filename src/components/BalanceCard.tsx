import { useEffect, useState, useContext } from "react";
import { getBalance } from '../api/transactions'
import type { Balance, DashboardFilters } from "../types/types";
import { formatCurrency } from '../utils/formatCurrency'
import { DashboardContext } from '../context/DashboardContext';


export default function BalanceCard() {
    const { balanceData } = useContext(DashboardContext)

    const { current } = balanceData.transactionsAmount
    const { income, expense, balance } = current

    return (
        <div className="flex flex-col sm:flex-row justify-evenly gap-4 text-start">
            <StatCard title="Total incomes" amount={income} change={balanceData.change.income} bgColor="bg-sucess" titleColor="text-surface"></StatCard>
            <StatCard title="Total expenses" amount={expense} change={balanceData.change.expense} bgColor="bg-danger" titleColor="text-surface"></StatCard>
            <StatCard title="Balance" amount={balance} change={balanceData.change.balance} bgColor="bg-white" textColor={balance !== null && balance >= 0 ? 'text-sucess' : 'text-danger'}></StatCard>
        </div>
    )
}

interface BalanceCardItemProps {
    title: string;
    amount: number | null;
    bgColor: string;
    change: number | null;
    textColor?: string;
    titleColor?: string
}

function StatCard({ title, amount, change, bgColor, textColor, titleColor }: BalanceCardItemProps) {
    return (
        <div className={`${bgColor} p-4 w-full ${titleColor} shadow-md`}>
            <h2 className="text-sm font-medium mb-1">{title}</h2>
            <p className={`text-xl sm:text-2xl font-bold ${textColor}`}>
                {formatCurrency(amount)}
            </p>
            {change !== null && change !== 0 && (
                <p className={`text-sm font-medium `}>
                    {change > 0 ? '▲' : '▼'} {Math.abs(change)}% compared to previous month
                </p>
            )}
        </div>
    )
}