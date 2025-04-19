import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

export async function getAccountInfo(address: string) {
  try {
    const publicKey = new PublicKey(address);
    const accountInfo = await connection.getAccountInfo(publicKey);
    const balance = await connection.getBalance(publicKey);
    
    return { 
      exists: accountInfo !== null,
      balance,
      executable: accountInfo?.executable || false,
    };
  } catch (error) {
    console.error('Error fetching account info:', error);
    throw new Error('Invalid wallet address or RPC error');
  }
}

export async function getRecentTransactions(address: string) {
  try {
    const publicKey = new PublicKey(address);
    const signatures = await connection.getSignaturesForAddress(
      publicKey, 
      { limit: 100 }
    );
    
    const transactions = await Promise.all(
      signatures.map(sig => 
        connection.getTransaction(sig.signature, {
          maxSupportedTransactionVersion: 0
        })
      )
    );
    
    return transactions.filter(tx => tx !== null);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw new Error('Failed to fetch transaction history');
  }
}