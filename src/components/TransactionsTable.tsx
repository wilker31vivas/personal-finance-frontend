import Loader from './Loader'
import type { Transaction, TransactionFilters } from "../types/types"
import { formatCurrency } from '../utils/formatCurrency'
import { INITIAL_FILTERS } from './Transactions'

interface TransactionsTableProps {
    loading: boolean
    transactions: Transaction[]
    setFilters: React.Dispatch<React.SetStateAction<TransactionFilters>>
    fetchTransactions: (filters: TransactionFilters) => Promise<void>
}

export default function TransactionsTable({ loading, transactions, setFilters, fetchTransactions }: TransactionsTableProps) {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 uppercase tracking-wide">Date</th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 uppercase tracking-wide">Description</th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 uppercase tracking-wide">Category</th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 uppercase tracking-wide">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-left">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="py-20">
                                    <Loader description="Loading transactions..."></Loader>
                                </td>
                            </tr>
                        ) : transactions.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-10">
                                    <div className="text-center">
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                                            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-slate-700 mb-2">
                                            No transactions found
                                        </h3>
                                        <p className="text-slate-500 mb-6">
                                            We couldn’t find any transactions with the applied filters
                                        </p>
                                        <button
                                            onClick={() => {
                                                setFilters(INITIAL_FILTERS)
                                                fetchTransactions(INITIAL_FILTERS)
                                            }}
                                            className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium text-sm"
                                        >
                                            Clear filters
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ) : (
                            transactions.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors duration-150">
                                    <td className="py-2 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                                                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-slate-700">
                                                {new Date(item.date).toLocaleDateString('pt-BR')}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <p className="text-sm font-medium text-slate-800">{item.description}</p>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <p className={`text-base font-bold ${item.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {item.type === 'income' ? '+' : '-'} {formatCurrency(item.amount)}
                                        </p>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
