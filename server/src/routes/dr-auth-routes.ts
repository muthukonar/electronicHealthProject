import { Router, Request, Response } from 'express';
import { Dr } from '../models/Doctors.js';  // Import the Dr model
import jwt from 'jsonwebtoken';  // Import the JSON Web Token library
import bcrypt from 'bcrypt';  // Import the bcrypt library for password hashing

// Login function to authenticate a user

// Find the user in the database by username

// If user is not found, send an authentication failed response

// Compare the provided password with the stored hashed password
 
// If password is invalid, send an authentication failed response


// Get the secret key from environment variables


// Generate a JWT token for the authenticated user

    
// Get the secret key from environment variables


// Generate a JWT token for the authenticated user
   
// Send the token as a JSON response
// res.status(201).json(newUser);
  

// Create a new router instance for doctor


// POST /login - Login a dr

// Define the login route

// POST /users - Create a new dr


// Export the router instance
