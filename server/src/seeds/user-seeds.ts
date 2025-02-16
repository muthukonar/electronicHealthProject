import { Patient } from '../models/index.js';

export const seedUsers = async () => {
  
    // Seeding Doctor data
  await Dr.bulkCreate([
    {dr_name: 'Muthu Konar', email: 'mk@clinic.com', password: 'password', specialization: 'Cardiology', patent_id: 1},
    {dr_name: 'Chad Abramson', email: 'ca@clinic.com', password: 'password', specialization: 'Dermatology', patent_id: 2},
    {dr_name: 'Jason Gerdes', email: 'jg@clinic.com', password: 'password', specialization: 'Nuero', patent_id: 3},
    {dr_name: 'Jazmin Guillen', email: 'jaz@clinic.com', password: 'password', specialization: 'Pediatric', patent_id: 4},
  ], { individualHooks: true });

  // Seeding Patient data
  await Patient.bulkCreate([
    {patient_name: 'John Doe',email: 'john@gmail.com',password: 'password',height: 180,weight: 75,age: 35,dr_id: 1 },
    {patient_name: 'Jane Smith',email: 'jane@gmail.com',password: 'password',height: 165,weight: 60,age: 28,dr_id: 2 },
    {patient_name: 'Jolly Guru',email: 'jolly@gmail.com',password: 'password',height: 140,weight: 50,age: 16,dr_id: 3 },
    {patient_name: 'Baby Guru',email: 'baby@gmail.com',password: 'password',height: 80,weight: 30,age: 9,dr_id: 4 },
    {patient_name: 'Kid Guru',email: 'kid@gmail.com',password: 'password',height: 10,weight: 10,age: 3,dr_id: 4 },
  ], { individualHooks: true });

  console.log('Seed data has been successfully inserted!');
};
