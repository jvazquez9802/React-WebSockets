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