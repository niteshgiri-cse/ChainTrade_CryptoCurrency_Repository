import React from "react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { transferMoney } from "@/State/Wallet/Action";
import { amd } from "globals";

function TransferForm() {
  const [formData, setFormData] = React.useState({
    amount: "",
    walletId: "",
    purpose: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
  dispatch(
    transferMoney(
      localStorage.getItem("jwt"),
      formData.walletId,
      {
        amount: formData.amount
      }
    )
  );
};


  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">Amount</label>
        <Input
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="$9,999"
          className="
            h-12
            text-base
            font-medium
            border-slate-300
            focus:border-indigo-500
            focus:ring-indigo-500
          "
        />
      </div>

      {/* WALLET ID */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">
          Recipient Wallet ID
        </label>
        <Input
          name="walletId"
          value={formData.walletId}
          onChange={handleChange}
          placeholder="#ASDFEW"
          className="
            h-12
            text-base
            font-medium
            border-slate-300
            focus:border-indigo-500
            focus:ring-indigo-500
          "
        />
      </div>

      {/* PURPOSE */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">
          Purpose (optional)
        </label>
        <Input
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          placeholder="Gift for a friend"
          className="
            h-12
            text-base
            border-slate-300
            focus:border-indigo-500
            focus:ring-indigo-500
          "
        />
      </div>

      <DialogClose asChild>
        <Button
          onClick={handleSubmit}
          className="
            w-full
            h-12
            mt-4
            text-base
            font-semibold
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            shadow-md
          "
        >
          Transfer Funds
        </Button>
      </DialogClose>
    </div>
  );
}

export default TransferForm;
