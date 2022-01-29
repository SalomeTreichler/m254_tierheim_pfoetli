-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 29. Jan 2022 um 13:51
-- Server-Version: 10.1.36-MariaDB
-- PHP-Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `m254_tierheim`
--
CREATE DATABASE IF NOT EXISTS `m254_tierheim` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `m254_tierheim`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `animal`
--

CREATE TABLE `animal` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `species` varchar(255) COLLATE utf8_bin NOT NULL,
  `breed` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `arrival` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `comment` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `statusId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `animal`
--

INSERT INTO `animal` (`id`, `name`, `species`, `breed`, `arrival`, `comment`, `statusId`) VALUES
(5, 'Charlie', 'Katze', '', '2022-01-27 16:49:58', 'Frisst alles', 12),
(6, 'Hoppel', 'Zwergkanninchen', 'Löwenköpfchen', '2022-01-27 16:38:16', 'Sehr bissig und aggressiv', 12),
(7, 'Honey', 'Hund', '', '2022-01-27 16:38:32', '', 13);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `status` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `status`
--

INSERT INTO `status` (`id`, `status`) VALUES
(5, 'CONTACT_OWNER'),
(7, 'TO_BE_EUTHANISED'),
(8, 'PICKED_UP'),
(10, 'ADOPTED'),
(11, 'EUTHANISED'),
(12, 'TO_BE_ADOPTED'),
(13, 'TO_BE_EXAMINED');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `animal`
--
ALTER TABLE `animal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `statusId` (`statusId`) USING BTREE;

--
-- Indizes für die Tabelle `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `animal`
--
ALTER TABLE `animal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT für Tabelle `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `animal`
--
ALTER TABLE `animal`
  ADD CONSTRAINT `animal_ibfk_1` FOREIGN KEY (`statusId`) REFERENCES `status` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
