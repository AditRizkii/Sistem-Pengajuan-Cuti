import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users', {
    uuid : {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty:true
        }
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty:true,
            len: [3, 100]
        }
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty:true,
            isEmail:true
        }
    },
    nip : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty:true,
            len: [2, 18]
        }
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty:true,
        }
    },
    sisacuti : {
        type: DataTypes.INTEGER,
        defaultValue: 12,
        allowNull: false,
        validate: {
            notEmpty:true,
        }
    },
    role : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty:true,
        }
    }
}, {
    freezeTableName: true
})

export default Users;