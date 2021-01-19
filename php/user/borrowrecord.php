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
        $sql = "SELECT * FROM record WHERE Uid = '$id' ORDER BY Rstatus, Rid";
        $res = mysqli_query($con, $sql);
        $arr = array();
        while ($row = mysqli_fetch_assoc($res))
        {
            $arr[] = $row;
            $ISBN = $row['ISBN'];
            $sql = "SELECT Bname FROM bookinfo WHERE ISBN = '$ISBN'";
            $res2 = mysqli_query($con, $sql);
            $row = mysqli_fetch_assoc($res2);
            $arr[] = $row;
        }
        echo json_encode($arr);
        mysqli_close($con);
    }
} else {
    $error = array("error" => "authority");
    echo json_encode($error);
}
?>