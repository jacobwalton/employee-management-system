const { prompt } = require("inquirer");
const db = require("./db");

mainPrompts();
async function mainPrompts() {
  const { answer } = await prompt([
    {
      type: "list",
      name: "answer",
      message: "Please select an option",
      choices: [
        {
          name: "Add department",
          value: "add_dept",
        },
        {
          name: "Add role",
          value: "add_role",
        },
        {
          name: "Add employee",
          value: "add_employee",
        },
        {
          name: "View departments",
          value: "view_dept",
        },
        {
          name: "View roles",
          value: "view_roles",
        },
        {
          name: "View employees",
          value: "view_employees",
        },
        {
          name: "Change an employee's role",
          value: "new_employee_role",
        },
        {
          name: "Exit",
          value: "exit",
        },
      ],
    },
  ]);
  switch (answer) {
    case "add_dept":
      return addDept();
    case "add_role":
      return addRole();
    case "add_employee":
      return addEmployee();
    case "view_dept":
      return viewDepartments();
    case "view_roles":
      return viewRoles();
    case "view_employees":
      return viewEmployees();
    case "new_employee_role":
      return updateEmployeeRole();
    default:
      return exit();
  }
}
//
async function addDept() {
  const department = await prompt([
    {
      name: "name",
      message: "What is the new department called?",
    },
  ]);

  await db.newDepartment(department);

  mainPrompts();
}

async function addRole() {
  const departments = await db.allDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const role = await prompt([
    {
      name: "job_title",
      message: "What is the job title?",
    },
    {
      name: "salary",
      message: "What is the salary?",
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department does the role belong to?",
      choices: departmentChoices,
    },
  ]);

  await db.newRole(role);

  mainPrompts();
}

async function addEmployee() {
  const roles = await db.allRoles();
  const employees = await db.allEmployees();

  const employee = await prompt([
    {
      name: "first_name",
      message: "What's the employee's first name?",
    },
    {
      name: "last_name",
      message: "What's the employee's last name?",
    },
  ]);

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await prompt({
    type: "list",
    name: "roleId",
    message: "What is the employee's role?",
    choices: roleChoices,
  });

  employee.role_id = roleId;

  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));
  managerChoices.unshift({ name: "None", value: null });

  const { managerId } = await prompt({
    type: "list",
    name: "managerId",
    message: "Who is the employee's manager?",
    choices: managerChoices,
  });

  employee.manager_id = managerId;

  await db.newEmployee(employee);

  mainPrompts();
}
async function viewDepartments() {
  const departments = await db.allDepartments();
  console.table(departments);

  mainPrompts();
}
async function viewRoles() {
  const roles = await db.allRoles();
  console.table(roles);
  mainPrompts();
}

async function viewEmployees() {
  const employees = await db.allEmployees();
  console.table(employees);

  mainPrompts();
}

async function updateEmployeeRole() {
  const employees = await db.allEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's role do you want to update?",
      choices: employeeChoices,
    },
  ]);

  const roles = await db.allRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "Which role do you want to assign the selected employee?",
      choices: roleChoices,
    },
  ]);

  await db.updateEmployeeRole(employeeId, roleId);

  mainPrompts();
}

function exit() {
  console.log("SUCCESS!");
  process.exit();
}
