import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/State/Asset/Action";

const Portfolio = () => {
  const dispatch = useDispatch();

  const { userAssets = [], loading } = useSelector(
    (store) => store.asset
  );
  
  useEffect(() => {
    dispatch(getUserAssets());
  }, [dispatch]);

  const calculateValue = (item) => {
    if (!item?.coin?.current_price || !item?.quantity) return 0;
    return item.quantity * item.coin.current_price;
  };

  const calculatePnl = (item) => {
    if (!item?.coin?.current_price || !item?.buyPrice || !item?.quantity)
      return 0;
    return (item.coin.current_price - item.buyPrice) * item.quantity;
  };

  const totalValue = userAssets.reduce(
    (acc, item) => acc + calculateValue(item),
    0
  );

  const totalPnl = userAssets.reduce(
    (acc, item) => acc + calculatePnl(item),
    0
  );

  return (
    <div className="px-6 py-8 lg:px-16 lg:py-12 space-y-10 bg-background text-slate-900">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
          Portfolio
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of your crypto holdings and performance
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Total Value
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-900">
            ${totalValue.toFixed(2)}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Total P&L
          </p>
          <p
            className={`mt-1 text-lg font-semibold ${
              totalPnl >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {totalPnl >= 0 ? "+" : "-"}$
            {Math.abs(totalPnl).toFixed(2)}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Assets
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-900">
            {userAssets.length}
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead>Asset</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Units</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>P&L</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            )}

            {!loading && userAssets.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No assets found
                </TableCell>
              </TableRow>
            )}

            {userAssets.map((item, index) => {
              const currentPrice = item.coin?.current_price || 0;
              const quantity = item.quantity || 0;
              const buyPrice = item.buyPrice || 0;

              const value = calculateValue(item);
              const pnl = calculatePnl(item);
              const positive = pnl >= 0;

              return (
                <TableRow
                  key={item.id || index}
                  className="border-b last:border-b-0 hover:bg-slate-50 transition"
                >
                  <TableCell className="py-5">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={item.coin?.image}
                          alt={item.coin?.name}
                        />
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">
                          {item.coin?.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {item.coin?.symbol?.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-5 text-sm font-medium">
                    ${currentPrice.toFixed(2)}
                  </TableCell>

                  <TableCell className="py-5 text-sm">
                    {quantity}
                  </TableCell>

                  <TableCell className="py-5 text-sm font-medium">
                    ${value.toFixed(2)}
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
                      {positive ? "+" : "-"}$
                      {Math.abs(pnl).toFixed(2)}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Portfolio;
