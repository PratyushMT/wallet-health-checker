import React, { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { ArrowRight, Shield, Activity, Wallet, BarChart3 } from "lucide-react"
import { Link } from "react-router-dom"

export default function Home() {
  // State to store wallet address
  const [walletAddress, setWalletAddress] = useState("")

  // Handle input change
  const handleWalletAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(event.target.value)
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 glow-text">
            Check Your Solana Wallet Health
          </h1>
          <p className="text-xl text-[#B4B4D9] mb-12">
            Get insights and recommendations to improve your wallet security and performance
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button className="bg-[#9945FF] hover:bg-[#8035DB] text-white px-6 py-6 rounded-lg text-lg border border-[#9945FF]/30 glow-button transition-all duration-300 hover:scale-105">
              Connect Wallet
            </Button>
            <span className="flex items-center justify-center text-[#6B7280]">or</span>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                placeholder="Enter wallet address"
                value={walletAddress} // Add value prop
                onChange={handleWalletAddressChange} // Add onChange prop
                className="py-6 rounded-lg border-[#2A2A4A] bg-[#0F0F1A]/50 focus:border-[#9945FF] focus:ring-[#9945FF] text-white placeholder:text-[#6B7280]"
              />
              <Button
                type="submit"
                className="bg-[#9945FF] hover:bg-[#8035DB] text-white px-6 py-6 rounded-lg border border-[#9945FF]/30 transition-all duration-300 hover:scale-105"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-[#0A0A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-[#9945FF]" />}
              title="Security Analysis"
              description="Evaluate your wallet's security posture and identify potential vulnerabilities"
            />
            <FeatureCard
              icon={<Activity className="h-10 w-10 text-[#14F195]" />}
              title="Activity Monitoring"
              description="Review transaction patterns and identify unusual activity"
            />
            <FeatureCard
              icon={<Wallet className="h-10 w-10 text-[#00C2FF]" />}
              title="Asset Diversification"
              description="Analyze token distribution and portfolio balance"
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-[#9945FF]" />}
              title="Performance Metrics"
              description="Track wallet performance and compare against benchmarks"
            />
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-white mb-6">Understanding Your Wallet Health Score</h2>
          <p className="text-lg text-[#B4B4D9] mb-12">
            Your wallet health score is a comprehensive evaluation of security, activity patterns, asset
            diversification, and overall performance. A higher score indicates better wallet management practices and
            reduced risk.
          </p>
          <div className="flex justify-center mb-12">
            <div className="relative w-64 h-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-4 bg-[#1A1A2E] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="absolute top-8 left-0 h-8 w-1 bg-[#2A2A4A]"></div>
              <div className="absolute top-8 left-1/4 h-8 w-1 bg-[#2A2A4A]"></div>
              <div className="absolute top-8 left-1/2 h-8 w-1 bg-[#2A2A4A]"></div>
              <div className="absolute top-8 left-3/4 h-8 w-1 bg-[#2A2A4A]"></div>
              <div className="absolute top-8 right-0 h-8 w-1 bg-[#2A2A4A]"></div>
              <div className="absolute top-20 left-0 text-xs text-[#B4B4D9]">0</div>
              <div className="absolute top-20 left-1/4 text-xs text-[#B4B4D9]">25</div>
              <div className="absolute top-20 left-1/2 text-xs text-[#B4B4D9] -translate-x-1/2">50</div>
              <div className="absolute top-20 left-3/4 text-xs text-[#B4B4D9]">75</div>
              <div className="absolute top-20 right-0 text-xs text-[#B4B4D9]">100</div>
            </div>
          </div>
          <Link to="/analysis/demo" className="your-class">
            View Demo Analysis
          </Link>
        </div>
      </section>
    </main>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="p-6 glass-card rounded-xl hover:shadow-md transition-all duration-300 hover:scale-105 hover:border-[#9945FF]/30">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-medium text-white mb-3">{title}</h3>
      <p className="text-[#B4B4D9]">{description}</p>
    </Card>
  )
}
