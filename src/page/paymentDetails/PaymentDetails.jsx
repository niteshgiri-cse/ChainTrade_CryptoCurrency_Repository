import React, { useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import PaymentDetailForm from "./PaymentDetailForm"
import { useDispatch, useSelector } from "react-redux"
import { getPaymentDetails } from "@/State/Withdrawal/Action"

function PaymentDetails() {
  const withdrawal=useSelector(store=>store.withdrawal)
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getPaymentDetails({jwt:localStorage.getItem("jwt")}));
  },[])
  
  return (
    <div className="min-h-screen flex justify-center bg-slate-100 px-6 py-20">

      <div className="w-full max-w-3xl space-y-10">

        {/* PAGE HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Payment Details
          </h1>
          <p className="text-base text-slate-600 mt-2">
            Your verified bank account for withdrawals
          </p>
        </div>

        {withdrawal.paymentDetails ? (
          <Card className="border border-slate-300 bg-white shadow-md rounded-xl">

            {/* CARD HEADER */}
            <CardHeader className="border-b border-slate-200 px-8 py-6 bg-slate-50 rounded-t-xl">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-slate-900">
                  Bank Account Information
                </CardTitle>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 font-semibold"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="bg-white">
                    <DialogHeader>
                      <DialogTitle>Edit Bank Details</DialogTitle>
                    </DialogHeader>
                    <PaymentDetailForm />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>

            {/* CARD CONTENT */}
            <CardContent className="px-8 py-8 space-y-7">

              {/* ROW */}
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-slate-600">
                  Bank Name
                </span>
                <span className="text-lg font-bold text-slate-900">
                  {withdrawal.paymentDetails?.bankName}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-slate-600">
                  Account Holder
                </span>
                <span className="text-lg font-bold text-slate-900">
                 {withdrawal.paymentDetails?.accountHolderName}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-slate-600">
                  Account Number
                </span>
                <span className="text-lg font-bold tracking-wider text-slate-900">
                  {withdrawal.paymentDetails?.accountNumber}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-slate-600">
                  IFSC Code
                </span>
                <span className="text-lg font-bold text-slate-900">
                  {withdrawal.paymentDetails?.ifsc}
                </span>
              </div>

              {/* INFO BOX */}
              <div className="rounded-lg bg-blue-50 border border-blue-200 px-6 py-4">
                <p className="text-sm font-medium text-blue-700">
                  Withdrawals will only be processed to this verified bank account.
                </p>
              </div>

            </CardContent>
          </Card>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full h-12 text-lg font-semibold">
                Add Bank Account
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Add Bank Account</DialogTitle>
              </DialogHeader>
              <PaymentDetailForm />
            </DialogContent>
          </Dialog>
        )}

      </div>
    </div>
  )
}

export default PaymentDetails
