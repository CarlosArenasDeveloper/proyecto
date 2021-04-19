<?php
header('Content-type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:4200");
session_start();
require_once 'conexion.php';
$conn = openConection();

$json=file_get_contents('php://input');
$params=json_decode($json);

$jsondata = array();
$jsondata=[];

try {
    $stmt = $conn->prepare("SELECT * FROM usuarios where email=:email and password=:password");
    $stmt->bindParam(":email",$params->email);
    $stmt->bindParam(":password",$params->password);
    $stmt->execute();
    $filasobtenidas = $stmt->fetchAll();
    if ($stmt->rowCount() > 0) {
        foreach($filasobtenidas as $fila){
            $jsondata[]= $fila;
        }
    } else {
        $jsondata[]="Error";
    }
} catch (PDOException $exception) {
    echo $exception;
}
echo json_encode($jsondata);
?>

