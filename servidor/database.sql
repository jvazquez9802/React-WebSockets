CREATE DATABASE trazabilidad;

CREATE TABLE registro(
    registro_id SERIAL PRIMARY KEY, 
    temperatura int,
    humedad int,
    viento int,
    presion int,
    radiacion int,
    precipitacion int,
    fecha timestamp
);