console.clear();
//add dependencies

const db = require("mysql2");
const inquirer = require("inquirer");
const figlet = require("figlet");
const chalk = require("chalk");
require("dotenv").config();

const linebreak =
  "_______________________________________________________________________";

//connect to db
const connection = db.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root", // enter your db username here if not root
  password: process.env.DB_PASSWORD || "", //enter your db password here
  database: process.env.DB_NAME || "hr_tracker",
});

// start inquiry

const initPrompt = [
  {
    type: "list",
    name: "InitPrompt",
    message: "SELECT AN OPTION:",
    choices: [
      "View Departments",
      "View Employees",
      "View Roles",
      "Add Employee",
      "Add Role",
      "Add Department",
      "Edit Employee Role",
      "Quit",
    ],
  },
];

const addEmpPrmt = [
  {
    type: "input",
    name: "firstName",
    message: `ENTER EMPLOYEE'S FIRST NAME`,
  },
  {
    type: "input",
    name: "lastName",
    message: `ENTER EMPLOYEE'S LAST NAME`,
  },
  {
    type: "number",
    name: "roleId",
    message: `ENTER EMPLOYEE'S ROLE ID`,
  },
  {
    type: "number",
    name: "ManagerId",
    message: `ENTER EMPLOYEE MANAGER'S ID (if employee has no manager Enter 0)`,
  },
];

const addDepPrmt = [
  {
    type: "string",
    name: "depName",
    message: `ENTER DEPARTMENT NAME`,
  },
];

const addRolePrmt = [
  {
    type: "string",
    name: "roleTitle",
    message: `ENTER ROLE TITLE`,
  },
  {
    type: "number",
    name: "roleSalary",
    message: `ENTER SALARY FOR ROLE`,
  },
  {
    type: "number",
    name: "depId",
    message: `ENTER DEPARTMENT ID FOR ROLE`,
  },
];

const editRolePrmt = [
  {
    type: "number",
    name: "empId",
    message: `ENTER EMPLOYEE ID# OF EMPLOYEE WHOSE ROLE YOU WOULD LIKE TO EDIT:`,
  },
  {
    type: "number",
    name: "roleId",
    message: `ENTER NEW ROLE ID:`,
  },
];

function initPromptHandler() {
  inquirer.prompt(initPrompt).then((answer) => {
    switch (answer.InitPrompt) {
      case "View Departments":
        console.log("You Selected View Departments");
        viewDepartmentsHandler();
        break;

      case "View Employees":
        console.table("You Selected View Employees");
        viewEmployeesHandler();
        break;

      case "View Roles":
        console.log("You Selected View Roles");
        viewRolesHandler();
        break;

      case "Add Employee":
        console.log("You Selected Add Employee");
        addEmployeeHandler();
        break;

      case "Add Role":
        console.log("You Selected Add Role");
        addRoleHandler();
        break;

      case "Add Department":
        console.log("You Selected Add Department");
        addDepHandler();
        break;

      case "Edit Employee Role":
        console.log("You Selected Edit Employee Role");
        editRoleHandler();
        break;

      case "Quit":
        console.log("EXITING");
        process.exit(0);
    }
  });
}

function viewDepartmentsHandler() {
  connection.query("select * from department", (err, res) => {
    console.table(res);
    initPromptHandler();
  });
}

function viewEmployeesHandler() {
  connection.query("select * from employee", (err, res) => {
    console.table(res);
    initPromptHandler();
  });
}

function viewRolesHandler() {
  connection.query("select * from role", (err, res) => {
    console.table(res);
    initPromptHandler();
  });
}

function addEmployeeHandler() {
  inquirer.prompt(addEmpPrmt).then((answer) => {
    connection.query(
      "insert into employee (first_name, last_name, role_id, manager_id) values (?,?,?,?)",
      [answer.firstName, answer.lastName, answer.roleId, answer.ManagerId],
      function (err, res) {
        if (err) {
          console.error(
            chalk.redBright(`
            ${linebreak}
            ${err.sqlMessage}
            Please try again with valid input
            ${linebreak}
            `)
          );
          initPromptHandler();
        } else {
          console.log(
            chalk.greenBright(`
        ${linebreak}
        Successfully Added New Employee
        ${linebreak}
        `)
          );
          initPromptHandler();
        }
      }
    );
  });
}

function addDepHandler() {
  inquirer.prompt(addDepPrmt).then((answer) => {
    connection.query(
      "insert into department (name) values (?)",
      [answer.depName],
      (err, res) => {
        if (err) {
          console.error(
            chalk.redBright(`
                    ${linebreak}
                    ${err.sqlMessage}
                    Please try again with valid input
                    ${linebreak}
                    `)
          );
          initPromptHandler();
        } else {
          console.log(
            chalk.greenBright(`
                ${linebreak}
                Successfully Added New Department
                ${linebreak}
                `)
          );
          initPromptHandler();
        }
      }
    );
  });
}

function addRoleHandler() {
  inquirer.prompt(addRolePrmt).then((answer) => {
    connection.query(
      "insert into role (title, salary, department_id) values (?,?,?)",
      [answer.roleTitle, answer.roleSalary, answer.depId],
      (err, res) => {
        if (err) {
          console.error(
            chalk.redBright(`
                    ${linebreak}
                    ${err.sqlMessage}
                    Please try again with valid input
                    ${linebreak}
                    `)
          );
          initPromptHandler();
        } else {
          console.log(
            chalk.greenBright(`
                ${linebreak}
                Successfully Added New Role
                ${linebreak}
                `)
          );
          initPromptHandler();
        }
      }
    );
  });
}

function editRoleHandler() {
  inquirer.prompt(editRolePrmt).then((answer) => {
    connection.query(
      "update employee set role_id = ? where id = ?",
      [answer.roleId, answer.empId],
      (err, res) => {
        if (err) {
          console.error(
            chalk.redBright(`
                    ${linebreak}
                    ${err.sqlMessage}
                    Please try again with valid input
                    ${linebreak}
                    `)
          );
          initPromptHandler();
        } else {
          console.log(
            chalk.greenBright(`
                ${linebreak}
                Successfully Edited Employee Role
                ${linebreak}
                `)
          );
          initPromptHandler();
        }
      }
    );
  });
}

figlet("H. R. Management System", { font: "doom" }, (err, data) => {
  if (err) {
    console.dir(err);
    return;
  }
  console.log(chalk.blueBright(data));
  initPromptHandler();
});
