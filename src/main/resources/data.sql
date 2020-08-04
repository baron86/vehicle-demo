DROP TABLE IF EXISTS  vehicle_option ;
DROP TABLE IF EXISTS  option_type ;
DROP TABLE IF EXISTS  vehicle ;

CREATE TABLE  option_type  (
   id  int(11) NOT NULL AUTO_INCREMENT,
   name  varchar(45) NOT NULL,
  PRIMARY KEY ( id )
); 

INSERT INTO  option_type  VALUES (1,'Climate control'),(2,'Sat nav'),(3,'Cruise control'),(4,'Parking sensors'),(5,'Bluetooth');

CREATE TABLE  vehicle  (
   id  int(11) NOT NULL AUTO_INCREMENT,
   make  varchar(45) NOT NULL,
   model  varchar(45) NOT NULL,
   edition  varchar(45) NOT NULL,
   price  double NOT NULL,
  PRIMARY KEY ( id )
); 

INSERT INTO  vehicle  VALUES (1,'Volkswagen','Amarok','TDI V6 AVENTURA',43950),(2,'Ford','Fiesta','Titanium 1.5TDCI',19900),(3,'Audi','A1','SE Sportback 1.0',24900);

CREATE TABLE  vehicle_option  (
   id  int(11) NOT NULL AUTO_INCREMENT,
   vehicle_id  int(11) NOT NULL,
   option_type_id  int(11) NOT NULL,
   price  double NOT NULL,
  PRIMARY KEY ( id ),
  CONSTRAINT fk_vehicle_option_option_type_id FOREIGN KEY (option_type_id) REFERENCES option_type (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_vehicle_option_vehicle_id FOREIGN KEY (vehicle_id) REFERENCES vehicle (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

INSERT INTO  vehicle_option  VALUES (1,1,1,500),(2,1,2,1000),(3,2,5,400),(4,2,4,1000),(5,2,3,2000),(6,2,2,500),(7,2,1,950),(8,3,1,400),(9,3,2,700),(10,3,3,450);