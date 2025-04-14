<?php
// $servername = "127.0.0.1:3306";
// $username = "root";
// $password = "D4nneain28&";
// $database = "kahwin";
$servername = "bx9lp9i6ouhhmldi575i-mysql.services.clever-cloud.com";
$username = "uz1pmcdpooyoi1qy";
$password = "z30mN1aVPAbg9dxl2sA5";
$database = "bx9lp9i6ouhhmldi575i";


$connection = mysqli_connect($servername, $username, $password);

if (!$connection) {
    echo json_encode(['attend' => false, 'error' => 'Database connection failed']);
    exit;
}

mysqli_select_db($connection, $database);

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action']) && $_POST['action'] === 'increment') {
    $update_query = "UPDATE `kehadiran` SET `jumlah_tidak_hadir` = `jumlah_tidak_hadir` + 1 WHERE `id` = 1";

    if (mysqli_query($connection, $update_query)) {
        echo json_encode(['attend' => true]);
    } else {
        echo json_encode(['attend' => false, 'error' => mysqli_error($connection)]);
    }
}

mysqli_close($connection);
