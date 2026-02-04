type EmptyStateProps = {
    onReset?: () => void;
    title: string
    description: string
    titleOnReset?: string
    children?: React.ReactNode
};

function EmptyState({ title, description, onReset, titleOnReset, children }: EmptyStateProps) {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-white to-blue-marguerite-50 border-2 border-dashed border-blue-marguerite-200 rounded-3xl shadow-lg">

            <div className="relative px-8 py-12 text-center">
                {children}
                <h2 className="text-2xl sm:text-3xl font-bold text-text mb-3">
                    {title}
                </h2>
                <p className="text-base text-text-muted max-w-md mx-auto leading-relaxed mb-8">
                    {description}
                </p>

                {onReset && (
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                        <button
                            onClick={onReset}
                            className="cursor-pointer group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-marguerite-500 to-blue-marguerite-600 hover:from-blue-marguerite-600 hover:to-blue-marguerite-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
                        >
                            <span>{titleOnReset}</span>
                        </button>
                    </div>
                )}
            </div>

            <div className="h-1.5 bg-gradient-to-r from-blue-marguerite-400 via-purple-500 to-blue-marguerite-600"></div>
        </div>
    );
}

export default function EmptyStateDemo({ onReset, title, description, titleOnReset, children }: EmptyStateProps) {
    return (
        <div className="p-6 group relative rounded-3xl transition-all duration-300
                bg-gradient-to-br from-white to-slate-50/60
                hover:shadow-2xl hover:-translate-y-1">
            <div className="max-w-3xl mx-auto">
                <EmptyState onReset={onReset} title={title} description={description} titleOnReset={titleOnReset} children={children} />
            </div>
        </div>
    );
}