import { Shield, Activity, Wallet, BarChart3, AlertCircle } from "lucide-react";
import { Card } from "../components/ui/card";
import WalletConnection from "../components/wallet-connection";
import { motion, Variants } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 12 
    }
  }
};

const scoreBarVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: { 
    scaleX: 1,
    transition: { 
      delay: 0.4,
      duration: 1, 
      ease: "easeOut" 
    }
  }
};

export default function Home() {
  return (
    <>
      <motion.section 
        className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          variants={fadeIn}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-semibold text-white mb-4 glow-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Check Your Solana Wallet Health
          </motion.h1>
          <motion.p 
            className="text-xl text-[#B4B4D9] mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Get insights and recommendations to improve your wallet security and performance
          </motion.p>

          <motion.div
            className="inline-flex items-center gap-2 mx-auto mb-5 px-4 py-2 rounded-md bg-amber-900/30 border border-amber-500/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <p className="text-sm text-amber-200">
              <span className="font-semibold">Beta Release:</span> Currently operating on Devnet only
            </p>
          </motion.div>

          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <WalletConnection />
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section 
        className="py-16 px-4 md:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            <MotionFeatureCard
              icon={<Shield className="h-10 w-10 text-solana-purple" />}
              title="Security Analysis"
              description="Evaluate your wallet's security posture and identify potential vulnerabilities"
              variants={cardVariants}
            />
            <MotionFeatureCard
              icon={<Activity className="h-10 w-10 text-solana-green" />}
              title="Activity Monitoring"
              description="Review transaction patterns and identify unusual activity"
              variants={cardVariants}
            />
            <MotionFeatureCard
              icon={<Wallet className="h-10 w-10 text-solana-blue" />}
              title="Asset Diversification"
              description="Analyze token distribution and portfolio balance"
              variants={cardVariants}
            />
            <MotionFeatureCard
              icon={<BarChart3 className="h-10 w-10 text-solana-purple" />}
              title="Performance Metrics"
              description="Track wallet performance and compare against benchmarks"
              variants={cardVariants}
            />
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          variants={fadeIn}
        >
          <motion.h2 
            className="text-3xl font-semibold text-white mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Understanding Your Wallet Health Score
          </motion.h2>
          <motion.p 
            className="text-lg text-[#B4B4D9] mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Your wallet health score is a comprehensive evaluation of security, activity patterns, asset
            diversification, and overall performance. A higher score indicates better wallet management practices and
            reduced risk.
          </motion.p>
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="relative w-64 h-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-4 bg-[#1A1A2E] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
                    variants={scoreBarVariants}
                  ></motion.div>
                </div>
              </div>
              <motion.div 
                className="absolute top-8 left-0 h-8 w-1 bg-[#2A2A4A]"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.2 }}
              ></motion.div>
              <motion.div 
                className="absolute top-8 left-1/4 h-8 w-1 bg-[#2A2A4A]"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.2 }}
              ></motion.div>
              <motion.div 
                className="absolute top-8 left-1/2 h-8 w-1 bg-[#2A2A4A]"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.2 }}
              ></motion.div>
              <motion.div 
                className="absolute top-8 left-3/4 h-8 w-1 bg-[#2A2A4A]"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.2 }}
              ></motion.div>
              <motion.div 
                className="absolute top-8 right-0 h-8 w-1 bg-[#2A2A4A]"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0, duration: 0.2 }}
              ></motion.div>
              <motion.div 
                className="absolute top-20 left-0 text-xs text-[#B4B4D9]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1, duration: 0.2 }}
              >0</motion.div>
              <motion.div 
                className="absolute top-20 left-1/4 text-xs text-[#B4B4D9]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.2 }}
              >25</motion.div>
              <motion.div 
                className="absolute top-20 left-1/2 text-xs text-[#B4B4D9] -translate-x-1/2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.3, duration: 0.2 }}
              >50</motion.div>
              <motion.div 
                className="absolute top-20 left-3/4 text-xs text-[#B4B4D9]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.4, duration: 0.2 }}
              >75</motion.div>
              <motion.div 
                className="absolute top-20 right-0 text-xs text-[#B4B4D9]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5, duration: 0.2 }}
              >100</motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
}

function MotionFeatureCard({
  icon,
  title,
  description,
  variants
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  variants: Variants;
}) {
  return (
    <motion.div variants={variants}>
      <Card className="p-6 glass-card rounded-xl transition-all duration-300 h-full flex flex-col">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-medium text-white mb-3">{title}</h3>
        <p className="text-[#B4B4D9] flex-grow">{description}</p>
      </Card>
    </motion.div>
  );
}