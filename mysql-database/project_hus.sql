-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20220726.01cf9ce82e
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 21, 2022 lúc 05:30 PM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `project_hus`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `assignment`
--

CREATE DATABASE IF NOT EXISTS project_hus;
USE project_hus;

CREATE TABLE `assignment` (
  `AssignmentId` int(11) NOT NULL,
  `content` text NOT NULL,
  `title` text NOT NULL,
  `classId` int(11) NOT NULL,
  `date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `assignment`
--

INSERT INTO `assignment` (`AssignmentId`, `content`, `title`, `classId`, `date`) VALUES
(2, '....\n', 'test', 1, '2022-10-18 11:11:18'),
(3, 'test2', 'test2', 1, '2022-10-18 11:12:13'),
(4, 'test3', 'test3', 1, '2022-10-18 11:23:43'),
(5, '1', 'test4', 1, '2022-10-18 11:25:05'),
(6, '1\n', 'test5', 1, '2022-10-18 11:25:22'),
(7, '1', 'test6', 1, '2022-10-18 11:26:33'),
(8, 'hehaha', 'lastest', 1, '2022-10-18 20:59:02'),
(9, 'content', 'fish', 1, '2022-10-18 21:25:07');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `classes`
--

CREATE TABLE `classes` (
  `classId` int(11) NOT NULL,
  `className` varchar(50) CHARACTER SET utf8 NOT NULL,
  `classImage` varchar(255) CHARACTER SET utf8 DEFAULT 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
  `type` bit(1) DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `classes`
--

INSERT INTO `classes` (`classId`, `className`, `classImage`, `type`) VALUES
(1, 'SQL', '1666068088-Screenshot 2022-10-18 065115.png', b'1'),
(2, 'Math', '1666068081-Screenshot 2022-10-18 070852.png', b'1'),
(3, 'Eng', '1666068076-Screenshot 2022-10-18 065051.png', b'1'),
(4, 'React', '1666068069-Screenshot 2022-10-18 064722.png', b'0'),
(8, 'Fish', '1666102961-Screenshot 2022-10-18 064433.png', b'0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `commentId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `commentContent` text DEFAULT NULL,
  `commentImage` varchar(255) DEFAULT NULL,
  `commentName` varchar(50) NOT NULL,
  `commentTime` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `comments`
--

INSERT INTO `comments` (`commentId`, `postId`, `commentContent`, `commentImage`, `commentName`, `commentTime`) VALUES
(1, 1, 'I love you so much! 1 ', '', '', '2022-10-15 11:41:30'),
(2, 1, 'I love you so much! 2 ', '', '', '2022-10-15 11:41:30'),
(3, 1, 'I love you so much! 3 ', '', '', '2022-10-15 11:41:30'),
(4, 9, 'hello', NULL, 'Phúc', '2022-10-16 15:36:46'),
(5, 9, 'heelo', NULL, 'Phúc', '2022-10-16 15:36:58'),
(6, 9, 'hello', NULL, 'Phúc', '2022-10-16 15:38:59'),
(7, 9, 'aloooo', NULL, 'Phúc', '2022-10-16 15:39:05'),
(8, 9, 'hello', NULL, 'Phúc', '2022-10-16 15:39:51'),
(9, 7, 'aloo', NULL, 'Phúc', '2022-10-16 15:39:57'),
(10, 7, '', NULL, 'Phúc', '2022-10-16 15:41:21'),
(11, 7, '', NULL, 'Phúc', '2022-10-16 15:41:26'),
(12, 7, '', NULL, 'Phúc', '2022-10-16 15:41:28'),
(13, 9, 'aloo', NULL, 'Phúc', '2022-10-16 15:41:54'),
(14, 9, '1', NULL, 'Phúc', '2022-10-16 15:41:59'),
(15, 9, '', NULL, 'Phúc', '2022-10-16 15:42:09'),
(16, 9, 'dfd', NULL, 'Phúc', '2022-10-16 15:43:01'),
(17, 9, '', NULL, 'Phúc', '2022-10-16 15:44:37'),
(18, 9, '', NULL, 'Phúc', '2022-10-16 15:44:40'),
(19, 9, '', NULL, 'Phúc', '2022-10-16 15:44:42'),
(20, 9, '', NULL, 'Phúc', '2022-10-16 15:44:44'),
(21, 9, '', NULL, 'Phúc', '2022-10-16 15:45:27'),
(22, 9, '', NULL, 'Phúc', '2022-10-16 15:45:46'),
(23, 9, '', NULL, 'Phúc', '2022-10-16 15:45:50'),
(24, 9, '', NULL, 'Phúc', '2022-10-16 15:46:07'),
(25, 9, '', NULL, 'Phúc', '2022-10-16 15:46:24'),
(26, 9, '', NULL, 'Phúc', '2022-10-16 15:46:29'),
(27, 9, 'lkdfjgkljdfgd', NULL, 'Phúc', '2022-10-16 15:46:57'),
(28, 9, 'dsfsdfdfgdlgjfljglfkgjf', NULL, 'Phúc', '2022-10-16 15:47:18'),
(29, 9, 'dsld;lgk;dflkg;lkdfgd', NULL, 'Phúc', '2022-10-16 15:47:33'),
(30, 9, 'helllo phuc ngu', NULL, 'Phúc', '2022-10-16 15:47:56'),
(31, 10, 'helllo 1', NULL, 'Phúc', '2022-10-17 11:41:46'),
(32, 49, 'lkjdlfkgj', NULL, 'Phúc', '2022-10-18 00:54:24'),
(33, 53, 'demo 1', NULL, 'Phúc', '2022-10-18 07:08:11');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `documents`
--

CREATE TABLE `documents` (
  `documentId` int(11) NOT NULL,
  `documentName` varchar(50) CHARACTER SET utf8 NOT NULL,
  `documentFile` varchar(255) NOT NULL,
  `classId` int(11) NOT NULL,
  `statusDocuments` bit(1) DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `documents`
--

INSERT INTO `documents` (`documentId`, `documentName`, `documentFile`, `classId`, `statusDocuments`) VALUES
(1, 'bai1', 'doc_1.pdf', 4, b'1'),
(2, 'bai2', 'doc_2.pdf', 4, b'1'),
(3, 'bai3', 'doc_3', 4, b'1'),
(4, 'bai4', 'doc_4', 4, b'1'),
(6, 'Fish', 'doc_2.pdf', 1, b'0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `exercise`
--

CREATE TABLE `exercise` (
  `ExerciseId` int(11) NOT NULL,
  `ExerciseName` varchar(50) CHARACTER SET utf8 NOT NULL,
  `ExerciseFile` varchar(255) NOT NULL,
  `classId` int(11) NOT NULL,
  `startingDay` datetime DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `statusExercise` bit(1) DEFAULT b'0',
  `typeExercise` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `exercise`
--

INSERT INTO `exercise` (`ExerciseId`, `ExerciseName`, `ExerciseFile`, `classId`, `startingDay`, `deadline`, `statusExercise`, `typeExercise`) VALUES
(1, 'Home_work_1', 'doc_1.pdf', 4, '2022-10-16 00:00:00', '2022-10-17 00:00:00', b'1', 'bai_tap_ve_nha'),
(2, 'Home_work_2', 'doc_2.pdf', 4, '2022-10-15 00:00:00', '2022-10-18 00:00:00', b'1', 'bai_tap_ve_nha'),
(3, 'Home_work_1', 'doc_3.pdf', 4, '2022-10-16 00:00:00', '2022-10-19 00:00:00', b'1', 'bai_tap_ve_nha'),
(11, 'Fish', 'doc_1.pdf', 1, '2022-01-01 01:01:01', '2022-01-01 01:02:01', b'0', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `exercisedetails`
--

CREATE TABLE `exercisedetails` (
  `exerciseId` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `fileUpload` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `exercisedetails`
--

INSERT INTO `exercisedetails` (`exerciseId`, `studentId`, `fileUpload`) VALUES
(1, 1, '1665940715-Uniqlo.docx'),
(11, 1, '1666103151-doc_1.pdf');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `image` varchar(191) NOT NULL,
  `description` mediumtext NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `news`
--

INSERT INTO `news` (`id`, `title`, `image`, `description`, `create_at`) VALUES
(1, 'aefawefawef', '1665802857-no1.jpg', '<p>&lt;p&gt;aefawefawefawefawefawf&lt;/p&gt;Asaadsdsadsafawaef</p>\r\n<p>awef</p>\r\n<p>awef</p>\r\n<p>awef</p>\r\n', '2022-10-15 00:14:39'),
(14, 'ăefawfawf', '1665819526-no1.jpg', '&lt;p&gt;ưaefawefaewf&lt;/p&gt;\r\n', '2022-10-15 00:38:46'),
(17, 'lolol', '1665829839-no2.jpg', 'lololok2', '2022-10-15 03:30:39'),
(18, 'awefawefawefawe', '1665838702-leHuyenTrang.jpg', '&lt;p&gt;aewfawefawefawe&lt;/p&gt;\r\n&lt;p&gt;fawe&lt;/p&gt;\r\n&lt;p&gt;faw&lt;/p&gt;\r\n&lt;p&gt;ef&lt;/p&gt;\r\n&lt;p&gt;waf&lt;/p&gt;\r\n&lt;p&gt;awef&lt;/p&gt;\r\n&lt;p&gt;weaf&lt;/p&gt;\r\n&lt;p&gt;fawe&lt;/p&gt;\r\n&lt;p&gt;faw&lt;/p&gt;\r\n&lt;p&gt;ef&lt;/p&gt;\r\n&lt;p&gt;awef&lt;/p&gt;\r\n&lt;p&gt;awef&lt;/p&gt;\r\n&lt;p&gt;&lt;/p&gt;\r\n', '2022-10-15 05:58:22'),
(19, 'awefwafawf', '1665839042-no2.jpg', '&lt;p&gt;aewfaefawf&lt;/p&gt;\r\n&lt;p&gt;awe&lt;/p&gt;\r\n&lt;p&gt;fawe&lt;/p&gt;\r\n&lt;p&gt;fawe&lt;/p&gt;\r\n&lt;p&gt;aew&lt;/p&gt;\r\n&lt;p&gt;faew&lt;/p&gt;\r\n&lt;p&gt;ewa&lt;/p&gt;\r\n&lt;p&gt;fwefawefawef&lt;/p&gt;\r\n&lt;p&gt;&lt;/p&gt;\r\n&lt;p&gt;awefawef&lt;/p&gt;\r\n&lt;p&gt;&lt;/p&gt;\r\n', '2022-10-15 06:04:02'),
(20, 'aefaefaf', '1665839433-no2.jpg', '&lt;p&gt;afafaefawfawfwafwaeewsdefsdsdsd&lt;/p&gt;\r\n&lt;p&gt;affa&lt;/p&gt;\r\n&lt;p&gt;af&lt;/p&gt;\r\n&lt;p&gt;wefafawawfawfawawfawawfaewfa&lt;/p&gt;\r\n&lt;p&gt;aeffaefaaefaaefwfafwafawef&lt;/p&gt;\r\n&lt;p&gt;awfawfawfawfaw&lt;/p&gt;\r\n&lt;p&gt;fawefawefawe&lt;/p&gt;\r\n&lt;p&gt;fwefaefawfawfweafawefawf&lt;/p&gt;\r\n', '2022-10-15 06:10:33'),
(21, 'aewfawefawefawefawef', '1665839562-no3.jpg', '<p>afeawawefawfawfawefawefawef</p>\r\n', '2022-10-15 06:12:42'),
(22, 'awefawef', '1665840649-no1.jpg', '<p><strong>aefawefAWEfAWEf</strong></p>\n<p><span style=\"font-size: 30px;\">awef</span></p>\n<p><span style=\"font-family: Times New Roman;\">awef</span></p>\n<p><sup>awef</sup></p>\n<ol>\n<li><del><em><ins>awef</ins></em></del></li>\n<ol>\n<li><span style=\"color: rgb(84,172,210);\">wa</span></li>\n</ol>\n</ol>\n<p></p>\n<p></p>\n<img src=\"https://www.freecodecamp.org/news/content/images/2021/03/js-number-tostring.png\" alt=\"undefined\" style=\"height: auto;width: auto\"/>\n<p></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\n<iframe width=\"700\" height=\"700\" src=\"https://www.youtube.com/embed/2kTCztIhuXg\" frameBorder=\"0\"></iframe>\n<p>aewfawfeawefaw</p>\n<p style=\"text-align:center;\">awfeawfawefewfaefaff<code>fawef afafawefa</code>f</p>\n<p></p>\n<p style=\"text-align:center;\">qqq</p>\n<iframe width=\"auto\" height=\"auto\" src=\"https://www.youtube.com/embed/2kTCztIhuXg\" frameBorder=\"0\"></iframe>\n<p></p>\n<iframe width=\"auto\" height=\"auto\" src=\"https://www.youtube.com/watch?v=aXc55XnS0B4&list=PLCakfctNSHkFDTFczqhXNv-nYMHvLMT1H&index=7\" frameBorder=\"0\"></iframe>\n<p></p>\n<p></p>\n<p></p>\n', '2022-10-15 06:30:49'),
(23, 'aewfwefawefa', '1665840738-no3.jpg', '<p><span style=\"color: rgb(26,188,156);\">dasADWqwdQDWqd</span></p>\n', '2022-10-15 06:32:18'),
(24, 'sadboisitinhsssassss', '1665856416-21020686_Le To Hieu - Copy.png', '<p>aaaaaaokbroaaaaaa</p>\r\n', '2022-10-15 09:58:32'),
(28, 'Fish', '1666068424-Screenshot 2022-10-18 064722.png', '<p></p>\r\n', '2022-10-18 04:47:04'),
(29, 'Fish1', '1666068516-Screenshot 2022-10-18 065051.png', '<p></p>\r\n<iframe width=\"auto\" height=\"auto\" src=\"https://www.youtube.com/embed/xAqdoU1G5AU\" frameBorder=\"0\"></iframe>\r\n<p></p>\r\n', '2022-10-18 04:48:36'),
(30, 'demo1', '1666103004-Screenshot 2022-10-18 065115.png', '<p>demo 1</p>\r\n', '2022-10-18 14:23:24');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `posts`
--

CREATE TABLE `posts` (
  `postId` int(11) NOT NULL,
  `classId` int(11) NOT NULL,
  `postContent` text DEFAULT NULL,
  `postImage` varchar(255) DEFAULT NULL,
  `postName` varchar(50) NOT NULL,
  `postTime` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `posts`
--

INSERT INTO `posts` (`postId`, `classId`, `postContent`, `postImage`, `postName`, `postTime`) VALUES
(1, 1, 'I love you so much! 1 ', '', 'phuc ngu', '2022-10-15 11:41:30'),
(2, 1, 'I love you so much! 2 ', '', 'phuc oc bo', '2022-10-15 11:41:30'),
(3, 1, 'I love you so much! 3 ', '', 'hhaaa', '2022-10-15 11:41:30'),
(4, 1, 'I love you so much! 4 ', '', 'hieu', '2022-10-15 11:41:30'),
(5, 1, 'cuong', '1665815012-đặng văn cường.jpg', 'cuong', '2022-10-15 13:23:32'),
(6, 4, 'hello everybody', '', 'hieu tre trau', '2022-10-16 14:39:56'),
(7, 4, 'test anh', '1665906119-đặng văn cường.jpg', 'phuc oc bo', '2022-10-16 14:41:59'),
(8, 4, 'hello world', '', 'phuc ngu', '2022-10-16 14:53:59'),
(9, 4, 'hello test', '1665906851-đặng văn cường.jpg', 'dang van cuong', '2022-10-16 14:54:11'),
(10, 4, 'heelo\r\n', '', '', '2022-10-17 11:41:38'),
(11, 4, 'hello', '', '', '2022-10-17 11:50:50'),
(12, 4, 'sdfdsf\r\n', '', '', '2022-10-17 11:51:02'),
(13, 4, 'sdkjfkdhg', '', '', '2022-10-17 11:56:15'),
(14, 4, 'kdljlfjladkjglkfd', '', 'Phúc', '2022-10-17 11:58:10'),
(15, 4, 'kdljlfjladkjglkfd', '', 'Phúc', '2022-10-17 11:58:16'),
(16, 4, 'kdljlfjladkjglkfd', '', 'Phúc', '2022-10-17 11:58:17'),
(17, 4, 'kdljlfjladkjglkfd', '', 'Phúc', '2022-10-17 11:58:17'),
(18, 4, 'kdljlfjladkjglkfd', '', 'Phúc', '2022-10-17 11:58:17'),
(19, 4, 'kdljlfjladkjglkfd', '', 'Phúc', '2022-10-17 11:58:17'),
(20, 4, 'kdljlfjladkjglkfd', '', 'Phúc', '2022-10-17 11:58:17'),
(21, 4, 'kdljlfjladkjglkfd', '', 'Phúc', '2022-10-17 11:58:28'),
(22, 4, 'test post', '', 'Phúc', '2022-10-17 22:48:42'),
(23, 4, '', '', 'Phúc', '2022-10-17 22:49:35'),
(24, 4, '', '', 'Phúc', '2022-10-17 22:49:36'),
(25, 4, '', '', 'Phúc', '2022-10-17 22:49:40'),
(26, 4, '', '', 'Phúc', '2022-10-17 22:49:40'),
(27, 4, '', '', 'Phúc', '2022-10-17 22:49:40'),
(28, 4, '', '', 'Phúc', '2022-10-17 22:49:40'),
(29, 4, 'vdfdf\r\n', '', 'Phúc', '2022-10-17 22:51:23'),
(30, 4, '', '', 'Phúc', '2022-10-17 22:51:26'),
(31, 4, '', '', 'Phúc', '2022-10-17 22:51:27'),
(32, 4, '', '', 'Phúc', '2022-10-17 22:51:41'),
(33, 4, '', '', 'Phúc', '2022-10-17 22:51:59'),
(34, 4, '', '', 'Phúc', '2022-10-17 22:52:05'),
(35, 4, '', '', 'Phúc', '2022-10-17 22:52:06'),
(36, 4, '', '', 'Phúc', '2022-10-17 22:52:06'),
(37, 4, '', '', 'Phúc', '2022-10-17 22:52:06'),
(38, 4, '', '', 'Phúc', '2022-10-17 22:52:07'),
(39, 4, '', '', 'Phúc', '2022-10-17 22:52:07'),
(40, 4, '', '', 'Phúc', '2022-10-17 22:52:07'),
(41, 4, '', '', 'Phúc', '2022-10-17 22:52:07'),
(42, 4, '', '', 'Phúc', '2022-10-17 22:52:07'),
(43, 4, '', '', 'Phúc', '2022-10-17 22:52:07'),
(44, 4, '', '', 'Phúc', '2022-10-17 22:52:07'),
(45, 4, '', '', 'Phúc', '2022-10-17 22:52:07'),
(46, 4, '', '', 'Phúc', '2022-10-17 22:52:07'),
(47, 4, '', '', 'Phúc', '2022-10-17 22:52:28'),
(48, 4, '', '', 'Phúc', '2022-10-17 22:52:42'),
(49, 1, 'dkfldjkfldjfds', '', 'Phúc', '2022-10-18 00:54:18'),
(50, 1, 'lop 1 ', '', 'Phúc', '2022-10-18 00:56:54'),
(51, 1, 'demo ', '1666051104-Screenshot 2022-10-18 064433.png', '', '2022-10-18 06:58:24'),
(52, 1, '', '1666051143-Screenshot 2022-10-18 064722.png', '', '2022-10-18 06:59:03'),
(53, 1, 'demo ', '1666051674-Screenshot 2022-10-18 064433.png', 'Phúc', '2022-10-18 07:07:54'),
(54, 1, 'demo1 ', '', 'Phúc', '2022-10-18 21:27:45');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `results`
--

CREATE TABLE `results` (
  `resultId` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `classId` int(11) NOT NULL,
  `averageMark` float DEFAULT 0,
  `componentMark` float DEFAULT 0,
  `midMark` float DEFAULT 0,
  `finalMark` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `results`
--

INSERT INTO `results` (`resultId`, `studentId`, `classId`, `averageMark`, `componentMark`, `midMark`, `finalMark`) VALUES
(1, 1, 1, 0, 0, 0, 0),
(2, 4, 1, 0, 0, 0, 0),
(3, 3, 2, 0, 0, 0, 0),
(4, 6, 2, 0, 0, 0, 0),
(5, 2, 3, 0, 0, 0, 0),
(6, 1, 3, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `schedule`
--

CREATE TABLE `schedule` (
  `scheduleId` int(11) NOT NULL,
  `classId` int(11) NOT NULL,
  `teacherId` int(11) NOT NULL,
  `startLesson` time NOT NULL,
  `endLesson` time NOT NULL,
  `DAY` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `schedule`
--

INSERT INTO `schedule` (`scheduleId`, `classId`, `teacherId`, `startLesson`, `endLesson`, `DAY`) VALUES
(1, 1, 1, '07:00:00', '09:00:00', 'Thứ 2'),
(2, 1, 2, '09:00:00', '11:00:00', 'Thứ 3'),
(3, 1, 3, '15:00:00', '17:00:00', 'Thứ 2 '),
(4, 1, 4, '13:00:00', '15:00:00', 'Thứ 4');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `students`
--

CREATE TABLE `students` (
  `studentId` int(11) NOT NULL,
  `studentPassword` varchar(50) CHARACTER SET utf8 NOT NULL,
  `studentName` varchar(50) CHARACTER SET utf8 NOT NULL,
  `birthDate` date DEFAULT NULL,
  `studentImage` varchar(255) CHARACTER SET utf8 DEFAULT 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
  `phoneNumber` varchar(10) DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `students`
--

INSERT INTO `students` (`studentId`, `studentPassword`, `studentName`, `birthDate`, `studentImage`, `phoneNumber`, `email`) VALUES
(1, '123456', 'Phúc', '2003-12-20', '1666101072-Screenshot 2022-10-18 065135.png', '0989192098', 'bom@gmail.com'),
(2, 'phucdepzai', 'Cá Bống', '2003-09-20', 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg', '0989194097', '210203@gmail.com'),
(3, 'hello', 'Hiếu', '2004-02-29', 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg', '1234567890', 'abc@gmail.com'),
(4, '456789', 'Linh', '2008-10-10', 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg', '0987654321', 'cba@gmail.com'),
(5, '123456', 'Trang', '2006-05-21', 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg', '0981933574', 'phucdepzai@gmail.com'),
(6, '20122003', 'Cường', '2007-07-01', 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg', '0988867891', 'cuong@gmail.com'),
(7, 'Cuong111', 'cuong', NULL, 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg', NULL, '2@gmail.com'),
(8, 'Cuong111', 'cuong', NULL, 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg', NULL, '3@gmail.com'),
(9, 'Cuong111', 'Fish', NULL, 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg', NULL, '111@gmail.com'),
(10, 'Cuong111', 'Fisg', NULL, 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg', NULL, 'aaa@gmail.com'),
(11, 'Aaaaa1', 'Fish', NULL, 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg', NULL, '1111111@gmail.com'),
(12, '123456', 'Fish', NULL, 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg', '0111111111', 'test@gmail.com');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `teachers`
--

CREATE TABLE `teachers` (
  `teacherId` int(11) NOT NULL,
  `teacherPassword` varchar(50) CHARACTER SET utf8 NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 NOT NULL,
  `teacherName` varchar(50) CHARACTER SET utf8 NOT NULL,
  `teacherPhone` varchar(50) CHARACTER SET utf8 NOT NULL,
  `birthDate` date DEFAULT NULL,
  `teacherImage` varchar(255) CHARACTER SET utf8 DEFAULT 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `teachers`
--

INSERT INTO `teachers` (`teacherId`, `teacherPassword`, `email`, `teacherName`, `teacherPhone`, `birthDate`, `teacherImage`) VALUES
(1, 'rabiloo', '111@gmail.com', 'Phuc 1', '0365818018', '0000-00-00', ''),
(2, 'rabiloo', '222@gmail.com', 'T├║', '1234567890', '0000-00-00', ''),
(3, 'rabiloo', '333@gmail.com', 'Quß╗│nh', '09876654321', '0000-00-00', ''),
(4, 'rabiloo', '444@gmail.com', 'Tuß║Ñn', '0949598975', '0000-00-00', ''),
(6, 'rabiloo', '666@gmail.com', 'Lan Nhi', '0987612345', '0000-00-00', '');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `assignment`
--
ALTER TABLE `assignment`
  ADD PRIMARY KEY (`AssignmentId`),
  ADD KEY `classId` (`classId`);

--
-- Chỉ mục cho bảng `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`classId`);

--
-- Chỉ mục cho bảng `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`commentId`),
  ADD KEY `postId` (`postId`);

--
-- Chỉ mục cho bảng `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`documentId`),
  ADD KEY `classId` (`classId`);

--
-- Chỉ mục cho bảng `exercise`
--
ALTER TABLE `exercise`
  ADD PRIMARY KEY (`ExerciseId`),
  ADD KEY `classId` (`classId`);

--
-- Chỉ mục cho bảng `exercisedetails`
--
ALTER TABLE `exercisedetails`
  ADD KEY `exerciseId` (`exerciseId`),
  ADD KEY `studentId` (`studentId`);

--
-- Chỉ mục cho bảng `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`postId`),
  ADD KEY `classId` (`classId`);

--
-- Chỉ mục cho bảng `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`resultId`),
  ADD KEY `classId` (`classId`),
  ADD KEY `studentId` (`studentId`);

--
-- Chỉ mục cho bảng `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`scheduleId`),
  ADD KEY `teacherId` (`teacherId`),
  ADD KEY `classId` (`classId`);

--
-- Chỉ mục cho bảng `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`studentId`);

--
-- Chỉ mục cho bảng `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacherId`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `assignment`
--
ALTER TABLE `assignment`
  MODIFY `AssignmentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `classes`
--
ALTER TABLE `classes`
  MODIFY `classId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `commentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT cho bảng `documents`
--
ALTER TABLE `documents`
  MODIFY `documentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `exercise`
--
ALTER TABLE `exercise`
  MODIFY `ExerciseId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT cho bảng `posts`
--
ALTER TABLE `posts`
  MODIFY `postId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT cho bảng `results`
--
ALTER TABLE `results`
  MODIFY `resultId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `schedule`
--
ALTER TABLE `schedule`
  MODIFY `scheduleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `students`
--
ALTER TABLE `students`
  MODIFY `studentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacherId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `assignment`
--
ALTER TABLE `assignment`
  ADD CONSTRAINT `assignment_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`classId`);

--
-- Các ràng buộc cho bảng `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`);

--
-- Các ràng buộc cho bảng `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`classId`);

--
-- Các ràng buộc cho bảng `exercise`
--
ALTER TABLE `exercise`
  ADD CONSTRAINT `exercise_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`classId`);

--
-- Các ràng buộc cho bảng `exercisedetails`
--
ALTER TABLE `exercisedetails`
  ADD CONSTRAINT `exercisedetails_ibfk_1` FOREIGN KEY (`exerciseId`) REFERENCES `exercise` (`ExerciseId`),
  ADD CONSTRAINT `exercisedetails_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `students` (`studentId`);

--
-- Các ràng buộc cho bảng `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`classId`);

--
-- Các ràng buộc cho bảng `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`classId`),
  ADD CONSTRAINT `results_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `students` (`studentId`);

--
-- Các ràng buộc cho bảng `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `teachers` (`teacherId`),
  ADD CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`classId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
