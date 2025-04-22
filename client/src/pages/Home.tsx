import { Shield, Activity, Wallet, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import WalletConnection from "../components/wallet-connection";

export default function Home() {
  return (
    <>
      <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 glow-text">
            Check Your Solana Wallet Health
          </h1>
          <p className="text-xl text-[#B4B4D9] mb-12">
            Get insights and recommendations to improve your wallet security and performance
          </p>

          <div className="mb-16">
            <WalletConnection />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-6 lg:px-8 bg-[#0A0A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-solana-purple" />}
              title="Security Analysis"
              description="Evaluate your wallet's security posture and identify potential vulnerabilities"
            />
            <FeatureCard
              icon={<Activity className="h-10 w-10 text-solana-green" />}
              title="Activity Monitoring"
              description="Review transaction patterns and identify unusual activity"
            />
            <FeatureCard
              icon={<Wallet className="h-10 w-10 text-solana-blue" />}
              title="Asset Diversification"
              description="Analyze token distribution and portfolio balance"
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-solana-purple" />}
              title="Performance Metrics"
              description="Track wallet performance and compare against benchmarks"
            />
          </div>
        </div>
      </section>

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
          <Link to="/analysis/demo">
            <Button variant="outline" className="glow-border">
              View Demo Analysis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="p-6 glass-card rounded-xl hover:shadow-md transition-all duration-300 hover:scale-105 hover:border-solana-purple/30">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-medium text-white mb-3">{title}</h3>
      <p className="text-[#B4B4D9]">{description}</p>
    </Card>
  );
}
