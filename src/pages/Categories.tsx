import { useState } from "react"
import ErrorMessage from "../components/ErrorMessage"
import CategoriesTable from "../components/CategoriesTable"

export default function Categories() {
    const [error, setError] = useState(false)

    return (
        <div className="min-h-screen m-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col justify-between items-center gap-4 mb-8 sm:flex-row">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-text bg-gradient-to-r from-blue-marguerite-600 to-purple-600 bg-clip-text text-transparent">
                            Categories
                        </h1>
                        <p className="text-text-muted mt-1">Manage your categories</p>
                    </div>
                    <button aria-label="Create new Caterories" className="text-lg cursor-pointer bg-gradient-to-r from-blue-marguerite-500 to-blue-marguerite-600 hover:from-blue-marguerite-600 hover:to-blue-marguerite-700 text-white  px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                        + New Caterories
                    </button>
                </div>

                {error ? (
                    <ErrorMessage description="Error al carga las categorias" title="Error" onRetry={()=> alert('')}></ErrorMessage>
                ) : 
                    <CategoriesTable></CategoriesTable>
                }
            </div>
        </div>
    )
}