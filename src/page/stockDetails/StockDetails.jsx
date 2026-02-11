"use client";

import React, { useEffect } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { BookMarkedIcon, DotIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TreadingForm from "./TreadingForm";
import StockChart from "../Home/StockChart";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinDetails } from "@/State/coin/Action";
import { addItemToWatchlist } from "@/State/watchList/Action";

function StockDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { coinDetails, loading } = useSelector((store) => store.coin);
  const { watchlist } = useSelector((store) => store.watchlist);

  const isWatchlisted = watchlist?.coins?.some(
    (item) => item.id === coinDetails?.id
  );

  useEffect(() => {
    if (id) {
      dispatch(
        fetchCoinDetails({
          coinId: id,
          jwt: localStorage.getItem("jwt"),
        })
      );
    }
  }, [dispatch, id]);

  const handleAddToWatchList = () => {
    if (!coinDetails?.id) return;
    dispatch(addItemToWatchlist(coinDetails.id));
  };

  const marketData = coinDetails?.market_data;
  const price = marketData?.current_price?.usd;
  const marketCapChange =
    marketData?.market_cap_change_percentage_24h || 0;

  const isNegative = marketCapChange < 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm font-medium">
        Fetching coin details...
      </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white border border-gray-200 p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border">
            <AvatarImage src={coinDetails?.image?.large} />
          </Avatar>

          <div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-gray-900 uppercase">
                {coinDetails?.symbol}
              </span>
              <DotIcon className="h-4 w-4 text-gray-400" />
              <span className="text-gray-500">
                {coinDetails?.name}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <p className="text-2xl font-bold text-gray-900">
                ${price?.toLocaleString()}
              </p>

              <span
                className={`text-sm font-semibold ${
                  isNegative ? "text-red-500" : "text-green-600"
                }`}
              >
                {isNegative ? "" : "+"}
                {marketCapChange?.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            onClick={handleAddToWatchList}
            disabled={loading}
            variant="outline"
            className="w-full sm:w-auto border-gray-300 bg-white hover:bg-gray-100 transition"
          >
            {isWatchlisted ? (
              <BookmarkFilledIcon className="h-5 w-5 text-yellow-500" />
            ) : (
              <BookMarkedIcon className="h-5 w-5 text-gray-500" />
            )}
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold px-6">
                Trade
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-white border border-gray-200 text-gray-900">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                  How much do you want to spend?
                </DialogTitle>
              </DialogHeader>
              <TreadingForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-6">
        <StockChart coinId={id} />
      </div>
    </div>
  );
}

export default StockDetails;
