import BalanceCard from '../components/BalanceCard';
import Header from '../components/Header'
import ChartsCards from '../components/ChartsCards'
import { useState, useEffect } from 'react';
import type { DataOptions, DashboardFilters, Balance } from '../types/types'
import { getTopCategories, getAllCategories, getTransactions, getBalance } from '../api/transactions'
import { FilterByYear, FilterByMonth } from '../components/FiltersCard'

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

export const INITIAL_FILTERS: DashboardFilters = { month: "1", year: "2026" }

const INITIAL_VALUE: DataOptions[] = [{ name: "", value: 0 }]

const INITIAL_BALANCE: Balance = {
    transactionsAmount: {
        current: { income: null, expense: null, balance: null },
        previous: { income: null, expense: null, balance: null }
    },
    change: { income: null, expense: null, balance: null }
}

export default function Dashboard() {
    const { width } = useWindowSize();
    const [topCategories, setTopCategories] = useState<DataOptions[]>(INITIAL_VALUE)
    const [allCategories, setAllCategories] = useState<DataOptions[]>(INITIAL_VALUE)
    const [balanceData, setBalanceData] = useState(INITIAL_BALANCE)
    const [filters, setFilters] = useState<DashboardFilters>(INITIAL_FILTERS)

    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;

    const chartHeight = isMobile ? 300 : isTablet ? 350 : 400;

    const updateFilter = <K extends keyof DashboardFilters>(
        key: K,
        value: DashboardFilters[K]
    ) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value || ""
        }))
    }

    async function fetchTopCategories(filters: DashboardFilters) {
        // setLoading(true)
        // setError(null)
        try {
            const c = await getTopCategories(filters)
            setTopCategories(c)
        } catch (err) {
            console.error(err)
            // setError(err instanceof Error ? err.message : 'Error loading transactions')
        }
        finally {
            ;// setLoading(false)
        }
    }

    async function fetchAllCategories(filters: DashboardFilters) {
        // setLoading(true)
        // setError(null)
        try {
            const c = await getAllCategories(filters)
            setAllCategories(c)
        } catch (err) {
            console.error(err)
            // setError(err instanceof Error ? err.message : 'Error loading transactions')
        }
        finally {
            ;// setLoading(false)
        }
    }

    async function fetchBalance(filters: DashboardFilters) {
        try {
            // setIsLoading(true)
            // setError(null)
            const balance = await getBalance(filters)
            setBalanceData(balance)
        } catch (err) {
            // setError(err instanceof Error ? err.message : "Error loading balance")
        } finally {
            // setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTopCategories(filters)
        fetchAllCategories(filters)
        fetchBalance(filters)
    }, [filters])

    const dataThree = [
        { value: 250, name: 'Mon' },
        { value: 300, name: 'Tue' },
        { value: -200, name: 'Wed' },
        { value: 400, name: 'Thu' },
        { value: -300, name: 'Fri' },
        { value: 300, name: 'Sat' },
        { value: 300, name: 'Sun' }
    ];

    return (
        <div className="min-h-screen">
            <Header />
            <div className="mx-auto grid grid-cols-1 gap-4 sm:gap-6 mt-6">
                {/* Header Section */}
                <div className="flex flex-col sm:justify-between sm:items-center sm:flex-wrap">
                    <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4 text-center sm:text-right">
                        Dashboard
                    </h1>
                    <div className="flex gap-3 text-center sm:text-right">
                        <FilterByMonth
                            filters={filters}
                            updateFilter={updateFilter}
                        />
                        <FilterByYear
                            filters={filters}
                            updateFilter={updateFilter}
                        />
                    </div>
                </div>
                <BalanceCard balanceData={balanceData} />
                <ChartsCards
                    topCategories={topCategories}
                    isMobile={isMobile}
                    isTablet={isTablet}
                    allCategories={allCategories}
                    dataThree={dataThree}
                    chartHeight={chartHeight}
                />
            </div>
        </div>
    )
}