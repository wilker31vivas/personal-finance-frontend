import { createContext, useState, useEffect, useContext } from "react";
import type { DataOptions, DashboardFilters, Balance, Transaction } from '../types/types'
import { getTopCategories, getAllCategories, getBalance, getTransactions } from '../api/transactions'

type DashboardContextType = {
    filters: DashboardFilters
    updateFilter: <K extends keyof DashboardFilters>(
        key: K,
        value: DashboardFilters[K]
    ) => void
    balanceData: Balance
    topCategories: DataOptions[]
    allCategories: DataOptions[]
    isMobile: boolean
    isTablet: boolean
    chartHeight: number
    loading: boolean
    error: string | null
    fetchDashboardData(): Promise<void>
    setFilters: React.Dispatch<React.SetStateAction<DashboardFilters>>
    transactions: DataOptions[]
}

export const DashboardContext = createContext<DashboardContextType | null>(null)

function useWindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
}

const date = new Date();
const currentMonth = date.getMonth() + 1;
const currentYear = date.getFullYear();

export const INITIAL_FILTERS: DashboardFilters = { month: currentMonth.toString(), year: currentYear.toString() }

const INITIAL_CATEGORIES: DataOptions[] = [{ name: "", value: 0 }]

const INITIAL_BALANCE: Balance = {
    transactionsAmount: {
        current: { income: null, expense: null, balance: null },
        previous: { income: null, expense: null, balance: null }
    },
    change: { income: null, expense: null, balance: null }
}

export function DashboardContextProvider({ children }: { children: React.ReactNode }) {
    const { width } = useWindowSize();
    const [topCategories, setTopCategories] = useState<DataOptions[]>(INITIAL_CATEGORIES)
    const [allCategories, setAllCategories] = useState<DataOptions[]>(INITIAL_CATEGORIES)
    const [balanceData, setBalanceData] = useState<Balance>(INITIAL_BALANCE)
    const [transactions, setTransactions] = useState<DataOptions[]>([])

    // const [trans, setTrans] = useState<Transaction[]>([])


    const [filters, setFilters] = useState<DashboardFilters>(INITIAL_FILTERS)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [cancelled, setCancelled] = useState(false)

    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;

    const chartHeight = isMobile ? 300 : isTablet ? 350 : 400;

    const updateFilter = <K extends keyof DashboardFilters>(
        key: K,
        value: DashboardFilters[K]
    ) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value
        }))
    }

    function incomeAndExpenses(arr: Transaction[]) {
        const grouped: Record<string, number> = {}

        arr.forEach(item => {
            const date = new Date(item.date)

            const key = filters.month === ''
                ? `${date.getMonth() + 1}`
                : `${date.getDate()}`

            const value = item.type === "expense"
                ? -item.amount
                : item.amount

            grouped[key] = (grouped[key] || 0) + value
        })

        return Object.entries(grouped).map(([name, value]) => ({
            name,
            value
        }))
    }


    async function fetchDashboardData() {
        setLoading(true);
        setError(null);

        try {
            const [top, all, balance, transactions] = await Promise.all([
                getTopCategories(filters),
                getAllCategories(filters),
                getBalance(filters),
                getTransactions(filters)
            ]);

            if (!cancelled) {
                setTopCategories(top);
                setAllCategories(all);
                setBalanceData(balance);
                setTransactions(incomeAndExpenses(transactions))
            }
        } catch (err) {
            if (!cancelled) {
                setError(err instanceof Error ? err.message : "Error loading dashboard data");
            }
        } finally {
            if (!cancelled) {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        setCancelled(false);
        fetchDashboardData();

        return () => {
            setCancelled(true);
        };
    }, [filters]);

    useEffect(() => {
        console.log(transactions)
        console.log(topCategories)
        console.log(balanceData.transactionsAmount.current.balance)
    }, [transactions,topCategories,  balanceData])


    return (
        <DashboardContext.Provider value={{ filters, setFilters, updateFilter, balanceData, topCategories, isMobile, isTablet, allCategories, chartHeight, error, loading, fetchDashboardData, transactions }}>
            {children}
        </DashboardContext.Provider>
    )
}

export function useDashboard() {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error("useDashboard must be used within DashboardContextProvider");
    }
    return context;
}