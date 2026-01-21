import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

//Line Chart Expenses and income by month
export default function Line() {
    const getOption = () => {
        const baseOption = {
            title: {
                text: 'Expenses and income by Month'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [820, -932, 901, -934, 1290, 1330, 1320],
                    type: 'line',
                    areaStyle: {}
                }
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