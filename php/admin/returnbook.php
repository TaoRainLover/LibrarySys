<?php
header('content-type:text/html;charset=utf-8');
session_start();
if (isset($_SESSION['user']) && $_SESSION['type'] == '1') {
    $con = mysqli_connect("localhost", "root", "123456", "software");
    if (mysqli_errno($con)) {
        $error = array("error" => "connect");
        echo json_encode($error);
    } else {
        $ISBN = $_POST['ISBN'];
        $id = $_POST['id'];
        $now = date('Y-m-d H:i:s', time());;
        $sql = "update record set Returntime = '$now', Rstatus = '1' where ISBN = '$ISBN' AND Rstatus = '0' AND Uid='$id'";
        if ($con->query($sql) != TRUE) {
            $error = array("error" => "update");
            echo json_encode($error);
        } else {
            if ($con->affected_rows > 0) {
                $sql = "update bookinfo set Bremain = Bremain+1 where ISBN = '$ISBN'";
                $con->query($sql);
                $sql = "update userinfo set Ukeep = Ukeep-1 where Uid = '$id'";
                $con->query($sql);
                $success = array("success" => "return");
                echo json_encode($success);
            }else{
                $error = array("error" => "return");
                echo json_encode($error);
            }
        }
        mysqli_close($con);
    }
} else {
    $error = array("error" => "authority");
    echo json_encode($error);
}
?>