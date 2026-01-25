import BalanceCard from '../components/BalanceCard';
import Header from '../components/Header'
import ChartsCards from '../components/ChartsCards'
import { useState, useEffect } from 'react';
import type { DataOptions, CategoriesFilters } from '../types/types'
import { getTopCategories, getAllCategories, getTransactions } from '../api/transactions'
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

export const INITIAL_FILTERS = { month: "", year: "" }

const INITIAL_VALUE: DataOptions[] = [{ name: "", value: 0 }]

export default function Dashboard() {
    const { width } = useWindowSize();
    const [topCategories, setTopCategories] = useState<DataOptions[]>(INITIAL_VALUE)
    const [allCategories, setAllCategories] = useState<DataOptions[]>(INITIAL_VALUE)
    const [filters, setFilters] = useState(INITIAL_FILTERS)

    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;

    const chartHeight = isMobile ? 300 : isTablet ? 350 : 400;

    const updateFilter = <K extends keyof CategoriesFilters>(
        key: K,
        value: CategoriesFilters[K]
    ) => {
        const newFilters = { ...filters, [key]: value || "" }
        setFilters(prevFilters => {
            const newFilters = { ...prevFilters, [key]: value || "" }
            return newFilters
        })
    }

    async function fetchTopCategories(filters: CategoriesFilters) {
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

    async function fetchAllCategories(filters: CategoriesFilters) {
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

    useEffect(() => {
        fetchTopCategories(filters)
        fetchAllCategories(filters)
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
        <div>
            <Header></Header>
            <div>
                <h1 className='text-2xl font-bold'>Dashboard</h1>
                <div className='flex gap-2.5'>
                    <FilterByMonth filters={filters} updateFilter={updateFilter}></FilterByMonth>
                    <FilterByYear filters={filters} updateFilter={updateFilter}></FilterByYear>
                </div>
            </div>
            <BalanceCard></BalanceCard>
            <ChartsCards topCategories={topCategories} isMobile={isMobile} isTablet={isTablet} allCategories={allCategories} dataThree={dataThree} chartHeight={chartHeight}></ChartsCards>
        </div>
    )
}