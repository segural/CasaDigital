USE `casadigital`;
-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: casa_digital_db
-- ------------------------------------------------------
-- Server version	5.7.24

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
-- Table structure for table `audio`
--

DROP TABLE IF EXISTS `audio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `audioLang` varchar(20) COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audio`
--

LOCK TABLES `audio` WRITE;
/*!40000 ALTER TABLE `audio` DISABLE KEYS */;
INSERT INTO `audio` VALUES (1,'Español'),(2,'Inglés'),(3,'Portugués'),(4,'Francés'),(5,'Alemán');
/*!40000 ALTER TABLE `audio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) COLLATE latin1_bin DEFAULT NULL,
  `category_img` varchar(50) COLLATE latin1_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Finanzas',NULL),(2,'Excel',NULL),(3,'Desarrollo',NULL),(4,'Fotografía',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_subtitle`
--

DROP TABLE IF EXISTS `course_subtitle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_subtitle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_course` int(11) NOT NULL,
  `id_subtitle` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_course_idx` (`id_course`),
  KEY `id_subtitle_idx` (`id_subtitle`),
  CONSTRAINT `id_course` FOREIGN KEY (`id_course`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `id_subtitle` FOREIGN KEY (`id_subtitle`) REFERENCES `subtitles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_subtitle`
--

LOCK TABLES `course_subtitle` WRITE;
/*!40000 ALTER TABLE `course_subtitle` DISABLE KEYS */;
INSERT INTO `course_subtitle` VALUES (1,1,3),(2,2,5),(3,3,2),(4,4,2),(5,5,2),(6,6,4),(7,7,2),(8,8,4),(9,9,2),(10,10,1),(11,11,1),(14,14,1),(15,15,1),(16,16,1),(21,13,1),(22,13,3),(23,12,1),(24,12,3),(25,12,4),(31,20,1);
/*!40000 ALTER TABLE `course_subtitle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_user`
--

DROP TABLE IF EXISTS `course_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `rating` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `course_id_idx` (`course_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `course_id` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_user`
--

LOCK TABLES `course_user` WRITE;
/*!40000 ALTER TABLE `course_user` DISABLE KEYS */;
INSERT INTO `course_user` VALUES (12,3,9,2),(14,16,8,NULL),(15,16,15,NULL),(16,17,11,NULL),(17,17,16,NULL);
/*!40000 ALTER TABLE `course_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creation_date` date NOT NULL,
  `course_title` varchar(100) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `short_description` varchar(300) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `long_description` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `requirements` varchar(300) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `who_can` varchar(300) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `top_seller` tinyint(4) DEFAULT '0',
  `category_id` int(11) NOT NULL,
  `audio_id` int(11) NOT NULL,
  `currency_id` int(11) NOT NULL,
  `course_owner` varchar(100) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `image` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `video` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id_idx` (`category_id`),
  KEY `audio_id_idx` (`audio_id`),
  KEY `currency_id_idx` (`currency_id`),
  CONSTRAINT `audio_id` FOREIGN KEY (`audio_id`) REFERENCES `audio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `currency_id` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'2019-05-24','Inversor bursatil','Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla.','Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.',18219,28,'Nullam sit amet turpis elementum ligula vehicula consequat.','Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo.',0,1,1,1,'Javier Gómez','course_1.jpg','course_1.mp4'),(2,'2017-07-12','Educación financiera','In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius.','Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.',3779,0,'Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.','Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',0,1,1,1,'Javier Gómez','course_2.jpg','course_2.mp4'),(3,'2020-03-11','Excel Completo - Desde Principiante Hasta Avanzado','Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.','In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',3811,17,'Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.','Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.',0,2,3,1,'Diego López','course_3.jpg','course_3.mp4'),(4,'2020-03-09','Visual Studio Code: Mejora tu velocidad para codificar','Aliquam erat volutpat. In congue. Etiam justo.','Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis.',7492,32,'Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.','Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum.',1,3,3,1,'Fabián Schwartz','course_4.jpg','course_4.mp4'),(5,'2021-03-05','Finanzas para Emprendedores: Venture Capital','Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.','Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.',16131,31,'Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.','Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum.',0,1,5,1,'Javier Gómez','course_5.jpg','course_5.mp4'),(6,'2021-03-07','Macros y VBA: Programa, automatiza y amplía Microsoft Excel.','In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.','Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',9032,22,'Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio.','Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',0,2,1,1,'Diego López','course_6.jpg','course_6.mp4'),(7,'2020-04-03','Inteligencia Financiera: Guía completa Finanzas Personales','Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.','In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.',10329,46,'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi.','Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',0,1,4,1,'Juan Gabriel Gomila Salas','course_7.jpg','course_7.mp4'),(8,'2018-02-25','Curso Maestro de Python 3: Aprende Desde Cero','Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis.','Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis.',3773,28,'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.','Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',0,3,1,1,'Diego López','course_8.jpg','course_8.mp4'),(9,'2019-02-12','React JS - Curso de introducción desde cero y primeros pasos','Mauris enim leo, rhoncus sed, vestibulum sit amet. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum.','Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.',12167,10,'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.','Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.',1,3,4,1,'Juan Gabriel Gomila Salas','course_9.jpg','course_9.mp4'),(10,'2021-03-05','Introduction to FHIR','Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero.','Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',4072,21,'Phasellus in felis.','Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',0,3,2,1,'Juan Gabriel Gomila Salas','course_10.jpg','course_10.mp4'),(11,'2021-03-12','Tablas Dinámicas: Análisis de datos en Microsoft Excel.','Domina las Tablas Dinámicas. Aprende la herramienta más potente de Excel para obtener estadísticas sin crear fórmulas.','Utilizar la herramienta más potente disponible en Excel para analizar datos. Podrán analizar datos sin crear fórmulas, con tan solo unos clics de ratón.\n\nCrear, modificar, actualizar, configurar y eliminar Tablas Dinámicas en las que mostrar diferentes tipos de resultados y visualizaciones.\n\nCrear Gráficos Dinámicos con los que mostrar los resultados de las Tablas Dinámicas de una manera más visual, pero sin perder la funcionalidad de las Tablas.\n\nUtilizar datos externos para sus análisis en Tablas Dinámicas: Access, archivos de texto, CSV e incluso aprenderá a combinar diferentes archivos de una carpeta para su análisis.\n\nTransformar y filtrar la información que alimenta a una Tabla Dinámica usando Power Query.\n\nDiseñar modelos de datos con Power Pivot y sin él, para poder crear tablas dinámicas utilizando varios orígenes de datos, por ejemplo varias tablas de Excel.\n\nAutomatizar con Macros el trabajo con Tablas Dinámicas para ser todavía más eficientes en nuestros análisis.\n\nDiseñar Cuadros de Mando o Dashboardas en los que integrar todas estas funcionalidades que veremos en el curso.',6450,10,'Conocimiento básico de Excel, solo necesitas saber desenvolverte con soltura por el programa.','Publico en general',0,2,2,1,'Diego López','course_11.jpg','course_11.mp4'),(12,'2021-03-12','Universidad Excel 2021','Domina las Tablas Dinámicas. Aprende la herramienta más potente de Excel para obtener estadísticas sin crear fórmulas.','Utilizar la herramienta más potente disponible en Excel para analizar datos. Podrán analizar datos sin crear fórmulas, con tan solo unos clics de ratón.\r\n\r\nCrear, modificar, actualizar, configurar y eliminar Tablas Dinámicas en las que mostrar diferentes tipos de resultados y visualizaciones.\r\n\r\nCrear Gráficos Dinámicos con los que mostrar los resultados de las Tablas Dinámicas de una manera más visual, pero sin perder la funcionalidad de las Tablas.\r\n\r\nUtilizar datos externos para sus análisis en Tablas Dinámicas: Access, archivos de texto, CSV e incluso aprenderá a combinar diferentes archivos de una carpeta para su análisis.\r\n\r\nTransformar y filtrar la información que alimenta a una Tabla Dinámica usando Power Query.\r\n\r\nDiseñar modelos de datos con Power Pivot y sin él, para poder crear tablas dinámicas utilizando varios orígenes de datos, por ejemplo varias tablas de Excel.\r\n\r\nAutomatizar con Macros el trabajo con Tablas Dinámicas para ser todavía más eficientes en nuestros análisis.\r\n\r\nDiseñar Cuadros de Mando o Dashboardas en los que integrar todas estas funcionalidades que veremos en el curso.',7250,10,'Conocimiento básico de Excel, solo necesitas saber desenvolverte con soltura por el programa.','Publico en general',1,2,2,1,'Profesor Ejemplo','course_12.jpg','course_12.mp4'),(13,'2021-03-12','Fotografía Masterclass','La Mejor Clase de Fotografía Digital en Línea: Cómo tomar fotos increíbles para principiantes y fotógrafos avanzados','Sabrás cómo tomar fotos increíbles que impresionan a tu familia y amigos\r\n\r\nSabrá cómo funciona realmente la cámara, por lo que puede tomar mejores fotos con la configuración manual\r\n\r\nSabrás cómo fotografiar en diferentes escenarios como retratos de familia, paisajes, aérea, producto, vida silvestre y mucho más.\r\n\r\nSabrás cómo componer imágenes bellamente con reglas básicas de fotografía.\r\n\r\nSabrás cómo iluminar tus sujetos con flash y luz natural.\r\n\r\nSabrás editar tus fotos como un profesional.\r\n\r\nSabrás cómo hacer dinero con la fotografía.\r\n\r\nSabrás cómo tomar mejores fotos con tus teléfonos inteligentes.',2675,5,'¡Debería estar emocionado de aprender fotografía y listo para actuar!\r\n\r\nNo se requiere una cámara elegante, cualquier cámara lo ayudará a aprender a medida que le indiquemos actividades prácticas.\r\n\r\nNo se requieren conocimientos previos de fotografía.','Quien quiera tomar mejores fotos.\r\n\r\nAbsolutos principiantes que quieren convertirse en fotógrafos expertos.',0,4,2,1,'Profesor Ejemplo','course_13.jpg','course_13.mp4'),(14,'2021-03-12','Guia Compelta de Fotografía','La Mejor Clase de Fotografía Digital en Línea: Cómo tomar fotos increíbles para principiantes y fotógrafos avanzados','Sabrás cómo tomar fotos increíbles que impresionan a tu familia y amigos\n\nSabrá cómo funciona realmente la cámara, por lo que puede tomar mejores fotos con la configuración manual\n\nSabrás cómo fotografiar en diferentes escenarios como retratos de familia, paisajes, aérea, producto, vida silvestre y mucho más.\n\nSabrás cómo componer imágenes bellamente con reglas básicas de fotografía.\n\nSabrás cómo iluminar tus sujetos con flash y luz natural.\n\nSabrás editar tus fotos como un profesional.\n\nSabrás cómo hacer dinero con la fotografía.\n\nSabrás cómo tomar mejores fotos con tus teléfonos inteligentes.',13125,15,'¡Debería estar emocionado de aprender fotografía y listo para actuar!\n\nNo se requiere una cámara elegante, cualquier cámara lo ayudará a aprender a medida que le indiquemos actividades prácticas.\n\nNo se requieren conocimientos previos de fotografía.','Quien quiera tomar mejores fotos.\n\nAbsolutos principiantes que quieren convertirse en fotógrafos expertos.',0,4,2,1,'Profesor Ejemplo','course_14.jpg','course_14.mp4'),(15,'2021-03-12','Edición/Fotografía de Bodas & Sesiones','La Mejor Clase de Fotografía Digital en Línea: Cómo tomar fotos increíbles para principiantes y fotógrafos avanzados','Sabrás cómo tomar fotos increíbles que impresionan a tu familia y amigos\n\nSabrá cómo funciona realmente la cámara, por lo que puede tomar mejores fotos con la configuración manual\n\nSabrás cómo fotografiar en diferentes escenarios como retratos de familia, paisajes, aérea, producto, vida silvestre y mucho más.\n\nSabrás cómo componer imágenes bellamente con reglas básicas de fotografía.\n\nSabrás cómo iluminar tus sujetos con flash y luz natural.\n\nSabrás editar tus fotos como un profesional.\n\nSabrás cómo hacer dinero con la fotografía.\n\nSabrás cómo tomar mejores fotos con tus teléfonos inteligentes.',7590,30,'¡Debería estar emocionado de aprender fotografía y listo para actuar!\n\nNo se requiere una cámara elegante, cualquier cámara lo ayudará a aprender a medida que le indiquemos actividades prácticas.\n\nNo se requieren conocimientos previos de fotografía.','Quien quiera tomar mejores fotos.\n\nAbsolutos principiantes que quieren convertirse en fotógrafos expertos.',0,4,2,1,'Profesor Ejemplo','course_15.jpg','course_15.mp4'),(16,'2021-03-12','Curso de fotografía digital CON PRÁCTICAS','La Mejor Clase de Fotografía Digital en Línea: Cómo tomar fotos increíbles para principiantes y fotógrafos avanzados','Sabrás cómo tomar fotos increíbles que impresionan a tu familia y amigos\n\nSabrá cómo funciona realmente la cámara, por lo que puede tomar mejores fotos con la configuración manual\n\nSabrás cómo fotografiar en diferentes escenarios como retratos de familia, paisajes, aérea, producto, vida silvestre y mucho más.\n\nSabrás cómo componer imágenes bellamente con reglas básicas de fotografía.\n\nSabrás cómo iluminar tus sujetos con flash y luz natural.\n\nSabrás editar tus fotos como un profesional.\n\nSabrás cómo hacer dinero con la fotografía.\n\nSabrás cómo tomar mejores fotos con tus teléfonos inteligentes.',11000,0,'¡Debería estar emocionado de aprender fotografía y listo para actuar!\n\nNo se requiere una cámara elegante, cualquier cámara lo ayudará a aprender a medida que le indiquemos actividades prácticas.\n\nNo se requieren conocimientos previos de fotografía.','Quien quiera tomar mejores fotos.\n\nAbsolutos principiantes que quieren convertirse en fotógrafos expertos.',1,4,2,1,'Profesor Ejemplo','course_16.jpg','course_16.jpg'),(20,'2021-06-11','sdfsdfsdf','sdfsdfsdfsdfsdf','sdfsdfsdfsdfsdfsd',500,10,'sdfsdfsdfsdfsdfdsfsdfsdfdsf','sdfsdfdsfsdfsdfsdfsdfsdf',0,4,1,1,'asdasdasdasd','default-image.jpg',NULL);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currencies`
--

DROP TABLE IF EXISTS `currencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `currencies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currency` varchar(3) COLLATE latin1_bin NOT NULL DEFAULT 'AR$',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currencies`
--

LOCK TABLES `currencies` WRITE;
/*!40000 ALTER TABLE `currencies` DISABLE KEYS */;
INSERT INTO `currencies` VALUES (1,'AR$'),(2,'USD');
/*!40000 ALTER TABLE `currencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(10) COLLATE latin1_bin NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'user'),(2,'admin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_category` int(11) NOT NULL,
  `subcategory_name` varchar(50) COLLATE latin1_bin NOT NULL,
  `subcategory_img` varchar(50) COLLATE latin1_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_category_idx` (`id_category`),
  CONSTRAINT `id_category` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,1,'subcategoria1',NULL),(2,2,'subcategoría2',NULL),(3,3,'subcategoría3',NULL),(4,4,'subcategoría4',NULL);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subtitles`
--

DROP TABLE IF EXISTS `subtitles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subtitles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ccLang` varchar(20) COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subtitles`
--

LOCK TABLES `subtitles` WRITE;
/*!40000 ALTER TABLE `subtitles` DISABLE KEYS */;
INSERT INTO `subtitles` VALUES (1,'Español'),(2,'Inglés'),(3,'Portugués'),(4,'Francés'),(5,'Alemán');
/*!40000 ALTER TABLE `subtitles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) COLLATE latin1_bin NOT NULL,
  `last_name` varchar(50) COLLATE latin1_bin NOT NULL,
  `email` varchar(50) COLLATE latin1_bin NOT NULL,
  `password` varchar(100) COLLATE latin1_bin NOT NULL,
  `birth_date` date NOT NULL,
  `image` varchar(50) COLLATE latin1_bin NOT NULL,
  `role_id` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `role_id_idx` (`role_id`),
  CONSTRAINT `role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Flavio','Salinas','flavio.salinas@casadigital.com.ar','$2b$10$2LRXUxYMjazn/i6.EyRuLuYoBoxsWCJt300XrZbXrudA5D6RBIsFq','1972-11-30','img-1621482427227.jpg',2),(3,'Luciano','Segura','luciano.segura@casadigital.com.ar','$2b$10$ntFaK7GrnxiQoXorBs4GhOqREfEm5L8EUs8Kt9xFMWABp8RjnNs8G','1979-09-21','img-1620060976226.jpg',2),(13,'Nadia','Mamsuk','nadia.mamsuk@casadigital.com.ar','$2b$10$p99l8VMTugGsnLaBkzMgu.ayvSmG9PREgNhDh.DOWKqwAz2fuNtru','1985-04-12','img-1622689068822.jpg',2),(15,'Santiago','Argilla','sargilla@sarasa.com','$2b$10$phwyaYLwMZITL9cbMrk3sOs8opG.sQ3/HAMJnf.o8mfbsKv5.uRYe','2021-06-06','default-avatar.jpg',1),(16,'Sarasa','sasasa','asdda@asas.com','$2b$10$dewY9taJnCV41YvAYy2d1uGysPjhH04DcwXsPur0Y4BDuePhYwpxi','2021-06-01','default-avatar.jpg',1),(17,'Santi','Argilla','santi@tutu.com','$2b$10$YNmYfqqALYe11AyWJe99ZuuB0XSpLHFbKkrgW2b6d9aCS5PgOXiyO','2021-06-08','default-avatar.jpg',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-16 16:19:01
