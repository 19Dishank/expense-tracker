import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

const ExpenseInput = ({ setResult }) => {
    const methods = useFormContext()
    const { register, handleSubmit, control, formState: { errors } } = methods
    const {
        fields: paidByFields,
        append: appendPerson,
        remove: removePerson,
    } = useFieldArray({
        control,
        name: "paidBy"
    })

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
            remainedAmount,
            splitAmountPerPerson,
            personsWhoHaveToPay,
            paidBy: data.paidBy
        })
    }

    return (
        <form onSubmit={handleSubmit(handleExpenseCalculate)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <input
                    type='text'
                    placeholder='Total Expense'
                    {...register('totalExpense')}
                    className="p-2 border rounded-lg w-full"
                />
                {errors?.totalExpense && (<p className="text-red-500 text-sm col-span-2">{errors?.totalExpense.message}</p>)}
                <input
                    type='number'
                    min={0}
                    placeholder='Total Persons'
                    {...register('totalPersons')}
                    className="p-2 border rounded-lg w-full"
                />
                {errors?.totalPersons && (<p className="text-red-500 text-sm col-span-2">{errors?.totalPersons.message}</p>)}
                {/* <button onClick={() => appendPerson({ personName: "", amount: "" })}>Done</button> */}
            </div>

            <div className="space-y-3">
                {paidByFields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-5 gap-2 items-center">

                        <input
                            type="text"
                            placeholder="Person Name"
                            {...register(`paidBy.${index}.personName`)}
                            className="col-span-2 p-2 border rounded-lg"
                        />

                        {errors?.paidBy?.[index]?.personName && (
                            <p className="text-red-500 text-sm col-span-2">
                                {errors.paidBy[index].personName.message}
                            </p>
                        )}

                        <input
                            type="number"
                            placeholder="Amount"
                            {...register(`paidBy.${index}.amount`)}
                            className="col-span-2 p-2 border rounded-lg"
                        />

                        {errors?.paidBy?.[index]?.amount && (
                            <p className="text-red-500 text-sm col-span-2">
                                {errors.paidBy[index].amount.message}
                            </p>
                        )}

                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => removePerson(index)}
                                className="bg-red-500 text-white rounded-lg h-full w-10 py-1"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                ))}
            </div>
            {errors?.paidBy?.root && (
                <p className="text-red-500 text-sm col-span-2">
                    {errors?.paidBy.root.message}
                </p>
            )}
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => appendPerson({ personName: "", amount: "" })}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    + Add person
                </button>

                <input
                    type="submit"
                    value="Submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                />
            </div>
        </form>
    )
}

export default ExpenseInput
