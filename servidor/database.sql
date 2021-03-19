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


CREATE TABLE users (
    userId VARCHAR NOT NULL UNIQUE,
    userName VARCHAR NOT NULL UNIQUE DEFAULT '',
    userEmail VARCHAR NOT NULL UNIQUE DEFAULT '',
    CURP VARCHAR NOT NULL UNIQUE DEFAULT '',
    RFC VARCHAR NOT NULL UNIQUE DEFAULT '',
    phone VARCHAR NOT NULL UNIQUE DEFAULT '',
    PRIMARY KEY (userId)
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