import React, { useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useDispatch, useSelector } from "react-redux"
import { getPaymentDetails, getWithdrawalHistory } from "@/State/Withdrawal/Action"

const Withdrawal = () => {

  const dispatch = useDispatch()
   
const withdrawal=useSelector(store=>store.withdrawal)
  const { history = [],loading } = useSelector(
    store => store.withdrawal
  )
  
console.log(withdrawal)
  useEffect(() => {
    dispatch(
      getWithdrawalHistory({
        jwt: localStorage.getItem("jwt")
      }) 
    )
     dispatch(getPaymentDetails({jwt:localStorage.getItem("jwt")}));
  }, [])

  const totalWithdrawn = history.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  )

  const completedAmount = history
    .filter(item => item.status === "SUCCESS")
    .reduce((sum, item) => sum + (item.amount || 0), 0)

  const pendingAmount = history
    .filter(item => item.status === "PENDING")
    .reduce((sum, item) => sum + (item.amount || 0), 0)

  return (
    <div className="min-h-screen px-6 py-10 lg:px-20 bg-slate-50">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Withdrawals
        </h1>
        <p className="text-slate-500 mt-1">
          Track your withdrawal requests and history
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        <Card className="p-6 rounded-2xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-500 uppercase">
            Total Withdrawn
          </p>
          <p className="mt-3 text-3xl font-bold text-slate-900">
            ₹{totalWithdrawn.toLocaleString()}
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-yellow-200 bg-yellow-50">
          <p className="text-sm font-semibold text-yellow-700 uppercase">
            Pending
          </p>
          <p className="mt-3 text-3xl font-bold text-yellow-800">
            ₹{pendingAmount.toLocaleString()}
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50">
          <p className="text-sm font-semibold text-emerald-700 uppercase">
            Completed
          </p>
          <p className="mt-3 text-3xl font-bold text-emerald-800">
            ₹{completedAmount.toLocaleString()}
          </p>
        </Card>

      </div>

      {/* TABLE */}
      <Card className="rounded-2xl border border-slate-200 overflow-hidden">

        <div className="px-6 py-4 border-b border-slate-200 bg-white">
          <h2 className="text-lg font-semibold text-slate-900">
            Withdrawal History
          </h2>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>Date & Time</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {history.length > 0 ? (
                history.map((item, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-slate-50 transition"
                  >

                    <TableCell className="text-sm text-slate-700">
                      {item.date
                        ? new Date(item.date).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short"
                          })
                        : "—"}
                    </TableCell>

                    <TableCell className="font-medium text-slate-900">
                      {withdrawal.paymentDetails?.bankName} ••••
                      {withdrawal.paymentDetails?.accountNumber
                        ? withdrawal.paymentDetails?.accountNumber.slice(-4)
                        : "----"}
                    </TableCell>

                    <TableCell className="font-semibold text-slate-900">
                      ₹{(item.amount || 0).toLocaleString()}
                    </TableCell>

                    <TableCell className="text-right">
                      {item.status === "SUCCESS" ? (
                        <Badge className="bg-emerald-100 text-emerald-700">
                          Completed
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-700">
                          Pending
                        </Badge>
                      )}
                    </TableCell>

                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-8 text-slate-500"
                  >
                    No withdrawal history found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>
        </div>

      </Card>

    </div>
  )
}

export default Withdrawal
