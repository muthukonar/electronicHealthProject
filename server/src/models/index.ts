import sequelize from '../config/connection.js'
import { PatientFactory } from './Patient.js';
import { DrFactory } from './Doctors.js';


const Dr = DrFactory(sequelize);
const Patient = PatientFactory(sequelize);

export { Patient, Dr };
