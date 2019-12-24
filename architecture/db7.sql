CREATE DATABASE  IF NOT EXISTS `tutor` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tutor`;
-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: tutor
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `username` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `fullname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `locationId` int(11) NOT NULL,
  `image` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `intro` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `rate` int(11) DEFAULT NULL,
  `type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `money` bigint(20) DEFAULT '0',
  `isActived` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`username`) USING BTREE,
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('admin','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918','Nguyễn Tiến Dũng','tiendung2013vn97@gmail.com',23,'Nam',1,'defaultUser.png',NULL,-1,'admin',0,1),('student','264c8c381bf16c982a4e59b0dd4c6f7808c51a05f64c35db42cc78a2a72875bb','Nguyễn Học Sinh','tiendung2017vn97@gmail.com',14,'male',25,'defaultUser.png','',-1,'student',2500000,1),('student1','264c8c381bf16c982a4e59b0dd4c6f7808c51a05f64c35db42cc78a2a72875bb','Lê GiáoViên','tiendung2017vn981@gmail.com',40,'female',1,'defaultUser.png','',-1,'student',100000,1),('student10','264c8c381bf16c982a4e59b0dd4c6f7808c51a05f64c35db42cc78a2a72875bb','Lê Hà','tiendung2017vn978@gmail.com',50,'male',5,'defaultUser.png','',-1,'student',1000000,1),('student11','264c8c381bf16c982a4e59b0dd4c6f7808c51a05f64c35db42cc78a2a72875bb','Lê Hiếu','tiendung2017vn979@gmail.com',37,'female',20,'defaultUser.png','',-1,'student',1200000,1),('student2','264c8c381bf16c982a4e59b0dd4c6f7808c51a05f64c35db42cc78a2a72875bb','Lê Phương','tiendung2017vn980@gmail.com',40,'male',2,'defaultUser.png','',-1,'student',200000,1),('student3','264c8c381bf16c982a4e59b0dd4c6f7808c51a05f64c35db42cc78a2a72875bb','Lê Đảo','tiendung2017vn971@gmail.com',30,'female',3,'defaultUser.png','',-1,'student',300000,1),('student4','264c8c381bf16c982a4e59b0dd4c6f7808c51a05f64c35db42cc78a2a72875bb','Lê Chính','tiendung2017vn972@gmail.com',40,'male',4,'defaultUser.png','',-1,'student',400000,1),('student5','264c8c381bf16c982a4e59b0dd4c6f7808c51a05f64c35db42cc78a2a72875bb','Lê Sinh','tiendung2017vn973@gmail.com',20,'female',4,'defaultUser.png','',-1,'student',500000,1),('student6','264c8c381bf16c982a4e59b0dd4c6f7808c51a05f64c35db42cc78a2a72875bb','Lê Cung','tiendung2017vn974@gmail.com',40,'male',3,'defaultUser.png','',-1,'student',600000,1),('student7','264c8c381bf16c982a4e59b0dd4c6f7808c51a05f64c35db42cc78a2a72875bb','Lê Thành','tiendung2017vn975@gmail.com',18,'female',2,'defaultUser.png','',-1,'student',700000,1),('student8','264c8c381bf16c982a4e59b0dd4c6f7808c51a05f64c35db42cc78a2a72875bb','Lê Nam','tiendung2017vn976@gmail.com',21,'male',10,'defaultUser.png','',-1,'student',800000,1),('student9','264c8c381bf16c982a4e59b0dd4c6f7808c51a05f64c35db42cc78a2a72875bb','Lê Đại','tiendung2017vn977@gmail.com',25,'female',12,'defaultUser.png','',-1,'student',900000,1),('teacher','1057a9604e04b274da5a4de0c8f4b4868d9b230989f8c8c6a28221143cc5a755','Nguyễn Giáo Viên','tiendung2019vn97@gmail.com',40,'female',1,'defaultUser.png','',-1,'teacher',5000000,1),('teacher1','1057a9604e04b274da5a4de0c8f4b4868d9b230989f8c8c6a28221143cc5a755','Nguyễn GiáoViên','tiendung2019vn981@gmail.com',40,'female',1,'defaultUser.png','',-1,'teacher',100000,1),('teacher10','1057a9604e04b274da5a4de0c8f4b4868d9b230989f8c8c6a28221143cc5a755','Nguyễn Hà','tiendung2019vn978@gmail.com',50,'male',5,'defaultUser.png','',-1,'teacher',1000000,1),('teacher11','1057a9604e04b274da5a4de0c8f4b4868d9b230989f8c8c6a28221143cc5a755','Nguyễn Hiếu','tiendung2019vn979@gmail.com',37,'female',20,'defaultUser.png','',-1,'teacher',1200000,1),('teacher2','1057a9604e04b274da5a4de0c8f4b4868d9b230989f8c8c6a28221143cc5a755','Nguyễn Phương','tiendung2019vn980@gmail.com',40,'male',2,'defaultUser.png','',-1,'teacher',200000,1),('teacher3','1057a9604e04b274da5a4de0c8f4b4868d9b230989f8c8c6a28221143cc5a755','Nguyễn Đảo','tiendung2019vn971@gmail.com',30,'female',3,'defaultUser.png','',-1,'teacher',300000,1),('teacher4','1057a9604e04b274da5a4de0c8f4b4868d9b230989f8c8c6a28221143cc5a755','Nguyễn Chính','tiendung2019vn972@gmail.com',40,'male',4,'defaultUser.png','',-1,'teacher',400000,1),('teacher5','1057a9604e04b274da5a4de0c8f4b4868d9b230989f8c8c6a28221143cc5a755','Nguyễn Sinh','tiendung2019vn973@gmail.com',20,'female',4,'defaultUser.png','',-1,'teacher',500000,1),('teacher6','1057a9604e04b274da5a4de0c8f4b4868d9b230989f8c8c6a28221143cc5a755','Nguyễn Cung','tiendung2019vn974@gmail.com',40,'male',3,'defaultUser.png','',-1,'teacher',600000,1),('teacher7','1057a9604e04b274da5a4de0c8f4b4868d9b230989f8c8c6a28221143cc5a755','Nguyễn Thành','tiendung2019vn975@gmail.com',18,'female',2,'defaultUser.png','',-1,'teacher',700000,1),('teacher8','1057a9604e04b274da5a4de0c8f4b4868d9b230989f8c8c6a28221143cc5a755','Nguyễn Nam','tiendung2019vn976@gmail.com',21,'male',10,'defaultUser.png','',-1,'teacher',800000,1),('teacher9','1057a9604e04b274da5a4de0c8f4b4868d9b230989f8c8c6a28221143cc5a755','Nguyễn Đại','tiendung2019vn977@gmail.com',25,'female',12,'defaultUser.png','',-1,'teacher',900000,1);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `studentId` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `teacherId` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `contractId` bigint(20) NOT NULL,
  `comment` json NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract`
--

DROP TABLE IF EXISTS `contract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `studentId` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `teacherId` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `studyRequestId` bigint(20) NOT NULL,
  `skillId` bigint(20) NOT NULL,
  `totalHours` int(11) NOT NULL,
  `createDt` bigint(20) NOT NULL,
  `toDt` bigint(20) DEFAULT NULL,
  `detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `status` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `rate` int(11) DEFAULT NULL,
  `studentComment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `isActived` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract`
--

LOCK TABLES `contract` WRITE;
/*!40000 ALTER TABLE `contract` DISABLE KEYS */;
/*!40000 ALTER TABLE `contract` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `district` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Hồ Chí Minh','Quận 1'),(2,'Hồ Chí Minh','Quận 2'),(3,'Hồ Chí Minh','Quận 3'),(4,'Hồ Chí Minh','Quận 4'),(5,'Hồ Chí Minh','Quận 5'),(6,'Hồ Chí Minh','Quận 6'),(7,'Hồ Chí Minh','Quận 7'),(8,'Hồ Chí Minh','Quận 8'),(9,'Hồ Chí Minh','Quận 9'),(10,'Hồ Chí Minh','Quận 10'),(11,'Hồ Chí Minh','Quận 11'),(12,'Hồ Chí Minh','Quận 12'),(13,'Hồ Chí Minh','Bình Tân'),(14,'Hồ Chí Minh','Bình Thạnh'),(15,'Hồ Chí Minh','Gò Vấp'),(16,'Hồ Chí Minh','Phú Nhuận'),(17,'Hồ Chí Minh','Tân Bình'),(18,'Hồ Chí Minh','Tân Phú'),(19,'Hồ Chí Minh','Thủ Đức'),(20,'Hồ Chí Minh','Bình Chánh'),(21,'Hồ Chí Minh','Cần Giờ'),(22,'Hồ Chí Minh','Củ Chi'),(23,'Hồ Chí Minh','Hóc Môn'),(24,'Hồ Chí Minh','Nhà Bè'),(25,'Hà Nội','Ba Đình'),(26,'Hà Nội','Hoàn Kiếm'),(27,'Hà Nội','Tây Hồ'),(28,'Hà Nội','Long Biên'),(29,'Hà Nội','Cầu Giấy'),(30,'Hà Nội','Đống Đa'),(31,'Hà Nội','Hai Bà Trưng'),(32,'Hà Nội','Hoàng Mai'),(33,'Hà Nội','Thanh Xuân'),(34,'Hà Nội','Sóc Sơn'),(35,'Hà Nội','Đông Anh'),(36,'Hà Nội','Gia Lâm'),(37,'Hà Nội','Nam Từ Liêm'),(38,'Hà Nội','Thanh Trì'),(39,'Hà Nội','Bắc Từ Liêm'),(40,'Hà Nội','Mê Linh'),(41,'Hà Nội','Hà Đông'),(42,'Hà Nội','Sơn Tây'),(43,'Hà Nội','Ba Vì'),(44,'Hà Nội','Phúc Thọ'),(45,'Hà Nội','Đan Phượng'),(46,'Hà Nội','Hoài Đức'),(47,'Hà Nội','Quốc Oai'),(48,'Hà Nội','Thạch Thất'),(49,'Hà Nội','Chương Mỹ'),(50,'Hà Nội','Thanh Oai'),(51,'Hà Nội','Thường Tín'),(52,'Hà Nội','Phú Xuyên'),(53,'Hà Nội','Ứng Hòa'),(54,'Hà Nội','Mỹ Đức');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `accountId` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `token` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `loginDt` bigint(20) NOT NULL,
  PRIMARY KEY (`accountId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `teacherId` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `costPerHour` bigint(20) NOT NULL,
  `skillTagId` bigint(20) NOT NULL,
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill_tag`
--

DROP TABLE IF EXISTS `skill_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill_tag` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `numUsed` int(11) DEFAULT NULL,
  `isActived` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill_tag`
--

LOCK TABLES `skill_tag` WRITE;
/*!40000 ALTER TABLE `skill_tag` DISABLE KEYS */;
INSERT INTO `skill_tag` VALUES (1,'Toán lớp 1',0,1),(2,'Toán lớp 2',0,1),(3,'Toán lớp 3',0,1),(4,'Toán lớp 4',0,1),(6,'Toán lớp 5',0,1),(7,'Toán lớp 6',0,1),(8,'Toán lớp 7',0,1),(9,'Toán lớp 8',0,1),(10,'Toán lớp 9',0,1),(11,'Toán lớp 10',0,NULL),(12,'Toán lớp 11',0,1),(13,'Toán lớp 12',0,1),(14,'Lý lớp 1',0,1),(15,'Lý lớp 2',0,1),(16,'Lý lớp 3',0,1),(17,'Lý lớp 4',0,1),(18,'Lý lớp 5',0,1),(19,'Lý lớp 6',0,1),(20,'Lý lớp 7',0,1),(21,'Lý lớp 8',0,1),(22,'Lý lớp 9',0,1),(23,'Lý lớp 10',0,1),(24,'Lý lớp 11',0,1),(25,'Lý lớp 12',0,1),(26,'Hóa lớp 1',0,1),(27,'Hóa lớp 2',0,1),(28,'Hóa lớp 3',0,1),(29,'Hóa lớp 4',0,1),(30,'Hóa lớp 5',0,1),(31,'Hóa lớp 6',0,1),(32,'Hóa lớp 7',0,1),(33,'Hóa lớp 8',0,1),(34,'Hóa lớp 9',0,1),(35,'Hóa lớp 10',0,1),(36,'Hóa lớp 11',0,1),(37,'Hóa lớp 12',0,1),(38,'Văn lớp 1',0,1),(39,'Văn lớp 2',0,1),(40,'Văn lớp 3',0,1),(41,'Văn lớp 4',0,1),(42,'Văn lớp 5',0,1),(43,'Văn lớp 6',0,1),(44,'Văn lớp 7',0,1),(45,'Văn lớp 8',0,1),(46,'Văn lớp 9',0,1),(47,'Văn lớp 10',0,1),(48,'Văn lớp 11',0,1),(49,'Văn lớp 12',0,1);
/*!40000 ALTER TABLE `skill_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_request`
--

DROP TABLE IF EXISTS `study_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_request` (
  `id` bigint(20) NOT NULL,
  `studentId` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `teacherId` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `skillId` bigint(20) NOT NULL,
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `createDt` bigint(20) NOT NULL,
  `status` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `isActived` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_request`
--

LOCK TABLES `study_request` WRITE;
/*!40000 ALTER TABLE `study_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `study_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'tutor'
--

--
-- Dumping routines for database 'tutor'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-23  7:55:27
