import * as yup from "yup";

export const validationSchema = yup.object({
    totalExpense: yup
        .number()
        .required("Total expense is required")
        .positive("Expense must be greater than 0")
        .typeError("Amount must be a number"),

    totalPersons: yup
        .number()
        .required("Total persons is required")
        .min(1, "At least 1 person required")
        .typeError("Persons must be a number"),

    // paidBy: yup
    //     .array()
    //     .of(
    //         yup.object({
    //             personName: yup
    //                 .string()
    //                 .trim()
    //                 .required("Person name is required"),

    //             amount: yup
    //                 .number()
    //                 .required("Amount is required")
    //                 .min(0, "Amount cannot be negative")
    //                 .typeError("Amount must be a number"),
    //         })
    //     )

    //     .min(1, "At least one payer is required")
    //     .test(
    //         "max-limit",
    //         "Total paid amount cannot exceed total expense",
    //         function (paidBy) {
    //             const { totalExpense } = this.parent;
    //             if (!paidBy || !totalExpense) return true;

    //             const totalPaid = paidBy.reduce(
    //                 (sum, p) => sum + (p.amount || 0),
    //                 0
    //             );

    //             return totalPaid <= totalExpense;
    //         }
    //     )
});