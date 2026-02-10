import React from "react"
import { useForm } from "react-hook-form"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { useDispatch } from "react-redux"
import { addPaymentDetails } from "@/State/Withdrawal/Action"

function PaymentDetailForm() {
  const dispatch=useDispatch();
  const form = useForm({
    defaultValues: {
      ifscCode: "",
      accountHolderName: "",
      accountNumber: "",
      confirmAccountNumber: "",
      bankName: "",
    },
  })

  const onSubmit = (data) => {
    dispatch(addPaymentDetails({
      paymentDetails:data,
      jwt:localStorage.getItem("jwt")
    }))
  }

  return (
    <div
      className="
        px-8 py-6
        bg-white
        rounded-2xl
        border border-slate-200
        shadow-sm
      "
    >
      {/* HEADER */}
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-slate-900">
          Bank Account Details
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Used for withdrawals and settlement of funds
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          {/* IFSC */}
          <FormField
            control={form.control}
            name="ifscCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-slate-700">
                  IFSC Code
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="HDFC0000123"
                    className="
                      h-11
                      text-sm
                      font-medium
                      text-slate-900
                      bg-slate-50
                      border border-slate-300
                      rounded-lg
                      focus:border-indigo-500
                      focus:ring-indigo-500
                    "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ACCOUNT HOLDER */}
          <FormField
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-slate-700">
                  Account Holder Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John Doe"
                    className="
                      h-11
                      text-sm
                      font-medium
                      text-slate-900
                      bg-slate-50
                      border border-slate-300
                      rounded-lg
                      focus:border-indigo-500
                      focus:ring-indigo-500
                    "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ACCOUNT NUMBER */}
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-slate-700">
                  Account Number
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="********1234"
                    className="
                      h-11
                      text-sm
                      font-medium
                      text-slate-900
                      bg-slate-50
                      border border-slate-300
                      rounded-lg
                      focus:border-indigo-500
                      focus:ring-indigo-500
                    "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CONFIRM ACCOUNT NUMBER */}
          <FormField
            control={form.control}
            name="confirmAccountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-slate-700">
                  Confirm Account Number
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Re-enter account number"
                    className="
                      h-11
                      text-sm
                      font-medium
                      text-slate-900
                      bg-slate-50
                      border border-slate-300
                      rounded-lg
                      focus:border-indigo-500
                      focus:ring-indigo-500
                    "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* BANK NAME */}
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-slate-700">
                  Bank Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="HDFC Bank"
                    className="
                      h-11
                      text-sm
                      font-medium
                      text-slate-900
                      bg-slate-50
                      border border-slate-300
                      rounded-lg
                      focus:border-indigo-500
                      focus:ring-indigo-500
                    "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* INFO NOTE */}
          <div
            className="
              rounded-xl
              bg-indigo-50
              border border-indigo-100
              px-4 py-3
              text-xs text-indigo-700
            "
          >
            ℹ️ Your bank details are encrypted and used only for secure payouts.
          </div>

          {/* SUBMIT */}
          <DialogClose asChild>
            <Button
              type="submit"
              className="
                w-full
                h-12
                mt-2
                rounded-xl
                bg-gradient-to-r from-indigo-600 to-indigo-700
                hover:from-indigo-700 hover:to-indigo-800
                text-white
                font-semibold
                text-base
                shadow-md
                transition
              "
            >
              Save Bank Details
            </Button>
          </DialogClose>

        </form>
      </Form>
    </div>
  )
}

export default PaymentDetailForm
