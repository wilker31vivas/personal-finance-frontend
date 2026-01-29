import ChartCard from './ChartCard'
import { getOptionCategories, getOptionExpensesAndIncome, getOptionTopFiveCategories } from '../utils/optionsCharts'
import { useDashboard } from '../context/DashboardContext'

export default function ChartsCards() {
    const { topCategories, isMobile, isTablet, allCategories, chartHeight } = useDashboard()

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
        <div className="space-y-6">
            <ChartCard getOption={getOptionTopFiveCategories(topCategories, isMobile, isTablet)} chartHeight={chartHeight} />

            <div className='grid md:grid-cols-2 gap-6'>
                <ChartCard getOption={getOptionCategories(allCategories)} chartHeight={chartHeight}/>
                <ChartCard getOption={getOptionExpensesAndIncome(dataThree)} chartHeight={chartHeight}/>
            </div>
        </div>
    )
}
