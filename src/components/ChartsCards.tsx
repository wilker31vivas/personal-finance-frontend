import { useState, useEffect } from 'react';
import ChartCard from './ChartCard'
import {getOptionCategories, getOptionExpensesAndIncome, getOptionTopFiveCategories} from '../utils/optionsCharts'

function useWindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
}


export default function ChartsCards() {
    const { width } = useWindowSize();

    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;
    const isDesktop = width >= 1024;

    const chartHeight = isMobile ? 300 : isTablet ? 350 : 400;

    const data = [
        { value: 12500, name: 'Electrónica' },
        { value: 8300, name: 'Ropa' },
        { value: 6200, name: 'Alimentos' },
        { value: 4800, name: 'Hogar' },
        { value: 3200, name: 'Deportes' }
    ];

     const dataTwo = [
        { value: 250, name: 'Electrónica' },
        { value: 300, name: 'Ropa' },
        { value: 200, name: 'Alimentos' },
        { value: 800, name: 'Hogar' },
        { value: 300, name: 'Deportes' }
    ];

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <ChartCard getOption={getOptionTopFiveCategories(data, isMobile, isTablet)} chartHeight={chartHeight}/>
            <ChartCard getOption={getOptionCategories(dataTwo)} chartHeight={chartHeight}/>
            <ChartCard getOption={getOptionExpensesAndIncome(dataThree)} chartHeight={chartHeight}/>
            <ChartCard getOption={getOptionCategories(dataTwo)} chartHeight={chartHeight}/>
        </div>
    )
}