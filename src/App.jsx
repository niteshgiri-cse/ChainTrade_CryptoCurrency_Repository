import Navbar from "./page/Navbar/Navbar";
import Home from "./page/Home/Home";
import { Route, Routes } from "react-router-dom";
import Portfolio from "./page/portfolio/portfolio";
import Activity from "./page/Activity/Activity";
import Wallet from "./page/wallet/Wallet";
import Withdrawal from "./page/withdrawal/Withdrawal";
import PaymentDetails from "./page/paymentDetails/PaymentDetails";
import StockDetails from "./page/stockDetails/StockDetails";
import WatchList from "./page/watchlist/WatchList";
import Profile from "./page/profile/Profile";
import SearchCoins from "./page/searchCoins/SearchCoins";
import Notfound from "./page/notfound/Notfound";
import Auth from "./page/auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./State/Auth/Action";

function App() {

  const auth=useSelector(store=>store.auth);
  const dispatch=useDispatch();
  console.log("auth----- ",auth)

  useEffect(()=>{
    dispatch(getUser( auth.jwt ||localStorage.getItem('jwt')));
  },[auth.jwt])
  return (
    <>
      {  auth.user ? <div>
     <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/withdrawal" element={<Withdrawal />} />
        <Route path="/payment-details" element={<PaymentDetails />} />
        <Route path="/market/:id" element={<StockDetails />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<SearchCoins />} />
        <Route path="*" element={<Home />} />
      </Routes>
      
  </div> : <Auth/>}
    </>
  );
}

export default App;
