-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-08-2024 a las 05:34:59
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

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `codigo_categoria`, `nombre_categoria`) VALUES
(1, 642, 'Historia Bolivianita'),
(9, 5552, 'Fantasía'),
(10, 943, 'Deportivos'),
(12, 9400, 'Juegos'),
(15, 45561, 'Santillana'),
(19, 6225, 'Programación'),
(20, 86136, 'Computadoras'),
(21, 45612, 'Miedo'),
(23, 98522, 'Farmacia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion`
--

CREATE TABLE `configuracion` (
  `id_configuracion` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `imagen` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `configuracion`
--

INSERT INTO `configuracion` (`id_configuracion`, `titulo`, `imagen`) VALUES
(1, 'Col Espíritu Santo', 'storage/imagenes/080224-espiritu_santo.jpg'),
(2, 'Mi prueba', 'storage/imagenes/080324-Imagen_coketa.jpg');

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
(9, 9154905, 'Carla Andrea', 'Ayala', 1),
(10, 6154987, 'Veronica', 'Leyli', 1),
(11, 3522786, 'Jota', 'Consuelo', 0),
(12, 8852000, 'Jose Andres', 'Perez Palma', 1),
(14, 9456211, 'Valeria', 'Luque Loza', 1),
(15, 8852542, 'Carla', 'Diaramendi', 1),
(21, 8916322, 'Ronal', 'Alcala', 1),
(22, 87456210, 'Juan Carlos', 'Sandoval', 1),
(23, 4587620, 'Leandro', 'Guzman', 1);

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
  `stock` int(11) NOT NULL,
  `estado_libro` int(11) NOT NULL,
  `imagen` varchar(250) NOT NULL,
  `id_categoriaF` int(11) NOT NULL,
  `id_usuarioF` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `libro`
--

INSERT INTO `libro` (`id_libro`, `codigo_libro`, `titulo`, `autor`, `idioma`, `stock`, `estado_libro`, `imagen`, `id_categoriaF`, `id_usuarioF`) VALUES
(11, 56821, 'Matemáticas 6to A', 'Douglas Costas', 'espanol', 5, 1, 'storage/imagenes/070524-libro_santillana_6to.jpg', 15, 9),
(12, 415616, 'Spiderman comic 1', 'Jose Alvarez', 'espanol', 5, 0, 'storage/imagenes/SbWLpFFxH5XqXJ4FuTZmzHSuif7Jxa8R6Gls2fYz.jpg', 9, 9),
(15, 85244, 'La Guía 1', 'Empresa Santillana', 'espanol', 6, 1, 'storage/imagenes/072824-la_guia_1.webp', 15, 9),
(16, 521400, 'Ciencia de los datos con Python', 'Francisco J. Toro López', 'ingles', 2, 1, 'storage/imagenes/072824-ciencia_de_datos_python.jpg', 19, 9),
(17, 78422, 'Microsofot Azure Sentinel', 'Yuri Diogenes', 'ingles', 1, 1, 'storage/imagenes/072824-libro_azure_Sentinel.jpg', 19, 9),
(18, 56210, 'Python con matemáticas y finanzas', 'Alfaomega', 'espanol', 4, 1, 'storage/imagenes/072824-libro_python.png', 19, 9),
(19, 12999, 'Spiderman comic 4', 'el blanco', 'ingles', 1, 1, 'storage/imagenes/w1lW0uOnHnjjOX6PhcUYW1Lp77BxAMi6NOQvoMis.jpg', 12, 9),
(21, 95002, 'Libro de Prueba', 'Jose Prueba', 'espanol', 2, 1, 'storage/imagenes/080524-libro_azure_Sentinel.jpg', 10, 9),
(22, 85522, 'Auxiliar de farmacia', 'Jose Chavez', 'espanol', 3, 1, 'storage/imagenes/080524-libro_farmacia.png', 23, 43);

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
(53, 'App\\Models\\User', 43, 'token', '7aa0e305cc649d75c00ca34b4efe43592cdd7758b58dfc56c08397cad16d755c', '[\"*\"]', '2024-08-06 03:25:37', '2024-08-05 18:56:28', '2024-08-06 03:25:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `id_reserva` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `cantidad` int(11) NOT NULL,
  `estado_reserva` int(11) NOT NULL,
  `id_libroF` int(11) NOT NULL,
  `id_estudianteF` int(11) NOT NULL,
  `id_usuarioF` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`id_reserva`, `fecha_inicio`, `fecha_fin`, `cantidad`, `estado_reserva`, `id_libroF`, `id_estudianteF`, `id_usuarioF`) VALUES
(6, '2024-07-10', '2024-07-12', 1, 0, 11, 9, 9),
(7, '2024-07-09', '2024-07-10', 2, 0, 11, 9, 9),
(8, '2024-07-12', '2024-07-15', 1, 0, 11, 10, 9),
(9, '2024-07-12', '2024-07-14', 1, 0, 12, 10, 9),
(13, '2024-07-30', '2024-07-31', 1, 0, 16, 15, 9),
(17, '2024-08-09', '2024-08-10', 1, 1, 15, 14, 9),
(18, '2024-08-08', '2024-08-10', 1, 1, 15, 9, 9),
(19, '2024-08-04', '2024-08-05', 1, 2, 15, 12, 9),
(20, '2024-08-05', '2024-08-06', 1, 0, 19, 21, 41),
(21, '2024-08-05', '2024-08-06', 1, 0, 21, 22, 9),
(22, '2024-08-05', '2024-08-06', 1, 0, 22, 23, 43);

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
  `apellido_usuario` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `estado_usuario` int(11) NOT NULL,
  `id_rolF` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre_usuario`, `apellido_usuario`, `email`, `password`, `estado_usuario`, `id_rolF`) VALUES
(4, 'Karina', 'Saucedo', 'karyna@gmail.com', '$2y$10$fwCRdfyyhrwBw4jenpZMyejhIAhpxG/5n9qWU1K6Bt9QyriISldEK', 1, 2),
(9, 'Cesar Alejandro', 'Castedo Saucedo', 'alecastedo1@gmail.com', '$2y$10$uTVz9bnOV8hCfIi01s8TMOTiYsLPQrl9d6YO8Mn0f0JKl4gQB13i6', 1, 1),
(30, 'Arturo ', 'Castedo', 'arturoc@gmail.com', '$2y$10$nj5z9zq13L8ZEGD99QyLnelQz2qkHJQKx2Wph.6MnE6EGPjBlKHke', 1, 2),
(31, 'Jose Maria', 'Roca', 'josemaria12@gmail.com', '$2y$10$NbCkXHlXBeB/.1RCYuUIYeobYS3f63De81Iih5m60WWEvCVvCX9Zy', 0, 2),
(34, 'Andres', 'Castedo', 'andres1@gmail.com', '$2y$10$j.WIp1me8yur9GZTV.m.g.v4yBx78Dn4jgDosQcnIPDDKvJ.p2kq.', 1, 2),
(36, 'alfonso', 'Suarez', 'alfonso@email.com', '$2y$10$r/0VYb87OoB0WmY5r7DsfeyScQaFyFHcPGtdKlna5/DvtVpzPkd0G', 1, 2),
(37, 'Jose Arturo', 'Castedo', 'arturoc1@gmail.com', '$2y$10$0KkF9uhNmtwAs5.j.gT0uuGFBL5TU.kfB1qkYyMj1NWpkL20WqIJK', 1, 2),
(40, 'wilson', 'salin', 'a@gmail.com', '$2y$10$aT/aACyKLY6s7iMtR0Foz.xlyfgA1.6KD6OwLuZNIB8l0YjQEAU/O', 1, 2),
(41, 'Natalia Alexandra', 'Alcala', 'nati1@gmail.com', '$2y$10$yh9SPGUK8pH5wQku63YXdupbNe01.dtoLMxGGVzyBaBU51pNm.q7O', 1, 2),
(42, 'Jose Carlos', 'Marset', 'jose1@gmail.com', '$2y$10$IHgpmln3gdgh9PbNDhbtZOKCDR/ucXEpv.vwTncApkI4cBkiU6Pea', 1, 2),
(43, 'Jose Arturo', 'Castedo', 'arturo12@gmail.com', '$2y$10$dD.KiMpHV7Z1nYOCEtxRReDKhvQErCA1Y9yMn8011/fNFlodk6T3W', 1, 2);

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
-- Indices de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  ADD PRIMARY KEY (`id_configuracion`);

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
  ADD KEY `id_libroF` (`id_libroF`),
  ADD KEY `id_usuarioF` (`id_usuarioF`),
  ADD KEY `reserva_ibfk_1` (`id_estudianteF`);

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
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  MODIFY `id_configuracion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  MODIFY `id_estudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `libro`
--
ALTER TABLE `libro`
  MODIFY `id_libro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

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
  ADD CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`id_estudianteF`) REFERENCES `estudiante` (`id_estudiante`) ON DELETE CASCADE,
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
