import { fetchMarketChart } from "@/State/coin/Action"
import React, { useEffect, useState, useMemo } from "react"
import ReactApexChart from "react-apexcharts"
import { useDispatch, useSelector } from "react-redux"

const timeSeries = [
  { label: "1D", text: "1 Day", days: 1 },
  { label: "7D", text: "7 Days", days: 7 },
  { label: "1M", text: "1 Month", days: 30 },
  { label: "6M", text: "6 Months", days: 180 },
]

const StockChart = ({ coinId }) => {
  const [activeLabel, setActiveLabel] = useState("7D")
  const dispatch = useDispatch()
  const { marketChart } = useSelector((store) => store.coin)

  const selectedRange = timeSeries.find(
    (t) => t.label === activeLabel
  )

  useEffect(() => {
    if (coinId) {
      dispatch(
        fetchMarketChart({
          coinId,
          days: selectedRange?.days,
          jwt: localStorage.getItem("jwt"),
        })
      )
    }
  }, [coinId, activeLabel, dispatch])

  const priceData =
    marketChart?.data?.prices?.map(([time, price]) => ({
      x: time,
      y: price,
    })) || []

  const minPrice =
    priceData.length > 0
      ? Math.min(...priceData.map((p) => p.y))
      : 0

  const maxPrice =
    priceData.length > 0
      ? Math.max(...priceData.map((p) => p.y))
      : 0

  const isPositive =
    priceData.length > 1 &&
    priceData[priceData.length - 1].y >
      priceData[0].y

  const chartColor = isPositive ? "#16a34a" : "#dc2626"

  const series = [
    {
      name: "Price",
      data: priceData,
    },
  ]

  const options = useMemo(
    () => ({
      chart: {
        type: "area",
        height: 420,
        toolbar: { show: false },
        zoom: { enabled: true },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0,
          stops: [0, 100],
        },
      },
      colors: [chartColor],
      grid: {
        borderColor: "#e5e7eb",
        strokeDashArray: 4,
      },
      xaxis: {
        type: "datetime",
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        opposite: true,
        min: minPrice - 0.0002,
        max: maxPrice + 0.0002,
        labels: {
          formatter: (val) => `$${val.toFixed(6)}`,
        },
      },
      tooltip: {
        theme: "dark",
        x: {
          format: "dd MMM yyyy HH:mm",
        },
        y: {
          formatter: (val) => `$${val.toFixed(6)}`,
        },
      },
      dataLabels: { enabled: false },
      legend: { show: false },
    }),
    [chartColor, minPrice, maxPrice]
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-xl bg-gray-100 p-1 w-fit">
        {timeSeries.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveLabel(item.label)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeLabel === item.label
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            {item.text}
          </button>
        ))}
      </div>

      <div className="w-full min-h-[420px]">
        {priceData.length > 0 && (
          <ReactApexChart
            key={priceData.length}
            options={options}
            series={series}
            type="area"
            height={420}
          />
        )}
      </div>
    </div>
  )
}

export default StockChart
