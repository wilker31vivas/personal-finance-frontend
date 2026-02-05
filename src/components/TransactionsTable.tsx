import Loader from './Loader'
import { formatCurrency } from '../utils/formatCurrency'
import { useTransactions, INITIAL_FILTERS } from '../context/TransactionsContext';
import EmptyState from './EmptyState'
import { useMemo, useCallback } from 'react';
import getPagination from '../utils/getPagination'

export default function TransactionsTable() {
    const { loading, transactionPages, setFilters, pageCurrent, setPageCurrent } = useTransactions()

    const totalPages = transactionPages.length
    const pagesToShow = useMemo(() => {
        return getPagination(pageCurrent + 1, totalPages)
    }, [pageCurrent, totalPages])

    const showingTransactions = useMemo(() => {
        if (!transactionPages[pageCurrent]) return { start: 0, end: 0 }

        const previousTotal = transactionPages
            .slice(0, pageCurrent)
            .reduce((total, page) => total + page.length, 0)

        return {
            start: previousTotal + 1,
            end: previousTotal + transactionPages[pageCurrent].length
        }
    }, [transactionPages, pageCurrent])

    const canGoPrev = pageCurrent > 0
    const canGoNext = pageCurrent < transactionPages.length - 1 && transactionPages[pageCurrent + 1]?.length > 0


    const handlePage = useCallback((index: number) => {
        setPageCurrent(index)
    }, [setPageCurrent])

    const totalTransactions = useMemo(() => {
        return transactionPages.reduce((total, page) => total + page.length, 0)
    }, [transactionPages])


    return (
        <div className="bg-surface rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left" aria-label="Transactions table">
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
                        ) : transactionPages.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-10">
                                    <EmptyState title="No transactions found" description="We couldn't find any transactions with the applied filters" onReset={() => setFilters(INITIAL_FILTERS)} titleOnReset='Clear Filters'>
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-marguerite-100 flex items-center justify-center">
                                            <svg className="w-10 h-10 text-blue-marguerite-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                    </EmptyState>
                                </td>
                            </tr>
                        ) : (
                            transactionPages[pageCurrent]?.map((item) => (
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
                                        <p className={`text-base font-bold ${item.type === 'income' ? 'text-success' : 'text-danger'}`}>
                                            {item.type === 'income' ? '+' : '-'} {formatCurrency(item.amount)}
                                        </p>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {totalPages > 0 && (
                    <div className='px-6 py-4 border-t border-slate-200 flex items-center justify-between'>
                        <span className='text-sm text-slate-500'>
                            Showing {showingTransactions.start} to {showingTransactions.end} of {totalTransactions} transactions
                        </span>
                        <div className='flex gap-2'>
                            <button
                                aria-label="Previous page"
                                onClick={() => handlePage(pageCurrent - 1)}
                                disabled={!canGoPrev}
                                className="cursor-pointer p-3 text-sm font-medium rounded-lg hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ←
                            </button>
                            {pagesToShow.map((page, index) => {
                                if (page === "...") {
                                    return (
                                        <span key={`dots-${index}`} className="px-2 text-slate-400 flex items-center">
                                            ...
                                        </span>
                                    )
                                }

                                const pageIndex = Number(page) - 1
                                const isActive = pageIndex === pageCurrent

                                return (
                                    <button
                                        key={page}
                                        onClick={() => handlePage(pageIndex)}
                                        className={`cursor-pointer px-3 py-2 text-sm font-medium rounded-lg transition-colors
                ${isActive
                                                ? 'bg-blue-marguerite-600 text-white'
                                                : 'hover:bg-slate-200'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                )
                            })}
                            <button
                                aria-label="Next page"
                                onClick={() => handlePage(pageCurrent + 1)}
                                disabled={!canGoNext}
                                className="cursor-pointer p-3 text-sm font-medium rounded-lg hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                →
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}