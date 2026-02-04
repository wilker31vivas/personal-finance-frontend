import Loader from './Loader'
import { formatCurrency } from '../utils/formatCurrency'
import { useTransactions, INITIAL_FILTERS } from '../context/TransactionsContext';
import EmptyStateDemo from './EmptyState'
import { useState } from 'react';

export default function TransactionsTable() {
    const { loading, transactions, setFilters, pages, setPages } = useTransactions()
    const [showingTransactions, setShowingTransactions] = useState({
        start: 1,
        end: 5
    })

    const handlePage = (index) => {
        setPages(prev => ({ ...prev, pageCurrent: index }))
    }


    const totalTransactions = () => {
        const flatArray = transactions.reduce((accumulator, currentArray) => {
            return accumulator.concat(currentArray)
        }, [])

        return flatArray.length
    }

    return (
        <div className="bg-surface rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-blue-marguerite-200">
                        <tr className=''>
                            <th className="px-6 py-4 text-xs font-bold text-blue-marguerite-700 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-bold text-blue-marguerite-700 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-4 text-xs font-bold text-blue-marguerite-700 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-xs font-bold text-blue-marguerite-700 uppercase tracking-wider">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="py-20">
                                    <Loader description="Loading transactions..."></Loader>
                                </td>
                            </tr>
                        ) : transactions.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-10">
                                    <EmptyStateDemo title="No transactions found" description="We couldn't find any transactions with the applied filters" onReset={() => setFilters(INITIAL_FILTERS)} titleOnReset='Clear Filters'>
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-marguerite-100 flex items-center justify-center">
                                            <svg className="w-10 h-10 text-blue-marguerite-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                    </EmptyStateDemo>
                                </td>
                            </tr>
                        ) : (
                            transactions[pages.pageCurrent].map((item) => (
                                <tr key={item.id} className="hover:bg-slate-100 transition-colors cursor-pointer group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-blue-marguerite-100 flex items-center justify-center">
                                                <svg className="w-5 h-5 text-blue-marguerite-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-text">
                                                {new Date(item.date).toLocaleDateString('pt-BR')}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <p className="text-sm font-medium text-text">{item.description}</p>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-marguerite-100 text-blue-marguerite-700">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <p className={`text-base font-bold ${item.type === 'income' ? 'text-sucess' : 'text-danger'}`}>
                                            {item.type === 'income' ? '+' : '-'} {formatCurrency(item.amount)}
                                        </p>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className='px-6 py-4 border-t border-slate-200 flex items-center justify-between'>
                    <span className='text-sm text-slate-500'>
                        Showing {showingTransactions.start} to {showingTransactions.end} of {totalTransactions()} transactions
                    </span>
                    <div className='flex gap-2'>
                        {
                            transactions.map((item, index) => (
                                <button
                                    onClick={() => handlePage(index)}
                                    key={index}
                                    className='p-3 text-sm font-medium hover:bg-slate-200 rounded-lg'>
                                    {index + 1}
                                </button>
                            ))
                        }
                        <button className='p-3 text-sm font-semibold bg-blue-marguerite-600 text-white rounded-lg'>
                            1
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
