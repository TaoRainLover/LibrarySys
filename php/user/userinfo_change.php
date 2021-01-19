<?php
header('content-type:text/html;charset=utf-8');
session_start();
if (isset($_SESSION['user']) && $_SESSION['type'] == '0') {
    $con = new mysqli('localhost', 'root', '123456', 'software');
    if (mysqli_errno($con)) {
        $error = array("error" => "connect");
        echo json_encode($error);
    } else {
        $id = $_SESSION['user'];
        $name = $_POST['userName'];
   
        $tel = $_POST['userTel'];
        $mail = $_POST['userEmail'];
        $sql = "UPDATE userinfo SET Uname='$name', Utel='$tel', Umail='$mail' WHERE Uid='$id'";
        if ($con->query($sql) != TRUE) {
            $error = array("error" => "update");
            echo json_encode($error);
        } else {
            $success = array("success" => "update");
            echo json_encode($success);
        }
        mysqli_close($con);
    }
} else {
    $error = array("error" => "authority");
    echo json_encode($error);
}
?>