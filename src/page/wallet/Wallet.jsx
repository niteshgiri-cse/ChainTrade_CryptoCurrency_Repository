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
import { ReloadIcon } from "@radix-ui/react-icons"
import {
  DollarSign,
  UploadIcon,
  DownloadIcon,
  WalletIcon,
  ShuffleIcon
} from "lucide-react"

import TopUpFrom from "./TopUpFrom"
import WithdrawalForm from "./WithdrawalForm"
import TransferForm from "./TransferForm"
import { useDispatch, useSelector } from "react-redux"
import {
  depositMoney,
  getUserWallet,
  getWalletTransaction
} from "@/State/Wallet/Action"
import { useLocation, useNavigate } from "react-router-dom"

const Wallet = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const { userWallet, loading, transactions } =
    useSelector(store => store.wallet)

  const query = new URLSearchParams(location.search)
  const orderId = query.get("order_id")
  const paymentId = query.get("razorpay_payment_id")

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    dispatch(getUserWallet(jwt))
    dispatch(getWalletTransaction({ jwt }))
  }, [])

  useEffect(() => {
    if (!orderId || !paymentId) return

    const jwt = localStorage.getItem("jwt")

    dispatch(depositMoney(jwt, orderId, paymentId))
      .then(() => {
        dispatch(getUserWallet(jwt))
        dispatch(getWalletTransaction({ jwt }))
      })

    navigate("/wallet", { replace: true })

  }, [orderId, paymentId])

  const handleReload = () => {
    const jwt = localStorage.getItem("jwt")
    dispatch(getUserWallet(jwt))
    dispatch(getWalletTransaction({ jwt }))
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN").format(amount)
  }

  const formatDate = (date) => {
    if (!date) return ""
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
  }

  return (
    <div className="min-h-screen px-6 py-12 lg:px-20 bg-slate-50">

      <div className="max-w-4xl mx-auto space-y-12">

        {/* WALLET CARD */}
        <Card className="rounded-3xl border bg-white shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
                  <WalletIcon className="h-7 w-7 text-indigo-600" />
                </div>

                <div>
                  <CardTitle className="text-2xl font-bold text-slate-800">
                    My Wallet
                  </CardTitle>
                  <div className="text-sm text-slate-500">
                    Wallet ID: {userWallet?.id}
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleReload}
                disabled={loading}
              >
                <ReloadIcon className={`${loading ? "animate-spin" : ""}`} />
              </Button>

            </div>
          </CardHeader>

          <CardContent className="space-y-8">

            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-slate-900">
                ₹{formatCurrency(userWallet?.balance || 0)}
              </span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="grid grid-cols-3 gap-6">

              {/* ADD FUNDS */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2 
                    bg-emerald-600 hover:bg-emerald-700
                    text-white border-0 rounded-2xl shadow-md"
                  >
                    <UploadIcon className="h-6 w-6" />
                    Add Funds
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Add Funds</DialogTitle>
                  </DialogHeader>
                  <TopUpFrom />
                </DialogContent>
              </Dialog>

              {/* WITHDRAW */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2 
                    bg-rose-600 hover:bg-rose-700
                    text-white border-0 rounded-2xl shadow-md"
                  >
                    <DownloadIcon className="h-6 w-6" />
                    Withdraw
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Withdraw Funds</DialogTitle>
                  </DialogHeader>
                  <WithdrawalForm />
                </DialogContent>
              </Dialog>

              {/* TRANSFER */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2 
                    bg-indigo-600 hover:bg-indigo-700
                    text-white border-0 rounded-2xl shadow-md"
                  >
                    <ShuffleIcon className="h-6 w-6" />
                    Transfer
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Transfer Funds</DialogTitle>
                  </DialogHeader>
                  <TransferForm />
                </DialogContent>
              </Dialog>

            </div>

          </CardContent>
        </Card>

        {/* TRANSACTIONS */}
        <div className="space-y-6">

          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">
              Transaction History
            </h2>
            <span className="text-sm text-slate-500">
              {transactions?.length || 0} Records
            </span>
          </div>

          {transactions?.length === 0 && (
            <div className="bg-white rounded-2xl p-6 shadow text-center text-slate-500">
              No transactions found
            </div>
          )}

          {transactions?.map((tx) => {

            const isDeposit = tx.type === "DEPOSIT"
            const isWithdraw = tx.type === "WITHDRAW"

            return (
              <Card
                key={tx.id}
                className="flex items-center justify-between px-6 py-5 rounded-2xl bg-white shadow-sm border"
              >
                <div className="flex items-center gap-4">

                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center
                    ${
                      isDeposit
                        ? "bg-green-100"
                        : isWithdraw
                        ? "bg-red-100"
                        : "bg-blue-100"
                    }
                  `}>
                    {isDeposit ? (
                      <UploadIcon className="text-green-600" />
                    ) : isWithdraw ? (
                      <DownloadIcon className="text-red-600" />
                    ) : (
                      <ShuffleIcon className="text-blue-600" />
                    )}
                  </div>

                  <div>
                    <p className="font-semibold">
                      {tx.purpose || tx.type}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatDate(tx.date)}
                    </p>
                  </div>
                </div>

                <div
                  className={`font-bold ${
                    isDeposit
                      ? "text-green-600"
                      : isWithdraw
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {isDeposit ? "+" : "-"} ₹{formatCurrency(tx.amount)}
                </div>
              </Card>
            )
          })}

        </div>

      </div>
    </div>
  )
}

export default Wallet
