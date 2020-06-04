use employees;

INSERT INTO department
    (name)
VALUES
    ('Sales Department'),
    ('Engineering Department'),
    ('Accounting Department'),
    ('Legal Department');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 60000, 01),
    ('Salesperson', 50000, 01),
    ('Lead Engineer', 90000, 02),
    ('Software Engineer', 60000, 02),
    ('Account Manager', 80000, 03),
    ('Accountant', 90000, 03),
    ('Legal Advisor', 100000, 04),
    ('Lawyer', 140000, 04);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);
