import React, { useState } from "react";
import { Input } from "./ui/input"; // Correct the import path as per your folder structure
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function WalletConnection() {
  const [address, setAddress] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateAddress = (input: string) => {
    const isValidAddress = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(input);
    setIsValid(isValidAddress || input === "");
    return isValidAddress;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAddress(address)) {
      setIsLoading(true);
      setTimeout(() => {
        navigate(`/analysis/${address}`);
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col gap-6">
        <Button
          onClick={() => {}}
          disabled={isLoading}
          className="bg-[#9945FF] hover:bg-[#8035DB] text-white px-6 py-6 rounded-lg text-lg w-full border border-[#9945FF]/30 glow-button transition-all duration-300 hover:scale-105"
        >
          {isLoading ? "Connecting..." : "Connect Wallet"}
        </Button>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  validateAddress(e.target.value);
                }}
                placeholder="Enter Solana wallet address"
                error={!isValid && address !== "" ? "Please enter a valid Solana address" : ""}
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={!isValid || address === "" || isLoading}
                className="bg-[#9945FF] hover:bg-[#8035DB] text-white px-6 py-6 rounded-lg border border-[#9945FF]/30 transition-all duration-300 hover:scale-105"
              >
                {isLoading ? "Analyzing..." : "Check"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
