import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DragHandleHorizontalIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import Sidebar from "./Sidebar";
import {Atom} from "lucide-react";
import { useSelector } from "react-redux";
import store from "@/State/Store";

const Navbar = () => {
  const auth=useSelector(store=>store.auth);
  return (
    <header className="sticky top-0 z-50 bg-slate-50 border-b border-slate-200">
      <div className="h-16 px-8 flex items-center justify-between">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-8">
          {/* MENU BUTTON (BIGGER & CLEAN) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="
                  h-10 w-10
                  rounded-lg
                  hover:bg-slate-100
                "
              >
                <DragHandleHorizontalIcon className="h-6 w-6 text-slate-700" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-80 bg-white border-r border-slate-200"
            >
              <SheetHeader className="mb-8">
                <SheetTitle>
                  <div className="flex items-center text-xl font-semibold">
                    <div className="mr-1">
                      <Atom color="#4449ca" size={24} />
                    </div>
                    <span className="font-bold ">Chain</span>
                    <span className="text-orange-600 hover:text-orange-700 font-semibold">
                      Trade
                    </span>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <Sidebar />
            </SheetContent>
          </Sheet>

          {/* BRAND */}

          <div className="flex items-center text-xl font-semibold cursor-pointer">
            <div className="mr-1">
              <Atom color="#4449ca" size={24} />
            </div>
            <span className="font-bold ">Chain</span>
            <span className="text-orange-600 hover:text-orange-700 font-semibold">
              Trade
            </span>
          </div>

          {/* SEARCH BAR (BIGGER & PREMIUM) */}
          <div className="hidden md:flex">
            <Button
              variant="outline"
              className="
                h-10 px-5 gap-3
                text-sm
                text-slate-600
                border-slate-300
                rounded-lg
                hover:bg-slate-100
                hover:text-slate-900
              "
            >
              <MagnifyingGlassIcon className="h-4 w-4" />
              <span>Search assets</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10 cursor-pointer">
            <AvatarImage src={""} />
            <AvatarFallback className="text-xs font-semibold bg-slate-200 text-slate-800">
              {auth.user?.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
