-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 26-10-2026 a las 02:22:51
-- Versión del servidor: 8.4.7
-- Versión de PHP: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ventanova_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio` decimal(12,2) NOT NULL,
  `categoria` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icono` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT 0xF09F93A6,
  `imagen` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `destacado` tinyint(1) NOT NULL DEFAULT '0',
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `actualizado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_productos_categoria` (`categoria`),
  KEY `idx_productos_destacado` (`destacado`)
) ENGINE=MyISAM AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `categoria`, `icono`, `imagen`, `destacado`, `creado_en`, `actualizado_en`) VALUES
(1, 'Lenovo IdeaPad Slim 3', 'Notebook Lenovo para estudio y trabajo diario', 499990.00, 'notebooks', '💻', NULL, 0, '2026-10-24 02:23:07', '2026-10-26 01:33:59'),
(2, 'ASUS Vivobook 15', 'Notebook ASUS para productividad y uso cotidiano', 599990.00, 'notebooks', '💻', NULL, 1, '2026-10-24 02:23:07', '2026-10-24 02:23:07'),
(3, 'HP Pavilion 15', 'Notebook HP para trabajo y entretenimiento', 699990.00, 'notebooks', '💻', NULL, 0, '2026-10-24 02:23:07', '2026-10-24 02:23:07'),
(4, 'Acer Aspire 5', 'Notebook Acer versátil para el hogar y oficina', 549990.00, 'notebooks', '💻', NULL, 0, '2026-10-24 02:23:07', '2026-10-24 02:23:07'),
(5, 'Dell Inspiron 15', 'Notebook Dell para tareas profesionales', 749990.00, 'notebooks', '💻', NULL, 1, '2026-10-24 02:23:07', '2026-10-24 02:23:07'),
(6, 'Apple MacBook Air', 'Notebook Apple de la línea MacBook Air', 1199990.00, 'notebooks', '💻', NULL, 1, '2026-10-24 02:23:07', '2026-10-24 02:23:07'),
(7, 'MSI Thin Gaming', 'Notebook MSI orientado a videojuegos', 999990.00, 'notebooks', '💻', NULL, 0, '2026-10-24 02:23:07', '2026-10-24 02:23:07'),
(8, 'Epson EcoTank L3250', 'Impresora multifuncional con sistema de tinta', 189990.00, 'impresoras-y-scanners', '🖨️', NULL, 1, '2026-10-24 02:23:07', '2026-10-24 02:23:07'),
(9, 'HP Smart Tank 580', 'Impresora multifuncional HP para el hogar', 179990.00, 'impresoras-y-scanners', '🖨️', NULL, 0, '2026-10-24 02:23:07', '2026-10-24 02:23:07'),
(10, 'Canon PIXMA G3110', 'Impresora Canon multifuncional de tinta continua', 169990.00, 'impresoras-y-scanners', '🖨️', NULL, 1, '2026-10-24 02:23:07', '2026-10-24 02:23:07'),
(11, 'Brother DCP-T420W', 'Impresora multifuncional con conectividad inalámbrica', 199990.00, 'impresoras-y-scanners', '🖨️', NULL, 0, '2026-10-24 02:23:07', '2026-10-24 02:23:07'),
(12, 'Epson WorkForce ES-50', 'Scanner portátil Epson para documentos', 149990.00, 'impresoras-y-scanners', '📄', NULL, 0, '2026-10-24 02:23:07', '2026-10-24 02:23:07'),
(13, 'Canon imageFORMULA R10', 'Scanner portátil Canon para digitalización', 229990.00, 'impresoras-y-scanners', '📄', NULL, 1, '2026-10-24 02:23:07', '2026-10-24 02:23:07'),
(14, 'HP LaserJet M111w', 'Impresora láser monocromática HP', 139990.00, 'impresoras-y-scanners', '🖨️', NULL, 0, '2026-10-24 02:23:07', '2026-10-24 02:23:07'),
(15, 'Sony WH-CH720N', 'Audífonos inalámbricos con cancelación de ruido', 89990.00, 'audio', '🎧', NULL, 1, '2026-10-24 02:23:07', '2026-10-24 02:23:07'),
(16, 'JBL Tune 520BT', 'Audífonos Bluetooth JBL para uso diario', 39990.00, 'audio', '🎧', NULL, 1, '2026-10-24 02:23:07', '2026-10-24 02:23:07'),
(17, 'Samsung Galaxy Buds FE', 'Audífonos inalámbricos Samsung', 69990.00, 'audio', '🎧', NULL, 0, '2026-10-24 02:23:07', '2026-10-24 02:23:07'),
(18, 'Apple AirPods 4', 'Audífonos inalámbricos Apple', 149990.00, 'audio', '🎧', NULL, 1, '2026-10-24 02:23:07', '2026-10-24 02:23:07'),
(19, 'Logitech G435', 'Audífonos inalámbricos Logitech para gaming', 59990.00, 'audio', '🎧', NULL, 0, '2026-10-24 02:23:07', '2026-10-24 02:23:07'),
(20, 'Bose SoundLink Flex', 'Parlante Bluetooth portátil Bose', 149990.00, 'audio', '🔊', NULL, 1, '2026-10-24 02:23:07', '2026-10-24 02:23:07'),
(21, 'Sony SRS-XB100', 'Parlante Bluetooth compacto Sony', 49990.00, 'audio', '🔊', NULL, 0, '2026-10-24 02:23:07', '2026-10-24 02:23:07'),
(22, 'Sony PlayStation 5 Slim', 'Consola PlayStation de generación actual', 649990.00, 'videojuegos-y-consolas', '🎮', NULL, 1, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(23, 'Microsoft Xbox Series X', 'Consola Xbox para juegos de alto rendimiento', 699990.00, 'videojuegos-y-consolas', '🎮', NULL, 1, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(24, 'Nintendo Switch OLED', 'Consola híbrida Nintendo con pantalla OLED', 349990.00, 'videojuegos-y-consolas', '🎮', NULL, 1, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(25, 'Sony DualSense', 'Control inalámbrico para PlayStation 5', 79990.00, 'videojuegos-y-consolas', '🕹️', NULL, 0, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(26, 'Xbox Wireless Controller', 'Control inalámbrico oficial de Xbox', 64990.00, 'videojuegos-y-consolas', '🕹️', NULL, 0, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(27, 'Nintendo Switch Pro Controller', 'Control Pro inalámbrico para Nintendo Switch', 79990.00, 'videojuegos-y-consolas', '🕹️', NULL, 0, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(28, 'Logitech G29 Driving Force', 'Volante con pedales para simulación de conducción', 299990.00, 'videojuegos-y-consolas', '🎮', NULL, 1, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(29, 'Canon EOS R50', 'Cámara mirrorless Canon para fotografía y video', 799990.00, 'fotografia-y-video', '📷', NULL, 1, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(30, 'Sony Alpha a6400', 'Cámara mirrorless Sony con enfoque automático', 899990.00, 'fotografia-y-video', '📷', NULL, 1, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(31, 'Nikon Z30', 'Cámara sin espejo Nikon para creación de contenido', 749990.00, 'fotografia-y-video', '📷', NULL, 0, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(32, 'Fujifilm Instax Mini 12', 'Cámara instantánea Fujifilm', 89990.00, 'fotografia-y-video', '📷', NULL, 0, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(33, 'GoPro HERO12 Black', 'Cámara de acción GoPro para actividades y video', 349990.00, 'fotografia-y-video', '📹', NULL, 1, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(34, 'DJI Osmo Pocket 3', 'Cámara compacta estabilizada para video', 599990.00, 'fotografia-y-video', '📹', NULL, 1, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(35, 'Logitech Brio 4K', 'Webcam Logitech para videollamadas y streaming', 179990.00, 'fotografia-y-video', '📹', NULL, 0, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(36, 'Logitech MX Master 3S', 'Mouse inalámbrico para productividad', 99990.00, 'perifericos-y-otros-accesorios', '🖱️', NULL, 1, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(37, 'Logitech K380', 'Teclado inalámbrico multidispositivo', 39990.00, 'perifericos-y-otros-accesorios', '⌨️', NULL, 0, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(38, 'Razer DeathAdder Essential', 'Mouse gamer ergonómico Razer', 24990.00, 'perifericos-y-otros-accesorios', '🖱️', NULL, 1, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(39, 'HyperX Alloy Origins Core', 'Teclado mecánico compacto para gaming', 89990.00, 'perifericos-y-otros-accesorios', '⌨️', NULL, 1, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(40, 'SteelSeries QcK', 'Mousepad para escritorio y videojuegos', 14990.00, 'perifericos-y-otros-accesorios', '🖱️', NULL, 0, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(41, 'Corsair HS55 Stereo', 'Audífonos con cable para juegos y comunicación', 49990.00, 'perifericos-y-otros-accesorios', '🎧', NULL, 0, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(42, 'Anker 737 Power Bank', 'Batería externa portátil Anker', 119990.00, 'perifericos-y-otros-accesorios', '🔋', NULL, 1, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(43, 'NVIDIA GeForce RTX 4060', 'Tarjeta gráfica NVIDIA para juegos y creación', 349990.00, 'componentes-de-computador', '🖥️', NULL, 1, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(44, 'AMD Radeon RX 7600', 'Tarjeta gráfica AMD para equipos de escritorio', 329990.00, 'componentes-de-computador', '🖥️', NULL, 1, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(45, 'Intel Core i5-14400F', 'Procesador Intel Core para computador de escritorio', 199990.00, 'componentes-de-computador', '⚙️', NULL, 0, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(46, 'AMD Ryzen 5 7600', 'Procesador AMD Ryzen para equipos de escritorio', 229990.00, 'componentes-de-computador', '⚙️', NULL, 1, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(47, 'Samsung 990 EVO 1TB', 'Unidad SSD NVMe Samsung de 1 TB', 99990.00, 'componentes-de-computador', '💾', NULL, 1, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(48, 'Kingston Fury Beast 16GB', 'Memoria RAM Kingston para computador', 49990.00, 'componentes-de-computador', '💾', NULL, 0, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(49, 'ASUS TUF Gaming B650-Plus', 'Placa madre ASUS para plataforma AMD', 229990.00, 'componentes-de-computador', '🖥️', NULL, 0, '2026-10-24 02:23:08', '2026-10-24 02:23:08'),
(51, 'PRODUCTO Y', 'ASASASASASASAS', 138990.00, 'notebooks', '📦', NULL, 1, '2026-10-26 02:11:43', '2026-10-26 02:11:43');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
