<?php
header('content-type:text/html;charset=utf-8');
$con = mysqli_connect("localhost", "root", "123456", "software");
if (mysqli_errno($con)) {
    $error = array("error" => "connect");
    echo json_encode($error);
} else {
    $act = $_POST['searchBookType'];
    $info = $_POST['searchBooInfo'];
    $arr = array();
    switch ($act) {
        case 'ISBN':
            $sql = "SELECT * FROM bookinfo WHERE ISBN LIKE '%$info%'";
            break;
        case 'author':
            $sql = "SELECT * FROM bookinfo WHERE Bauthor LIKE '%$info%'";
            break;
        default:
            $sql = "SELECT * FROM bookinfo WHERE Bname LIKE '%$info%'";
            break;
    }
    $res = mysqli_query($con, $sql);
    while ($row = mysqli_fetch_assoc($res))
        $arr[] = $row;
    echo json_encode($arr);
    mysqli_close($con);
}
?>