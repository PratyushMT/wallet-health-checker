interface Metric {
  score: number;
  label: string;
}

interface HealthAnalysis {
  address: string;
  overallScore: number;
  metrics: {
    activity: Metric;
    balance: Metric;
    age: Metric;
    diversity: Metric;
  };
}

interface Recommendation {
  metric: string;
  severity: 'critical' | 'important' | 'suggestion';
  title: string;
  description: string;
  action: string;
}

export function generateRecommendations(healthAnalysis: HealthAnalysis): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const { metrics } = healthAnalysis;
  
  if (metrics.activity.score < 20) {
    recommendations.push({
      metric: 'activity',
      severity: 'critical',
      title: 'Very Low Wallet Activity',
      description: 'Your wallet shows extremely infrequent or irregular transaction patterns.',
      action: 'Consider making small, regular transactions to establish consistent activity.'
    });
  } else if (metrics.activity.score < 40) {
    recommendations.push({
      metric: 'activity',
      severity: 'important',
      title: 'Inconsistent Wallet Activity',
      description: 'Your transactions have significant gaps or irregular timing.',
      action: 'Try to maintain more regular transaction patterns.'
    });
  } else if (metrics.activity.score < 60) {
    recommendations.push({
      metric: 'activity',
      severity: 'suggestion',
      title: 'Moderate Activity Patterns',
      description: 'Your activity patterns could be more consistent.',
      action: 'Consider establishing a more regular cadence of transactions.'
    });
  }
  
  if (metrics.balance.score < 20) {
    recommendations.push({
      metric: 'balance',
      severity: 'critical',
      title: 'Critically Low Balance',
      description: 'Your wallet balance is dangerously low for covering transaction fees.',
      action: 'Add more SOL to your wallet immediately to ensure you can perform transactions.'
    });
  } else if (metrics.balance.score < 40) {
    recommendations.push({
      metric: 'balance',
      severity: 'important',
      title: 'Low SOL Balance',
      description: 'Your SOL balance is below the recommended level for your transaction volume.',
      action: 'Consider adding more SOL to maintain at least 0.25x your recommended balance.'
    });
  } else if (metrics.balance.score < 60) {
    recommendations.push({
      metric: 'balance',
      severity: 'suggestion',
      title: 'Moderate SOL Balance',
      description: 'Your balance is adequate but could be improved for better security.',
      action: 'For optimal operations, aim to keep your balance above 0.5x the recommended level.'
    });
  }
  
  if (metrics.age.score < 20) {
    recommendations.push({
      metric: 'age',
      severity: 'suggestion',
      title: 'Very New Wallet',
      description: 'Your wallet has been active for less than a week.',
      action: 'Continue using this wallet consistently to build its history and reputation.'
    });
  } else if (metrics.age.score < 40) {
    recommendations.push({
      metric: 'age',
      severity: 'suggestion',
      title: 'New Wallet',
      description: 'Your wallet has limited history on Solana.',
      action: 'Keep using this wallet regularly to establish a longer track record.'
    });
  }
  
  if (metrics.diversity.score < 20) {
    recommendations.push({
      metric: 'diversity',
      severity: 'important',
      title: 'Very Low Transaction Diversity',
      description: 'Your wallet interacts with very few different programs or contracts.',
      action: 'Try interacting with a wider variety of Solana dApps and programs.'
    });
  } else if (metrics.diversity.score < 40) {
    recommendations.push({
      metric: 'diversity',
      severity: 'suggestion',
      title: 'Limited Transaction Diversity',
      description: 'Your wallet could benefit from more diverse interactions.',
      action: 'Explore other DeFi protocols, NFT marketplaces, or Solana applications.'
    });
  } else if (metrics.diversity.score < 60) {
    recommendations.push({
      metric: 'diversity',
      severity: 'suggestion',
      title: 'Moderate Transaction Diversity',
      description: 'You interact with several programs but could diversify further.',
      action: 'Consider exploring more parts of the Solana ecosystem.'
    });
  }
  
  // Overall health recommendations
  if (healthAnalysis.overallScore < 30) {
    recommendations.push({
      metric: 'overall',
      severity: 'critical',
      title: 'Critical Overall Wallet Health',
      description: 'Your wallet shows significant issues across multiple metrics.',
      action: 'Address the critical recommendations above to improve your wallet\'s health.'
    });
  } else if (healthAnalysis.overallScore < 50) {
    recommendations.push({
      metric: 'overall',
      severity: 'important',
      title: 'Poor Overall Wallet Health',
      description: 'Your wallet health score indicates substantial room for improvement.',
      action: 'Follow the specific recommendations to improve your overall score.'
    });
  }
  
  if (recommendations.length === 0) {
    recommendations.push({
      metric: 'overall',
      severity: 'suggestion',
      title: 'Maintain Your Good Wallet Health',
      description: 'Your wallet is in good health based on our metrics.',
      action: 'Continue your current practices and consider exploring more of the Solana ecosystem.'
    });
  }
  
  return recommendations;
}