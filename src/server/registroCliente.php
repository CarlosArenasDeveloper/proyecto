<?php
header('Content-type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:4200");
session_start();
require_once 'conexion.php';
$conn = openConection();

$json=file_get_contents('php://input');
$params=json_decode($json);
try {
    $stmt = $conn->prepare("INSERT INTO `usuarios`(`dni`, `password`, `nombre`, `apellido1`, `apellido2`, `fecha_nac`, `genero`, `email`, `telefono`, `cuenta_bancaria`, `ciudad`, `direccion`, `cod_postal`, `id_tarifa`, `id_centro`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
    $stmt->bindParam(1,$params->dni);
    $stmt->bindParam(2,$params->password);
    $stmt->bindParam(3,$params->nombre);
    $stmt->bindParam(4,$params->apellido1);
    $stmt->bindParam(5,$params->apellido2);
    $stmt->bindParam(6,$params->fecha_nac);
    $stmt->bindParam(7,$params->genero);
    $stmt->bindParam(8,$params->email);
    $stmt->bindParam(9,$params->telefono);
    $stmt->bindParam(10,$params->cuenta_bancaria);
    $stmt->bindParam(11,$params->ciudad);
    $stmt->bindParam(12,$params->direccion);
    $stmt->bindParam(13,$params->cod_postal);
    $stmt->bindParam(14,$params->id_tarifa);
    $stmt->bindParam(15,$params->id_centro);
    $stmt->execute();
} catch (PDOException $exception) {
    echo $exception;
}
echo $json;
?>


