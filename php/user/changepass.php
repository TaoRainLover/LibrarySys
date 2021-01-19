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
        $old = $_POST['oldPass'];
        $new = $_POST['newPass'];
        $sql = "SELECT * FROM account WHERE Uid='$id' AND Upass='$old'";
        $result = mysqli_query($con, $sql);
        $obj = mysqli_fetch_object($result);
        if (!$obj) {
            $error = array("error" => "check");
            echo json_encode($error);
        } else {
            $sql = "UPDATE account SET Upass='$new' WHERE  Uid='$id'";
            if ($con->query($sql) != TRUE) {
                $error = array("error" => "update");
                echo json_encode($error);
            } else {
                $success = array("success" => "update");
                echo json_encode($success);
            }
        }
        mysqli_close($con);
    }
} else {
    $error = array("error" => "authority");
    echo json_encode($error);
}
?>