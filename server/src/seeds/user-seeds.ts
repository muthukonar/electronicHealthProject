import { Dr , Patient } from '../models/index.js';

export const seedUsers = async () => {
  
    // Seeding Doctor data
  await Dr.bulkCreate([
    {dr_name: 'Muthu Konar', email: 'mk@clinic.com', password: 'password', specialization: 'Cardiology'},
    {dr_name: 'Chad Abramson', email: 'ca@clinic.com', password: 'password', specialization: 'Dermatology'},
    {dr_name: 'Jason Gerdes', email: 'jg@clinic.com', password: 'password', specialization: 'Nuero'},
    {dr_name: 'Jazmin Guillen', email: 'jaz@clinic.com', password: 'password', specialization: 'Pediatric'},
  ], { individualHooks: true });

  // Seeding Patient data
  await Patient.bulkCreate([
    {patient_name: 'John Doe',email: 'john@gmail.com',password: 'password',height: 180,weight: 75,age: 35,dr_id: 1,notes: 'Patient has a history of high blood pressure'},
    {patient_name: 'Jane Smith',email: 'jane@gmail.com',password: 'password',height: 165,weight: 60,age: 28,dr_id: 2, notes: 'Patient has a history of skin allergies'},
    {patient_name: 'Jolly Guru',email: 'jolly@gmail.com',password: 'password',height: 140,weight: 50,age: 16,dr_id: 3, notes: 'Patient has a history of migraines'},
    {patient_name: 'Baby Guru',email: 'baby@gmail.com',password: 'password',height: 80,weight: 30,age: 9,dr_id: 4 , notes: 'Patient has a history of asthma'},
    {patient_name: 'Kid Guru',email: 'kid@gmail.com',password: 'password',height: 10,weight: 10,age: 3,dr_id: 4 , notes: 'Patient has a history of cough'},
  ], { individualHooks: true });

  console.log('Seed data has been successfully inserted!');
};
