import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Maximize2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import AssistTable from "./AssistTable"
import StockChart from "./StockChart"
import { useDispatch, useSelector } from "react-redux"
import { fetchTop50Coins, getCoinList } from "@/State/coin/Action"

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { coinList = [], top50 = [], loading } =
    useSelector((store) => store.coin)

  const [category, setCategory] = useState("all")
  const [isMobile, setIsMobile] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState(null)

  useEffect(() => {
    dispatch(getCoinList(70))
    dispatch(fetchTop50Coins())
  }, [dispatch])

  useEffect(() => {
    if (category === "all" && coinList.length > 0) {
      setSelectedCoin(coinList[0])
    }

    if (category === "top50" && top50.length > 0) {
      setSelectedCoin(top50[0])
    }
  }, [category, coinList, top50])

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkScreen()
    window.addEventListener("resize", checkScreen)
    return () => window.removeEventListener("resize", checkScreen)
  }, [])

  const handleAssetClick = (coin) => {
    if (isMobile) {
      navigate(`/market/${coin.id}`)
    } else {
      setSelectedCoin(coin)
    }
  }

  if (loading && coinList.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-slate-600">
          Loading Market Data...
        </p>
      </div>
    )
  }

  const isNegative =
    selectedCoin?.price_change_percentage_24h < 0

  return (
    <div className="w-full h-screen bg-slate-50 text-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-[38%_62%] h-full">

        {/* LEFT SIDE */}
        <div className="border-r border-slate-200 flex flex-col bg-white">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200">
            {["all", "top50"].map((item) => {
              const active = category === item
              return (
                <Button
                  key={item}
                  size="sm"
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-3 text-xs font-medium capitalize border transition ${
                    active
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {item.replace("top", "Top ")}
                </Button>
              )
            })}
          </div>

          <div className="flex-1 overflow-auto">
            <AssistTable
              onAssetClick={handleAssetClick}
              coin={category === "all" ? coinList : top50}
              loading={loading}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex flex-col bg-white">
          {selectedCoin && (
            <>
              {/* HEADER */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-slate-200">
                <div className="flex items-center gap-4">

                  <img
                    src={selectedCoin.image}
                    alt={selectedCoin.name}
                    className="w-12 h-12 rounded-full"
                  />

                  <div>
                    <div className="text-xl font-semibold text-slate-900">
                      {selectedCoin.name}
                    </div>

                    <div className="text-sm text-slate-500 uppercase">
                      {selectedCoin.symbol}
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <h1 className="text-3xl font-semibold tracking-tight">
                        $
                        {selectedCoin.current_price?.toLocaleString()}
                      </h1>

                      <span
                        className={`text-sm font-semibold ${
                          isNegative
                            ? "text-red-500"
                            : "text-green-600"
                        }`}
                      >
                        {selectedCoin.price_change_percentage_24h?.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full"
                  onClick={() =>
                    navigate(`/market/${selectedCoin.id}`)
                  }
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>

              {/* CHART */}
              <div className="flex-1">
                <div className="h-full w-full border border-slate-200">
                  <StockChart coinId={selectedCoin.id} />
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  )
}

export default Home
