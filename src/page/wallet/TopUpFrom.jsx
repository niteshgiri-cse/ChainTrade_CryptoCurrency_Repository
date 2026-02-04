import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DotFilledIcon } from "@radix-ui/react-icons"

function TopUpForm() {
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY")

  return (
    <div
      className="
        space-y-8
        p-6
        rounded-2xl
        backdrop-blur-xl
        bg-white/60
        border border-white/40
        shadow-xl
      "
    >
      {/* AMOUNT */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-slate-800">
          Enter Amount
        </Label>

        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="$9,999"
          className="
            h-12
            !text-base
            !font-semibold
            !text-slate-900
            placeholder:!text-slate-400
            !bg-white/80
            border border-slate-300
            rounded-lg
            focus:border-emerald-500
            focus:ring-emerald-500
          "
        />
      </div>

      {/* PAYMENT METHOD */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-slate-800">
          Payment Method
        </Label>

        <div className="grid grid-cols-2 gap-4">
          {["RAZORPAY", "STRIPE"].map((method) => (
            <div
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={`
                flex items-center gap-3
                rounded-xl
                px-4 py-3
                cursor-pointer
                transition
                backdrop-blur
                ${
                  paymentMethod === method
                    ? "border border-emerald-500 bg-emerald-100/60"
                    : "border border-slate-300 bg-white/70 hover:bg-white"
                }
              `}
            >
              <DotFilledIcon className="text-emerald-600" />
              <span className="text-sm font-medium text-slate-900">
                {method}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <DialogClose asChild>
        <Button
          type="button"
          className="
            w-full
            h-12
            !bg-gradient-to-r
            !from-emerald-500
            !to-emerald-600
            hover:!from-emerald-600
            hover:!to-emerald-700
            active:!to-emerald-800
            !text-white
            text-base
            font-semibold
            rounded-xl
            shadow-xl
            transition
            duration-200
          "
        >
          Add Funds
        </Button>
      </DialogClose>
    </div>
  )
}

export default TopUpForm
