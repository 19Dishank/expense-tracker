import React, { useState } from 'react'
import ExpenseInput from './ui/ExpenseInput'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from '../utils/validationSchema'

const Tracker = () => {
    const methods = useForm({
        defaultValues: {
            totalExpense: null,
            totalPersons: 1,
            paidBy: [{ personName: "person1", amount: null }]
        },
        resolver: yupResolver(validationSchema),
        mode: "onSubmit"
    })

    const [result, setResult] = useState(null)

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-3 sm:p-4 md:p-6 lg:p-8 font-sans text-slate-900">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
                <div className="lg:col-span-4 space-y-4">
                    <div className="bg-white p-5 sm:p-6 md:p-7 lg:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="mb-5 sm:mb-6">
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Expense</h1>
                        </div>
                        <FormProvider {...methods}>
                            <ExpenseInput setResult={setResult} result={result} />
                        </FormProvider>
                    </div>
                </div>
                <div className="lg:col-span-8">
                    <div className="bg-white p-5 sm:p-6 md:p-7 lg:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 h-full hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-5 sm:mb-6 lg:mb-8">
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Results</h1>
                            {/* {result && (
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider rounded-full">
                                    Live Calculation
                                </span>
                            )} */}
                        </div>

                        {result ? (
                            <div className="space-y-5 sm:space-y-6 lg:space-y-8">
                                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
                                    <Card
                                        symbol={"₹"}
                                        credentials={result.totalExpense}
                                        title="Total Expense"
                                    />
                                    <Card
                                        symbol={"₹"}
                                        credentials={result.totalPaid}
                                        title="Total Paid"
                                    />
                                    <Card
                                        symbol={"₹"}
                                        className={`${result.remainedAmount > 0 ? 'border-amber-200 bg-amber-50' : 'border-emerald-200 bg-emerald-50'}`}
                                        textClass={result.remainedAmount > 0 ? 'text-amber-700' : 'text-emerald-700'}
                                        credentials={Math.abs(result.remainedAmount)}
                                        title={result.remainedAmount > 0 ? "Pending" : "Balance"}
                                    />
                                    <Card
                                        symbol={"₹"}
                                        credentials={result.splitAmountPerPerson}
                                        title="Per Person"
                                    />
                                    <Card
                                        credentials={result.personsWhoHaveToPay}
                                        title="Owed By"
                                    />
                                </div>

                                <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                                    <table className="w-full text-left border-collapse text-sm">
                                        <thead>
                                            <tr className="bg-linear-to-r from-slate-50 to-slate-50/50">
                                                <TableHeader title={"Name"} />
                                                <TableHeader title={"Paid"} />
                                                <TableHeader title={"Receivable"} />
                                                <TableHeader title={"Payable"} />
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {result.paidBy.map((person, index) => {
                                                const paid = person.amount || 0;
                                                const difference = paid - result.splitAmountPerPerson;

                                                return (
                                                    <tr key={index} className="hover:bg-slate-50/50 transition-colors duration-150">
                                                        <td className="px-3 sm:px-4 lg:px-6 py-3 font-medium text-slate-700">{person.personName}</td>
                                                        <td className="px-3 sm:px-4 lg:px-6 py-3 text-slate-600">₹{paid}</td>
                                                        <td className="px-3 sm:px-4 lg:px-6 py-3 font-semibold text-emerald-600">
                                                            {difference > 0 ? "₹" + difference : "—"}
                                                        </td>
                                                        <td className="px-3 sm:px-4 lg:px-6 py-3 font-semibold text-rose-500">
                                                            {difference < 0 ? "₹" + Math.abs(difference) : "—"}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-48 sm:h-56 lg:h-64 border-2 border-dashed border-slate-200 rounded-2xl">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <p className="text-slate-500 font-medium text-sm sm:text-base">No calculation data available</p>
                                <p className="text-slate-400 text-xs sm:text-sm">Fill out the form to see the breakdown</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tracker

const Card = ({ title, credentials, className, textClass, symbol }) => {
    return (
        <div className={`p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
            <p className="text-[8px] sm:text-[12px] font-bold capitalize tracking-widest text-slate-500 mb-1">{title}</p>
            <p className={`text-base sm:text-lg lg:text-xl font-bold truncate wrap-break-word ${textClass || 'text-slate-900'}`}>
                {symbol}{credentials}
            </p>
        </div>
    )
}

const TableHeader = ({ title }) => {
    return (
        <th className="px-3 sm:px-4 lg:px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-600 border-b border-slate-100">{title}</th>
    )
}