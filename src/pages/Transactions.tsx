import { useEffect, useState } from "react"
import { getTransactions } from '../api/transactions'
import type { Transaction, Filters, UpdateFilterType } from "../types/types"
import ErrorMessage from '../components/ErrorMessage';
import { FilterByYear, FilterByCategory, FilterByMonth, FilterByType, FilterButton } from '../components/Filters'
import TransactionsTable from '../components/TransactionsTable'
import Loader from '../components/Loader';


export const INITIAL_FILTERS: Filters = { month: "", year: "", type: "", category: "" }

interface FiltersContainerProps {
    filters: Filters
    updateFilter: UpdateFilterType,
    resetFilters: () => void
}


function FilterSection({ filters, updateFilter, resetFilters }: FiltersContainerProps) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h3 className="text-sm sm:text-xl font-semibold text-slate-700 mb-4 uppercase tracking-wide">filters</h3>
            <div className="flex flex-col md:grid md:grid-cols-5 gap-4 justify-center items-center">

                {/* Years */}
                <FilterByYear filters={filters} updateFilter={updateFilter}></FilterByYear>
                <FilterByMonth filters={filters} updateFilter={updateFilter}></FilterByMonth>
                <FilterByCategory filters={filters} updateFilter={updateFilter}></FilterByCategory>
                <FilterByType filters={filters} updateFilter={updateFilter}></FilterByType>
                <FilterButton resetFilters={resetFilters} />
            </div>
        </div>
    )
}

export default function Transactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    // const [filters, setFilters] = useState<Filters>(() => {
    //     const saved = localStorage.getItem('filters')
    //     return saved ? JSON.parse(saved) : INITIAL_FILTERS
    // })

    const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS)

    const resetFilters = () => {
        setFilters(INITIAL_FILTERS)
        fetchTransactions(INITIAL_FILTERS)
    }

    const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
        setFilters(prev => ({ ...prev, [key]: value || "" }))
    }

    async function fetchTransactions(filters: Filters) {
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
    }, [filters])

    if (error) {
        return <ErrorMessage title={error} onRetry={() => fetchTransactions(filters)} />;
    }

    if (loading) {
        return <Loader description="Loading transacctions..."></Loader>
    }

    // useEffect(() => {
    //     localStorage.setItem("filters", JSON.stringify(filters));
    // }, [filters])


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
                <FilterSection filters={filters} updateFilter={updateFilter} resetFilters={resetFilters} ></FilterSection>

                {/* Transactions Table */}
                <TransactionsTable loading={loading} transactions={transactions} setFilters={setFilters} fetchTransactions={fetchTransactions}></TransactionsTable>
            </div>
        </div>

    )
}