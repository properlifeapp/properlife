create user IF NOT EXISTS 'user'@'%' identified by 'pass';
grant all privileges on *.* to 'user'@'%' with grant option;
flush privileges;
create database if not exists content_dashboard;
use content_dashboard;

create table if not exists roles (
    rid int NOT NULL AUTO_INCREMENT,
    role_label varchar(255),
    PRIMARY KEY (rid)
);

DELIMITER //
CREATE PROCEDURE InsertRolesIfEmpty()
BEGIN
    DECLARE total INT;
    SELECT COUNT(*) INTO total FROM roles;
    IF total = 0 THEN
        INSERT INTO roles (role_label) VALUES ('regular');
        INSERT INTO roles (role_label) VALUES ('marketing');
        INSERT INTO roles (role_label) VALUES ('admin');
    END IF;
END //
DELIMITER ;

CALL InsertRolesIfEmpty();

DROP PROCEDURE InsertRolesIfEmpty;

create table if not exists users (
    uid int NOT NULL AUTO_INCREMENT,
    gid varchar(255),
    email varchar(255),
    name varchar(255),
    picture varchar(255),
    PRIMARY KEY (uid)
);
create table if not exists role_assignments (
    raid int NOT NULL AUTO_INCREMENT,
    rid int NOT NULL,
    uid int NOT NULL,
    FOREIGN KEY (rid) REFERENCES roles(rid),
    FOREIGN KEY (uid) REFERENCES users(uid),
    PRIMARY KEY (raid)
);

create table if not exists content_queue (
    id int NOT NULL AUTO_INCREMENT,
    section text NOT NULL,
    nid int NOT NULL,
    title text NOT NULL,
    link text NOT NULL,
    author text NOT NULL,
    unix_time int NOT NULL,
    severity int NOT NULL,
    social_media text NOT NULL,
    published int NOT NULL,    
    PRIMARY KEY (id)
);
