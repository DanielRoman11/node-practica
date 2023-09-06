import { DataTypes } from "sequelize";
import { db } from "../config/db.js";
import bcrypt, { hash } from "bcrypt";
 
export const User = db.define('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
      is: /^\w{3,}$/
    }
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: async function(user) {
      const salt = await bcrypt.genSalt(12);

      user.password = await bcrypt.hash(user.password, salt);
    },
    beforeUpdate: async function(user) {
      const salt = await bcrypt.genSalt(12);

      user.password = await bcrypt.hash(user.password, salt);
    }    
  },
  defaultScope: {
    attributes: {
      exclude: ['password']
    },
  }
},{
  instanceMethods: {
    validPassword: (password) => {
      return bcrypt.compareSync(password, this.password);
    }
  }
});

User.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}