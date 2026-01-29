import ReactECharts from 'echarts-for-react'

export default function ChartCard({ getOption, chartHeight}) {
    return (
        <div
            className={`
                group relative rounded-3xl transition-all duration-300
                bg-gradient-to-br from-white to-slate-50/60
                hover:shadow-2xl hover:-translate-y-1 
            `}
        >
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-transparent" />

            

            {/* Chart */}
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
