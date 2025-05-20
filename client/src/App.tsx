import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import Navbar from "./components/navbar";
import WalletContextProvider from "./components/wallet-provider";

export default function App() {
  return (
    <WalletContextProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 grid-bg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analysis/address/:address" element={<Analysis />} />
          </Routes>
        </main>
      </div>
    </WalletContextProvider>
  );
}
