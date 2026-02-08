import Loader from "./Loader"
import EmptyState from "./EmptyState";
import type { Category } from "../types/types";
import { useState } from "react";

type CategoriesTableProps = {
    loading: boolean
    categories: Category[]
    fetchCategoriesdData: () => Promise<void>
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

export default function CategoriesTable({ loading, categories, fetchCategoriesdData, setCategories }: CategoriesTableProps) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingName, setEditingName] = useState('');

    const handleStartEdit = (category: Category) => {
        setEditingId(category.id);
        setEditingName(category.name);
    };

    const handleSaveEdit = async (categoryId: number) => {
        try {

            //Hacer fetch PUT categories ...

            // Guardar temporalmente la categoria
            setCategories((prev) =>
                prev.map((category) =>
                    category.id === categoryId
                        ? { ...category, name: editingName }
                        : category
                )
            );

            setEditingId(null);
            setEditingName('');
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditingName('');
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
                <table className="w-full text-left" aria-label="Categories table">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-marguerite-50 to-purple-50 border-b-2 border-blue-marguerite-200">
                            <th className="px-6 py-4 text-xs font-bold text-blue-marguerite-700 uppercase tracking-wider">
                                Category Name
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
                                        title="No categories yet"
                                        description="Start by creating your first category to organize your transactions."
                                        onReset={fetchCategoriesdData}
                                        titleOnReset="Create Category"
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
                                            <div className="w-2.5 h-2.5 rounded-full bg-blue-marguerite-600 opacity-70 group-hover:opacity-100 transition" />
                                            {editingId === item.id ? (
                                                <input
                                                    type="text"
                                                    value={editingName}
                                                    onChange={(e) => setEditingName(e.target.value)}
                                                    onBlur={() => handleSaveEdit(item.id)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') handleSaveEdit(item.id);
                                                        if (e.key === 'Escape') handleCancelEdit();
                                                    }}
                                                    autoFocus
                                                    className="text-sm font-semibold text-gray-800 border-2 border-blue-marguerite-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-marguerite-300"
                                                />
                                            ) : (
                                                <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-marguerite-700 transition-colors duration-200">
                                                    {item.name}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2 justify-end items-center">
                                            <button
                                                onClick={() => handleStartEdit(item)}
                                                className="group/btn flex items-center gap-2 px-4 py-2.5 bg-blue-marguerite-50 hover:bg-blue-marguerite-500 text-blue-marguerite-700 hover:text-white rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 border border-blue-marguerite-200 hover:border-blue-marguerite-500"
                                                aria-label={`Edit ${item.name}`}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                <span className="text-sm">Edit</span>
                                            </button>
                                            <button
                                                onClick={() => alert('delete')}
                                                className="group/btn flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-500 text-red-700 hover:text-white rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 border border-red-200 hover:border-red-500"
                                                aria-label={`Delete ${item.name}`}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                <span className="text-sm">Delete</span>
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

function CategoryEditModal({ category, onSave, onClose }) {
    const [name, setName] = useState(category.name);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(name);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Edit Category</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg mb-4"
                    />
                    <div className="flex gap-2 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}