CREATE DATABASE science_rpg;
USE science_rpg;

CREATE TABLE goals (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(2048) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    goal_id INT(11) NOT NULL,
    description VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE user_actions (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    task_id INT(11) NOT NULL,
    action VARCHAR(1048) NOT NULL,
    report TEXT NOT NULL,
    xp INT(11) NOT NULL,
    completes_task BOOLEAN NOT NULL,
    completed_at DATETIME DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE skills (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    skill_name VARCHAR(255) NOT NULL,
    skill_percentage DECIMAL(15, 2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE inventory (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    parent_id INT(11) NOT NULL DEFAULT 0,
    body TEXT NOT NULL,
    role VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE data (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    qtt_desc VARCHAR(512) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE tasks ADD COLUMN xp INT(11) NOT NULL;
ALTER TABLE inventory ADD COLUMN qtt INT(11) NOT NULL;
ALTER TABLE goals ADD COLUMN priority INT(11) NOT NULL;
ALTER TABLE user_actions ADD COLUMN qtt INT(11) NOT NULL;