"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DragHandleHorizontalIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import Sidebar from "./Sidebar";
import { Atom, UserRound } from "lucide-react";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import SearchResults from "../../components/SearchResults";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const auth = useSelector((store) => store.auth);

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [searchOpen]);

  return (
    <header className="sticky top-0 z-50 bg-slate-50 border-b border-slate-200">
      <div className="h-16 px-8 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-8">

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <DragHandleHorizontalIcon className="h-6 w-6 text-slate-700" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-80 bg-white">
              <Sidebar />
            </SheetContent>
          </Sheet>

          <div className="flex items-center text-xl font-semibold cursor-pointer">
            <Atom color="#4449ca" size={24} />
            <span className="ml-1 font-bold">Chain</span>
            <span className="text-orange-600 font-semibold">Trade</span>
          </div>

          {/* Search Dialog */}
          <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="h-10 px-5 gap-3 text-sm rounded-lg border-slate-300 hover:bg-slate-100"
              >
                <MagnifyingGlassIcon className="h-4 w-4" />
                Search assets
                <span className="ml-4 text-xs bg-slate-200 px-2 py-1 rounded">
                  ⌘K
                </span>
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl p-0 bg-white rounded-xl shadow-xl">
              
              <div className="border-b p-4">
                <div className="flex items-center gap-3">
                  <MagnifyingGlassIcon className="h-5 w-5 text-slate-500" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for coins..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full h-10 outline-none text-base"
                  />
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto p-4">
                <SearchResults
                  query={query}
                  closeSearch={() => {
                    setSearchOpen(false);
                    setQuery("");
                  }}
                />
              </div>

            </DialogContent>
          </Dialog>

        </div>

        {/* RIGHT */}
        <Avatar className="h-10 w-10 cursor-pointer">
          <AvatarImage src="" />
          <AvatarFallback>
            {auth.user?.username?.[0]?.toUpperCase() || <UserRound />}
          </AvatarFallback>
        </Avatar>

      </div>
    </header>
  );
};

export default Navbar;
