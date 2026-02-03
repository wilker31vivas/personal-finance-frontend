import BalanceCard from '../components/BalanceCard';
import Header from '../components/Header'
import ChartsCards from '../components/ChartsCards'
import { FilterByYear, FilterByMonth } from '../components/Filters'
import { useDashboard, INITIAL_FILTERS } from '../context/DashboardContext';
import ErrorMessage from '../components/ErrorMessage'
import Loader from '../components/Loader';
import type { Filters } from '../types/types';
import EmptyStateDemo from '../components/EmptyState';

type FilterSectionProps = {
    filters: Filters
    updateFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void
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
    const { filters, setFilters, updateFilter, error, loading, fetchDashboardData, balanceData } = useDashboard()

    const totalIncome = balanceData?.transactionsAmount?.current?.income ?? 0
    const totalExpenses = balanceData?.transactionsAmount?.current?.expense ?? 0
    const noMovements = totalIncome === 0 && totalExpenses === 0;

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
                        {noMovements ? (
                            <EmptyStateDemo onReset={() => setFilters(INITIAL_FILTERS)} title='No Data Available' description='There are no recorded movements during this period. Try selecting a different month or year to view your financial data.' />
                        ) : <ChartsCards />}
                    </>
                )}


            </div>
        </main>
    )
}


