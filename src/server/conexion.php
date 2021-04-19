<?php
function openConection(): ?PDO
{
    $db_host = 'localhost';
    $db_user = 'root';
    $db_pass = '';
    $db_name = 'fitandhealthy';

    $conn = null;
    try {
        $conn = new PDO("mysql:host=$db_host;dbname=$db_name;charset=UTF8", $db_user, $db_pass);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    } catch (PDOException $exception) {
        echo $exception->getMessage();
    }
    return $conn;
}
?>