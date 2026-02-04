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
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

const portfolioData = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: "$90,362",
    units: "0.45",
    value: "$40,662",
    change: "-2.58%",
    pnl: "-$1,085",
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: "$3,025",
    units: "3.2",
    value: "$9,680",
    change: "+3.36%",
    pnl: "+$312",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
]

const Portfolio = () => {
  return (
    <div className="px-6 py-8 lg:px-16 lg:py-12 space-y-10 bg-background text-slate-900">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
          Portfolio
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of your crypto holdings and performance
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Value", value: "$50,342" },
          { label: "24h Change", value: "+2.14%", positive: true },
          { label: "Total P&L", value: "+$1,280", positive: true },
          { label: "Assets", value: "2" },
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
                item.positive
                  ? "text-green-600"
                  : item.positive === false
                  ? "text-red-600"
                  : "text-slate-900"
              }`}
            >
              {item.value}
            </p>
          </div>
        ))}
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
                Units
              </TableHead>
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Value
              </TableHead>
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wide text-slate-600">
                24h
              </TableHead>
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wide text-slate-600 text-right">
                P&amp;L
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {portfolioData.map((item, index) => {
              const positive = item.change.startsWith("+")
              return (
                <TableRow
                  key={index}
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
                    {item.units}
                  </TableCell>

                  <TableCell className="py-5 text-sm font-medium text-slate-800">
                    {item.value}
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

                  <TableCell
                    className={`py-5 text-sm font-semibold text-right ${
                      item.pnl.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.pnl}
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

export default Portfolio
