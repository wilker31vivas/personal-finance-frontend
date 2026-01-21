import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

//Bar chart Expenses by categories stats/by-category
export default function Bar() {
    const getOption = () => {
        const baseOption = {
            title: {
                text: 'Categories:'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {},
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['Hearth', 'Home', 'Food', 'Entertainment', 'Transport']
            },
            series: [
                {
                    name: 'Total',
                    type: 'bar',
                    data: [325, 78, 52, 124, 242, 200]
                },

            ]
        };

        return baseOption;
    };

    return (
        <div className="w-full mt-4">

            <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6">
                <ReactECharts
                    option={getOption()}
                    style={{
                        height: '100%',      
                        width: '100%',      
                        minHeight: '300px'  
                    }}
                    autoResize={true}  
                    notMerge={true}       
                    lazyUpdate={true}
                />
            </div>
        </div>
    )
}