<?php
header('content-type:text/html;charset=utf-8');
$con = mysqli_connect("localhost", "root", "123456", "software");
if (mysqli_errno($con)) {
    $error = array("error" => "connect");
    echo json_encode($error);
} else {
    $id = trim($_POST['userAccount']);
    $pwd = $_POST['userPassword'];
    $sql = "select * from account where Uid='$id' AND Upass='$pwd'";
    $result = mysqli_query($con, $sql);
    $obj = mysqli_fetch_object($result);
    if (!$obj) {
        $error = array("error" => "login");
        echo json_encode($error);
    } else {
        session_start();
        $_SESSION['user'] = $id;
        $sql = "select Uname, Utype from userinfo where Uid='$id'";
        $result = mysqli_query($con, $sql);
        $row = mysqli_fetch_assoc($result);
        $_SESSION['type'] = $row['Utype'];
        $arr = array();
        $arr[] = $row;
        echo json_encode($arr);
    }
    mysqli_close($con);
}
?>