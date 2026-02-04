import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VerifiedIcon, ShieldCheck } from "lucide-react";
import AccountVerificationForm from "./AccountVerificationForm";
import { useSelector } from "react-redux";

const Profile = () => {
  const auth = useSelector((store) => store.auth);
  const user = auth?.user ?? {};

  const personalInfo = [
    ["Account Id", user?.id ? `NDA4OE${user.id}` : "N/A"],
    ["Email", user?.email ?? "N/A"],
    ["Full Name", user?.username ?? "N/A"],
    [
      "Phone",
      user?.mobile
        ? `•••••• ${String(user.mobile).slice(-4)}`
        : "N/A",
    ],
    ["Nationality", "Indian"],
  ];

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 sm:py-12 lg:px-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">

        {/* PAGE TITLE */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Profile
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-1">
            Manage your personal information and security
          </p>
        </div>

        {/* PERSONAL INFO */}
        <Card className="rounded-2xl border border-slate-200 shadow-sm">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl font-semibold text-slate-900">
              Personal Information
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 sm:gap-y-6 gap-x-8 sm:gap-x-12">
              {personalInfo.map(([label, value]) => (
                <div key={label} className="flex items-start gap-3 sm:gap-4">
                  <p className="w-28 sm:w-36 text-xs sm:text-sm font-semibold text-slate-500">
                    {label}
                  </p>
                  <p className="text-sm sm:text-base font-medium text-slate-900 break-all">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SECURITY */}
        <Card className="rounded-2xl border border-slate-200 shadow-sm">
          <CardHeader className="pb-4 sm:pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg sm:text-xl font-semibold text-slate-900">
                Security
              </CardTitle>

              <Badge className="bg-emerald-100 text-emerald-700 gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                <VerifiedIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                Verified
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-5 sm:space-y-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
              </div>

              <div className="space-y-1">
                <p className="text-sm sm:text-base font-semibold text-slate-900">
                  Identity Verification
                </p>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md">
                  Your identity is verified. You can re-verify anytime to keep
                  your account secure and compliant.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="h-10 sm:h-11 px-5 sm:px-6 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm sm:text-base font-semibold shadow">
                    Re-Verify Identity
                  </Button>
                </DialogTrigger>

                <DialogContent className="bg-white rounded-xl">
                  <DialogHeader>
                    <DialogTitle className="text-base sm:text-lg font-semibold">
                      Re-Verify Your Identity
                    </DialogTitle>
                  </DialogHeader>

                  <AccountVerificationForm />
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                className="h-10 sm:h-11 px-5 sm:px-6 rounded-lg border-slate-300 text-slate-700 hover:bg-slate-100 text-sm sm:text-base font-semibold"
              >
                Reset Verification
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Profile;
