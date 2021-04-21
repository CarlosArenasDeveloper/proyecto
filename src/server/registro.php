<?php
header('Content-type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:4200");
session_start();
require_once 'conexion.php';
$conn = openConection();

$json=file_get_contents('php //input');
$params=json_decode($json);
try {
    $stmt = $conn->prepare("INSERT INTO usuarios VALUES(?,?)");
    $stmt->bindParam(1,$params->dni);
    $stmt->bindParam(2,$params->password);
    $stmt->execute();

} catch (PDOException $exception) {
    echo $exception;
}
echo $json;
?>

