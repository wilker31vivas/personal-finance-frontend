import { getOptionCategories, getOptionExpensesAndIncome, getOptionTopFiveCategories } from '../utils/optionsCharts'
import { useDashboard } from '../context/DashboardContext'
import ReactECharts from 'echarts-for-react'
import EmptyStateDemo from './EmptyState'

export default function ChartsCards() {
    const { balanceData, topCategories, isMobile, isTablet, allCategories, chartHeight, transactions } = useDashboard()

    const totalIncome = balanceData?.transactionsAmount?.current?.income ?? 0
    const totalExpenses = balanceData?.transactionsAmount?.current?.expense ?? 0

    return (
        <div className="space-y-6">
            <ChartCard getOption={getOptionExpensesAndIncome(transactions)} chartHeight={chartHeight} />

            {totalExpenses === 0 && totalIncome > 0 ? (
                <EmptyStateDemo title='No expenses recorded' description='Your transactions this period were all income. When you record an expense, you will see here which categories you are spending the most in.' />
            ) :
                <div className='grid md:grid-cols-2 gap-6'>
                    <ChartCard getOption={getOptionTopFiveCategories(topCategories, isMobile, isTablet)} chartHeight={chartHeight} />
                    <ChartCard getOption={getOptionCategories(allCategories)} chartHeight={chartHeight} />
                </div>
            }
        </div>
    )
}

export function ChartCard({ getOption, chartHeight }) {
    return (
        <div
            className={`
                group relative rounded-3xl transition-all duration-300
                bg-gradient-to-br from-white to-slate-50/60
                hover:shadow-2xl hover:-translate-y-1 
            `}
        >
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-transparent" />

            <div className="p-4 ">
                <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-3border-slate-100 border-2 border-dashed border-blue-marguerite-200 " >
                    <ReactECharts
                        option={getOption}
                        style={{
                            height: chartHeight,
                            width: '100%',
                            minHeight: '280px'
                        }}
                        autoResize
                        notMerge
                        lazyUpdate
                    />
                </div>
            </div>
        </div>
    )
}
