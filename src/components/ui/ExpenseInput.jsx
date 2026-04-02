import React, { memo, useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

const ExpenseInput = ({ setResult, isCalculated }) => {
    const methods = useFormContext()
    const [isSaved, setIsSaved] = useState(false)
    // const [isCalculated, setIsCalculated] = useState(false)
    const { register, handleSubmit, control, formState: { errors }, watch, setValue } = methods
    const {
        fields: paidByFields,
        append: appendPerson,
        remove: removePerson,
    } = useFieldArray({
        control,
        name: "paidBy",
    })

    const totalPersons = watch("totalPersons")

    // const handleExpenseCalculate = (data) => {
    //     const amountsPaid = data.paidBy.map((amt) => parseInt(amt.amount) || 0)
    //     const totalPaid = amountsPaid.reduce((total, amt) => total + amt, 0)
    //     const totalExpense = parseInt(data.totalExpense) || 0
    //     const totalPersons = parseInt(data.totalPersons) || 0
    //     const remainedAmount = totalExpense - totalPaid
    //     const personWhoPaid = amountsPaid.length
    //     const splitAmountPerPerson = totalExpense / totalPersons
    //     const personsWhoHaveToPay = totalPersons - personWhoPaid

    //     setResult({
    //         totalPaid,
    //         totalExpense,
    //         totalPersons,
    //         remainedAmount,
    //         splitAmountPerPerson,
    //         personsWhoHaveToPay,
    //         paidBy: data.paidBy
    //     })
    //     setIsCalculated(true)
    // }


    const handleCustomChange = () => {
        const desired = parseInt(totalPersons) || 0;
        const current = paidByFields.length;

        if (desired > current) {

            for (let i = current; i < desired; i++) {
                appendPerson({
                    personName: `person${i + 1}`,
                    amount: ""
                });
            }
        } else if (desired < current) {

            for (let i = current - 1; i >= desired; i--) {
                removePerson(i);
            }
        }

        setIsSaved(true);
    };

    useEffect(() => {
        if (isSaved) {
            handleCustomChange();
        }
    }, [totalPersons]);

    return (
        <>
            {/* <form onSubmit={handleSubmit(handleExpenseCalculate)} className="space-y-5 mt-5 sm:space-y-6 lg:space-y-8"> */}

            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

                    <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide ml-1">
                            Total Expense
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                                ₹
                            </span>
                            <input
                                type="text"
                                placeholder="0.00"
                                {...register('totalExpense')}
                                className={`w-full pl-8 pr-4 py-3 text-sm bg-white border ${errors?.totalExpense
                                    ? 'border-red-300 ring-red-50'
                                    : 'border-slate-200 focus:border-indigo-500 ring-transparent'
                                    } rounded-xl outline-none focus:ring-4 transition-all`}
                            />
                        </div>
                        <p className="text-red-500 text-xs mt-1.5 font-medium min-h-4">
                            {errors?.totalExpense?.message || ""}
                        </p>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide ml-1">
                            Group Size
                        </label>
                        <input
                            type="number"
                            min={0}
                            placeholder="No. of people"
                            {...register('totalPersons')}
                            className={`w-full px-4 py-3 text-sm bg-white border ${errors?.totalPersons
                                ? 'border-red-300 ring-red-50'
                                : 'border-slate-200 focus:border-indigo-500 ring-transparent'
                                } rounded-xl outline-none focus:ring-4 transition-all`}
                        />
                        <p className="text-red-500 text-xs mt-1.5 font-medium min-h-4">
                            {errors?.totalPersons?.message || ""}
                        </p>
                    </div>
                </div>

                {isSaved || <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleCustomChange}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 flex items-center gap-2"
                    >
                        Save & Continue
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>}

            </div>

            {isSaved && <>
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h3 className="text-sm font-bold text-slate-700">Payments</h3>

                    </div>

                    <div className="space-y-3 h-full overflow-y-auto pr-2 custom-scrollbar">
                        {paidByFields.map((field, index) => (
                            <div
                                key={field.id}
                                className="group relative bg-linear-to-b from-white to-slate-50/50 p-4 sm:p-4 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-300 hover:bg-linear-to-b hover:from-indigo-50/30 hover:to-slate-50/80 transition-all duration-150"
                            >
                                <div className="grid grid-cols-12 gap-3 items-start">

                                    <div className="col-span-6">
                                        <label className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider ml-0.5 mb-1.5 block">Payer</label>
                                        <input
                                            type="text"
                                            defaultValue={field.personName}
                                            placeholder="Person name"
                                            {...register(`paidBy.${index}.personName`)}
                                            className={`w-full text-sm font-medium bg-white rounded-lg px-3 py-2.5 border outline-none transition-all duration-150
                                         ${errors?.paidBy?.[index]?.personName
                                                    ? "border-red-400 focus:ring-2 focus:ring-red-200/50 text-red-900"
                                                    : "border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"} placeholder:text-slate-400`}
                                        />
                                        <p className="text-red-500 text-xs mt-1.5 font-medium min-h-4">
                                            {errors?.paidBy?.[index]?.personName?.message || ""}
                                        </p>
                                    </div>

                                    <div className="col-span-4">
                                        <div className="relative flex flex-col">
                                            <label className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider ml-0.5 mb-1.5 block">Amount</label>
                                            <div
                                                className={`flex items-center bg-white rounded-lg px-3 border outline-none transition-all duration-150
                                                    ${errors?.paidBy?.[index]?.amount
                                                        ? "border-red-400 focus-within:ring-2 focus-within:ring-red-200/50"
                                                        : "border-slate-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100"}`}
                                            >
                                                <span className="text-slate-400 text-sm font-semibold mr-1">₹</span>
                                                <input
                                                    type="number"
                                                    placeholder="0.00"
                                                    {...register(`paidBy.${index}.amount`)}
                                                    className="w-full text-sm font-semibold bg-transparent outline-none py-2.5 placeholder:text-slate-400"
                                                />
                                            </div>

                                            {errors?.paidBy?.[index]?.amount && (
                                                <p className="text-red-500 text-xs mt-1.5 font-medium">
                                                    {errors.paidBy[index].amount.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-span-2 flex justify-end self-center">
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newLength = paidByFields.length - 1;

                                                    removePerson(index);
                                                    setValue('totalPersons', String(newLength));
                                                }}
                                                className="h-10 w-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {errors?.paidBy?.root && (
                    <div className="p-2.5 sm:p-3 bg-red-50 border border-red-100 rounded-xl">
                        <p className="text-red-600 text-xs text-center font-medium">
                            {errors?.paidBy.root.message}
                        </p>
                    </div>
                )}
                {isCalculated || <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
                    {/* <button
                        type="button"
                        onClick={handleAppend}
                        disabled={paidByFields.length >= watch("totalPersons")}
                        // disabled={disabled}
                        className=" border-dashed flex-1 inline-flex items-center justify-center gap-2  px-4 sm:px-5 py-2.5 sm:py-3 border-2 rounded-xl font-bold  text-xs sm:text-sm  transition-all duration-150  bg-slate-100 text-slate-700 border-slate-400 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed disabled:opacity-70">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add payer
                    </button> */}

                    <button
                        type="submit"
                        className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-200/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer"
                    >
                        Calculate Splits
                    </button>
                </div>}
            </>}




            {/* </form> */}
        </>
    )
}

export default memo(ExpenseInput)


