import ErrorMessage from '../components/ErrorMessage';
import { FilterByYear, FilterByCategory, FilterByMonth, FilterByType, FilterButton } from '../components/Filters'
import TransactionsTable from '../components/TransactionsTable'
import { useTransactions, INITIAL_FILTERS } from '../context/TransactionsContext';


function FilterSection() {
    const { filters, updateFilter, resetFilters } = useTransactions()

    return (
        <div className="bg-surface rounded-2xl shadow-md p-6 mb-6">
            <div className="flex flex-col md:grid md:grid-cols-5 gap-4 justify-center items-center">

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
        <div className="min-h-screen my-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col justify-between items-center gap-4 mb-8 sm:flex-row">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-text bg-gradient-to-r from-blue-marguerite-600 to-purple-600 bg-clip-text text-transparent">
                            Transactions
                        </h1>
                        <p className="text-text-muted mt-1">Manage your finances</p>
                    </div>
                    <button aria-label="Create new transaction" className="text-lg cursor-pointer bg-gradient-to-r from-blue-marguerite-500 to-blue-marguerite-600 hover:from-blue-marguerite-600 hover:to-blue-marguerite-700 text-white  px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
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