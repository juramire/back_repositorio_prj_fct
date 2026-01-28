-- Crear base de datos (ajusta el nombre si usas otro)
CREATE DATABASE IF NOT EXISTS `repositorio_fct` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `repositorio_fct`;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  rol ENUM('user','admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS proyectos (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  descripcion TEXT NOT NULL,
  resumen TEXT NOT NULL,
  ciclo_formativo VARCHAR(150) NOT NULL,
  curso_academico VARCHAR(20) NOT NULL,
  tags TEXT NOT NULL,
  alumnos TEXT NOT NULL,
  status ENUM('DRAFT','SUBMITTED','PUBLISHED') NOT NULL DEFAULT 'DRAFT',
  video_url VARCHAR(500) NULL,
  pdf_urls JSON NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  submitted_at DATETIME NULL,
  published_at DATETIME NULL,
  CONSTRAINT fk_proyectos_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_title (title),
  INDEX idx_curso (curso_academico),
  INDEX idx_ciclo (ciclo_formativo),
  INDEX idx_status (status),
  FULLTEXT INDEX ft_proyectos (title, descripcion, resumen, tags)
);

-- Crea un usuario admin de ejemplo (genera antes el hash con bcrypt)
-- INSERT INTO users (name, email, password_hash, rol) VALUES
-- ('Admin', 'admin@example.com', '<hash>', 'admin');
