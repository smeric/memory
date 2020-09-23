-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  mer. 23 sep. 2020 à 21:30
-- Version du serveur :  10.1.22-MariaDB
-- Version de PHP :  7.1.4


-- --------------------------------------------------------

--
-- Structure de la table `scores`
--

CREATE TABLE IF NOT EXISTS `scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `temps` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);

