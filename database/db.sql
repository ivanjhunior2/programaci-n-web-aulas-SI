-- Crear la base de datos
CREATE DATABASE reservacursos;

\c reservacursos;


CREATE TABLE tipo_ambiente (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) UNIQUE
);


CREATE TABLE ambiente (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) UNIQUE NOT NULL,
  descripcion VARCHAR(100),
  capacidad INT NOT NULL,
  habilitado BOOLEAN DEFAULT TRUE,
  tipo_ambiente_id INT,
  FOREIGN KEY (tipo_ambiente_id) REFERENCES tipo_ambiente(id)
);


CREATE TABLE facilidad (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) UNIQUE
);


CREATE TABLE ambiente_facilidad (
  ambiente_id INT,
  facilidad_id INT,
  FOREIGN KEY (ambiente_id) REFERENCES ambiente(id),
  FOREIGN KEY (facilidad_id) REFERENCES facilidad(id)
);


CREATE TABLE reserva (
  id SERIAL PRIMARY KEY,
  fecha DATE,
  ambiente_id INTEGER,
  hora_Inicio TIME,
  hora_Fin TIME,
  estado VARCHAR(10),
  FOREIGN KEY (ambiente_id) REFERENCES ambiente(id)
 );

CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(20),
  contrasena VARCHAR(80),
  email VARCHAR(30),
  telefono INTEGER
);
