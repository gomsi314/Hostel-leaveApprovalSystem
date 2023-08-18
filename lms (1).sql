-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 18, 2023 at 08:10 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `hostel` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `hostel`) VALUES
(101, 'admin1', 'admin1', 'N'),
(102, 'admin2', 'admin2', 'M'),
(103, 'ggarg_be20@thapar.edu', 'admin3', 'K'),
(104, 'admin4', 'admin4', 'L');

-- --------------------------------------------------------

--
-- Table structure for table `leaverequest`
--

CREATE TABLE `leaverequest` (
  `id` int(100) NOT NULL,
  `begindate` date NOT NULL,
  `enddate` date NOT NULL,
  `approval` varchar(10) NOT NULL,
  `hostel` varchar(10) NOT NULL,
  `reqid` varchar(20) NOT NULL,
  `gateid` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `leaverequest`
--

INSERT INTO `leaverequest` (`id`, `begindate`, `enddate`, `approval`, `hostel`, `reqid`, `gateid`) VALUES
(5, '2023-07-27', '2023-07-28', 'yes', 'K', 'T7ErR', '1NYcP'),
(3, '2023-07-28', '2023-07-30', 'yes', 'L', 'n3AZU', 'FdwWJ'),
(1, '2023-07-28', '2023-07-30', 'yes', 'K', '0IT1k', 'I2Y1I'),
(2, '2023-07-22', '2023-07-29', 'yes', 'M', 'gxfJD', 'Rsx9V'),
(5, '2023-07-28', '2023-07-29', 'yes', 'K', 'V5gsc', 'LCFYL'),
(1, '2023-08-27', '2023-08-31', 'NA', 'K', 'XVrF7', 'NgxE0'),
(1, '2023-08-26', '2023-08-27', 'NA', 'K', 'i8dkP', 'XeZ5v'),
(1, '2023-08-20', '2023-08-31', 'NA', 'K', 'out0k', 'LBTqJ'),
(1, '2023-08-25', '2023-08-26', 'NA', 'K', 'Mdpuo', 'PzUPx'),
(1, '2023-08-26', '2023-08-27', 'NA', 'K', 'ko0aZ', 'J235w'),
(1, '2023-08-26', '2023-08-26', 'NA', 'K', 'T0h9M', 'Y6mVX'),
(1, '2023-08-18', '2023-08-24', 'NA', 'K', 'M5PUz', 'u2Tsu'),
(1, '2023-08-26', '2023-08-31', 'NA', 'K', 'a3Z6e', 'YIlwr'),
(1, '2023-08-19', '2023-08-24', 'NA', 'K', 'PePAu', 'O1plo'),
(1, '2023-08-13', '2023-09-02', 'NA', 'K', 'Y4SGy', '9HdsJ'),
(1, '2023-08-19', '2023-08-26', 'NA', 'K', '1xw8f', 'S0R2p'),
(1, '2023-08-27', '2023-08-27', 'NA', 'K', '15L7U', 'h2UwD'),
(1, '2023-08-20', '2023-08-25', 'NA', 'K', 'Avtvt', 'jYz0i'),
(1, '2023-08-24', '2023-08-26', 'NA', 'K', 'MFjs8', 'i6GrK'),
(1, '2023-08-19', '2023-08-20', 'NA', 'K', 'METfa', 'lzU9T'),
(1, '2023-09-01', '2023-09-02', 'NA', 'K', 'Lzano', 'o9VUm'),
(1, '2023-08-19', '2023-08-20', 'NA', 'K', '0tc3C', 'Hordc'),
(1, '2023-08-19', '2023-08-20', 'NA', 'K', 'nO46K', 'B2LHj'),
(1, '2023-08-20', '2023-08-27', 'NA', 'K', 'YagHE', '9NEFd'),
(1, '2023-08-20', '2023-08-27', 'NA', 'K', 'Tuu7K', 'OB4e1'),
(1, '2023-08-27', '2023-08-30', 'NA', 'K', 'JeGIP', 'Hy089'),
(1, '2023-08-20', '2023-08-27', 'NA', 'K', '26GbR', 'HNh9k'),
(1, '2023-08-25', '2023-08-20', 'NA', 'K', 'ue9io', '7Chsq'),
(1, '2023-08-13', '2023-08-14', 'NA', 'K', 'vJzyz', 'ScL8f'),
(1, '2023-08-20', '2023-08-23', 'NA', 'K', 'HEgb2', '4HGkg'),
(1, '2023-08-26', '2023-08-19', 'NA', 'K', 'pIjfq', 'EfzBt'),
(1, '2023-08-20', '2023-08-19', 'NA', 'K', 'zDqab', '9euY1'),
(1, '2023-08-19', '2023-08-19', 'NA', 'K', 'vAHaC', 'lCQdO');

-- --------------------------------------------------------

--
-- Table structure for table `pass`
--

CREATE TABLE `pass` (
  `id` int(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pass`
--

INSERT INTO `pass` (`id`, `username`, `password`) VALUES
(1, 'gomsi314@gmail.com', 'password1'),
(2, 'gomsi.manju@gmail.com', 'password2'),
(4, 'user4', 'password4'),
(3, 'user3', 'password3'),
(5, 'user5', 'password5'),
(6, 'user6', 'password6'),
(7, 'user7', 'password7'),
(8, 'user8', 'password8');

-- --------------------------------------------------------

--
-- Table structure for table `pdfdownload`
--

CREATE TABLE `pdfdownload` (
  `id` int(100) NOT NULL,
  `pdf` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_content`
--

CREATE TABLE `user_content` (
  `id` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `roll` int(100) NOT NULL,
  `branch` varchar(100) NOT NULL,
  `hostel` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_content`
--

INSERT INTO `user_content` (`id`, `name`, `roll`, `branch`, `hostel`) VALUES
(1, 'gomsi', 102003251, 'coe', 'K'),
(2, 'rohit', 102003254, 'coe', 'M'),
(3, 'nitanshu', 102003250, 'coe', 'L'),
(4, 'ishan', 102003261, 'coe', 'L'),
(5, 'rohini', 102003240, 'enc', 'K'),
(6, 'rizvaan', 102003259, 'biotech', 'M'),
(7, 'karan', 102003219, 'ece', 'M'),
(8, 'vardaan', 102003211, 'ece', 'L');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
