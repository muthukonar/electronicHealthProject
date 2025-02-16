import { Router } from 'express';
import patientAuthRoutes from './patient-auth-routes.js';
import drAuthRoutes from './dr-auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', patientAuthRoutes);
router.use('/auth', drAuthRoutes);
router.use('/api', authenticateToken, apiRoutes);

export default router;
