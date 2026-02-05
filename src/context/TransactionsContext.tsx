import { createContext, useState, useEffect, useContext } from "react";
import { getTransactions } from '../api/transactions'
import type { Transaction, Filters, UpdateFilterType } from "../types/types"

type TransactionsContextType = {
    transactionPages: Transaction[][]
    error: string | null
    loading: boolean
    filters: Filters
    updateFilter: UpdateFilterType
    resetFilters: () => void
    setFilters: (value: React.SetStateAction<Filters>) => void
    pageCurrent: number
    setPageCurrent: React.Dispatch<React.SetStateAction<number>>
}

export const TransactionsContext = createContext<TransactionsContextType | null>(null)

export const INITIAL_FILTERS: Filters = { month: "", year: "", type: "", category: "" }

export function TransactionsContextProvider({ children }: { children: React.ReactNode }) {
    const [transactionPages, setTransactionsPages] = useState<Transaction[][]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS)
    const [pageCurrent, setPageCurrent] = useState(0)

    const resetFilters = () => {
        setFilters(INITIAL_FILTERS)
    }

    const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
        setFilters(prev => ({ ...prev, [key]: value || "" }))
        setPageCurrent(0)
    }

    function chunkArray(array: Transaction[], size: number) {
        const result = [];

        for (let i = 0; i < array.length; i += size) {
            const chunk = array.slice(i, i + size);
            result.push(chunk);
        }

        return result;
    }

    useEffect(() => {
        let cancelled = false;

        async function loadData() {
            setLoading(true)
            setError(null)
            try {
                const t = await getTransactions(filters)
                if (!cancelled) {
                    const tPages = chunkArray(t, 5)
                    setTransactionsPages(tPages);
                }
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
            transactionPages, error, loading, filters, updateFilter, resetFilters, setFilters, pageCurrent, setPageCurrent
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