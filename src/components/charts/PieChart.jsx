import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

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

//PieChart Top Categories stats/top-categories
export default function PieChart({ data }) {
    const { width } = useWindowSize();

    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;
    const isDesktop = width >= 1024;

    const getOption = () => {
        const baseOption = {
            backgroundColor: 'transparent',
            color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],

            title: {
                text: 'Top 5 categories',
                left: 'center',
                top: isMobile ? 10 : 20,
                textStyle: {
                    fontSize: isMobile ? 16 : isTablet ? 20 : 24,
                    fontWeight: 'bold',
                    color: '#333'
                },
            },

            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)',
                backgroundColor: 'rgba(50,50,50,0.7)',
                borderColor: '#333',                   
                borderWidth: 1,
                textStyle: {
                    color: '#fff',
                    fontSize: isMobile ? 12 : 14
                }
            },

            legend: {
                orient: isMobile ? 'horizontal' : 'vertical',
                left: isMobile ? 'center' : 'left',
                top: isMobile ? 'auto' : 'middle',
                bottom: isMobile ? 10 : 'auto',
                itemGap: isMobile ? 8 : 12, 
                itemWidth: isMobile ? 18 : 20,
                itemHeight: isMobile ? 13 : 14,
                textStyle: {
                    fontSize: isMobile ? 12 : 14,
                    color: '#333'
                },
                padding: isMobile ? 5 : 10,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 5,
                borderColor: '#ddd',
                borderWidth: 1
            },

            series: [
                {
                    name: 'Category:',
                    type: 'pie',
                    radius: '50%',
                    center: isMobile ? ['50%', '45%'] : ['50%', '50%'],

                    data: data,

                    label: {
                        show: !isMobile,
                        position: 'outside',
                        formatter: '{b}\n{d}%',
                        fontSize: isMobile ? 10 : isTablet ? 11 : 13,
                        color: '#333'
                    },

                    labelLine: {
                        show: !isMobile,
                        length: isMobile ? 10 : isTablet ? 15 : 20,
                        length2: isMobile ? 5 : isTablet ? 10 : 15
                    },

                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: isMobile ? 2 : 3,
                        borderRadius: isMobile ? 4 : 8
                    },

                    emphasis: {
                        scaleSize: isMobile ? 5 : 10,
                        itemStyle: {
                            shadowBlur: isMobile ? 10 : 20,
                            shadowColor: 'rgba(0, 0, 0, 0.3)'
                        },
                        label: {
                            show: true,
                            fontSize: isMobile ? 12 : isTablet ? 14 : 16,
                            fontWeight: 'bold'
                        }
                    }
                }
            ]
        };

        return baseOption;
    };

    const chartHeight = isMobile ? 300 : isTablet ? 400 : 450;

    return (
        <div className="w-full mt-4">

            <div className="bg-surface rounded-lg shadow-lg p-3 sm:p-4 md:p-6">
                <ReactECharts
                    option={getOption()}
                    style={{
                        height: chartHeight,
                        width: '100%'
                    }}
                    opts={{ renderer: 'canvas' }}
                    autoResize={true}
                />
            </div>
        </div>
    );
}