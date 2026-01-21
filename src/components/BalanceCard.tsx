import { useEffect, useState } from "react";
import { getBalance } from '../api/transactions'
import type { Balance } from "../types/types";
import { formatCurrency } from '../utils/formatCurrency'
import ErrorMessage from './ErrorMessage'
import Loader from './Loader'

const INITIAL_BALANCE: Balance = {
    transactionsAmount: {
        current: { income: null, expense: null, balance: null },
        previous: { income: null, expense: null, balance: null }
    },
    change: { income: null, expense: null }
}



export default function BalanceCard() {
    const [balanceData, setBalanceData] = useState(INITIAL_BALANCE)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { current } = balanceData.transactionsAmount
    const { income, expense, balance } = current



    async function fetchBalance() {
        try {
            setIsLoading(true)
            setError(null)
            const balance = await getBalance()
            setBalanceData(balance)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error loading balance")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchBalance()
    }, [])

    if (isLoading) {
        return <Loader description="Loading balance..."></Loader>
    }

    if (error) {
        return <ErrorMessage title={error} onRetry={fetchBalance} />;
    }


    return (
        <div className="flex flex-col sm:flex-row justify-evenly gap-4 text-start">
            <StatCard title="Total incomes" amount={income} change={balanceData.change.income} bgColor="bg-emerald-500" titleColor="text-white"></StatCard>
            <StatCard title="Total expenses" amount={expense} change={balanceData.change.expense} bgColor="bg-rose-500" titleColor="text-white"></StatCard>
            <StatCard title="Balance" amount={balance} change={null} bgColor="bg-white" textColor={balance !== null && balance >= 0 ? 'text-green-600' : 'text-red-600'}></StatCard>
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
        <div className={`${bgColor} p-4 w-full rounded-md ${titleColor} shadow-md`}>
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