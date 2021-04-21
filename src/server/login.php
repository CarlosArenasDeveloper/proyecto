<?php
header('Content-type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:4200");
session_start();
require_once 'conexion.php';
$conn = openConection();


$jsondata=[];

try {
    $stmt = $conn->prepare("SELECT * FROM usuarios where email=:email and password=:password");
    $stmt->bindParam(":email",$_GET["email"]);
    $stmt->bindParam(":password",$_GET["password"]);
    $stmt->execute();
    $filasobtenidas = $stmt->fetchAll();
    if ($stmt->rowCount() > 0) {
        foreach($filasobtenidas as $fila){

            $jsondata[]= $fila;
        }
    } else {
        echo json_encode("error");
    }
} catch (PDOException $exception) {
    echo $exception;
}
echo json_encode($jsondata);
?>

