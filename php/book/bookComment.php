<?php
header('content-type:text/html;charset=utf-8');
$con = mysqli_connect("localhost", "root", "123456", "software");
if (mysqli_errno($con)) {
    $error = array("error" => "connect");
    echo json_encode($error);
} else {
    $ISBN = $_POST['ISBN'];
    $arr = array();
    $sql = "SELECT Comment FROM record WHERE ISBN = '$ISBN' AND Comment != ''";
    $res = mysqli_query($con, $sql);
    while ($row = mysqli_fetch_assoc($res))
        $arr[] = $row;
    echo json_encode($arr);
    mysqli_close($con);
}
?>