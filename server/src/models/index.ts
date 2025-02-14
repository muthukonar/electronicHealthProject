import sequelize from '../config/connection.js'
import { UserFactory } from './Patient.js';

const User = UserFactory(sequelize);

export { User };
