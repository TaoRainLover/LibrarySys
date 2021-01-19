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
        $sql = "SELECT * FROM bookinfo WHERE ISBN = '$ISBN' AND Bremain>0";
        $res = mysqli_query($con, $sql);
        $obj = mysqli_fetch_object($res);
        if (!$obj) {
            $error = array("error" => "remain");
            echo json_encode($error);
        } else {
            $now = time();
            $sql = "SELECT * FROM record WHERE Uid = '$id' AND Rstatus='0' AND unix_timestamp(Returntime) < '$now'";
            $res = mysqli_query($con, $sql);
            $obj = mysqli_fetch_object($res);
            if ($obj) {
                $error = array("error" => "overdue");
                echo json_encode($error);
            } else {
                $sql = "SELECT * FROM record WHERE Uid = '$id' AND Rstatus='0' AND ISBN = '$ISBN'";
                $res = mysqli_query($con, $sql);
                $obj = mysqli_fetch_object($res);
                if ($obj) {
                    $error = array("error" => "alreadyhave");
                    echo json_encode($error);
                } else {
                    $sql = "update bookinfo set Bremain = Bremain-1 where ISBN = '$ISBN'";
                    $con->query($sql);
                    $sql = "update userinfo set Ukeep = Ukeep+1 where Uid = '$id'";
                    $con->query($sql);
                    $borrowtime = date('Y-m-d H:i:s', time());
                    $returntime = date('Y-m-d H:i:s', strtotime('+2 months'));
                    $sql = "INSERT INTO record(Uid, ISBN, Borrowtime, Returntime, Rstatus) 
                    VALUES ('$id', '$ISBN', '$borrowtime', '$returntime', 0)";
                    if ($con->query($sql) != TRUE) {
                        $error = array("error" => "insert");
                        echo json_encode($error);
                    } else {
                        $success = array("success" => "insert");
                        echo json_encode($success);
                    }
                }
            }
        }
        mysqli_close($con);
    }
} else {
    $error = array("error" => "authority");
    echo json_encode($error);
}
?>