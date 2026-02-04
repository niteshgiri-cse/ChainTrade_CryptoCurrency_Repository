import React from "react"
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
import { ReloadIcon, UpdateIcon } from "@radix-ui/react-icons"
import {
  CopyIcon,
  DollarSign,
  ShuffleIcon,
  UploadIcon,
  DownloadIcon,
  WalletIcon,
} from "lucide-react"

import TopUpFrom from "./TopUpFrom"
import WithdrawalForm from "./WithdrawalForm"
import TransferForm from "./TransferForm"

const Wallet = () => {
  return (
    <div className="min-h-screen px-6 py-12 lg:px-20 bg-gradient-to-br from-slate-50 via-white to-slate-100">

      <div className="max-w-3xl mx-auto space-y-12">

        {/* WALLET CARD */}
        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center">
                  <WalletIcon className="h-6 w-6 text-slate-700" />
                </div>

                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    My Wallet
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    #A475Ed
                    <CopyIcon className="h-4 w-4 cursor-pointer hover:text-slate-800" />
                  </div>
                </div>
              </div>

              <Button variant="ghost" size="icon">
                <ReloadIcon className="h-5 w-5 text-slate-600" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">

            {/* BALANCE */}
            <div className="flex items-center gap-3">
              <DollarSign className="h-7 w-7 text-slate-500" />
              <span className="text-3xl font-bold text-slate-900">
                20,000
              </span>
              <span className="text-sm font-medium text-slate-500">
                USD
              </span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="grid grid-cols-3 gap-4">

              {/* ADD FUNDS */}
              <Dialog>
                <DialogTrigger asChild>
                  <div className="h-24 rounded-xl bg-emerald-500/90 hover:bg-emerald-600 transition text-white flex flex-col items-center justify-center gap-2 cursor-pointer shadow-sm">
                    <UploadIcon className="h-6 w-6" />
                    <span className="text-sm font-semibold">Add Funds</span>
                  </div>
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
                  <div className="h-24 rounded-xl bg-rose-500/90 hover:bg-rose-600 transition text-white flex flex-col items-center justify-center gap-2 cursor-pointer shadow-sm">
                    <DownloadIcon className="h-6 w-6" />
                    <span className="text-sm font-semibold">Withdraw</span>
                  </div>
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
                  <div className="h-24 rounded-xl bg-blue-600/90 hover:bg-blue-700 transition text-white flex flex-col items-center justify-center gap-2 cursor-pointer shadow-sm">
                    <ShuffleIcon className="h-6 w-6" />
                    <span className="text-sm font-semibold">Transfer</span>
                  </div>
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

        {/* HISTORY */}
        <div className="space-y-4">

          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-slate-900">
              Transaction History
            </h2>
            <UpdateIcon className="h-5 w-5 text-slate-500 cursor-pointer hover:text-slate-700" />
          </div>

          <div className="space-y-3">
            {[1,2,3,4,5].map((_, i) => (
              <Card
                key={i}
                className="flex items-center justify-between px-5 py-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-slate-100 text-slate-600">
                      <ShuffleIcon className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Asset Purchase
                    </p>
                    <p className="text-xs text-slate-500">
                      2026-01-09 · 12:39
                    </p>
                  </div>
                </div>

                <div className="text-sm font-bold text-emerald-600">
                  + $5,999
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Wallet
