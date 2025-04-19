import { Request, Response } from 'express';
import { analyzeWalletHealth } from '../services/analysis';
import { generateRecommendations } from '../services/recommendations';

export async function getWalletHealth(req: Request, res: Response) {
  try {
    const { address } = req.params;
    
    if (!address) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }
    
    const healthAnalysis = await analyzeWalletHealth(address);
    return res.json(healthAnalysis);
  } catch (error) {
    console.error('Health check error:', error);
    return res.status(500).json({ error: 'Failed to analyze wallet health' });
  }
}

export async function getWalletRecommendations(req: Request, res: Response) {
  try {
    const { address } = req.params;
    
    if (!address) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }
    
    const healthAnalysis = await analyzeWalletHealth(address);
    const recommendations = generateRecommendations(healthAnalysis);
    
    return res.json(recommendations);
  } catch (error) {
    console.error('Recommendations error:', error);
    return res.status(500).json({ error: 'Failed to generate recommendations' });
  }
}