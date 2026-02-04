import { Button } from "@/components/ui/button"
import { SheetClose } from "@/components/ui/sheet"
import { logout } from "@/State/Auth/Action"
import {
  ActivityLogIcon,
  BookmarkIcon,
  DashboardIcon,
  ExitIcon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons"
import { CreditCardIcon, LandmarkIcon, WalletIcon } from "lucide-react"
import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"

const menu = [
  { name: "Home", path: "/", icon: HomeIcon },
  { name: "Portfolio", path: "/portfolio", icon: DashboardIcon },
  { name: "Watchlist", path: "/watchlist", icon: BookmarkIcon },
  { name: "Activity", path: "/activity", icon: ActivityLogIcon },
  { name: "Wallet", path: "/wallet", icon: WalletIcon },
  { name: "Payment Details", path: "/payment-details", icon: LandmarkIcon },
  { name: "Withdrawal", path: "/withdrawal", icon: CreditCardIcon },
  { name: "Profile", path: "/profile", icon: PersonIcon },
]

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch=useDispatch();

  const handleLogOut=()=>{
    dispatch(logout());
     navigate("/")

  }

  return (
    <nav className="flex flex-col gap-1 px-2">
      {menu.map((item, index) => {
        const Icon = item.icon
        const active = location.pathname === item.path

        return (
          <SheetClose asChild key={index}>
            <Button
              onClick={() => navigate(item.path)}
              variant="ghost"
              className={`
                w-full justify-start gap-3
                h-11 px-4
                text-sm font-medium
                rounded-lg
                transition
                ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-700 hover:bg-slate-100"
                }
              `}
            >
              <Icon
                className={`h-5 w-5 ${
                  active ? "text-blue-600" : "text-slate-500"
                }`}
              />
              <span>{item.name}</span>
            </Button>
          </SheetClose>
        )
      })}

      {/* Divider */}
      <div className="my-3 border-t border-slate-200" />

      {/* Logout */}
      <SheetClose asChild>
        <Button
          variant="ghost"
          className="
            w-full justify-start gap-3
            h-11 px-4
            text-sm font-medium
            rounded-lg
            text-red-600
            hover:bg-red-50
          "
          onClick={() =>handleLogOut()}
        >
          <ExitIcon className="h-5 w-5" />
          Logout
        </Button>
      </SheetClose>
    </nav>
  )
}

export default Sidebar
