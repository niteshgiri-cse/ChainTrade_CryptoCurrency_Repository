import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BookmarkFilledIcon } from "@radix-ui/react-icons"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

const watchListData = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: "$90,362",
    volume: "$47.1B",
    marketCap: "$1.80T",
    change: "-2.58%",
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: "$3,025",
    volume: "$18.4B",
    marketCap: "$364B",
    change: "+3.21%",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
]

const WatchList = () => {
  const handleRemoveToWatchList = (id) => {
    console.log("remove", id)
  }

  return (
    <div className="px-6 py-8 lg:px-16 lg:py-12 space-y-8 bg-background text-slate-900">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
          Watchlist
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Track your favorite assets and monitor market movements
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Asset
              </TableHead>
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Price
              </TableHead>
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Volume (24h)
              </TableHead>
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Market Cap
              </TableHead>
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wide text-slate-600">
                24h
              </TableHead>
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wide text-slate-600 text-right">
                Remove
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {watchListData.map((item) => {
              const positive = item.change.startsWith("+")
              return (
                <TableRow
                  key={item.id}
                  className="border-b last:border-b-0 hover:bg-slate-50 transition"
                >
                  <TableCell className="py-5">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={item.image} />
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium text-slate-900">
                          {item.name}
                        </div>
                        <div className="text-xs font-medium text-slate-500">
                          {item.symbol}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-5 text-sm font-medium text-slate-800">
                    {item.price}
                  </TableCell>

                  <TableCell className="py-5 text-sm text-slate-700">
                    {item.volume}
                  </TableCell>

                  <TableCell className="py-5 text-sm text-slate-700">
                    {item.marketCap}
                  </TableCell>

                  <TableCell
                    className={`py-5 text-sm font-medium ${
                      positive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      {positive ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      {item.change}
                    </span>
                  </TableCell>

                  <TableCell className="py-5 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleRemoveToWatchList(item.id)
                      }
                      className="
                        h-9 w-9
                        text-red-500
                        hover:bg-red-50
                        hover:text-red-600
                      "
                    >
                      <BookmarkFilledIcon className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default WatchList
