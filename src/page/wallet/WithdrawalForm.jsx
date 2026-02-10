import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { House } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getPaymentDetails, requestWithdrawal } from "@/State/Withdrawal/Action"

function WithdrawalForm() {
  const [amount, setAmount] = useState("");
const dispatch = useDispatch();

const withdrawal = useSelector(
  store => store.withdrawal
);

const { userWallet } = useSelector(
  store => store.wallet
);

const handleSubmit = () => {

  const numericAmount = Number(amount);

  if (!numericAmount || numericAmount <= 0) {
    alert("Enter valid amount");
    return;
  }

  if (numericAmount > userWallet?.balance) {
    alert("Insufficient balance");
    return;
  }

  dispatch(
    requestWithdrawal({
      amount: numericAmount,
      jwt: localStorage.getItem("jwt")
    })
  );
};


useEffect(() => {
  dispatch(
    getPaymentDetails({
      jwt: localStorage.getItem("jwt")
    })
  );
}, [dispatch]);

  return (
    <div className="space-y-10">

      {/* AVAILABLE BALANCE */}
      <div
        className="
          rounded-2xl
          bg-gradient-to-r from-indigo-50 to-sky-50
          border border-slate-200
          px-7 py-6
          flex items-center justify-between
        "
      >
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            Available Balance
          </p>
          <p className="text-3xl font-bold text-slate-900">
           ₹{(userWallet?.balance || 0)}
          </p>
        </div>
      </div>

      {/* WITHDRAW AMOUNT */}
      <div
        className="
          rounded-2xl
          bg-white
          border border-slate-200
          px-7 py-7
          space-y-4
        "
      >
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
          Withdrawal Amount
        </p>

        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="₹9999"
          className="
            h-16
            text-center
            text-4xl
            font-bold
            text-slate-900
            placeholder:text-slate-400
            bg-slate-50
            border border-slate-300
            rounded-xl
            focus:border-indigo-500
            focus:ring-indigo-500
          "
        />

        <p className="text-xs text-slate-500">
          Enter the amount you want to withdraw
        </p>
      </div>

      {/* BANK DETAILS */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-slate-700">
          Transfer To
        </p>

        <div
          className="
            flex items-center gap-4
            rounded-2xl
            border border-slate-200
            bg-slate-50
            px-6 py-5
          "
        >
          <div
            className="
              h-12 w-12
              rounded-xl
              bg-indigo-100
              flex items-center justify-center
            "
          >
            <House className="h-6 w-6 text-indigo-600" />
          </div>

          <div>
            <p className="text-base font-semibold text-slate-900">
                {withdrawal.paymentDetails?.bankName}
            </p>
            <p className="text-xs text-slate-500">
                {withdrawal.paymentDetails?.accountNumber}
            </p>
          </div>
        </div>
      </div>

      {/* SUBMIT */}
      <DialogClose asChild>
        <Button 
          className="
            w-full
            h-16
            rounded-2xl
            bg-gradient-to-r from-indigo-600 to-indigo-700
            hover:from-indigo-700 hover:to-indigo-800
            text-white
            text-lg
            font-semibold
            shadow-lg
            transition
          "
          onClick={handleSubmit}
        >
          Withdraw Funds
        </Button>
      </DialogClose>

    </div>
  )
}

export default WithdrawalForm
 