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

// start inquiry

const initPrompt = [
    {
        type: 'list',
        name: 'InitPrompt',
        message: 'SELECT AN OPTION:',
        choices: [
            'View Departments',
            'View Employees',
            'View Roles',
            'Add Employee',
            'Add Role',
            'Add Department',
            'Edit Employee Role',
            'Quit'
        ]
    }
]

function initPromptHandler() {
    inquirer.prompt(initPrompt).then((answer) => {
        switch (answer.InitPrompt) {
            case 'View Departments':
                console.log('You Selected View Departments')
                //insert view dep func
                viewDepartmentsHandler()
                break;
            
            case 'View Employees':
                console.log('You Selected View Employees')
                //insert function
                viewEmployeesHandler()
                break;

            case 'View Roles':
                console.log('You Selected View Roles')
                //insert role func
                viewRolesHandler()
                break;

            case 'Add Employee':
                console.log('You Selected Add Employee')
                //insert function
                break;

            case 'Add Role':
                console.log('You Selected Add Role')
                //insert function
                break;

            case 'Add Department':
                console.log('You Selected Add Department')
                //insert function
                break;

            case 'Edit Employee Role':
                console.log('You Selected Edit Employee Role')
                //insert function
                break;

            case 'Quit':
                console.log('EXITING')
                //insert function
                process.exit(0)
        }
    }
    )
}

initPromptHandler()

function viewDepartmentsHandler(){
    connection.query('select * from department', (err, res) => {
        console.log(res)
        initPromptHandler()

    }
    )
}

function viewEmployeesHandler(){
    connection.query('select * from employee', (err, res) => {
        console.log(res)
        initPromptHandler()

    }
    )
}

function viewRolesHandler(){
    connection.query('select * from role', (err, res) => {
        console.log(res)
        initPromptHandler()

    }
    )
}

