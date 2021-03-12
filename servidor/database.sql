CREATE DATABASE trazabilidad;

SET DATESTYLE TO 'European';

CREATE TABLE registro(
    registro_id SERIAL PRIMARY KEY, 
	fecha date,
	hora time,
    temperatura float4,
	presion float4,
    humedad float4,
    viento float4,
	viento_max float4,
    radiacion float4,
    precipitacion float4
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE usuario (
    usuario_id uuid DEFAULT uuid_generate_v4 (),
    nombre_usuario VARCHAR NOT NULL UNIQUE,
    nombre_completo VARCHAR NOT NULL,
    correo VARCHAR NOT NULL UNIQUE,
    CURP VARCHAR NOT NULL UNIQUE,
    RFC VARCHAR NOT NULL UNIQUE,
    contraseña VARCHAR NOT NULL,
    telefono VARCHAR NOT NULL UNIQUE,
    PRIMARY KEY (usuario_id)
);

INSERT INTO usuario (
    nombre_usuario,
    nombre_completo,
    correo,
    CURP,
    RFC,
    contraseña,
    telefono
)
VALUES
    (
        'Juan2098',
        'Juan Luis Vázquez Hernández',
        'juan.vazquez@example.com',
        'VAHJ980220HJCZRN03',
        'VAJU900911JH4',
        '827ccb0eea8a706c4c34a16891f84e7b',
        '3121122913'
    ),
    (
        'Diana3120',
        'Diana Olivera Vargas',
        'diana.olivera@example.com',
        'OLVD980220HJCZRN03',
        'OLDI900911JH4',
        'b72440cb754b14e1c8a28c8f6eb44e0d',
        '3121132812'
    );