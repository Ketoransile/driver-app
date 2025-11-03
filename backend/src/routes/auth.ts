import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { drivers } from '../data/drivers';

const router = Router();
const JWT_SECRET = 'merkato-driver-secret-key-2024';

router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const driver = drivers.find(
    d => d.username === username && d.password === password
  );

  if (!driver) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: driver.id, username: driver.username },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  const { password: _, ...driverData } = driver;

  res.json({
    token,
    driver: driverData
  });
});

export default router;
