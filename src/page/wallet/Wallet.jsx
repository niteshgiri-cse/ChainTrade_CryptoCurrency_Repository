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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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

  // Initial Load
  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    dispatch(getUserWallet(jwt))
    dispatch(getWalletTransaction({ jwt }))
  }, [])

  // Deposit After Razorpay Redirect
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
    <div className="min-h-screen px-6 py-12 lg:px-20 bg-gradient-to-br from-slate-50 via-white to-slate-100">

      <div className="max-w-4xl mx-auto space-y-12">

        {/* WALLET CARD */}
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-md">
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
                <ReloadIcon
                  className={`h-5 w-5 ${
                    loading ? "animate-spin" : ""
                  }`}
                />
              </Button>

            </div>
          </CardHeader>

          <CardContent className="space-y-6">

            <div className="flex items-center gap-3">
              <DollarSign className="text-slate-500" />
              <span className="text-4xl font-bold text-slate-900">
                {formatCurrency(userWallet?.balance || 0)}
              </span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="grid grid-cols-3 gap-4">

              <Dialog>
                <DialogTrigger asChild>
                  <div className="h-24 rounded-2xl bg-green-500 hover:bg-green-600 transition text-white flex flex-col items-center justify-center gap-2 cursor-pointer shadow-md">
                    <UploadIcon />
                    Add Funds
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Funds</DialogTitle>
                  </DialogHeader>
                  <TopUpFrom />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <div className="h-24 rounded-2xl bg-red-500 hover:bg-red-600 transition text-white flex flex-col items-center justify-center gap-2 cursor-pointer shadow-md">
                    <DownloadIcon />
                    Withdraw
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Withdraw Funds</DialogTitle>
                  </DialogHeader>
                  <WithdrawalForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <div className="h-24 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-white flex flex-col items-center justify-center gap-2 cursor-pointer shadow-md">
                    <ShuffleIcon />
                    Transfer
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Transfer Funds</DialogTitle>
                  </DialogHeader>
                  <TransferForm />
                </DialogContent>
              </Dialog>

            </div>
          </CardContent>
        </Card>

        {/* TRANSACTION HISTORY */}
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
                className="flex items-center justify-between px-6 py-5 rounded-2xl bg-white shadow-sm hover:shadow-lg transition border border-slate-100"
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
                    <p className="font-semibold text-slate-800">
                      {tx.purpose || tx.type}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatDate(tx.date)}
                    </p>
                    <p className="text-xs text-slate-400">
                      Ref: {tx.transferId}
                    </p>
                  </div>
                </div>

                <div
                  className={`text-lg font-bold ${
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
