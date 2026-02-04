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
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

const activityData = [
  {
    id: 1,
    date: "2026-01-09",
    time: "12:39:32",
    asset: "Bitcoin",
    symbol: "BTC/USDT",
    type: "Buy",
    buyPrice: "$89,500",
    sellPrice: "$90,362",
    pnl: "+$862",
    value: "$4,343",
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    id: 2,
    date: "2026-01-08",
    time: "18:12:10",
    asset: "Ethereum",
    symbol: "ETH/USDT",
    type: "Sell",
    buyPrice: "$2,980",
    sellPrice: "$3,025",
    pnl: "-$54",
    value: "$1,220",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
]

const Activity = () => {
  return (
    <div className="px-6 py-8 lg:px-16 lg:py-12 space-y-10 bg-background text-slate-900">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
          Trading Activity
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          History of your executed buy & sell orders
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Trades", value: "128" },
          { label: "Buy Orders", value: "74" },
          { label: "Sell Orders", value: "54" },
          { label: "Net P&L", value: "+$1,420", positive: true },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-xl p-4"
          >
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              {item.label}
            </p>
            <p
              className={`mt-1 text-lg font-semibold ${
                item.positive ? "text-green-600" : "text-slate-900"
              }`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* ACTIVITY TABLE */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Date
              </TableHead>
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Asset
              </TableHead>
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Type
              </TableHead>
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Buy Price
              </TableHead>
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Sell Price
              </TableHead>
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wide text-slate-600">
                P&amp;L
              </TableHead>
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wide text-slate-600 text-right">
                Value
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {activityData.map((item) => {
              const positive = item.pnl.startsWith("+")
              return (
                <TableRow
                  key={item.id}
                  className="border-b last:border-b-0 hover:bg-slate-50 transition"
                >
                  <TableCell className="py-5">
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {item.date}
                      </div>
                      <div className="text-xs text-slate-500">
                        {item.time}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-5">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={item.image} />
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">
                          {item.asset}
                        </div>
                        <div className="text-xs text-slate-500">
                          {item.symbol}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-5">
                    <Badge
                      variant="outline"
                      className={`px-3 py-1 text-xs font-semibold ${
                        item.type === "Buy"
                          ? "text-green-600 border-green-200"
                          : "text-red-600 border-red-200"
                      }`}
                    >
                      {item.type}
                    </Badge>
                  </TableCell>

                  <TableCell className="py-5 text-sm text-slate-700">
                    {item.buyPrice}
                  </TableCell>

                  <TableCell className="py-5 text-sm text-slate-700">
                    {item.sellPrice}
                  </TableCell>

                  <TableCell
                    className={`py-5 text-sm font-semibold ${
                      positive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      {positive ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      {item.pnl}
                    </span>
                  </TableCell>

                  <TableCell className="py-5 text-sm font-medium text-right">
                    {item.value}
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

export default Activity
