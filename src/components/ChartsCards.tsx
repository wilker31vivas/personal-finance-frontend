import ChartCard from './ChartCard'
import { getOptionCategories, getOptionExpensesAndIncome, getOptionTopFiveCategories } from '../utils/optionsCharts'


export default function ChartsCards({ topCategories, isMobile, isTablet, allCategories, dataThree, chartHeight }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <ChartCard getOption={getOptionTopFiveCategories(topCategories, isMobile, isTablet)} chartHeight={chartHeight} />
            <ChartCard getOption={getOptionCategories(allCategories)} chartHeight={chartHeight} />
            <ChartCard getOption={getOptionExpensesAndIncome(dataThree)} chartHeight={chartHeight} />
        </div>
    )
}