import { useState } from "react"
import Loader from "./Loader"
import { getCategories } from "../api/transactions";
import type { Category } from "../types/types";
import EmptyState from "./EmptyState";

export default function CategoriesTable() {
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])

    async function fetchCategoriesdData() {
        setLoading(true);

        try {
            const c = await getCategories();
            setCategories(c)
        } catch (err) {
            // setError(err instanceof Error ? err.message : "Error loading dashboard data");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
                <table className="w-full text-left" aria-label="Categories table">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-marguerite-50 to-purple-50 border-b-2 border-blue-marguerite-200">
                            <th className="px-6 py-4 text-xs font-bold text-blue-marguerite-700 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-blue-marguerite-700 uppercase tracking-wider text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan={2} className="py-8">
                                    <Loader description="Loading categories..." />
                                </td>
                            </tr>
                        ) : categories.length === 0 ? (
                            <tr>
                                <td colSpan={2} className="p-6">
                                    <EmptyState
                                        title="No categories found"
                                        description="We couldn't find any categories with the applied filters. Try adjusting your search or clear the filters."
                                        onReset={fetchCategoriesdData}
                                        titleOnReset="Clear Filters"
                                    />
                                </td>
                            </tr>
                        ) : (
                            categories.map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-blue-marguerite-50/50 transition-all duration-200 group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {/* Category indicator */}
                                            <div className="w-2 h-2 rounded-full bg-blue-marguerite-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <span className="text-sm font-semibold text-text group-hover:text-blue-marguerite-700 transition-colors">
                                                {item.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2 justify-end">
                                            {/* Edit button */}
                                            <button
                                                className="group/btn flex items-center gap-2 px-4 py-2 bg-blue-marguerite-100 hover:bg-blue-marguerite-500 text-blue-marguerite-700 hover:text-white rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
                                                aria-label={`Edit ${item.name}`}
                                            >
                                                <span className="">Edit</span>
                                            </button>

                                            {/* Delete button */}
                                            <button
                                                className="group/btn flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-500 text-red-700 hover:text-white rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
                                                aria-label={`Delete ${item.name}`}
                                            >
                                                <span >Delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}