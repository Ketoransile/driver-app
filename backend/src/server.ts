import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import deliveryRoutes from './routes/deliveries';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ 
    message: 'Merkato Driver API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth/login',
      deliveries: '/api/deliveries/:driverId'
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/deliveries', deliveryRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Merkato Driver Backend running on http://localhost:${PORT}`);
  console.log(`📦 Ready to serve delivery data for Ethiopian drivers`);
});
