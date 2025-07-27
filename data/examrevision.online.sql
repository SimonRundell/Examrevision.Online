/*
 Navicat Premium Data Transfer

 Source Server         : LOCALHOST
 Source Server Type    : MySQL
 Source Server Version : 80403 (8.4.3)
 Source Host           : localhost:3306
 Source Schema         : examrevision.online

 Target Server Type    : MySQL
 Target Server Version : 80403 (8.4.3)
 File Encoding         : 65001

 Date: 31/01/2025 07:31:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tblquiz
-- ----------------------------
DROP TABLE IF EXISTS `tblquiz`;
CREATE TABLE `tblquiz`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `quizCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `quizName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `quizSetBy` int NOT NULL,
  `quizSubject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `quizDescription` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `quizTopic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `quizYear` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `quizUnit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `quizData` json NOT NULL,
  PRIMARY KEY (`id`, `quizCode`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tblquiz
-- ----------------------------
INSERT INTO `tblquiz` VALUES (1, 'g4o21x', 'CS Quiz', 1, 'Computer Science', 'Drag and drop Computer Science revision', 'Revision', '11', NULL, '{\"QuestionSets\": [{\"Header\": \"Match the computer science term with its definition\", \"QuestionAnswerPairs\": [{\"Answer\": \"A step-by-step procedure to solve a problem or perform a task.\", \"Question\": \"Algorithm\"}, {\"Answer\": \"The base-2 number system used by computers, consisting of 0s and 1s.\", \"Question\": \"Binary\"}, {\"Answer\": \"The central processing unit, responsible for executing instructions.\", \"Question\": \"CPU\"}, {\"Answer\": \"A small amount of high-speed memory located inside or close to the CPU.\", \"Question\": \"Cache\"}]}, {\"Header\": \"Match the computer science term with its definition (Part 2)\", \"QuestionAnswerPairs\": [{\"Answer\": \"Volatile memory used to temporarily store data and instructions.\", \"Question\": \"RAM\"}, {\"Answer\": \"Non-volatile memory that contains essential instructions, such as the boot process.\", \"Question\": \"ROM\"}, {\"Answer\": \"The smallest unit of data in a computer.\", \"Question\": \"Bit\"}, {\"Answer\": \"A group of 8 bits, often representing a single character.\", \"Question\": \"Byte\"}]}, {\"Header\": \"Match the computer science term with its definition (Part 3)\", \"QuestionAnswerPairs\": [{\"Answer\": \"Programs and operating information used by a computer.\", \"Question\": \"Software\"}, {\"Answer\": \"The physical components of a computer.\", \"Question\": \"Hardware\"}, {\"Answer\": \"A unique string of numbers separated by periods that identifies each device on a network.\", \"Question\": \"IP Address\"}, {\"Answer\": \"The system that translates domain names into IP addresses.\", \"Question\": \"DNS\"}]}, {\"Header\": \"Match the network concept with its definition\", \"QuestionAnswerPairs\": [{\"Answer\": \"A device that forwards data packets between networks.\", \"Question\": \"Router\"}, {\"Answer\": \"A network security device that monitors and controls incoming and outgoing traffic.\", \"Question\": \"Firewall\"}, {\"Answer\": \"A local area network that covers a small geographical area.\", \"Question\": \"LAN\"}, {\"Answer\": \"A wide area network that spans large geographical areas.\", \"Question\": \"WAN\"}]}, {\"Header\": \"Match the network concept with its definition (Part 2)\", \"QuestionAnswerPairs\": [{\"Answer\": \"A small unit of data transmitted over a network.\", \"Question\": \"Packet\"}, {\"Answer\": \"A set of rules for transmitting data across a network.\", \"Question\": \"Protocol\"}, {\"Answer\": \"The process of converting data into a coded format to prevent unauthorized access.\", \"Question\": \"Encryption\"}, {\"Answer\": \"A unique identifier assigned to a network interface card.\", \"Question\": \"MAC Address\"}]}, {\"Header\": \"Match the IMedia concept with its description\", \"QuestionAnswerPairs\": [{\"Answer\": \"A visual tool used to capture ideas, themes, and styles for a project.\", \"Question\": \"Moodboard\"}, {\"Answer\": \"A sequence of drawings representing the shots planned for a video or animation.\", \"Question\": \"Storyboard\"}, {\"Answer\": \"A written document containing dialogue, actions, and directions for a production.\", \"Question\": \"Script\"}, {\"Answer\": \"A structured schedule of tasks and deadlines for a project.\", \"Question\": \"Work Plan\"}]}, {\"Header\": \"Match the IMedia concept with its description (Part 2)\", \"QuestionAnswerPairs\": [{\"Answer\": \"The specific group of people a product or media is designed for.\", \"Question\": \"Target Audience\"}, {\"Answer\": \"The legal right to control the use and distribution of original work.\", \"Question\": \"Copyright\"}, {\"Answer\": \"The physical components needed to complete a digital media project.\", \"Question\": \"Hardware Requirements\"}, {\"Answer\": \"The structure of a file, such as .jpg or .mp4, which determines how it is stored and used.\", \"Question\": \"File Format\"}]}, {\"Header\": \"Match the IMedia concept with its description (Part 3)\", \"QuestionAnswerPairs\": [{\"Answer\": \"The process of reducing the size of a file while maintaining quality.\", \"Question\": \"Compression\"}, {\"Answer\": \"An image made up of paths that can be scaled without losing quality.\", \"Question\": \"Vector Graphic\"}, {\"Answer\": \"An Integrated Development Environment used for writing, testing, and debugging code.\", \"Question\": \"IDE\"}, {\"Answer\": \"A tool that translates source code into machine code.\", \"Question\": \"Compiler\"}]}, {\"Header\": \"Match the software development concept with its definition\", \"QuestionAnswerPairs\": [{\"Answer\": \"A tool that executes code line by line.\", \"Question\": \"Interpreter\"}, {\"Answer\": \"The process of finding and fixing errors in a program.\", \"Question\": \"Debugging\"}, {\"Answer\": \"A set of instructions designed to perform a specific task.\", \"Question\": \"Algorithm\"}, {\"Answer\": \"A storage location identified by a name that holds data.\", \"Question\": \"Variable\"}]}, {\"Header\": \"Match the software development concept with its definition (Part 2)\", \"QuestionAnswerPairs\": [{\"Answer\": \"A block of code designed to perform a specific task.\", \"Question\": \"Function\"}, {\"Answer\": \"A collection of elements, each identified by an index.\", \"Question\": \"Array\"}, {\"Answer\": \"The repetition of a process within a program.\", \"Question\": \"Iteration\"}, {\"Answer\": \"A data type with only two possible values: true or false.\", \"Question\": \"Boolean\"}]}, {\"Header\": \"Match the ethical issue with its definition\", \"QuestionAnswerPairs\": [{\"Answer\": \"The right of individuals to control how their personal data is used.\", \"Question\": \"Data Privacy\"}, {\"Answer\": \"Measures taken to protect systems and data from cyber threats.\", \"Question\": \"Cybersecurity\"}, {\"Answer\": \"Copying someone else\'s work without proper acknowledgment.\", \"Question\": \"Plagiarism\"}, {\"Answer\": \"The gap between those with and without access to digital technology.\", \"Question\": \"Digital Divide\"}]}, {\"Header\": \"Match the ethical issue with its definition (Part 2)\", \"QuestionAnswerPairs\": [{\"Answer\": \"Unauthorized access to or manipulation of computer systems.\", \"Question\": \"Hacking\"}, {\"Answer\": \"The unauthorized copying and distribution of digital media.\", \"Question\": \"Piracy\"}, {\"Answer\": \"Using someone else\'s work without permission in violation of copyright laws.\", \"Question\": \"Copyright Infringement\"}, {\"Answer\": \"The principle that all internet traffic should be treated equally.\", \"Question\": \"Net Neutrality\"}]}, {\"Header\": \"Match the ethical issue with its definition (Part 3)\", \"QuestionAnswerPairs\": [{\"Answer\": \"The trail of data left behind by a user\'s online activity.\", \"Question\": \"Digital Footprint\"}, {\"Answer\": \"The effect of technology on the environment, such as e-waste.\", \"Question\": \"Environmental Impact\"}]}]}');

-- ----------------------------
-- Table structure for tbluser
-- ----------------------------
DROP TABLE IF EXISTS `tbluser`;
CREATE TABLE `tbluser`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `passwordHash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `studentName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `schoolName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `classNamen` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `admin` tinyint NOT NULL DEFAULT 0 COMMENT '1 = admin',
  `teacher` tinyint NOT NULL DEFAULT 0 COMMENT '1 = teacher',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbluser
-- ----------------------------
INSERT INTO `tbluser` VALUES (1, 'simon@rundell.org.uk', '81dc9bdb52d04dc20036dbd8313ed055', 'Mr Rundell', 'MAP', '', 1, 1);
INSERT INTO `tbluser` VALUES (2, 'test@test.com', '81dc9bdb52d04dc20036dbd8313ed055', 'Test User', 'MAP', '11F', 0, 0);

SET FOREIGN_KEY_CHECKS = 1;
