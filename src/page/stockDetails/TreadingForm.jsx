import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DotIcon } from "lucide-react";
import React from "react";

function TreadingForm() {
    const [orderType, setOrderType] = React.useState("BUY"); 

  const handleChange = (e) => {
    console.log("Entered amount:", e.target.value);
  };
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
            <p>4563</p>
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
                "https://cdn.pixabay.com/photo/2021/12/03/10/32/ethereum-6842405_1280.png"
              }
            />
          </Avatar>
        </div>
              <div>
        <div className="flex items-center gap-2">
          <p>BTC</p>
          <DotIcon className="text-gray-400" />
          <p className="text-gray-400">Bitcoin</p>
        </div>
        <div className="flex items-end gap-2">
          <p className="text-xl font-bold">$90,362</p>
          <p className="text-red-600">
            <span>23234324.53</span>
            <span>(-2.58%)</span>
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
          {orderType==="BUY"? "$12,000" : "0.234 BTC"}
        </p>
        </div>
        <div>
          <Button className={`w-full py-6  ${orderType === "BUY" ? "bg-green-600 hover:bg-green-500" : "bg-red-600 hover:bg-red-500" }`} >
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
