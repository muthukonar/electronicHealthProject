import { Router } from 'express';
import { patientRouter } from './patient-routes.js';
import { drRouter } from './dr-routes.js';


const apiRouter = Router();

apiRouter.use('/api/patients', patientRouter);
apiRouter.use('/api/doctors', drRouter);

export default apiRouter;
