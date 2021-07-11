//add dependencies
const db = require('mysql2')
const inquirer = require('inquirer')

require('dotenv').config()


const linebreak = '_______________________________________________________________________'

//connect to db

const connection = db.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",  // enter your db username here if not root
    password: process.env.DB_PASSWORD || "", //enter your db password here
    database: process.env.DB_NAME ||'hr_tracker',

})
// console.log(`connected to ${connection.config.host}:${connection.config.database} at PORT ${connection.config.port}`)
console.log(`${linebreak}
WELCOME TO HR MANAGER

`)



