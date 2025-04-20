import { Link } from "react-router-dom"

import { Button } from "./ui/button.tsx"

export default function Navbar() {
  return (
    <header className="border-b border-[#2A2A4A] bg-[#0F0F1A]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link  to="/" className="flex items-center">
              <span className="text-2xl font-bold gradient-text">SolHealth</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Button
              variant="outline"
              className="border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF] hover:text-white transition-all duration-300 glow-border"
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
