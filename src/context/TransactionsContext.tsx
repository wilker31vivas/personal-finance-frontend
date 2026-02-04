import { createContext, useState, useEffect, useContext } from "react";
import { getTransactions } from '../api/transactions'
import type { Transaction, Filters, UpdateFilterType } from "../types/types"

type TransactionsContextType = {
    transactions: Transaction[]
    error: string | null
    loading: boolean
    filters: Filters
    updateFilter: UpdateFilterType
    resetFilters: () => void
    setFilters: (value: React.SetStateAction<Filters>) => void
}

export const TransactionsContext = createContext<TransactionsContextType | null>(null)

export const INITIAL_FILTERS: Filters = { month: "", year: "", type: "", category: "" }

export function TransactionsContextProvider({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS)

    const resetFilters = () => {
        setFilters(INITIAL_FILTERS)
    }

    const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
        setFilters(prev => ({ ...prev, [key]: value || "" }))
    }

    useEffect(() => {
        let cancelled = false;

        async function loadData() {
            setLoading(true)
            setError(null)
            try {
                const t = await getTransactions(filters)
                if (!cancelled) setTransactions(t)
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Error loading transactions')
                }
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        loadData()

        return () => {
            cancelled = true;
        };
    }, [filters])

    return (
        <TransactionsContext.Provider value={{
            transactions, error, loading, filters, updateFilter, resetFilters, setFilters
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    TransactionsContext
    const context = useContext(TransactionsContext);
    if (!context) {
        throw new Error("useTransactions must be used within TransactionsContextProvider");
    }
    return context;
}