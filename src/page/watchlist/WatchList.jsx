import React, { useEffect } from "react"
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
import { useDispatch, useSelector } from "react-redux"
import { getUserWatchlist } from "@/State/watchList/Action"
import { addItemToWatchlist } from "@/State/watchList/Action"

const WatchList = () => {

  const dispatch = useDispatch()
  const { watchlist } = useSelector(store => store.watchlist)

  useEffect(() => {
    dispatch(getUserWatchlist())
  }, [dispatch])

  const handleRemoveToWatchList = (coinId) => {
    dispatch(addItemToWatchlist(coinId)) // toggle remove
  }

  return (
    <div className="px-6 py-8 lg:px-16 lg:py-12 space-y-8 bg-background text-slate-900">

      <div>
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
          Watchlist
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Track your favorite assets
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead>Asset</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Market Cap</TableHead>
              <TableHead>24h</TableHead>
              <TableHead className="text-right">Remove</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {watchlist?.coins?.length > 0 ? (
              watchlist.coins.map((item) => {

                const positive =
                  item.price_change_percentage_24h >= 0

                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={item.image} />
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-500 uppercase">
                            {item.symbol}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      ${item.current_price?.toLocaleString()}
                    </TableCell>

                    <TableCell>
                      ${item.market_cap?.toLocaleString()}
                    </TableCell>

                    <TableCell
                      className={`font-medium ${
                        positive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        {positive ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                        {item.price_change_percentage_24h?.toFixed(2)}%
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleRemoveToWatchList(item.id)
                        }
                        className="text-red-500 hover:bg-red-50"
                      >
                        <BookmarkFilledIcon className="h-5 w-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  No coins in watchlist
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default WatchList
