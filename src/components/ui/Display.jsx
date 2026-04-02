import React from 'react'
import { TableHeader } from './TableHeader';
import { Card } from './Card';

const Display = ({ result }) => {
    return (
        <>
            {result ? (
                <div className="space-y-5 sm:space-y-6 lg:space-y-8">
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
                        <Card
                            symbol={"₹"}
                            credentials={result.totalExpense.toFixed(2)}
                            title="Total Expense"
                        />
                        <Card
                            symbol={"₹"}
                            credentials={result.totalPaid.toFixed(2)}
                            title="Total Paid"
                        />
                        <Card
                            symbol={"₹"}
                            className={`${result.remainedAmount > 0 ? 'border-amber-200 bg-amber-50' : 'border-emerald-200 bg-emerald-50'}`}
                            textClass={result.remainedAmount > 0 ? 'text-amber-700' : 'text-emerald-700'}
                            credentials={Math.abs(result.remainedAmount).toFixed(2)}
                            title={result.remainedAmount > 0 ? "Pending" : "Balance"}
                        />
                        <Card
                            symbol={"₹"}
                            credentials={(result.splitAmountPerPerson).toFixed(2)}
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
                                                {difference > 0 ? "₹" + (difference).toFixed(2) : "—"}
                                            </td>
                                            <td className="px-3 sm:px-4 lg:px-6 py-3 font-semibold text-rose-500">
                                                {difference < 0 ? "₹" + Math.abs(difference).toFixed(2) : "—"}
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
        </>
    )
}

export default Display