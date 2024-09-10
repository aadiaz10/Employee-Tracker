const inquirer = require('inquirer');
const db = require('./db/db');


const mainMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]).then((answer) => {
        switch (answer.action) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            default:
                db.end();
        }
    });
};

const viewDepartments = () => {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        mainMenu();
    });
};

const viewRoles = () => {
    db.query(`SELECT role.id, role.title, department.name AS department, role.salary
              FROM role
              JOIN department ON role.department_id = department.id`, (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        mainMenu();
    });
};

const viewEmployees = () => {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,
                     CONCAT(manager.first_name, ' ', manager.last_name) AS manager
              FROM employee
              JOIN role ON employee.role_id = role.id
              JOIN department ON role.department_id = department.id
              LEFT JOIN employee manager ON employee.manager_id = manager.id`, (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        mainMenu();
    });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'name',
            message: 'Enter the name of the department:'
        }
    ]).then((answer) => {
        db.query('INSERT INTO department (name) VALUES ($1)', [answer.name], (err, res) => {
            if (err) throw err;
            console.log(`Added ${answer.name} to the database`);
            mainMenu();
        });
    });
};

const addRole = () => {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        const departments = res.rows.map(({ id, name }) => ({ name, value: id }));

        inquirer.prompt([
            { name: 'title', message: 'Enter the name of the role:' },
            { name: 'salary', message: 'Enter the salary for the role:' },
            {
                type: 'list',
                name: 'department_id',
                message: 'Select the department for the role:',
                choices: departments
            }
        ]).then((answer) => {
            db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [answer.title, answer.salary, answer.department_id], (err, res) => {
                if (err) throw err;
                console.log(`Added ${answer.title} to the database`);
                mainMenu();
            });
        });
    });
};

const addEmployee = () => {
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        const roles = res.rows.map(({ id, title }) => ({ name: title, value: id }));

        db.query('SELECT * FROM employee', (err, res) => {
            if (err) throw err;
            const managers = res.rows.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));
            managers.unshift({ name: 'None', value: null });

            inquirer.prompt([
                { name: 'first_name', message: "Enter the employee's first name:" },
                { name: 'last_name', message: "Enter the employee's last name:" },
                {
                    type: 'list',
                    name: 'role_id',
                    message: "Select the employee's role:",
                    choices: roles
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: "Select the employee's manager:",
                    choices: managers
                }
            ]).then((answer) => {
                db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, res) => {
                    if (err) throw err;
                    console.log(`Added ${answer.first_name} ${answer.last_name} to the database`);
                    mainMenu();
                });
            });
        });
    });
};

const updateEmployeeRole = () => {
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        const employees = res.rows.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));

        db.query('SELECT * FROM role', (err, res) => {
            if (err) throw err;
            const roles = res.rows.map(({ id, title }) => ({ name: title, value: id }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Select the employee to update:',
                    choices: employees
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Select the new role for the employee:',
                    choices: roles
                }
            ]).then((answer) => {
                db.query('UPDATE employee SET role_id = $1 WHERE id = $2', [answer.role_id, answer.employee_id], (err, res) => {
                    if (err) throw err;
                    console.log(`Updated employee's role`);
                    mainMenu();
                });
            });
        });
    });
};

mainMenu();
