import ErrorMessage from '../components/ErrorMessage';
import { FilterByYear, FilterByCategory, FilterByMonth, FilterByType, FilterButton } from '../components/Filters'
import TransactionsTable from '../components/TransactionsTable'
import { useTransactions, INITIAL_FILTERS } from '../context/TransactionsContext';


function FilterSection() {
    const { filters, updateFilter, resetFilters } = useTransactions()

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
    const { error, setFilters } = useTransactions()

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
                <FilterSection />

                {error ? (
                    <ErrorMessage title={error} onRetry={() =>
                        setFilters(INITIAL_FILTERS)
                    } />
                ) : (
                    <TransactionsTable />
                )}
            </div>
        </div>

    )
}