import React from "react"
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

const withdrawalData = [
  {
    date: "Jan 02, 2026 · 11:45 AM",
    method: "Bank Transfer",
    amount: 1200,
    status: "Completed",
  },
  {
    date: "Jan 05, 2026 · 04:20 PM",
    method: "UPI",
    amount: 800,
    status: "Pending",
  },
  {
    date: "Jan 09, 2026 · 09:10 AM",
    method: "Bank Transfer",
    amount: 2500,
    status: "Completed",
  },
]

const Withdrawal = () => {
  const totalWithdrawn = withdrawalData.reduce(
    (sum, i) => sum + i.amount,
    0
  )
  const completedAmount = withdrawalData
    .filter((i) => i.status === "Completed")
    .reduce((sum, i) => sum + i.amount, 0)

  const pendingAmount = withdrawalData
    .filter((i) => i.status === "Pending")
    .reduce((sum, i) => sum + i.amount, 0)

  return (
    <div className="min-h-screen px-6 py-10 lg:px-20 bg-slate-50">

      {/* PAGE TITLE */}
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
            ${totalWithdrawn.toLocaleString()}
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-yellow-200 bg-yellow-50">
          <p className="text-sm font-semibold text-yellow-700 uppercase">
            Pending
          </p>
          <p className="mt-3 text-3xl font-bold text-yellow-800">
            ${pendingAmount.toLocaleString()}
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50">
          <p className="text-sm font-semibold text-emerald-700 uppercase">
            Completed
          </p>
          <p className="mt-3 text-3xl font-bold text-emerald-800">
            ${completedAmount.toLocaleString()}
          </p>
        </Card>

      </div>

      {/* TABLE CARD */}
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
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {withdrawalData.map((item, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-slate-50 transition"
                >
                  <TableCell className="text-sm text-slate-700">
                    {item.date}
                  </TableCell>

                  <TableCell className="font-medium text-slate-900">
                    {item.method}
                  </TableCell>

                  <TableCell className="font-semibold text-slate-900">
                    ${item.amount.toLocaleString()}
                  </TableCell>

                  <TableCell className="text-right">
                    {item.status === "Completed" ? (
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
              ))}
            </TableBody>
          </Table>
        </div>

      </Card>

    </div>
  )
}

export default Withdrawal
