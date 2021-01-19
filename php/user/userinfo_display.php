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
        $sql = "SELECT * FROM userinfo WHERE Uid = '$id'";
        $res = mysqli_query($con, $sql);
        $arr = array();
        while ($row = mysqli_fetch_assoc($res))
            $arr[] = $row;
        echo json_encode($arr);
        mysqli_close($con);
    }
} else {
    $error = array("error" => "authority");
    echo json_encode($error);
}
?>