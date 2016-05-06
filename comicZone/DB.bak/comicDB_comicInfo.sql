-- MySQL dump 10.13  Distrib 5.5.44, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: comicDB
-- ------------------------------------------------------
-- Server version	5.5.44-0ubuntu0.14.04.1

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
-- Table structure for table `comicInfo`
--

DROP TABLE IF EXISTS `comicInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comicInfo` (
  `idComic` int(11) NOT NULL,
  `genre` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `date` varchar(45) DEFAULT NULL,
  `creator` varchar(45) DEFAULT NULL,
  `isSpecial` tinyint(1) DEFAULT NULL,
  `urlImage` varchar(200) DEFAULT NULL,
  `stars` int(11) DEFAULT NULL,
  `editionNumber` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idComic`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comicInfo`
--

LOCK TABLES `comicInfo` WRITE;
/*!40000 ALTER TABLE `comicInfo` DISABLE KEYS */;
INSERT INTO `comicInfo` VALUES (1,'Superhero','Spider Man','10 julio 2010','Marvel',0,'resources/img/Avenging_SpiderMan_1_Cover.jpg',4,'12'),(2,'Horror','Family Values','5 Septiembre 1985','Dark Horse',1,'resources/img/4802806-04.jpg',5,'4'),(4,'Superhero','X-Men','10 Enero 2009','Marvel',0,'resources/img/X-Men_Vol_2_1_Magneto_Variant.jpg',5,'132');
/*!40000 ALTER TABLE `comicInfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-05-06 14:28:57
