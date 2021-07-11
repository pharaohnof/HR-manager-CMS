drop database if exists hr_tracker;
create database hr_tracker;

use hr_tracker;

create table department(
    id int not null auto_increment primary key,
    name varchar(30)
);

create table role(
    id int not null auto_increment primary key,
    title varchar(30),
    salary decimal(10,2),
    department_id int
);

create table employee(
    id int not null auto_increment primary key,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int
)
;