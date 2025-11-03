import { Router, Request, Response } from 'express';
import { deliveries, updateDeliveryStatus } from '../data/deliveries';

const router = Router();

router.get('/:driverId', (req: Request, res: Response) => {
  const { driverId } = req.params;

  const driverDeliveries = deliveries.filter(d => d.driverId === driverId);

  res.json({
    deliveries: driverDeliveries,
    total: driverDeliveries.length
  });
});

router.patch('/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !['Pending', 'In Transit', 'Delivered'].includes(status)) {
    return res.status(400).json({ 
      error: 'Valid status is required (Pending, In Transit, or Delivered)' 
    });
  }

  const updatedDelivery = updateDeliveryStatus(id, status);

  if (!updatedDelivery) {
    return res.status(404).json({ error: 'Delivery not found' });
  }

  res.json({
    delivery: updatedDelivery,
    message: 'Delivery status updated successfully'
  });
});

export default router;
