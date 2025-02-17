import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

// Define the attributes for the User model
interface DrAttr {
  dr_id: number;
  dr_name: string;
  email: string;
  password: string;
  specialization: string;
  patient_id: string [];
}

// Define the optional attributes for creating a new User
interface DrCreationAttributes extends Optional<DrAttr, 'dr_id'> {}

// Define the User class extending Sequelize's Model
export class Dr extends Model<DrAttr, DrCreationAttributes> implements DrAttr {
  public dr_id!: number;
  public dr_name!: string;
  public email!: string;
  public password!: string;
  public specialization!: string;
  public patient_id!: string [];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Method to hash and set the password for the user
  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }
}

// Define the UserFactory function to initialize the User model
export function DrFactory(sequelize: Sequelize): typeof Dr {
    Dr.init(
    {
      dr_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dr_name: {
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
      specialization:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      patient_id:{
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'patients',
          key: 'patient_id'
        }
      }
    },
    {
      tableName: 'doctors',  // Name of the table in PostgreSQL
      sequelize,// The Sequelize instance that connects to PostgreSQL
      hooks: {
        // Before creating a new user, hash and set the password
        beforeCreate: async (user: Dr) => {
          await user.setPassword(user.password);
        },
        // Before updating a user, hash and set the new password if it has changed
        beforeUpdate: async (user: Dr) => {
          if (user.changed('password')) {
            await user.setPassword(user.password);
          }
        },
      }
    }
  );

  return Dr;  // Return the initialized User model
}
