CREATE USER 'vduser'@'localhost' IDENTIFIED BY 'vduser';

GRANT ALL PRIVILEGES ON * . * TO 'vduser'@'localhost';

ALTER USER 'vduser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'vduser';