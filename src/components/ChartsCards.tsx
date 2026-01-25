import { useState, useEffect } from 'react';
import ChartCard from './ChartCard'
import type { DataOptions, CategoriesFilters } from '../types/types'
import { getOptionCategories, getOptionExpensesAndIncome, getOptionTopFiveCategories } from '../utils/optionsCharts'
import { getTopCategories, getAllCategories, getTransactions } from '../api/transactions'
import { FilterByYear, FilterByMonth } from './FiltersCard'

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

export default function ChartsCards() {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <FilterByMonth filters={filters} updateFilter={updateFilter}></FilterByMonth>
            <FilterByYear filters={filters} updateFilter={updateFilter}></FilterByYear>
            <ChartCard getOption={getOptionTopFiveCategories(topCategories, isMobile, isTablet)} chartHeight={chartHeight} />
            <ChartCard getOption={getOptionCategories(allCategories)} chartHeight={chartHeight} />
            <ChartCard getOption={getOptionExpensesAndIncome(dataThree)} chartHeight={chartHeight} />
        </div>
    )
}