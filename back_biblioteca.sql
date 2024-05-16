-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-05-2024 a las 18:41:02
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `back_biblioteca`
--
CREATE DATABASE IF NOT EXISTS `back_biblioteca` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `back_biblioteca`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `catalogo`
--

CREATE TABLE `catalogo` (
  `id_catalogo` int(11) NOT NULL,
  `id_libroF` int(11) NOT NULL,
  `id_categoriaF` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `codigo_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

CREATE TABLE `estudiante` (
  `id_estudiante` int(11) NOT NULL,
  `ci` int(11) NOT NULL,
  `nombre_estudiante` varchar(100) NOT NULL,
  `apellido_estudiante` varchar(100) NOT NULL,
  `estado_estudiante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estudiante`
--

INSERT INTO `estudiante` (`id_estudiante`, `ci`, `nombre_estudiante`, `apellido_estudiante`, `estado_estudiante`) VALUES
(1, 8914806, 'Cesar Castedo', 'Saucedo', 1),
(2, 9745601, 'Andres', 'Castedo', 1),
(3, 8852085, 'Juan Carlos', 'Castellon Valdez', 1),
(4, 9154905, 'Adriana', 'Nogales', 1),
(5, 4654109, 'Carlos', 'Santana', 1),
(6, 6490582, 'Ana Maria', 'Balcazar Hurtado', 1),
(7, 4685025, 'Juan Carlos', 'Saucedo', 1),
(8, 3054852, 'Joaquin', 'Hurse', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libro`
--

CREATE TABLE `libro` (
  `id_libro` int(11) NOT NULL,
  `codigo_libro` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `autor` varchar(100) NOT NULL,
  `idioma` varchar(100) NOT NULL,
  `estado_libro` int(11) NOT NULL,
  `imagen` varchar(250) NOT NULL,
  `id_categoriaF` int(11) NOT NULL,
  `id_usuarioF` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(21, 'App\\Models\\User', 4, 'token', '5019cb295d44fef1f3836817d0b395bc52cbccb7fb9fc4f94edc875dfa542936', '[\"*\"]', '2024-05-14 03:19:57', '2024-05-14 00:14:17', '2024-05-14 03:19:57'),
(24, 'App\\Models\\User', 9, 'token', '6e0952daff1d49fcebb9f054a04db1457c370c1469954570d3c3a449a1db5e2a', '[\"*\"]', '2024-05-15 06:03:44', '2024-05-15 02:59:58', '2024-05-15 06:03:44'),
(25, 'App\\Models\\User', 9, 'token', '271a45fffdf00463c5fa67c4cf7071decdf1cb42c8f5fbb8c30e4dbcc8021e73', '[\"*\"]', '2024-05-16 12:56:57', '2024-05-16 12:54:09', '2024-05-16 12:56:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `id_reserva` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `id_libroF` int(11) NOT NULL,
  `id_estudianteF` int(11) NOT NULL,
  `id_usuarioF` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre_rol`) VALUES
(1, 'administrador'),
(2, 'personal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `estado_usuario` int(11) NOT NULL,
  `id_rolF` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre_usuario`, `email`, `password`, `estado_usuario`, `id_rolF`) VALUES
(4, 'Karina', 'karyna@gmail.com', '$2y$10$fwCRdfyyhrwBw4jenpZMyejhIAhpxG/5n9qWU1K6Bt9QyriISldEK', 1, 2),
(9, 'Cesar Alejandro', 'alecastedo1@gmail.com', '$2y$10$J6JQwd0BnbEQ0splazHsJOdEtDf8pfnXglYgnesapq9Qi6D5WCKd2', 1, 1),
(17, 'Andres', 'andres1@gmail.com', '$2y$10$xlK8i3.lEMt3fNqBYTEXmeMp/txAfOBC7aVQBY6S60TS2syGWSZPG', 1, 2),
(19, 'gisell', 'gisell12@gmail.com', '$2y$10$UAp2rnBnbYQ6w5WjKMUJ5el/v7JIIm9fVD7UmeaADf9Lz/sshZU2m', 1, 2),
(23, 'Antonio', 'antonio00@gmail.com', '$2y$10$pOx1U3ssQt6.Sf416dIpDeZxHH03T0XB6hVH6L1nnr8IuD2AGBgl6', 1, 2),
(27, 'Camilita', 'cami10@gmail.com', '$2y$10$RW/cDjCtQv2AvOLFBYZiWe2bexo5.NR/mhyXYl7zlPASFqnW.UKP.', 0, 2),
(28, 'Carlos Andres', 'carlitos188@gmail.com', '$2y$10$/U5iFCa6k95LLH5HRzPLQO1Ex.IczShm5R2fvZEuJnBn4AaEP3pFe', 1, 2),
(29, 'Juan Carlos', 'juanc2@gmail.com', '$2y$10$e3j1GUv7H5fB/KPgGSQNqeKbPMmMvvADusyfZZKByyWJjk3T44fyq', 1, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `catalogo`
--
ALTER TABLE `catalogo`
  ADD PRIMARY KEY (`id_catalogo`),
  ADD KEY `id_categoriaF` (`id_categoriaF`),
  ADD KEY `id_libroF` (`id_libroF`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`id_estudiante`);

--
-- Indices de la tabla `libro`
--
ALTER TABLE `libro`
  ADD PRIMARY KEY (`id_libro`),
  ADD KEY `id_categoriaF` (`id_categoriaF`),
  ADD KEY `id_usuarioF` (`id_usuarioF`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `id_estudianteF` (`id_estudianteF`),
  ADD KEY `id_libroF` (`id_libroF`),
  ADD KEY `id_usuarioF` (`id_usuarioF`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `id_rolF` (`id_rolF`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `catalogo`
--
ALTER TABLE `catalogo`
  MODIFY `id_catalogo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  MODIFY `id_estudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `libro`
--
ALTER TABLE `libro`
  MODIFY `id_libro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `catalogo`
--
ALTER TABLE `catalogo`
  ADD CONSTRAINT `catalogo_ibfk_1` FOREIGN KEY (`id_categoriaF`) REFERENCES `categoria` (`id_categoria`),
  ADD CONSTRAINT `catalogo_ibfk_2` FOREIGN KEY (`id_libroF`) REFERENCES `libro` (`id_libro`);

--
-- Filtros para la tabla `libro`
--
ALTER TABLE `libro`
  ADD CONSTRAINT `libro_ibfk_1` FOREIGN KEY (`id_categoriaF`) REFERENCES `categoria` (`id_categoria`),
  ADD CONSTRAINT `libro_ibfk_2` FOREIGN KEY (`id_usuarioF`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`id_estudianteF`) REFERENCES `estudiante` (`id_estudiante`),
  ADD CONSTRAINT `reserva_ibfk_2` FOREIGN KEY (`id_libroF`) REFERENCES `libro` (`id_libro`),
  ADD CONSTRAINT `reserva_ibfk_3` FOREIGN KEY (`id_usuarioF`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rolF`) REFERENCES `rol` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
