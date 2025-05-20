import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PublicKey } from "@solana/web3.js";

export default function WalletConnection() {
  const [address, setAddress] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateAddress = (input: string) => {
    if (!input) {
      setIsValid(true);
      return false;
    }
    try {
      const pubkey = new PublicKey(input);
      const isOnCurve = PublicKey.isOnCurve(pubkey.toBytes());
      
      setIsValid(isOnCurve);
      return isOnCurve;
    } 
    catch {
      setIsValid(false);
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAddress(address)) {
      setIsLoading(true);
      setTimeout(() => {
        navigate(`/analysis/address/${address}`);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    validateAddress(newAddress);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="text"
              value={address}
              onChange={handleAddressChange}
              placeholder="Enter Solana wallet address"
              className={`flex-1 py-3 sm:min-w-[300px] ${
                !isValid && address !== "" ? "border-status-error bg-status-error/5" : ""
              }`}
              error={!isValid && address !== ""}
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!isValid || address === "" || isLoading}
              className="sm:w-auto w-full px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all group"
            >
              {isLoading ? "Checking..." : (
                <>
                  Check 
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </div>
          {!isValid && address !== "" && (
            <p className="text-status-error text-sm">Please enter a valid Solana address</p>
          )}
        </div>
      </form>
    </div>
  );
}