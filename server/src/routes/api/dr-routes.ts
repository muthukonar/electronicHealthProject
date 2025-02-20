import express from 'express';
import type { Request, Response } from 'express';
import { Dr } from '../../models/index.js';
import bcrypt from 'bcrypt';

const drRouter = express.Router();

// GET /doctors - Get all doctors

drRouter.get('/', async (_req: Request, res: Response) => {
    try {
      const dr = await Dr.findAll({
        attributes: { exclude: ['password'] }
      });
      res.json(dr);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

// GET /doctors/:doctor_id - Get a doctor by doctor_id
drRouter.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log (id);
    try {
      const dr = await Dr.findByPk(id, {
        // attributes: { exclude: ['password'] }
      });
      if (dr) {
        res.json(dr);
      } else {
        res.status(404).json({ message: 'Doctor not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  

// PUT /doctors/:doctor_id - Update a doctor by doctor_id

drRouter.put('/:dr_id', async (req: Request, res: Response) => {
    const { dr_id } = req.params;
    const { email, password } = req.body;
    try {
      const dr = await Dr.findByPk(dr_id);
      if (!dr) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      
      if (email) dr.email = email;
      if (password) {
      dr.password = await bcrypt.hash(password, 10);
      }
      
      await dr.save();
      res.json(dr);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
    return;
  });

// DELETE /doctors/:doctor_id - Delete a doctor by doctor_id

drRouter.delete('/:dr_id', async (req: Request, res: Response) => {
    const { dr_id } = req.params;
    try {
      const dr = await Dr.findByPk(dr_id);
      if (!dr) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      await dr.destroy();
      res.json({ message: 'Doctor deleted' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
    return;
  });
  
  export { drRouter as drRouter };
  


  
  