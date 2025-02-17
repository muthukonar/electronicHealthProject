import express from 'express';
import type { Request, Response } from 'express';
import { Patient } from '../../models/index.js';

const patientRouter = express.Router();

// GET /patients - Get all patient
patientRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const patient = await Patient.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(patients);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /users/:id - Get a user by id
patientRouter.get('/:id', async (req: Request, res: Response) => {
  const { patient_id } = req.params;
  try {
    const patient = await Patient.findByPk(patient_id, {
      attributes: { exclude: ['password'] }
    });
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /patients/:patient_id - Update a patient by patient_id
patientRouter.put('/:patient_id', async (req: Request, res: Response) => {
  const { patient_id } = req.params;
  const { email, password } = req.body;
  try {
    const patient = await Patient.findByPk(patient_id);
    if (patient) {
      patient.email = email;
      patient.password = password;
      await patient.save();
      res.json(patient);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /patients/:patient_id - Delete a patient by patient_id
patientRouter.delete('/:patient_id', async (req: Request, res: Response) => {
  const { patient_id } = req.params;
  try {
    const patient = await Patient.findByPk(patient_id);
    if (patient) {
      await patient.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { patientRouter as patientRouter };
