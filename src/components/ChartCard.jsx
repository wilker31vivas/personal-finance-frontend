import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

export default function ChartCard({ getOption, chartHeight }) {
    return (
        <div className="group relative bg-surface shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative p-6">
                <ReactECharts
                    option={getOption}
                    style={{
                        height: chartHeight,
                        width: '100%',
                        minHeight: '300px'
                    }}
                    autoResize={true}
                    notMerge={true}
                    lazyUpdate={true}
                />
            </div>

            <div className={`h-1 bg-gradient-to-r from-blue-marguerite-500 to-purple-600`}></div>
        </div>
    )
}