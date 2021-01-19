<?php
header('content-type:text/html;charset=utf-8');
session_start();
if (isset($_SESSION['user']) && $_SESSION['type'] == '1') {
    $con = new mysqli('localhost', 'root', '123456', 'software');
    if (mysqli_errno($con)) {
        $error = array("error" => "connect");
        echo json_encode($error);
    } else {
        $act = $_POST['act']; //0为减少，1为增加
        $num = $_POST['num'];
        $ISBN = $_POST['ISBN'];
        if($act)
            $sql = "UPDATE bookinfo SET Bnum=Bnum+$num, Bremain=Bremain+$num WHERE ISBN='$ISBN'";
        else
            $sql = "UPDATE bookinfo SET Bnum=Bnum-$num, Bremain=Bremain-$num WHERE ISBN='$ISBN'";
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