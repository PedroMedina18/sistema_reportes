
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
    password VARCHAR(200) NOT NULL,
    administrator SMALLINT NOT NULL DEFAULT 0,
    department_id INTEGER  NOT NULL,
    email_id INTEGER  NOT NULL,
    subsidiary SMALLINT NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE RESTRICT,
    CONSTRAINT fk_email FOREIGN KEY (email_id) REFERENCES emails(id) ON DELETE RESTRICT
);

DROP TABLE IF EXISTS reports_type;
CREATE TABLE reports_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(500) NOT NULL
);

DROP TABLE IF EXISTS reportes;
CREATE TABLE reportes (
    id SERIAL PRIMARY KEY,
    user_reported_id INTEGER  NOT NULL,
    user_completed_id INTEGER DEFAULT NULL,
    report_type_id INTEGER  NOT NULL,
    description VARCHAR(1000) NOT NULL,
    state SMALLINT NOT NULL DEFAULT 0,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed TIMESTAMP DEFAULT NULL,
    CONSTRAINT fk_user_reported FOREIGN KEY (user_completed_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_user_completed FOREIGN KEY (user_completed_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_report_type FOREIGN KEY (report_type_id) REFERENCES reports_type(id) ON DELETE RESTRICT
);