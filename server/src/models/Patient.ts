import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

// Define the attributes for the Patient model
interface PatientAttr {
  patient_id: number;
  patient_name: string;
  email: string;
  password: string;
  height: number;
  weight: number;
  age: number;
  dr_id: number;
}

// Define the optional attributes for creating a new Patient
interface PatientCreationAttributes extends Optional<PatientAttr, 'patient_id'> {}

// Define the Patient class extending Sequelize's Model
export class Patient extends Model<PatientAttr, PatientCreationAttributes> implements PatientAttr {
  public patient_id!: number;
  public patient_name!: string;
  public email!: string;
  public password!: string;
  public height!: number;
  public weight!: number;
  public age!: number;
  public dr_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Method to hash and set the password for the Patient
  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }
}

// Define the PatientFactory function to initialize the Patient model
export function PatientFactory(sequelize: Sequelize): typeof Patient {
  Patient.init(
    {
      patient_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      patient_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dr_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'doctors',
          key: 'dr_id',
        }
      }
    },
    {
      tableName: 'patients',  // Name of the table in PostgreSQL
      sequelize,// The Sequelize instance that connects to PostgreSQL
      hooks: {
        // Before creating a new Patient, hash and set the password
        beforeCreate: async (user: Patient) => {
          await user.setPassword(user.password);
        },
        // Before updating a Patient, hash and set the new password if it has changed
        beforeUpdate: async (user: Patient) => {
          if (user.changed('password')) {
            await user.setPassword(user.password);
          }
        },
      }
    }
  );

  return Patient;  // Return the initialized Patient model
}
