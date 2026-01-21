import type { TransactionFilters } from "../types/types"


interface FiltersCardProps {
    allYears: number[]
    filters: TransactionFilters
    updateFilter: <K extends keyof TransactionFilters>(key: K, value: TransactionFilters[K]) => void
    categories: string[]
    resetFilters: () => void
}

export default function FiltersCard({ allYears, filters, updateFilter, categories, resetFilters }: FiltersCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h3 className="text-sm sm:text-xl font-semibold text-slate-700 mb-4 uppercase tracking-wide">filters</h3>
            <div className="flex flex-col md:grid md:grid-cols-5 gap-4 justify-center items-center">

                {/* Years */}
                <div className="w-full">
                    <label htmlFor='years' className="block text-sm font-medium text-slate-700 mb-2">Years</label>
                    <select id="years" name="years" value={filters.year || ''} onChange={e => updateFilter('year', e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-slate-50 hover:bg-white cursor-pointer">
                        <option value="">All years</option>
                        {allYears.map((item) => (
                            <option value={item} key={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <div className="w-full">
                    <label htmlFor='month' className="block text-sm font-medium text-slate-700 mb-2">Month</label>
                    <select id="month" name="month" value={filters.month || ''} onChange={e => updateFilter('month', e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-slate-50 hover:bg-white cursor-pointer">
                        <option value="">All months</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>

                    </select>
                </div>

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