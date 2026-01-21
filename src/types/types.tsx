type NumberOrNull = number | null

export interface Balance {
    transactionsAmount: {
        current: {
            income: NumberOrNull,
            expense: NumberOrNull,
            balance: NumberOrNull
        },
        previous: {
            income: NumberOrNull,
            expense: NumberOrNull,
            balance: NumberOrNull
        }
    },
    change: {
        income: NumberOrNull,
        expense: NumberOrNull
    }
}

export interface Transaction {
    id: string
    type: "income" | "expense"
    category: string
    description: string
    date: Date
    amount: number
}

export type Category = {
    id: number
    name: string
}

export interface TransactionFilters {
    type?: "" | 'income' | 'expense',
    category?: string,
    month?: string,
    year?: string,
}