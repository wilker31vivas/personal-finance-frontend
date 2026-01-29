import type { DashboardFilters } from "../types/types"
import { getYears } from '../api/transactions'
import { useEffect, useState } from "react"

interface FiltersContainerProps {
    filters: filters
    updateFilter: updateFilter
    categories: string[]
    resetFilters: () => void
}

type filters = DashboardFilters
type updateFilter = <K extends keyof DashboardFilters>(key: K, value: DashboardFilters[K]) => void

interface FiltersCardProps {
    filters: filters
    updateFilter: updateFilter
}

export function FiltersCard({ filters, updateFilter, categories, resetFilters }: FiltersContainerProps) {

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h3 className="text-sm sm:text-xl font-semibold text-slate-700 mb-4 uppercase tracking-wide">filters</h3>
            <div className="flex flex-col md:grid md:grid-cols-5 gap-4 justify-center items-center">

                {/* Years */}
                <FilterByYear filters={filters} updateFilter={updateFilter}></FilterByYear>
                <FilterByMonth filters={filters} updateFilter={updateFilter}></FilterByMonth>

                <div className="w-full">
                    <label htmlFor='categories' className="block text-sm font-medium text-slate-700 mb-2">Categories</label>
                    <select id="categories" name="categories" value={filters.category || ''} onChange={e => updateFilter('category', e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-slate-50 hover:bg-white cursor-pointer">
                        <option value="">All categories</option>
                        {categories.map((item, index) => (
                            <option value={item} key={index}>{item}</option>
                        ))}
                    </select>
                </div>

                <div className="w-full">
                    <label htmlFor='types' className="block text-sm font-medium text-slate-700 mb-2">Types</label>
                    <select id="types" name="types" value={filters.type || ''} onChange={e => updateFilter('type', e.target.value as 'income' | 'expense' | "")} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-slate-50 hover:bg-white cursor-pointer">
                        <option value="">All</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                <button
                    onClick={() => {
                        resetFilters()
                    }}
                    className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                >
                    Clean filters
                </button>
            </div>
        </div>
    )
}

export function FilterByYear({ filters, updateFilter }: FiltersCardProps) {
    const [allYears, setAllYears] = useState<number[]>([])

    async function loadYears() {
        try {
            const y = await getYears()
            setAllYears(y)
        } catch (err) {
            console.error('Error loading years:', err)
        }
    }

    useEffect(() => {
        loadYears()
    }, [])

    return (
        <div className="w-full flex flex-col gap-2">
            <label
                className="text-sm font-semibold items-center gap-2"
            >
                Year
            </label>
            <div className="relative w-full">
                <select
                    id="years"
                    name="years"
                    value={filters.year || ''}
                    onChange={e => updateFilter('year', e.target.value)}
                    // disabled={isLoading}
                    className="w-full appearance-none px-4 py-3 pr-10 bg-white border-2 border-gray-200 rounded-xl font-medium text-text shadow-sm hover:shadow-md hover:border-blue-marguerite-300 focus:border-blue-marguerite-500 focus:ring-4 focus:ring-blue-marguerite-100 transition-all duration-300 outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <option value="">All years</option>
                    {allYears.map((item) => (
                        <option value={item} key={item}>{item}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export function FilterByMonth({ filters, updateFilter }: FiltersCardProps) {
    const months = [
        { value: "1", label: "January" },
        { value: "2", label: "February" },
        { value: "3", label: "March" },
        { value: "4", label: "April" },
        { value: "5", label: "May" },
        { value: "6", label: "June" },
        { value: "7", label: "July" },
        { value: "8", label: "August" },
        { value: "9", label: "September" },
        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" }
    ];

    return (
        <div className="w-full flex flex-col gap-2">
            <label
                htmlFor="month"
                className="text-sm font-semibold items-center gap-2"
            >
                Month
            </label>
            <div className="relative w-full">
                <select
                    id="month"
                    name="month"
                    value={filters.month || ''}
                    onChange={e => updateFilter('month', e.target.value)}
                    className="w-full px-4 py-3 pr-10 bg-white border-2 border-gray-200 rounded-xl font-medium text-text shadow-sm hover:shadow-md hover:border-blue-marguerite-300 focus:border-blue-marguerite-500 focus:ring-4 focus:ring-blue-marguerite-100 transition-all duration-300 outline-none cursor-pointer appearance-none"
                >
                    <option value="">All months</option>
                    {months.map((month) => (
                        <option value={month.value} key={month.value}>
                            {month.label}
                        </option>
                    ))}
                </select>

                {/* Flecha personalizada */}
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

        </div>
    );
}