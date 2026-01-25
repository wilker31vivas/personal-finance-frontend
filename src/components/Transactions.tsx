import { useEffect, useState } from "react"
import { getTransactions, getYears, getCategories } from '../api/transactions'
import type { Transaction, TransactionFilters } from "../types/types"
import { formatCurrency } from '../utils/formatCurrency'
import ErrorMessage from './ErrorMessage';
import { FiltersCard } from './FiltersCard'
import TransactionsTable from './TransactionsTable'


export const INITIAL_FILTERS: TransactionFilters = { month: "", year: "", type: "", category: "" }

export default function Transactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<string[]>([])
    const [filters, setFilters] = useState<TransactionFilters>(() => {
        const saved = localStorage.getItem('filters')
        return saved ? JSON.parse(saved) : INITIAL_FILTERS
    })

    const resetFilters = () => {
        setFilters(INITIAL_FILTERS)
        fetchTransactions(INITIAL_FILTERS)
    }

    const updateFilter = <K extends keyof TransactionFilters>(
        key: K,
        value: TransactionFilters[K]
    ) => {
        const newFilters = { ...filters, [key]: value || "" }
        setFilters(newFilters)
        fetchTransactions(newFilters)
    }

    async function loadCategories() {
        try {
            const res = await getCategories()
            const c = res.map((item) => item.name.charAt(0).toUpperCase() + item.name.slice(1))
            setCategories(c)
        } catch (err) {
            console.error('Error loading categories:', err)
        }
    }

    async function fetchTransactions(filters: TransactionFilters) {
        setLoading(true)
        setError(null)
        try {
            const t = await getTransactions(filters)
            setTransactions(t)
        } catch (err) {
            console.error(err)
            setError(err instanceof Error ? err.message : 'Error loading transactions')
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTransactions(filters)
        loadCategories()
    }, [])

    if (error) {
        return <ErrorMessage title={error} onRetry={() => fetchTransactions(filters)} />;
    }

    useEffect(() => {
        localStorage.setItem("filters", JSON.stringify(filters));
    }, [filters])


    return (
        <div className="min-h-screen mt-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-xl sm:text-3xl font-bold text-slate-800">Transactions</h1>
                        <p className="text-slate-500 mt-1">Manage your finances</p>
                    </div>
                    <button className="text-sm cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                        + New Transaction
                    </button>
                </div>

                {/* Filters Card */}
                <FiltersCard filters={filters} updateFilter={updateFilter} categories={categories} resetFilters={resetFilters} ></FiltersCard>

                {/* Transactions Table */}
                <TransactionsTable loading={loading} transactions={transactions} setFilters={setFilters} fetchTransactions={fetchTransactions}></TransactionsTable>
            </div>
        </div>

    )
}