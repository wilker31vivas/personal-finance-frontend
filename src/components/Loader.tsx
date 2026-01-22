export default function Loader({description} : { description: string }) {
    return (
        <div className="flex items-center justify-center p-8">
        <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-marguerite-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-muted">{description}</p>
        </div>
    </div>
    )
}