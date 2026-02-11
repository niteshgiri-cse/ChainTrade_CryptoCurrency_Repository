import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAssetDetails } from "@/State/Asset/Action";
import { payOrder } from "@/State/order/Action";
import { getUserWallet } from "@/State/Wallet/Action";
import { DotIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function TreadingForm() {
  const [orderType, setOrderType] = useState("BUY");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState(0);

  const coin = useSelector((store) => store.coin);
  const wallet = useSelector((store) => store.wallet);
  const asset = useSelector((store) => store.asset);

  const dispatch = useDispatch();

  const coinDetails = coin?.coinDetails;
  const marketData = coinDetails?.market_data;
  const currentPrice = marketData?.current_price?.usd || 0;

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getUserWallet(jwt));
    }
  }, [dispatch]);

  useEffect(() => {
    if (coinDetails?.id) {
      dispatch(getAssetDetails(coinDetails.id));
    }
  }, [coinDetails?.id, dispatch]);

  const calculateBuyCost = (amt, price) => {
    if (!amt || !price) return 0;
    let volume = amt / price;
    let decimalPlace = Math.max(
      2,
      price.toString().split(".")[0].length
    );
    return Number(volume.toFixed(decimalPlace));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setAmount(value);

    if (currentPrice) {
      const volume = calculateBuyCost(value, currentPrice);
      setQuantity(volume);
    } else {
      setQuantity(0);
    }
  };

  const handleSubmitOrder = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt || !coinDetails?.id) return;

    dispatch(
      payOrder({
        jwt,
        amount,
        orderData: {
          coinId: coinDetails.id,
          quantity,
          orderType,
        },
      })
    );
  };

  const insufficientBalance =
    orderType === "BUY"
      ? Number(amount) > (wallet?.userWallet?.balance || 0)
      : quantity > (asset?.assetDetails?.quantity || 0);

  if (!coinDetails) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <div className="space-y-10 p-5">
      <div>
        <div className="flex gap-4 items-center justify-between">
          <Input
            className="py-7 focus:outline-none"
            placeholder="Enter amount..."
            onChange={handleChange}
            type="number"
            value={amount}
          />

          <div className="border text-2xl flex justify-center items-center w-36 h-14 rounded-md">
            <p>{quantity}</p>
          </div>
        </div>

        {insufficientBalance && (
          <h1 className="text-red-600 text-center pt-4">
            Insufficient balance
          </h1>
        )}
      </div>

      <div className="flex gap-5 items-center">
        <Avatar>
          <AvatarImage src={coinDetails?.image?.large} />
        </Avatar>

        <div>
          <div className="flex items-center gap-2">
            <p>{coinDetails?.symbol?.toUpperCase()}</p>
            <DotIcon className="text-gray-400" />
            <p className="text-gray-400">{coinDetails?.name}</p>
          </div>

          <div className="flex items-end gap-2">
            <p className="text-xl font-bold">
              ${currentPrice}
            </p>
            <p
              className={
                marketData?.market_cap_change_percentage_24h > 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {marketData?.market_cap_change_percentage_24h?.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p>Order Type</p>
        <p>Market Order</p>
      </div>

      <div className="flex items-center justify-between">
        <p>
          {orderType === "BUY"
            ? "Available Cash"
            : "Available Quantity"}
        </p>

        <p>
          {orderType === "BUY"
            ? "₹" + (wallet?.userWallet?.balance || 0)
            : asset?.assetDetails?.quantity || 0}
        </p>
      </div>

      <div>
        <Button
          disabled={insufficientBalance || !amount}
          onClick={handleSubmitOrder}
          className={`w-full py-6 ${
            orderType === "BUY"
              ? "bg-green-600 hover:bg-green-500"
              : "bg-red-600 hover:bg-red-500"
          }`}
        >
          {orderType}
        </Button>

        <Button
          variant="link"
          className="w-full mt-5 text-xl"
          onClick={() =>
            setOrderType(orderType === "BUY" ? "SELL" : "BUY")
          }
        >
          {orderType === "BUY" ? "Or SELL" : "Or BUY"}
        </Button>
      </div>
    </div>
  );
}

export default TreadingForm;
