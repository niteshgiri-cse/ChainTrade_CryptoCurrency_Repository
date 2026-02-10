import React, { useEffect, useMemo } from "react"
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
import { useDispatch, useSelector } from "react-redux"
import { getAllOrdersForUser } from "@/State/order/Action"

const Activity = () => {

  const dispatch = useDispatch()
  const { orders, loading, error } = useSelector(
    (store) => store.order
  )

  useEffect(() => {
    dispatch(
      getAllOrdersForUser({
        jwt: localStorage.getItem("jwt"),
      })
    )
  }, [dispatch])

  const summary = useMemo(() => {
    const totalTrades = orders.length
    const buyOrders = orders.filter(o => o.orderType === "BUY").length
    const sellOrders = orders.filter(o => o.orderType === "SELL").length

    const netPnL = orders.reduce((acc, order) => {
      if (order.orderType === "SELL") {
        const buy = order.orderItem?.buyPrice || 0
        const sell = order.orderItem?.sellPrice || 0
        const qty = order.orderItem?.quantity || 0
        return acc + (sell - buy) * qty
      }
      return acc
    }, 0)

    return { totalTrades, buyOrders, sellOrders, netPnL }
  }, [orders])

  if (loading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 text-red-500">{error}</div>

  return (
    <div className="px-6 py-8 lg:px-16 lg:py-12 space-y-10 bg-background text-slate-900">

      <div>
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
          Trading Activity
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          History of your executed buy & sell orders
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-slate-500 uppercase">Total Trades</p>
          <p className="text-lg font-semibold">{summary.totalTrades}</p>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-slate-500 uppercase">Buy Orders</p>
          <p className="text-lg font-semibold text-green-600">
            {summary.buyOrders}
          </p>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-slate-500 uppercase">Sell Orders</p>
          <p className="text-lg font-semibold text-red-600">
            {summary.sellOrders}
          </p>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-slate-500 uppercase">Net P&L</p>
          <p
            className={`text-lg font-semibold ${
              summary.netPnL >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            ${summary.netPnL.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead>Date</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Buy Price</TableHead>
              <TableHead>Sell Price</TableHead>
              <TableHead>P&L</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => {

                const dateObj = new Date(order.timestamp)
                const date = dateObj.toLocaleDateString()
                const time = dateObj.toLocaleTimeString()

                const coin = order.orderItem?.coin
                const buyPrice = order.orderItem?.buyPrice || 0
                const sellPrice = order.orderItem?.sellPrice || 0
                const quantity = order.orderItem?.quantity || 0

                const pnl =
                  order.orderType === "SELL"
                    ? (sellPrice - buyPrice) * quantity
                    : 0

                const positive = pnl >= 0

                return (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div>
                        <div className="text-sm">{date}</div>
                        <div className="text-xs text-slate-500">{time}</div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={coin?.image} />
                        </Avatar>
                        <div>
                          <div className="text-sm">{coin?.name}</div>
                          <div className="text-xs text-slate-500 uppercase">
                            {coin?.symbol}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          order.orderType === "BUY"
                            ? "text-green-600 border-green-200"
                            : "text-red-600 border-red-200"
                        }
                      >
                        {order.orderType}
                      </Badge>
                    </TableCell>

                    <TableCell>${buyPrice}</TableCell>
                    <TableCell>${sellPrice}</TableCell>

                    <TableCell
                      className={
                        positive
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      <span className="flex items-center gap-1">
                        {positive ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                        ${Math.abs(pnl).toFixed(2)}
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      ${order.totalPrice}
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  No trading activity found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Activity
