import { Router, Request, Response } from 'express';
import { Dr } from '../models/Doctors.js';  // Import the Dr model
import jwt from 'jsonwebtoken';  // Import the JSON Web Token library
import bcrypt from 'bcrypt';  // Import the bcrypt library for password hashing

// Login function to authenticate a dr
export const drLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;  // Extract username and password from request body

  // Find the dr in the database by username
  const dr = await Dr.findOne({
    where: { email },
  });

  // If dr is not found, send an authentication failed response
  if (!dr) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Compare the provided password with the stored hashed password
  const drPasswordIsValid = await bcrypt.compare(password, dr.password);
  // If password is invalid, send an authentication failed response
  if (!drPasswordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Get the secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';

  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
  return res.json({ token });  // Send the token as a JSON response
};

export const drSignUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const newDr = await Dr.create({ email, password });

    console.log(newDr);
    
      // Get the secret key from environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ username: newDr.email }, secretKey, { expiresIn: '1h' });
    res.json({ token });  // Send the token as a JSON response
    // res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

// Create a new router instance for dr
const drAuthRouter = Router();

// POST /login - Login a dr
drAuthRouter.post('/drLogin', drLogin);  // Define the login route

// POST /users - Create a new dr
drAuthRouter.post('/drSignup', drSignUp);

export default drAuthRouter;  // Export the router instance
