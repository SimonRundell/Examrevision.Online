/*
 Navicat Premium Data Transfer

 Source Server         : Exam Revision Live
 Source Server Type    : MySQL
 Source Server Version : 80028 (8.0.28-0ubuntu0.20.04.3)
 Source Host           : mysql.examrevision.online:3306
 Source Schema         : examrevision

 Target Server Type    : MySQL
 Target Server Version : 80028 (8.0.28-0ubuntu0.20.04.3)
 File Encoding         : 65001

 Date: 02/02/2025 23:24:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tblstatus
-- ----------------------------
DROP TABLE IF EXISTS `tblstatus`;
CREATE TABLE `tblstatus`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentID` int NOT NULL,
  `quizCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lastUpdate` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `quizComplete` tinyint(1) NOT NULL DEFAULT 0 COMMENT '1 = complete',
  `score` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tblstatus
-- ----------------------------
INSERT INTO `tblstatus` VALUES (3, 2, 'g4o21x', '2025-01-31 08:17:15', 0, 7);
INSERT INTO `tblstatus` VALUES (4, 2, 'g4o21x', '2025-01-31 08:18:17', 0, 8);

SET FOREIGN_KEY_CHECKS = 1;
