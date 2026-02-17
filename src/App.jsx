import Navbar from "./page/Navbar/Navbar";
import Home from "./page/Home/Home";
import { Route, Routes } from "react-router-dom";

import Activity from "./page/Activity/Activity";
import Wallet from "./page/wallet/Wallet";
import Withdrawal from "./page/withdrawal/Withdrawal";
import PaymentDetails from "./page/paymentDetails/PaymentDetails";
import StockDetails from "./page/stockDetails/StockDetails";
import WatchList from "./page/watchlist/WatchList";
import Profile from "./page/profile/Profile";
import SearchCoins from "./page/searchCoins/SearchCoins";
import Auth from "./page/auth/Auth";
import Portfolio from "./page/portfolio/Portfolio";

import ProtectedRoute from "./config/ProtectedRoute";
import PublicRoute from "./config/PublicRoute";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./State/Auth/Action";

function App() {
  const dispatch = useDispatch();

  const { jwt, loading } = useSelector((store) => store.auth);

  useEffect(() => {
    const token = jwt || localStorage.getItem("jwt");
    if (token) {
      dispatch(getUser(token));
    }
  }, [jwt, dispatch]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/auth" element={<Auth />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchCoins />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/withdrawal" element={<Withdrawal />} />
          <Route path="/payment-details" element={<PaymentDetails />} />
          <Route path="/market/:id" element={<StockDetails />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
