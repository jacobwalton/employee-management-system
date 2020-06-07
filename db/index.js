const connection = require("./connection");

class db {
  constructor(connection) {
    this.connection = connection;
  }

  allEmployees() {
    return this.connection.query(
      `SELECT employee.id,
      employee.first_name,
      employee.last_name,
      role.job_title,
      department.name AS department,
      role.salary,
      CONCAT(manager.last_name, ' ', manager.first_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`
    );
  }

  newEmployee(employee) {
    return this.connection.query(`INSERT INTO employee SET ?`, employee);
  }

  removeEmployee(employeeId) {
    return this.connection.query(
      `DELETE FROM employee WHERE id = ?`,
      employeeId
    );
  }

  updateEmployeeRole(employeeId, roleId) {
    return this.connection.query(
      `UPDATE employee SET role_id = ? WHERE id = ?`,
      [roleId, employeeId]
    );
  }

  allRoles() {
    return this.connection.query(
      `SELECT role.id, role.job_title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;`
    );
  }

  newRole(role) {
    return this.connection.query(`INSERT INTO role SET ?`, role);
  }

  allDepartments() {
    return this.connection.query(
      `SELECT
      department.id,
      department.name,
      SUM(role.salary) AS budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id;`
    );
  }

  newDepartment(department) {
    return this.connection.query(`INSERT INTO department SET ?`, department);
  }
}

module.exports = new db(connection);
