-- Datos de ejemplo para `repositorio_fct`
-- Ejecuta tras crear el esquema: mysql -u <user> -p repositorio_fct < scripts/sql/sample-data.sql

USE `repositorio_fct`;

-- Usuarios (contraseña: password123)
INSERT INTO users (id, name, email, password_hash, rol)
VALUES
  (1, 'Admin', 'admin@example.com', '$2a$10$29bfnO6Qy4HshhPwlas8XeZ6OVtWv.aZhlm.JEssKh7UVC80Bjc4G', 'admin'),
  (2, 'Ana Alumna', 'ana@example.com', '$2a$10$29bfnO6Qy4HshhPwlas8XeZ6OVtWv.aZhlm.JEssKh7UVC80Bjc4G', 'user'),
  (3, 'Bruno Estudiante', 'bruno@example.com', '$2a$10$29bfnO6Qy4HshhPwlas8XeZ6OVtWv.aZhlm.JEssKh7UVC80Bjc4G', 'user')
ON DUPLICATE KEY UPDATE email = VALUES(email);

-- Proyectos de ejemplo
INSERT INTO proyectos
  (id, user_id, title, descripcion, resumen, ciclo_formativo, curso_academico, tags, alumnos, status, video_url, pdf_urls, created_at, updated_at, submitted_at, published_at)
VALUES
  (1, 2,
    'Gestor de Inventario Web',
    'Aplicación web para gestionar inventario escolar con alertas de stock y exportación.',
    'Inventario online con control de stock y reportes.',
    'Desarrollo de Aplicaciones Web',
    '2024/25',
    'angular, node, mysql',
    'Ana Alumna, Carlos Teammate',
    'PUBLISHED',
    'http://localhost:3000/uploads/demo-inventario.mp4',
    JSON_ARRAY('http://localhost:3000/uploads/inventario-doc.pdf'),
    NOW(), NOW(), NOW(), NOW()
  ),
  (2, 3,
    'App de Citas Médicas',
    'Plataforma para reservar citas y recordar turnos mediante correo/SMS.',
    'Reserva de citas y recordatorios automáticos.',
    'Desarrollo de Aplicaciones Multiplataforma',
    '2024/25',
    'flutter, api, salud',
    'Bruno Estudiante',
    'SUBMITTED',
    NULL,
    JSON_ARRAY(),
    NOW(), NOW(), NOW(), NULL
  ),
  (3, 2,
    'Sistema de Gestión de Biblioteca',
    'Backend para préstamo de libros con autenticación y panel admin.',
    'Gestión de biblioteca con roles y métricas.',
    'Administración de Sistemas Informáticos en Red',
    '2023/24',
    'express, rest, biblioteca',
    'Ana Alumna',
    'DRAFT',
    NULL,
    NULL,
    NOW(), NOW(), NULL, NULL
  )
ON DUPLICATE KEY UPDATE title = VALUES(title);
