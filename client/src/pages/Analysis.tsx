import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Shield, Activity, Wallet, BarChart3 } from "lucide-react";
import { Button } from "../components/ui/button";
import HealthScoreGauge from "../components/health-score-gauge";
import MetricCard from "../components/metric-card";
import RecommendationList, { Recommendation } from "../components/recommendation-list";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 80, 
      damping: 15 
    }
  }
};

interface HealthData {
  address: string;
  overallScore: number;
  metrics: {
    activity: {
      score: number;
      label: string;
    };
    balance: {
      score: number;
      label: string;
    };
    age: {
      score: number;
      label: string;
    };
    diversity: {
      score: number;
      label: string;
    }
  }
}

interface RecommendationData {
  metric: string;
  severity: 'critical' | 'important' | 'suggestion';
  title: string;
  description: string;
  action: string;
}

export default function Analysis() {
  const { address } = useParams<{ address: string }>();
  const navigate = useNavigate();
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationData[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [healthError, setHealthError] = useState<string | null>(null);
  const [recError, setRecError] = useState<string | null>(null);
  
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchHealthData = async() => {
    if (!address) return;
    
    setIsLoading(true);
    setHealthError(null);
    
    try {
      const healthResponse = await axios.get(`${API_URL}/api/wallet/${address}/health`)
      if(!healthResponse){
        throw new Error(`Error retrieving health data`)
      }
      setHealthData(healthResponse.data)
    }
    catch(e) {
      console.error("Health data fetch error:", e);
      setHealthError(e instanceof Error ? e.message : 'Failed to fetch health data');
    }
  };
  
  const fetchRecommendations = async() => {
    if (!address) return;
    
    setRecError(null);
    
    try {
      const recommendationsRes = await axios.get(`${API_URL}/api/wallet/${address}/recommendations`, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      })
      if(!recommendationsRes){
        throw new Error(`Error retrieving recommendations`);
      }
      
      const recsData = recommendationsRes.data
      const recs = Array.isArray(recsData) ? recsData : recsData ? [recsData] : [];
      setRecommendations(recs);
    }
    catch(e) {
      console.error("Recommendations fetch error:", e);
      setRecError(e instanceof Error ? e.message : 'Failed to fetch recommendations');
    }
    finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      if (!address) return;
      
      setIsLoading(true);
      await fetchHealthData();
      await fetchRecommendations();
    };
    
    fetchData();
  }, [address]);


  const handleChangeWallet = () => {
    navigate("/");
  };

  const formatRecommendations = (): Recommendation[] => {
    if (!recommendations || recommendations.length === 0) {
      return [];
    }
    
    return recommendations.map((rec, index) => {
      let impact: "high" | "medium" | "low" = "medium";
      if (rec.severity === "critical") impact = "high";
      else if (rec.severity === "suggestion") impact = "low";
      
      return {
        id: `rec-${index}-${rec.metric}`,
        title: rec.title,
        description: rec.description,
        impact: impact,
        details: rec.action
      };
    });
  };
  
  const getMetricCards = () => {
    if (!healthData) return [];
    
    return [
      {
        id: "activity",
        name: "Activity",
        score: healthData.metrics.activity.score,
        icon: <Activity className="h-5 w-5 text-solana-green" />,
        description: `Your activity level is ${healthData.metrics.activity.label.toLowerCase()}.`,
        details: "This score is based on your transaction frequency and patterns over time."
      },
      {
        id: "balance",
        name: "Balance Maintenance",
        score: healthData.metrics.balance.score,
        icon: <Shield className="h-5 w-5 text-solana-purple" />,
        description: `Your balance maintenance is ${healthData.metrics.balance.label.toLowerCase()}.`,
        details: "This metric evaluates if you maintain sufficient SOL for transaction fees and operations."
      },
      {
        id: "age",
        name: "Wallet Age",
        score: Math.round(healthData.metrics.age.score),
        icon: <BarChart3 className="h-5 w-5 text-solana-purple" />,
        description: `Your wallet age score is ${healthData.metrics.age.label.toLowerCase()}.`,
        details: "This measures how long your wallet has been active on the Solana blockchain."
      },
      {
        id: "diversity",
        name: "Transaction Diversity",
        score: healthData.metrics.diversity.score,
        icon: <Wallet className="h-5 w-5 text-solana-blue" />,
        description: `Your transaction diversity is ${healthData.metrics.diversity.label.toLowerCase()}.`,
        details: "This analyzes the variety of programs and contracts your wallet interacts with."
      }
    ];
  };

  return (
    <motion.main 
      className="min-h-screen py-6 sm:py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="mb-6 sm:mb-12"
        variants={fadeIn}
        transition={{ delay: 0.2 }}
      >
        <motion.h1 
          className="text-2xl sm:text-3xl font-semibold text-white mb-4 glow-text"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Wallet Health Analysis
        </motion.h1>
        
        <motion.div 
          className="bg-[#1A1A2E] p-3 rounded-lg mb-4"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#B4B4D9]">Address</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleChangeWallet}
                className="text-solana-purple text-xs hover:text-white"
              >
                Change Wallet
              </Button>
            </div>
            <div className="font-mono text-xs text-white break-all">
              {address}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {isLoading ? (
        <motion.div 
          className="flex flex-col items-center justify-center py-24 min-h-[400px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="h-14 w-14 border-4 border-solana-purple rounded-full border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
          <motion.p 
            className="text-[#B4B4D9] text-lg mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Analyzing wallet health...
          </motion.p>
          <motion.p 
            className="text-[#B4B4D9]/60 text-sm mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            This may take a moment
          </motion.p>
        </motion.div>
      ) : (
        <>
          <motion.div 
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {healthError ? (
              <motion.div 
                className="bg-status-error/10 border border-status-error rounded-lg p-6"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-xl font-medium mb-2 text-status-error">Error Loading Health Data</h2>
                <p className="text-white">{healthError}</p>
                <Button 
                  onClick={handleChangeWallet} 
                  className="mt-4"
                >
                  Try Another Wallet
                </Button>
              </motion.div>
            ) : healthData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <HealthScoreGauge score={healthData.overallScore} />
              </motion.div>
            )}
          </motion.div>

          {!healthError && healthData && (
            <motion.div 
              className="mb-16"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h2 
                className="text-2xl font-semibold text-white mb-8 glow-text"
                variants={fadeIn}
              >
                Metrics Breakdown
              </motion.h2>
              <motion.div 
                className="grid md:grid-cols-2 gap-6 items-start"
                variants={staggerContainer}
              >
                {getMetricCards().map((metric, index) => (
                  <motion.div 
                    key={metric.id}
                    variants={cardVariants}
                    custom={index}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                  >
                    <MetricCard
                      icon={metric.icon}
                      name={metric.name}
                      score={metric.score}
                      description={metric.description}
                      details={metric.details}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {recError ? (
              <motion.div 
                className="p-6 bg-[#1A1A2E] rounded-lg border border-status-error/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-xl font-semibold text-white mb-4">Recommendations</h2>
                <p className="text-status-error mb-2">Failed to load recommendations</p>
                <p className="text-[#B4B4D9]">
                  We encountered an issue while getting personalized recommendations for your wallet.
                </p>
                <Button 
                  onClick={fetchRecommendations} 
                  className="mt-4 bg-solana-purple"
                  size="sm"
                >
                  Retry
                </Button>
              </motion.div>
            ) : formatRecommendations().length > 0 ? (
              <RecommendationList recommendations={formatRecommendations()} />
            ) : (
              <motion.div 
                className="p-6 bg-[#1A1A2E] rounded-lg border border-[#2A2A4A]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-xl font-semibold text-white mb-4">Recommendations</h2>
                <p className="text-[#B4B4D9]">
                  No specific recommendations for this wallet. Your wallet appears to be in good health!
                </p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </motion.main>
  );
}
