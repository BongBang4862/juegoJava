CREATE DATABASE IF NOT EXISTS simulacion;

USE simulacion;

CREATE TABLE IF NOT EXISTS simuladores (
    id_simulador INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    detalle VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_simulador)
);

CREATE TABLE IF NOT EXISTS alumnos (
    id_alumno INT(11) NOT NULL AUTO_INCREMENT,
    nombre_completo VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_alumno)
);

CREATE TABLE IF NOT EXISTS reservas (
    id_reserva INT(11) NOT NULL AUTO_INCREMENT,
    id_alumno INT(11) NOT NULL,
    id_simulador INT(11) NOT NULL,
    fecha_reserva DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_final TIME NOT NULL,
    PRIMARY KEY (id_reserva),
    FOREIGN KEY (id_alumno) REFERENCES alumnos(id_alumno),
    FOREIGN KEY (id_simulador) REFERENCES simuladores(id_simulador)
);

CREATE TABLE IF NOT EXISTS horarios_simuladores (
    id_horario INT(11) NOT NULL AUTO_INCREMENT,
    id_alumno INT(11) NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_final TIME NOT NULL,
    PRIMARY KEY (id_horario),
    FOREIGN KEY (id_alumno) REFERENCES alumnos(id_alumno)
);
