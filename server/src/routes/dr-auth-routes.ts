import { Router, Request, Response } from 'express';
import { Dr } from '../models/Doctors.js';  // Import the Dr model
import jwt from 'jsonwebtoken';  // Import the JSON Web Token library
import bcrypt from 'bcrypt';  // Import the bcrypt library for password hashing
