-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: app_notes
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_8b0be371d28245da6e4f4b6187` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (130,'adventure'),(142,'cabro'),(133,'culinary'),(140,'education'),(135,'environment'),(138,'fitness'),(141,'gato'),(137,'health'),(132,'lifestyle'),(139,'mental-health'),(129,'nature'),(128,'plants'),(136,'self-improvement'),(134,'travel'),(127,'videogames'),(131,'wellness');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `archived` tinyint NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_829532ff766505ad7c71592c6a5` (`userId`),
  CONSTRAINT `FK_829532ff766505ad7c71592c6a5` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
INSERT INTO `notes` VALUES (4,'My first note','This is the content of the first note',1,'2024-12-15 03:42:06',NULL),(8,'Goles Virtuales: La Fusión Épica entre Fútbol, Videojuegos y Acción','En un mundo donde el fútbol se entrelaza con la adrenalina de los videojuegos de acción, un grupo de jóvenes gamers se convierte en el centro de atención al utilizar sus habilidades para superar niveles en un videojuego innovador. Mientras se enfrentan a desafiantes enemigos y escenarios llenos de emoción, deben aplicar tácticas futbolísticas en cada jugada, formando equipos para realizar impresionantes tiros de volea y hacer pases que no solo llevan a la victoria virtual, sino que los conecta con fanáticos de todo el mundo. En esta experiencia, los límites entre el campo de juego y el universo digital se desdibujan, creando una emocionante narrativa donde cada gol se celebra con el mismo fervor que un combate épico.',0,'2024-12-16 03:49:17',NULL),(9,'Testing the form','I like to code but the style i have is not the best',1,'2024-12-16 16:35:04',NULL),(10,'AMIGOS Virtuales: La Fusión Épica entre Fútbol, Videojuegos y Acción','En un mundo donde el fútbol se entrelaza con la adrenalina de los videojuegos de acción, un grupo de jóvenes gamers se convierte en el centro de atención al utilizar sus habilidades para superar niveles en un videojuego innovador. Mientras se enfrentan a desafiantes enemigos y escenarios llenos de emoción, deben aplicar tácticas futbolísticas en cada jugada, formando equipos para realizar impresionantes tiros de volea y hacer pases que no solo llevan a la victoria virtual, sino que los conecta con fanáticos de todo el mundo. En esta experiencia, los límites entre el campo de juego y el universo digital se desdibujan, creando una emocionante narrativa donde cada gol se celebra con el mismo fervor que un combate épico.',1,'2024-12-16 17:53:20',NULL),(11,'ENEMIGOS Virtuales: La Fusión Épica entre Fútbol, Videojuegos y Acción','En un mundo donde el fútbol se entrelaza con la adrenalina de los videojuegos de acción, un grupo de jóvenes gamers se convierte en el centro de atención al utilizar sus habilidades para superar niveles en un videojuego innovador. Mientras se enfrentan a desafiantes enemigos y escenarios llenos de emoción, deben aplicar tácticas futbolísticas en cada jugada, formando equipos para realizar impresionantes tiros de volea y hacer pases que no solo llevan a la victoria virtual, sino que los conecta con fanáticos de todo el mundo. En esta experiencia, los límites entre el campo de juego y el universo digital se desdibujan, creando una emocionante narrativa donde cada gol se celebra con el mismo fervor que un combate épico.',0,'2024-12-16 17:53:27',NULL),(12,'TESTEO','TESTEANDO esta nota absurda',0,'2024-12-16 17:56:31',NULL),(13,'adadada','adadadada',1,'2024-12-16 19:35:49',NULL),(17,'Testeo con user 1','Testeando contenido con user 1',0,'2024-12-17 05:25:26',7),(18,'Testeo2 con user 1','Testeando2 contenido con user 1',0,'2024-12-17 05:31:58',1),(19,'Exploring the Wonders of Nature','Nature surrounds us with breathtaking landscapes, from lush forests to majestic mountains and serene coastlines. Exploring these natural wonders not only invigorates our spirits but also offers countless opportunities for adventure. Hiking through vibrant trails, kayaking on tranquil lakes, or simply observing wildlife in its habitat can enhance our appreciation for the Earth. Each outdoor experience serves as a reminder of the beauty and diversity that nature holds, encouraging us to protect and cherish these precious environments.',0,'2024-12-17 16:30:28',22),(20,'The Art of Mindful Living','Mindful living encourages us to be present in each moment, fostering a deeper connection with ourselves and our surroundings. This practice involves engaging fully in daily activities, whether it’s savoring a cup of tea, taking a leisurely walk, or simply breathing deeply. By cultivating mindfulness, we can reduce stress, improve mental clarity, and enhance our overall well-being. Incorporating mindfulness into our lives not only enriches our experiences but also empowers us to navigate challenges with grace and awareness, making each day more fulfilling.',1,'2024-12-17 16:31:11',22),(21,'The Joy of Cooking at Home','Cooking at home not only allows us to explore our culinary creativity but also fosters a deeper connection with the food we consume. By preparing meals from scratch, we can select fresh ingredients, experiment with diverse flavors, and cater dishes to our personal tastes and dietary needs. This practice promotes healthier eating habits while also becoming a means of bonding with family and friends. Whether it’s a simple weeknight dinner or an elaborate weekend feast, the joy of cooking at home transforms mealtime into a delightful experience that nourishes both body and soul.',1,'2024-12-17 16:31:47',22),(22,'Exploring Nature\'s Beauty','Nature offers a breathtaking array of landscapes and experiences that can rejuvenate our spirits and inspire our adventures. From lush forests and serene mountains to vibrant coastlines and expansive deserts, each environment holds its own unique charm. Exploring these natural wonders not only enhances our appreciation for the planet but also promotes conservation efforts to protect these precious ecosystems. Whether hiking through a national park, camping under the stars, or simply taking a stroll in a local garden, immersing ourselves in nature allows us to disconnect from the hustle and bustle of daily life and reconnect with the world around us.',0,'2024-12-17 16:32:43',22),(23,'Mastering the Art of Cooking at Home','Cooking at home can be one of the most rewarding and enjoyable experiences, transforming everyday meals into delicious adventures. With a few essential skills and the right ingredients, anyone can create culinary delights that rival those from the finest restaurants. Start by experimenting with diverse cuisines and flavors, using seasonal produce to inspire your dishes. Embrace the process by trying new recipes and techniques, whether it\'s baking artisanal bread, grilling vegetables, or making sauces from scratch. Cooking not only nourishes the body but also brings people together, making it an excellent way to bond with family and friends. Ultimately, mastering this art fosters creativity and confidence in the kitchen, leading to healthier eating habits and a more satisfying lifestyle.',1,'2024-12-17 16:34:03',22),(24,'Embracing Change for Personal Growth','Change is an inevitable part of life that often brings both challenges and opportunities for personal growth. Embracing change can lead to new perspectives, helping individuals discover their true potential. It is essential to cultivate a positive mindset and remain open to new experiences, whether they involve career shifts, relocation, or changes in relationships. To thrive during transitions, one can develop adaptive coping strategies such as setting realistic goals, seeking support from others, and practicing self-reflection. By viewing change as a chance to learn and evolve, we empower ourselves to create a fulfilling and resilient life, transforming obstacles into stepping stones toward success.',0,'2024-12-17 16:34:56',22),(25,'The Importance of Daily Exercise','Daily exercise is crucial for maintaining both physical and mental well-being. Engaging in regular physical activity helps improve cardiovascular health, strengthen muscles, and enhance flexibility, all while combating the effects of sedentary lifestyles. Additionally, exercise releases endorphins, often referred to as \"feel-good\" hormones, which can significantly reduce stress and anxiety, boosting overall mood. Whether it’s a brisk walk, a gym session, or a yoga class, finding activities that you enjoy can make it easier to incorporate movement into your daily routine. Prioritizing this habit not only contributes to a longer, healthier life but also creates a foundation for improved energy levels and better focus throughout the day.',0,'2024-12-17 16:35:48',22),(26,'The Power of Mindfulness in Daily Life','Mindfulness is the practice of being fully present and engaged in the moment, which can greatly enhance our overall well-being. By focusing on the here and now, we can reduce stress and improve emotional resilience, allowing us to navigate life\'s challenges with greater ease. Mindfulness techniques, such as meditation, deep breathing, and mindful walking, help cultivate awareness and foster a sense of connection to ourselves and our surroundings. Integrating mindfulness into daily routines—whether during meals or while commuting—can create a calmer mind and a more fulfilling life. Embracing this practice not only benefits mental health but also encourages a deeper appreciation for the world around us.',0,'2024-12-17 16:36:44',22),(27,'Benefits of Reading Every Day','Reading daily offers numerous benefits that can enhance both personal growth and cognitive abilities. It stimulates the brain, improving focus, concentration, and critical thinking skills. Regular reading also expands vocabulary and language skills, making it easier to express thoughts clearly and effectively. Additionally, it provides a unique opportunity to explore different perspectives and cultures, fostering empathy and understanding. Engaging with literature can serve as a great form of relaxation and stress relief, providing an escape from the pressures of everyday life. By dedicating just a few minutes each day to reading, individuals can cultivate a lifelong habit that enriches their minds and broadens their horizons.',1,'2024-12-17 16:37:38',22),(28,'GATOS CABROS','gatos cabros cojiendo',0,'2024-12-17 17:10:11',23);
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes_categories_categories`
--

DROP TABLE IF EXISTS `notes_categories_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notes_categories_categories` (
  `notesId` int NOT NULL,
  `categoriesId` int NOT NULL,
  PRIMARY KEY (`notesId`,`categoriesId`),
  KEY `IDX_2e0a2eff29df3f8cee53380bd9` (`notesId`),
  KEY `IDX_49f16f2a56924476186e59fc52` (`categoriesId`),
  CONSTRAINT `FK_2e0a2eff29df3f8cee53380bd94` FOREIGN KEY (`notesId`) REFERENCES `notes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_49f16f2a56924476186e59fc520` FOREIGN KEY (`categoriesId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes_categories_categories`
--

LOCK TABLES `notes_categories_categories` WRITE;
/*!40000 ALTER TABLE `notes_categories_categories` DISABLE KEYS */;
INSERT INTO `notes_categories_categories` VALUES (17,127),(17,128),(18,127),(18,128),(19,129),(19,130),(20,131),(20,132),(21,132),(21,133),(22,129),(22,134),(22,135),(23,132),(23,133),(24,136),(25,137),(25,138),(26,131),(26,132),(26,139),(27,130),(27,132),(27,140),(28,141);
/*!40000 ALTER TABLE `notes_categories_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test01@gmail.com','$2a$10$KiIPPnia.ptSwcUg5g5PyuxOlOukMpZb8J3fRIQBaMFnhgHt1.kqC','2024-12-16 20:27:56.497309'),(2,'test02@gmail.com','$2a$10$6iXJOQgGyHc/AW5jveqA.OKbmJbVlZ.Z1ge/2RVkL2W2vp1s4OzVa','2024-12-16 20:59:28.600845'),(3,'test03@gmail.com','$2a$10$4TJ/ToMfLm1o0F0eeORNOeI2J2e6glLX.NOZuv6UnV7MHJ.o6jNIW','2024-12-16 21:07:47.336204'),(4,'test04@gmail.com','$2a$10$APpuXcy8P6DW2xKp6fkYFea0OBzNZc86PExJL4rIO1kHVYP6e2wJm','2024-12-16 21:08:54.712043'),(5,'test05@gmail.com','$2a$10$o2VtJMCcZxhnPgi371SYRexFK.F/b1/X0O5MfGajfmRYhWcYxPFIS','2024-12-16 21:10:58.407522'),(6,'test06@gmail.com','$2a$10$M7Bv/iIPW3EPOrHcXOPTkus9M6ijAaoplW0b8HKet6ljaceNXCE/O','2024-12-16 21:13:15.179828'),(7,'test09@gmail.com','$2a$10$gr11chF4/OWOvRkgnODua.eu7RnkN01WVQqfkrD.tDEuzJd8X.kau','2024-12-16 23:30:17.581223'),(8,'test10@gmail.com','$2a$10$SxCbQVoSsSkVmbKZIR9wy.z0l2t0JExRwK3CFnw6ArJ7MS2KR7Sq.','2024-12-17 02:10:21.679643'),(9,'test11@gmail.com','$2a$10$XxjjtwDIvqf7HsF3IomISOsYBq/Jsap3F1GHdImqKMS9I9wJsyrsO','2024-12-17 02:21:41.050666'),(10,'test12@gmail.com','$2a$10$rpF.6XJAdd2jp7NwY9faseeKv8.VRQavFcYIVYVMFs88DsAYzDMP6','2024-12-17 02:31:43.926744'),(11,'test13@gmail.com','$2a$10$lMCPQQa.sKVlpk0YugN.TeT9r1PZAiTXkdGg8D9NEVeMKnU06B/w2','2024-12-17 02:36:30.747244'),(12,'test14@gmail.com','$2a$10$0APKBPBIYKMWeFD1XQB7dep.Vk7/Xf0S8HeBq3vh.l5bUjbD.JT.q','2024-12-17 02:38:54.273802'),(13,'test15@gmail.com','$2a$10$naSILAD6yhp6Ac5/iVoDWuZr3UbAgeebA3YCjEZO4XLZzml.SkcQ6','2024-12-17 02:42:38.388803'),(14,'test16@gmail.com','$2a$10$NmAbsaOgpzWAJwaAN4ENT.xuiDvq8f4AuDny8jek.5vJF8dy3h4Iq','2024-12-17 02:43:44.661565'),(15,'test17@gmail.com','$2a$10$xCCzUYMgnt7R1hfs9qR4yuTV0MvQ2qX6/jUS277R/gzBxe6iRFdVS','2024-12-17 02:46:56.067158'),(16,'test18@gmail.com','$2a$10$8nB3NTEIFZWTfmkuhr9NnepdyOVO9pCNPemj5Y5.DuIj4le2iYdp2','2024-12-17 02:47:39.787751'),(17,'test19@gmail.com','$2a$10$Lgc2QUiXQHt1KB4jUIOnhOT2C91HyDvXPEuHiEunDzny/aWUrjuNC','2024-12-17 02:47:50.323154'),(18,'test20@gmail.com','$2a$10$yk/h0KiegjixdaRYzMcoX.50L9qy24nO9B39j/Cjcbm0AgnzD6ocS','2024-12-17 02:48:19.259431'),(19,'test21@gmail.com','$2a$10$EfzGiHQ8paxdeMHKWDNMUuwh9drCTFfzo/eEuTBvP7AhohITUtqV.','2024-12-17 10:09:04.871846'),(20,'test22@gmail.com','$2a$10$MbZPzUrM0c15y.qhPRN37uvdPfrNraGUu5MUZDMomKL93gg8MqiRy','2024-12-17 11:23:28.167102'),(21,'test23@gmail.com','$2a$10$vA8MRDitRdh9/yAasbhV.OueLK2uQbHFHHXiMN.LiT.OA1kRaxbai','2024-12-17 11:25:01.743173'),(22,'Demo123@gmail.com','$2a$10$15yAThgfXTx6IpDaLQQzReoBnO6L./jRw7Qllh6DpTqMQtmSLxUK.','2024-12-17 11:28:29.827510'),(23,'Roa123@gmail.com','$2a$10$cS/gwfaWykm/D1/k8RgGrOPjqbRSGPDTnmqWFklXZrcg.ETdG9.16','2024-12-17 12:09:09.122514');
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

-- Dump completed on 2024-12-17 12:51:15
