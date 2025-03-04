import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Note = db.define('notes',{
    title: DataTypes.STRING,
    body: DataTypes.STRING
},{
    freezeTableName:true
})

export default Note;

(async()=>{
    await db.sync();
})();