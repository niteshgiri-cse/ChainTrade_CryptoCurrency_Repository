import React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@radix-ui/react-dialog"
import { useSelector } from "react-redux"

function AccountVerificationForm() {
  const [value, setValue] = React.useState("")
  const auth=useSelector(store=>store.auth)
  const handleSubmit = () => {
    console.log("OTP Submitted:", value)
    setValue("")
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg mt-10 rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm p-6 shadow-sm">
        
        {/* EMAIL ROW */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Email address
            </p>
            <p className="text-sm font-semibold text-slate-900">
              {auth?.user?.email}
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="
                  bg-blue-600 text-white font-semibold
                  hover:bg-blue-700
                  px-5
                "
              >
                Send OTP
              </Button>
            </DialogTrigger>

            {/* OTP MODAL */}
            <DialogContent
              className="
                bg-white/90 backdrop-blur-xl
                border border-white/40
                rounded-2xl shadow-2xl
                text-slate-900
              "
            >
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-slate-800">
                  Verify your account
                </DialogTitle>
                <p className="text-sm text-slate-500 mt-1">
                  Enter the 6-digit code sent to your email
                </p>
              </DialogHeader>

              <div className="py-6 flex flex-col items-center gap-6">
                {/* OTP INPUT */}
                <InputOTP
                  maxLength={6}
                  value={value}
                  onChange={(value) => setValue(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>

                  <InputOTPSeparator />

                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                {/* SUBMIT */}
                <DialogClose asChild>
                  <Button
                    onClick={handleSubmit}
                    className="
                      w-full h-11
                      bg-blue-600 text-white font-semibold
                      hover:bg-blue-700
                    "
                  >
                    Verify OTP
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default AccountVerificationForm
