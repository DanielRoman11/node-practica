import { DataTypes } from "sequelize";
import { db } from "../config/db";

export const Image = db.define('image', {
  file: DataTypes.STRING
}, {
  timestamps: false
});
