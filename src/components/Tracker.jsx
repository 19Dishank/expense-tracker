import React, { useState } from 'react'
import ExpenseInput from './ui/ExpenseInput'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from '../utils/validationSchema'


const Tracker = () => {
    const methods = useForm({
        defaultValues: {
            totalExpense: null,
            totalPersons: null,
            paidBy: [{ personName: "", amount: null }]
        },
        resolver: yupResolver(validationSchema),
        mode: "onBlur"
    })

    const [result, setResult] = useState(null)
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-6xl grid grid-cols-2 gap-6">

                <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
                    <h1 className="text-xl font-semibold text-gray-800">Expense Input</h1>
                    <FormProvider {...methods}>
                        <ExpenseInput setResult={setResult} />
                    </FormProvider>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h1 className="text-xl font-semibold text-gray-800 mb-4">Results</h1>

                    {result ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-5 gap-4 text-sm">
                                <Card credentials={result.totalExpense} title="total Expense" />
                                <Card credentials={result.totalPaid} title="Total Paid" />
                                <Card
                                    className={`${result.remainedAmount > 0 ? 'text-red-500' : 'text-green-500'}`}
                                    credentials={Math.abs(result.remainedAmount)}
                                    title={result.remainedAmount > 0 ? "Remaining to pay " : "Available Balance"} />

                                <Card credentials={result.splitAmountPerPerson} title="Per Person" />
                                <Card credentials={result.personsWhoHaveToPay} title="Person remaining to pay" />
                            </div>

                            <table className="w-full border rounded-lg overflow-hidden">
                                <thead className="bg-gray-200 text-gray-700 text-sm">
                                    <tr>
                                        <th className="p-2 text-left">Name</th>
                                        <th className="p-2 text-left">Amount Paid</th>
                                        <th className="p-2 text-left">Amount receivable</th>
                                        <th className="p-2 text-left">Amount payable</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.paidBy.map((person, index) => {
                                        const paid = person.amount || 0;
                                        const difference = paid - result.splitAmountPerPerson;

                                        return (
                                            <tr key={index} className="border-t">
                                                <td className="p-2">{person.personName}</td>
                                                <td className="p-2">₹{paid}</td>
                                                <td className="p-2 text-green-600">
                                                    {difference > 0 ? "₹" + difference : ""}
                                                </td>
                                                <td className="p-2 text-red-600">
                                                    {difference < 0 ? "₹" + Math.abs(difference) : ""}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400">
                            No data yet
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Tracker


const Card = ({ title, credentials, className }) => {
    return (
        <div className={`p-3 bg-gray-50 rounded-lg border ${className}`}>
            <p className="text-gray-500">{title}</p>
            <p className="font-semibold text-lg">₹{credentials}</p>
        </div>
    )
}


