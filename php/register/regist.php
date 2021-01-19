<?php
header('content-type:text/html;charset=utf-8');
$con = mysqli_connect("localhost", "root", "123456", "software");
if (mysqli_errno($con)) {
    $error = array("error" => "connect");
    echo json_encode($error);
} else {
    $id = trim($_POST['userAccount']);
    $pwd = $_POST['userPassword'];
    $name = trim($_POST['userName']);
    $sql = "INSERT INTO account VALUES ('$id', '$pwd')";
    if ($con->query($sql) != TRUE) {
        $error = array("error" => "insert");
        echo json_encode($error);
    } else {
        $regtime = date('Y-m-d H:i:s', time());
        $sql = "INSERT INTO userinfo(Uid, Uname, Uregtime, Ukeep, Utype) VALUES ('$id', '$name', '$regtime', 0, 0)";
        if ($con->query($sql) != TRUE) {
            $error = array("error" => "insert");
            echo json_encode($error);
        } else {

            $success = array("success" => "regist");
            echo json_encode($success);
        }
    }
    mysqli_close($con);
}
?>