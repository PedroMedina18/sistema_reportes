
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

DROP TABLE IF EXISTS emails;
CREATE TABLE emails (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE
);

DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(500) NOT NULL
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    names VARCHAR(200) NOT NULL,
    last_names VARCHAR(200) NOT NULL,
    user_name VARCHAR(25) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    administrator BOOLEAN NOT NULL DEFAULT FALSE,
    department_id INTEGER  NOT NULL,
    email_id INTEGER  NOT NULL,
    subsidiary BOOLEAN NOT NULL,
    state BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE RESTRICT,
    CONSTRAINT fk_email FOREIGN KEY (email_id) REFERENCES emails(id) ON DELETE RESTRICT
);

DROP TABLE IF EXISTS reports_type;
CREATE TABLE reports_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(500) NOT NULL
);

DROP TABLE IF EXISTS reports;
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    user_reported_id INTEGER NOT NULL,
    user_completed_id INTEGER DEFAULT NULL,
    report_type_id INTEGER  NOT NULL,
    description VARCHAR(1000) NOT NULL,
    comentario_completed VARCHAR(1000) NULL,
    state BOOLEAN NOT NULL DEFAULT FALSE,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed TIMESTAMP DEFAULT NULL,
    CONSTRAINT fk_user_reported FOREIGN KEY (user_completed_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_user_completed FOREIGN KEY (user_completed_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_report_type FOREIGN KEY (report_type_id) REFERENCES reports_type(id) ON DELETE RESTRICT
);

DROP TABLE IF EXISTS imgs_reports;
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL UNIQUE,
    reports_id INTEGER NOT NULL,
    CONSTRAINT fk_reports FOREIGN KEY (reports_id) REFERENCES reports(id) ON DELETE RESTRICT,
);

INSERT INTO emails (email) VALUES ('sistemas1.plazabolivar@locatelve.com');

INSERT INTO departments (name, description) 
VALUES 
('Sistemas', 'Departamento de Sistemas'),
('RRHH', 'Departamento de RRHH'),
('Farmacia', 'Departamento de Farmacia'),
('Contabilidad', 'Departamento de Contabilidad');