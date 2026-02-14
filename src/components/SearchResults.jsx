"use client";

import { coins } from "@/data/coins";
import { useNavigate } from "react-router-dom";

const SearchResults = ({ query = "", closeSearch }) => {
  const navigate = useNavigate();

  const defaultCoins = coins.slice(0, 3);

  const filteredCoins = coins.filter((coin) => {
    const searchText = query.toLowerCase();
    return (
      coin.name.toLowerCase().includes(searchText) ||
      coin.symbol.toLowerCase().includes(searchText)
    );
  });

  const coinsToShow = query.trim() ? filteredCoins : defaultCoins;

  const handleSelect = (coinId) => {
    if (!coinId) return;
    if (closeSearch) closeSearch();
    navigate(`/market/${coinId}`);
  };

  return (
    <div className="space-y-2">
      {!query.trim() && (
        <p className="text-xs text-slate-400 mb-2">
          Popular Coins
        </p>
      )}

      {coinsToShow.length === 0 && (
        <p className="text-sm text-slate-400">
          No results found
        </p>
      )}

      {coinsToShow.map((coin) => (
        <div
          key={coin.id}
          onClick={() => handleSelect(coin.id)}
          className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition"
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-sm font-semibold text-indigo-600">
              {coin.symbol.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-slate-900">
                {coin.name}
              </p>
              <p className="text-xs text-slate-500 uppercase">
                {coin.symbol}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
