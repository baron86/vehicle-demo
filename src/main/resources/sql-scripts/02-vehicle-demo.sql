CREATE DATABASE  IF NOT EXISTS `vehicle_demo` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `vehicle_demo`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: vehicle_demo
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `option_type`
--

DROP TABLE IF EXISTS `option_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `option_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `option_type`
--

LOCK TABLES `option_type` WRITE;
/*!40000 ALTER TABLE `option_type` DISABLE KEYS */;
INSERT INTO `option_type` VALUES (1,'Climate control'),(2,'Sat nav'),(3,'Cruise control'),(4,'Parking sensors'),(5,'Bluetooth');
/*!40000 ALTER TABLE `option_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `make` varchar(45) NOT NULL,
  `model` varchar(45) NOT NULL,
  `edition` varchar(45) NOT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
INSERT INTO `vehicle` VALUES (1,'Volkswagen','Amarok','TDI V6 AVENTURA',43950),(2,'Ford','Fiesta','Titanium 1.5TDCI',19900),(3,'Audi','A1','SE Sportback 1.0',24900),(4,'Toyota','Camry','Camry Hybrid Platinum',44810);
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle_option`
--

DROP TABLE IF EXISTS `vehicle_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicle_option` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vehicle_id` int(11) NOT NULL,
  `option_type_id` int(11) NOT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_vehicle_option_vehicle_id_idx` (`vehicle_id`),
  KEY `fk_vehicle_option_option_type_id_idx` (`option_type_id`),
  CONSTRAINT `fk_vehicle_option_option_type_id` FOREIGN KEY (`option_type_id`) REFERENCES `option_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vehicle_option_vehicle_id` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle_option`
--

LOCK TABLES `vehicle_option` WRITE;
/*!40000 ALTER TABLE `vehicle_option` DISABLE KEYS */;
INSERT INTO `vehicle_option` VALUES (1,1,1,500),(2,1,2,1000),(3,2,5,400),(4,2,4,1000),(5,2,3,2000),(6,2,2,500),(7,2,1,950),(8,3,1,400),(9,3,2,700),(10,3,3,450),(11,4,5,100),(12,4,4,4500),(13,4,3,655);
/*!40000 ALTER TABLE `vehicle_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'vehicle_demo'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-14 16:33:45
