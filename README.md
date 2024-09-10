# Employee-Tracker
Employee Tracker
Description:

This application allows users to view and manage information related to employees, roles, and departments through an interactive command-line interface. Built using Node.js, PostgreSQL, and Inquirer.js, this project provides a straightforward way to track employee details and streamline organizational tasks.

Features
View All Departments: Display a list of all departments with their names and IDs.
View All Roles: Show job titles, role IDs, associated departments, and salaries.
View All Employees: List employee details including IDs, first names, last names, job titles, departments, salaries, and managers.
Add a Department: Add a new department to the database.
Add a Role: Add a new role to the database, including the role's name, salary, and associated department.
Add an Employee: Add a new employee, specifying their first name, last name, role, and manager.
Update an Employee Role: Modify the role of an existing employee.

Installation
Clone the Repository

bash
Copy code
git clone https://github.com/aadiaz10/Employee-Tracker
Navigate to the Project Directory

bash
Copy code
cd employee-tracker
Install Dependencies

bash Copy code
npm install
Set Up the Database

Ensure PostgreSQL is installed and running.
Create a database and update the .env file with your PostgreSQL credentials.
Run the Application

bash
Copy code
node index.js
Configuration
Create a .env file in the root of the project and add your PostgreSQL credentials:


When you start the application, you will be presented with a command-line menu to choose from various options:

View All Departments
View All Roles
View All Employees
Add a Department
Add a Role
Add an Employee
Update an Employee Role
Follow the prompts to interact with the database and manage your company's data.

Troubleshooting
Database Connection Error: Ensure your .env file has the correct credentials and the PostgreSQL server is running.
Table Does Not Exist: Verify that the database schema is set up correctly and the tables have been created.
Contributing
If you have suggestions or improvements for this project, feel free to submit a pull request or open an issue.

License
This project is licensed under the MIT License.
