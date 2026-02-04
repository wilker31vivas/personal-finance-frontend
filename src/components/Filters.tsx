import type { Filters, UpdateFilterType } from "../types/types"
import { getYears, getCategories } from '../api/transactions'
import { useEffect, useState } from "react"

type ButtonProps = {
    resetFilters: () => void
}

interface FiltersCardProps {
    filters: Filters
    updateFilter: UpdateFilterType
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
                className="text-sm text-text-muted uppercase font-semibold items-center gap-2"
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
                className="text-sm text-text-muted uppercase font-semibold items-center gap-2"
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

export function FilterByCategory({ filters, updateFilter }: FiltersCardProps) {
    const [categories, setCategories] = useState<string[]>([])

    async function loadCategories() {
        try {
            const res = await getCategories()
            const c = res.map((item) => item.name)
            setCategories(c)
        } catch (err) {
            console.error('Error loading categories:', err)
        }
    }

    useEffect(() => {
        loadCategories()
    }, [])


    return (
        <div className="w-full flex flex-col gap-2">
            <label htmlFor='categories' className="text-sm text-text-muted uppercase font-semibold items-center gap-2">Categories</label>
            <div className="relative w-full">
                <select
                    id="categories"
                    name="categories"
                    value={filters.category || ''}
                    onChange={e => updateFilter('category', e.target.value)}
                    className="w-full appearance-none px-4 py-3 pr-10 bg-white border-2 border-gray-200 rounded-xl font-medium text-text shadow-sm hover:shadow-md hover:border-blue-marguerite-300 focus:border-blue-marguerite-500 focus:ring-4 focus:ring-blue-marguerite-100 transition-all duration-300 outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <option value="">All years</option>
                    <option value="">All categories</option>
                    {categories.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
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
    )
}

export function FilterByType({ filters, updateFilter }: FiltersCardProps) {
    return (
        <div className="w-full flex flex-col gap-2">
            <label htmlFor='types' className="text-sm text-text-muted uppercase font-semibold items-center gap-2">Types</label>
            <div className="relative w-full">
                <select
                    id="types"
                    name="types"
                    value={filters.type || ''} onChange={e => updateFilter('type', e.target.value as 'income' | 'expense' | "")}
                    className="w-full appearance-none px-4 py-3 pr-10 bg-white border-2 border-gray-200 rounded-xl font-medium text-text shadow-sm hover:shadow-md hover:border-blue-marguerite-300 focus:border-blue-marguerite-500 focus:ring-4 focus:ring-blue-marguerite-100 transition-all duration-300 outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <option value="">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
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
    )
}

export const FilterButton = ({ resetFilters }: ButtonProps) => (
    <button
        onClick={resetFilters}
        className="cursor-pointer text-blue-marguerite-600 hover:text-blue-marguerite-700 font-medium"
    >
        Reset filters
    </button>
);
