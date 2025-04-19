import express from 'express';
import { getWalletHealth, getWalletRecommendations } from './controllers/wallet';
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.get('/', (req, res) => {
  res.send('Walth API is running!');
});

app.get('/api/wallet/:address/health', (req, res, next) => {
  getWalletHealth(req, res).catch(next);
});
app.get('/api/wallet/:address/recommendations', (req, res, next) => {
  getWalletRecommendations(req, res).catch(next);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});