import { getAccountInfo, getRecentTransactions } from './solana';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export async function analyzeWalletHealth(address: string) {
  try {
    const accountInfo = await getAccountInfo(address);
    const transactions = await getRecentTransactions(address);
    
    // metrics
    const activityScore = calculateActivityConsistency(transactions);
    const balanceScore = calculateBalanceMaintenance(accountInfo.balance, transactions);
    const ageScore = calculateWalletAge(accountInfo, transactions);
    const diversityScore = calculateTransactionDiversity(transactions);
    
    const overallScore = Math.round(
      (activityScore + balanceScore + ageScore + diversityScore) / 4
    );
    
    return {
      address,
      overallScore,
      metrics: {
        activity: {
          score: activityScore,
          label: getScoreLabel(activityScore),
        },
        balance: {
          score: balanceScore,
          label: getScoreLabel(balanceScore),
        },
        age: {
          score: ageScore,
          label: getScoreLabel(ageScore),
        },
        diversity: {
          score: diversityScore,
          label: getScoreLabel(diversityScore),
        }
      },
    };
  } catch (error) {
    console.error('Analysis error:', error);
    throw new Error('Failed to analyze wallet health');
  }
}
//@ts-ignore
function calculateActivityConsistency(transactions) {
  // No transactions case
  if (!transactions.length) return 0;
  if (transactions.length === 1) return 20;
  
  //@ts-ignore
  const validTransactions = transactions.filter(tx => tx && typeof tx.blockTime === 'number');
  
  if (validTransactions.length === 0) return 15;
  if (validTransactions.length === 1) return 20;
  
  // Sort transactions by timestamp
  const sortedTransactions = [...validTransactions].sort((a, b) => a.blockTime - b.blockTime);
  
  const timeGaps = [];
  for (let i = 1; i < sortedTransactions.length; i++) {
    const currentTxTime = sortedTransactions[i].blockTime;
    const prevTxTime = sortedTransactions[i-1].blockTime;
    
    if (currentTxTime && prevTxTime && currentTxTime >= prevTxTime) {
      const gapInDays = (currentTxTime - prevTxTime) / (60 * 60 * 24);
      timeGaps.push(gapInDays);
    }
  }
  
  if (timeGaps.length === 0) {
    return Math.min(50, 20 + validTransactions.length * 2);
  }
  
  try {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const mostRecentTx = Math.max(...sortedTransactions.map(tx => tx.blockTime || 0));
    
    if (!mostRecentTx || mostRecentTx <= 0) {
      console.warn('Invalid mostRecentTx value detected:', mostRecentTx);
      return 30;
    }
    
    const daysSinceLastActivity = (currentTimestamp - mostRecentTx) / (60 * 60 * 24);
    
    let recencyPenalty = 0;
    if (daysSinceLastActivity > 180) recencyPenalty = 70;
    else if (daysSinceLastActivity > 90) recencyPenalty = 50;
    else if (daysSinceLastActivity > 30) recencyPenalty = 30;
    else if (daysSinceLastActivity > 14) recencyPenalty = 15;
    
    const mean = timeGaps.reduce((sum, gap) => sum + gap, 0) / timeGaps.length;
    
    if (mean === 0) {
      return Math.max(30, 100 - recencyPenalty); // Min score of 30 even with penalty
    }
    
    const variance = timeGaps.reduce((sum, gap) => sum + Math.pow(gap - mean, 2), 0) / timeGaps.length;
    const stdDev = Math.sqrt(variance);
    const coefficientOfVariation = stdDev / mean;
    
    const cappedCoV = Math.min(coefficientOfVariation, 3);
    const regularityScore = 100 - (cappedCoV / 3 * 75);
    
    const frequencyBonus = Math.min(25, Math.log(validTransactions.length + 1) * 10);
    
    const rawScore = regularityScore + frequencyBonus;
    const minScore = validTransactions.length >= 5 ? 30 : 15; // Active wallets get at least 30
    
    return Math.min(100, Math.round(Math.max(minScore, rawScore - recencyPenalty)));
  } catch (error) {
    console.error('Error calculating activity score:', error);
    return Math.min(40, 15 + transactions.length * 2);
  }
}
//@ts-ignore
function calculateBalanceMaintenance(balance, transactions) {
  const solBalance = balance / LAMPORTS_PER_SOL;
  
  const isDevnet = true;
  
  const minimumRecommendedBalance = isDevnet ? 0.05 : 0.1; // Higher for mainnet
  
  // transaction volume from history
  let totalTransactionVolume = 0;
  let avgFee = 0;
  
  if (transactions.length > 0) {
    const fees = transactions
    //@ts-ignore
      .filter(tx => tx.meta?.fee !== undefined)
      //@ts-ignore
      .map(tx => tx.meta.fee / LAMPORTS_PER_SOL);
    
    if (fees.length > 0) {
      //@ts-ignore
      avgFee = fees.reduce((sum, fee) => sum + fee, 0) / fees.length;
      totalTransactionVolume = Math.max(1, transactions.length);
    }
  }
  
  if (transactions.length < 5) {
    const recommendedBalance = minimumRecommendedBalance * (isDevnet ? 1 : 2);
    const balanceRatio = solBalance / recommendedBalance;
    
    if (balanceRatio >= 3) return 90;
    if (balanceRatio >= 1.5) return 80;
    if (balanceRatio >= 1) return 70;
    if (balanceRatio >= 0.5) return 50;
    if (balanceRatio >= 0.25) return 30;
    return 10;
  }
  
  const estimatedTwoWeekFees = avgFee * totalTransactionVolume * 0.1; 
  const recommendedBalance = Math.max(minimumRecommendedBalance, estimatedTwoWeekFees);
  
  const balanceRatio = solBalance / recommendedBalance;
  
  if (balanceRatio >= 3) return 100;
  if (balanceRatio >= 1.5) return 90;
  if (balanceRatio >= 1) return 80;
  if (balanceRatio >= 0.5) return 60;
  if (balanceRatio >= 0.25) return 40;
  if (balanceRatio >= 0.1) return 20;
  
  return 10;
}

//@ts-ignore
function calculateWalletAge(accountInfo, transactions) {
  // If no transactions, we can't determine age accurately
  if (!transactions.length) return 30;
  
  const oldestTxTimestamp = Math.min(
    ...transactions
    //@ts-ignore
      .filter(tx => tx.blockTime)
      //@ts-ignore
      .map(tx => tx.blockTime)
  );
  
  if (!oldestTxTimestamp) return 30; // Can't determine age
  
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const ageInDays = (currentTimestamp - oldestTxTimestamp) / (60 * 60 * 24);
  
  if (ageInDays < 1) return 10;
  if (ageInDays < 7) return 20;
  if (ageInDays < 30) return 30 + (ageInDays / 30) * 10;
  if (ageInDays < 180) return 40 + (ageInDays / 180) * 30;
  if (ageInDays < 365) return 70 + (ageInDays / 365) * 15;
  if (ageInDays < 730) return 85 + (ageInDays / 730) * 10;
  
  return 95 + Math.min(5, (ageInDays - 730) / 365);
}

//@ts-ignore
function calculateTransactionDiversity(transactions) {
  if (!transactions.length) return 0;
  if (transactions.length < 3) return 20;
  
  const programInteractions = new Map();
  let totalInteractions = 0;
  //@ts-ignore
  transactions.forEach(tx => {
    if (tx.meta?.logMessages) {
      //@ts-ignore
      tx.meta.logMessages.forEach(log => {
        const invokeMatch = log.match(/Program invoke: (.+)/);
        if (invokeMatch && invokeMatch[1]) {
          const programId = invokeMatch[1].trim();
          const currentCount = programInteractions.get(programId) || 0;
          programInteractions.set(programId, currentCount + 1);
          totalInteractions++;
        }
      });
    }
    
    if (tx.transaction?.message?.accountKeys) {
      //@ts-ignore
      tx.transaction.message.accountKeys.forEach(key => {
        if (key.toString() !== '11111111111111111111111111111111') {
          const programId = key.toString();
          const currentCount = programInteractions.get(programId) || 0;
          programInteractions.set(programId, currentCount + 1);
          totalInteractions++;
        }
      });
    }
  });
  
  if (totalInteractions === 0) return 10;
  if (programInteractions.size < 2) return 30;
  
  const uniqueProgramsCount = programInteractions.size;
  
  let entropy = 0;
  programInteractions.forEach((count) => {
    const probability = count / totalInteractions;
    entropy -= probability * Math.log2(probability);
  });
  
  const maxEntropy = Math.log2(uniqueProgramsCount);
  const evenness = maxEntropy > 0 ? entropy / maxEntropy : 0;
  
  const uniqueScore = Math.min(70, uniqueProgramsCount * 5); // Less points per program
  const evennessScore = programInteractions.size >= 3 ? (evenness * 30) : (evenness * 15);
  
  return Math.round(uniqueScore + evennessScore);
}

//@ts-ignore
function getScoreLabel(score) {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  if (score >= 20) return 'Poor';
  return 'Critical';
}