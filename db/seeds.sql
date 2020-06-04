use employees;

INSERT INTO department (name)
VALUES
    ("Sales Department"),
    ("Engineering Department"),
    ("Accounting Department"),
    ("Legal Department");

INSERT INTO role (job_title, salary, department_id)
VALUES
    ("Sales Lead", 60000, 01),
    ("Salesperson", 50000, 01),
    ("Lead Engineer", 90000, 02),
    ("Engineer", 60000, 02),
    ("Account Manager", 80000, 03),
    ("Accountant", 90000, 03),
    ("Legal Advisor", 100000, 04),
    ("Lawyer", 140000, 04);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Tim", "Calhoon", 1, 1),
    ("Joe", "Carter", 2, 2),
    ("Marge", "Westbrook", 3, 2),
    ("Fred", "Rice", 4, 4),
    ("Sam", "King", 5, 1),
    ("Jim", "Vance", 6, 4);
