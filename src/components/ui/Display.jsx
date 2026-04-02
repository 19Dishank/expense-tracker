import React from 'react'
import { TableHeader } from './TableHeader';
import DisplayCard from './DisplayCard'

const Display = ({ result }) => {
    const avatarColors = [
        'bg-blue-100 text-blue-600',
        'bg-purple-100 text-purple-600',
        'bg-amber-100 text-amber-600',
        'bg-pink-100 text-pink-600',
        'bg-indigo-100 text-indigo-600'
    ];
    return (
        <>
            {result ? (
                <div className="space-y-5 sm:space-y-6 lg:space-y-8">
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">

                        <DisplayCard title="Total Expense" credentials={result.totalExpense.toFixed(2)} symbol={"₹"} />
                        <DisplayCard
                            symbol={"₹"}
                            credentials={result.totalPaid.toFixed(2)}
                            title="Total Paid"
                        />
                        <DisplayCard
                            symbol={"₹"}
                            className={`${result.remainedAmount > 0 ? 'border-amber-200 bg-amber-50' : 'border-emerald-200 bg-emerald-50'}`}
                            textClass={result.remainedAmount > 0 ? 'text-amber-700' : 'text-emerald-700'}
                            credentials={Math.abs(result.remainedAmount).toFixed(2)}
                            progressBarClass="bg-amber-500"
                            title={result.remainedAmount > 0 ? "Pending" : "Balance"}
                        />
                        <DisplayCard
                            symbol={"₹"}
                            credentials={(result.splitAmountPerPerson).toFixed(2)}
                            title="Per Person"
                        />
                        <DisplayCard
                            symbol={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}
                            credentials={result.personsWhoHaveToPay}
                            title="Owed By"
                        />
                    </div>
                    <div className="bg-white border border-gray-100 shadow-sm rounded-3xl overflow-hidden w-full">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse whitespace-nowrap">
                                <thead>
                                    <tr>
                                        <TableHeader title="Person" />
                                        <TableHeader title="Paid" align="right" />
                                        <TableHeader title="Receivable" align="right" />
                                        <TableHeader title="Payable" align="right" />
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {result.paidBy.map((person, index) => {
                                        const paid = person.amount || 0;
                                        const difference = paid - result.splitAmountPerPerson;
                                        const colorClass = avatarColors[index % avatarColors.length];

                                        return (
                                            <tr key={index} className="hover:bg-gray-50/80 transition-colors duration-200 group">

                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${colorClass}`}>
                                                            {person.personName.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="font-semibold text-gray-900 group-hover:text-black transition-colors">
                                                            {person.personName}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4 text-right tabular-nums text-gray-600 font-medium">
                                                    ₹{paid}
                                                </td>

                                                <td className="px-4 py-4 text-right tabular-nums">
                                                    {difference > 0 ? (
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                                                            ₹{difference.toFixed(2)}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-300">—</span>
                                                    )}
                                                </td>

                                                <td className="px-4 py-4 text-right tabular-nums">
                                                    {difference < 0 ? (
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-50 text-rose-600 border border-rose-100/50">
                                                            ₹{Math.abs(difference).toFixed(2)}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-300">—</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
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