import { Sequelize } from 'sequelize';
import { PatientFactory } from './Patient.js';
import { DrFactory } from './Doctors.js';
// import { fetchNotes } from './Notes.js';

const sequelize = new Sequelize('postgres://postgres:postgres1!@localhost:5432/ehealth_db');
const Dr = DrFactory(sequelize);
const Patient = PatientFactory(sequelize);
// const Note = fetchNotes();

// Define Many-to-Many Association
Dr.belongsToMany(Patient, { through: 'DoctorPatients', foreignKey: 'dr_id' });
Patient.belongsToMany(Dr, { through: 'DoctorPatients', foreignKey: 'patient_id' });

// Sync Database
sequelize.sync({ alter: true })  // Use { force: true } only for development resets
  .then(() => console.log('Database synced successfully!'))
  .catch((err) => console.error('Error syncing database:', err));

export { Patient, Dr};
