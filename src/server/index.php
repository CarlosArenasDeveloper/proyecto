<?php
header('Content-type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:4200");
session_start();
require_once 'conexion.php';
$conn = openConection();


$jsondata = array();
$jsondata=[];

    try {
        $stmt = $conn->prepare("SELECT * FROM usuarios");
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

