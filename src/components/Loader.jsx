export default function Loader({description}) {
    return (
        <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500">{description}</p>
        </div>
    )
}