import BalanceCard from '../components/BalanceCard';
import Header from '../components/Header'
import ChartsCards from '../components/ChartsCards'
import { FilterByYear, FilterByMonth } from '../components/FiltersCard'
import { useDashboard, INITIAL_FILTERS } from '../context/DashboardContext';
import ErrorMessage from '../components/ErrorMessage'
import Loader from '../components/Loader';
import type { DashboardFilters } from '../types/types';

type EmptyStateProps = {
    onReset: () => void;
};

type FilterSectionProps = {
    filters: DashboardFilters
    updateFilter: <K extends keyof DashboardFilters>(key: K, value: DashboardFilters[K]) => void
}

function EmptyState({ onReset }: EmptyStateProps) {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-white to-blue-marguerite-50 border-2 border-dashed border-blue-marguerite-200 rounded-3xl shadow-lg">

            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-marguerite-200 rounded-full opacity-20 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-200 rounded-full opacity-20 blur-2xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative px-8 py-12 text-center">

                <h2 className="text-2xl sm:text-3xl font-bold text-text mb-3">
                    No Data Available
                </h2>
                <p className="text-base text-text-muted max-w-md mx-auto leading-relaxed mb-8">
                    We couldn't find any transactions for this period. Try selecting a different month or year to view your financial data.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <button
                        onClick={onReset}
                        className="cursor-pointer group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-marguerite-500 to-blue-marguerite-600 hover:from-blue-marguerite-600 hover:to-blue-marguerite-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
                    >
                        <span>View Current Month</span>
                    </button>
                </div>
            </div>

            <div className="h-1.5 bg-gradient-to-r from-blue-marguerite-400 via-purple-500 to-blue-marguerite-600"></div>
        </div>
    );
}

function EmptyStateDemo({ onReset }: EmptyStateProps) {
    return (
        <div className="p-6 group relative rounded-3xl transition-all duration-300
                bg-gradient-to-br from-white to-slate-50/60
                hover:shadow-2xl hover:-translate-y-1">
            <div className="max-w-3xl mx-auto">
                <EmptyState onReset={onReset} />
            </div>
        </div>
    );
}

function FilterSection({ filters, updateFilter }: FilterSectionProps) {
    return (
        <div className="flex flex-col text-center sm:flex-row sm:justify-between sm:items-center">
            <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-text bg-gradient-to-r from-blue-marguerite-600 to-purple-600 bg-clip-text text-transparent">
                    Dashboard
                </h1>
                <p className="text-sm text-text-muted mt-1">
                    Overview of your financial data
                </p>
            </div>
            <div className="flex gap-3 text-center sm:text-left text-text-muted">
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
    )
}

export default function Dashboard() {
    const { filters, setFilters, updateFilter, error, loading, fetchDashboardData, topCategories, allCategories, balanceData } = useDashboard()

    const hasNoData = !loading && !error && (
        topCategories.length === 0 &&
        allCategories.length === 0 &&
        balanceData?.transactionsAmount?.current?.balance === null
    );

    return (
        <main className="min-h-screen" role="main">
            <Header />
            <div className="mx-auto flex flex-col max-w-7xl px-6 py-4 gap-6  " aria-label="Dashboard content">

                <FilterSection filters={filters} updateFilter={updateFilter} />

                {error ? (
                    <ErrorMessage title={error} onRetry={fetchDashboardData} />
                ) : loading ? (
                    <Loader description="Loading dashboard..." />
                ) : (
                    <>
                        <BalanceCard />
                        {hasNoData ? (
                            <EmptyStateDemo onReset={() => setFilters(INITIAL_FILTERS)} />
                        ) : <ChartsCards />}
                    </>
                )}


            </div>
        </main>
    )
}


