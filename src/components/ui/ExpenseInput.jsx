import React, { memo, useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

const ExpenseInput = ({ isCalculated }) => {
    const methods = useFormContext()
    const [isSaved, setIsSaved] = useState(false)
    const { register, control, formState: { errors }, watch, setValue } = methods
    const {
        fields: paidByFields,
        append: appendPerson,
        remove: removePerson,
    } = useFieldArray({
        control,
        name: "paidBy",
    })

    const totalPersons = watch("totalPersons")


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
            <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                            Total Expense
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="text-gray-400 font-bold group-focus-within:text-indigo-500 transition-colors">₹</span>
                            </div>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                {...register('totalExpense')}
                                className={`w-full pl-9 pr-4 py-3.5 text-sm font-semibold bg-gray-50 border ${errors?.totalExpense
                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                                    : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                                    } focus:bg-white rounded-2xl outline-none focus:ring-4 transition-all duration-200 text-gray-900 placeholder:text-gray-400 placeholder:font-normal`}
                            />
                        </div>
                        {errors?.totalExpense && (
                            <p className="text-red-500 text-xs font-medium ml-1">
                                {errors.totalExpense.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                            Group Size
                        </label>
                        <input
                            type="number"
                            min={0}
                            placeholder="No. of people"
                            {...register('totalPersons')}
                            className={`w-full px-4 py-3.5 text-sm font-semibold bg-gray-50 border ${errors?.totalPersons
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                                : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                                } focus:bg-white rounded-2xl outline-none focus:ring-4 transition-all duration-200 text-gray-900 placeholder:text-gray-400 placeholder:font-normal`}
                        />
                        {errors?.totalPersons && (
                            <p className="text-red-500 text-xs font-medium ml-1">
                                {errors.totalPersons.message}
                            </p>
                        )}
                    </div>
                </div>
                {!isSaved && (
                    <div className="flex justify-end pt-2">
                        <button
                            type="button"
                            onClick={handleCustomChange}
                            className="group px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-2xl shadow-sm hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2"
                        >
                            Save & Continue
                            <svg
                                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
            {isSaved && (
                <div className="space-y-5 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-3">
                        <h3 className="text-sm font-bold text-gray-900 capitalize tracking-normal">Payments Breakdown</h3>
                        <div className="h-px bg-gray-200 flex-1"></div>
                    </div>

                    <div className="space-y-3  overflow-y-auto pr-2 custom-scrollbar">
                        {paidByFields.map((field, index) => (
                            <div
                                key={field.id}
                                className="group relative bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-200"
                            >
                                <div className="grid grid-cols-12 gap-4 items-center">

                                    <div className="col-span-5 sm:col-span-6 flex flex-col gap-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Payer</label>
                                        <input
                                            type="text"
                                            defaultValue={field.personName}
                                            placeholder="Name"
                                            {...register(`paidBy.${index}.personName`)}
                                            className={`w-full text-sm font-semibold bg-gray-50 focus:bg-white rounded-xl px-3.5 py-2.5 border outline-none transition-all duration-200 ${errors?.paidBy?.[index]?.personName
                                                ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                : "border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                                                } placeholder:text-gray-400 placeholder:font-normal`}
                                        />
                                    </div>

                                    <div className="col-span-5 flex flex-col gap-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Amount</label>
                                        <div className="relative group/amount">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-400 font-bold group-focus-within/amount:text-indigo-500 transition-colors">₹</span>
                                            </div>
                                            <input
                                                type="number"
                                                step="0.01"
                                                placeholder="0.00"
                                                {...register(`paidBy.${index}.amount`)}
                                                className={`w-full pl-7 pr-3 py-2.5 text-sm font-semibold bg-gray-50 focus:bg-white border rounded-xl outline-none transition-all duration-200 ${errors?.paidBy?.[index]?.amount
                                                    ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                    : "border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                                                    } placeholder:text-gray-400 placeholder:font-normal`}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-2 sm:col-span-1 flex justify-end mt-5">
                                        {index > 0 ? (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newLength = paidByFields.length - 1;
                                                    removePerson(index);
                                                    setValue('totalPersons', String(newLength));
                                                }}
                                                className="h-10 w-10 flex items-center justify-center rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200 active:scale-95"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        ) : (
                                            <div className="h-10 w-10"></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {errors?.paidBy?.root && (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-red-600 text-xs font-bold">
                                {errors.paidBy.root.message}
                            </p>
                        </div>
                    )}

                    {!isCalculated && (
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full sm:w-auto sm:min-w-50] px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black tracking-wide text-sm rounded-2xl shadow-md hover:shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-1 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                Calculate Splits
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default memo(ExpenseInput)


