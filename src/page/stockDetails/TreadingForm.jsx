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
    const [orderType, setOrderType] = React.useState("BUY"); 
    const [amount,setAmount]=useState(0);
    const [quantity,setQuantity]=useState(0);
    const coin=useSelector(store=>store.coin);
    const wallet=useSelector(store=>store.wallet);
    const asset=useSelector(store=>store.asset);
  const marketData = coin?.coinDetails?.market_data;
    const dispatch=useDispatch();
    useEffect(()=>{
      const jwt = localStorage.getItem("jwt")
          dispatch(getUserWallet(jwt))
        dispatch(getAssetDetails(coin.coinDetails?.id))

    },[])
  const handleChange = (e) => {
    setAmount(e.target.value)
    const volume=calculateBuyCost(amount, coin.coinDetails.market_data.current_price.usd);
    setQuantity(volume);
  };
  const calculateBuyCost=(amount,price)=>{
    let volume=amount/price;
    let decimalPlace=Math.max(2,price.toString().split(".")[0].length)
    return volume.toFixed(decimalPlace);
  }

  const handleBuyCrypto=()=>{
    dispatch(payOrder({jwt:localStorage.getItem("jwt"),
      amount,
      orderData:{
        coinId:coin.coinDetails?.id,
        quantity,
        orderType
      }
    }))
  }
  return (
    <div className="space-y-10 p-5">
      <div>
        <div className="flex gap-4 item-center justify-between">
          <Input
            className="py-7 focus:outline-none"
            placeholder="Enter amount..."
            onChange={handleChange}
            type="number"
            name="amount"
          />
          <div className="border text-2xl  flex justify-center items-center w-36 h-14 rounded-md">
            <p>{quantity}</p>
          </div>
        </div>
        {false && (
          <h1 className="text-red-600 text-center pt-4">
            Insufficent wallet balance to buy
          </h1>
        )}
      </div>
      <div className="flex gap-5 items-center">
        <div>
          <Avatar>
            <AvatarImage
              src={
               coin?.coinDetails?.image?.large
              }
            />
          </Avatar>
        </div>
              <div>
        <div className="flex items-center gap-2">
          <p>{coin.coinDetails?.symbol.toUpperCase()}</p>
          <DotIcon className="text-gray-400" />
          <p className="text-gray-400">{coin?.coinDetails?.name}</p>
        </div>
        <div className="flex items-end gap-2">
          <p className="text-xl font-bold">${coin.coinDetails.market_data?.current_price.usd}</p>
          <p className="text-red-600">
            <span>{marketData?.market_cap_change_percentage_24h}</span>
          </p>
        </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p>Order Type</p>
        <p>Market Order</p>
      </div>
      <div className="flex item-center justify-between">
         <p>
            {orderType==="BUY"?"Available Cash":"Available Quantity"}
        </p>
        <p>
          {orderType==="BUY"?"₹"+(wallet.userWallet?.balance || 0): (asset.assetDetails?.quantity || 0)}
        </p>
        </div>
        <div>
          <Button
              onClick={handleBuyCrypto}
          
          className={`w-full py-6  ${orderType === "BUY" ? "bg-green-600 hover:bg-green-500" : "bg-red-600 hover:bg-red-500" }`} >
            {orderType }
          </Button>
          <Button
          variant="link"
           className="w-full mt-5 text-xl" onClick={()=>setOrderType(orderType === "BUY" ? "SELL" : "BUY")}>
            {orderType === "BUY" ? "Or SELL" : "Or BUY"}
          </Button>
        </div>
    </div>
  );
}

export default TreadingForm;
