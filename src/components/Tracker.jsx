import React, { useReducer, useState } from 'react'
import ExpenseInput from './ui/ExpenseInput'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from '../utils/validationSchema'
import Display from './ui/Display'

const Tracker = () => {
    const [isCalculated, setIsCalculated] = useState(false)
    const methods = useForm({
        defaultValues: {
            totalExpense: null,
            totalPersons: 1,
            paidBy: [{ personName: "person1", amount: null }]
        },
        resolver: yupResolver(validationSchema),
        mode: "onSubmit"
    })
    const { handleSubmit, formState: { errors } } = methods
    const [result, setResult] = useState(null)
    const handleExpenseCalculate = (data) => {
        const amountsPaid = data.paidBy.map((amt) => parseInt(amt.amount) || 0)
        const totalPaid = amountsPaid.reduce((total, amt) => total + amt, 0)
        const totalExpense = parseInt(data.totalExpense) || 0
        const totalPersons = parseInt(data.totalPersons) || 0
        const remainedAmount = totalExpense - totalPaid
        const personWhoPaid = amountsPaid.length
        const splitAmountPerPerson = totalExpense / totalPersons
        const personsWhoHaveToPay = totalPersons - personWhoPaid

        setResult({
            totalPaid,
            totalExpense,
            totalPersons,
            remainedAmount,
            splitAmountPerPerson,
            personsWhoHaveToPay,
            paidBy: data.paidBy
        })
        setIsCalculated(true)
    }
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleExpenseCalculate)} >
                <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-3 sm:p-4 md:p-6 lg:p-8 font-sans text-slate-900">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
                        <div className="lg:col-span-4 space-y-4">
                            <div className="bg-white p-5 sm:p-6 md:p-7 lg:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                                <div className="mb-5 sm:mb-6">
                                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Expense</h1>
                                </div>

                                <ExpenseInput setResult={setResult} result={result} isCalculated={isCalculated} />

                            </div>
                        </div>
                        {result && <div className="lg:col-span-8">
                            <div className="bg-white p-5 sm:p-6 md:p-7 lg:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 h-full hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-5 sm:mb-6 lg:mb-8">
                                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Results</h1>
                                    {result && (
                                        <button
                                            type="submit"
                                            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-semibold rounded-full transition-all duration-150 active:scale-95"
                                        >
                                            Refresh
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw-icon lucide-refresh-cw">
                                                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                                                <path d="M21 3v5h-5" />
                                                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                                                <path d="M8 16H3v5" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                <Display result={result} />
                            </div>
                        </div>}
                    </div>
                </div>
            </form>
        </FormProvider >
    )
}

export default Tracker



