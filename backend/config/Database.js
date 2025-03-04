import { Sequelize } from "sequelize";

const db = new Sequelize('note_db','root','',{
    host: 'localhost',
    dialect:'mysql'
})

export default db;