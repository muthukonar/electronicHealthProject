import { Router, Request, Response } from 'express';
import { Dr } from '../models/Doctors.js';  // Import the Dr model
import jwt from 'jsonwebtoken';  // Import the JSON Web Token library
import bcrypt from 'bcrypt';  // Import the bcrypt library for password hashing
import { Op } from 'sequelize'; // Import Sequelize operator for queries

// Login function to authenticate a doctor
export const loginDr = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body; // Allow login with either email or username

    // Find the doctor in the database by username or email
    const doctor = await Dr.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    // If doctor is not found, send an authentication failed response
    if (!doctor) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare the provided password with the stored hashed password
    const passwordIsValid = await bcrypt.compare(password, doctor.password);
    
    // If password is invalid, send an authentication failed response
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Get the secret key from environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';
    if (!secretKey) {
      return res.status(500).json({ message: 'Server error: Missing JWT secret key' });
    }

    // Generate a JWT token for the authenticated doctor
    const token = jwt.sign({ username: doctor.username, email: doctor.email }, secretKey, { expiresIn: '1h' });

    // Send the token as a JSON response
    return res.json({ token });

  } catch (error: any) {
    console.error('Doctor login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Doctor registration function
export const signUpDr = async (req: Request, res: Response) => {
  try {
    const { username, email, password, specialization } = req.body;

    // Check if doctor already exists
    const existingDr = await Dr.findOne({ where: { email } });
    if (existingDr) {
      return res.status(400).json({ message: 'Doctor already exists with this email' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new doctor
    const newDr = await Dr.create({ username, email, password: hashedPassword, specialization });

    console.log('New doctor created:', newDr);

    // Get the secret key from environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';
    if (!secretKey) {
      return res.status(500).json({ message: 'Server error: Missing JWT secret key' });
    }

    // Generate a JWT token for the new doctor
    const token = jwt.sign({ username: newDr.username, email: newDr.email }, secretKey, { expiresIn: '1h' });

    // Send the token as a JSON response
    return res.status(201).json({ token });

  } catch (error: any) {
    console.error('Doctor signup error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new router instance for doctor
const doctorRouter = Router();

// POST /login - Login a doctor
doctorRouter.post('/login', loginDr);

// POST /signup - Create a new doctor
doctorRouter.post('/signup', signUpDr);

// Export the router instance
export default doctorRouter;
