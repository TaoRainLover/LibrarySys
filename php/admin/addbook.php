<?php
header('content-type:text/html;charset=utf-8');
session_start();
if (isset($_SESSION['user']) && $_SESSION['type'] == '1') {
    $conn = new mysqli('localhost', 'root', '123456', 'software');
    if (mysqli_errno($conn)) {
        $error = array("error" => "connect");
        echo json_encode($error);
    } else {
        $conn->query("set names'utf8'");//设定连接编码,目的是和数据库内部的编码一样
        $conn->set_charset('utf8_general_ci');//规定当与数据库服务器进行数据传送时要使用的默认字符集

        $ISBN = $_POST['ISBN'];
        $Bname = $_POST['Bname'];
        $Bauthor = $_POST['Bauthor'];
        $Bpress = $_POST['Bpress'];
        $Bnum = $_POST['Bnum'];
        $Bclass = $_POST['Bclass'];
        $Bintro = $_POST['Bintro'];
        $Bplace = $_POST['Bplace'];

        if ($_FILES["file"]["error"]) //file是input上传图片时候的name
        {
            echo "<script>alert('图片上传错误');location='../../html/admin-module-add.html'</script>";
        } else {
            //控制上传文件的类型，大小
            if (($_FILES["file"]["type"] == "image/jpeg" || $_FILES["file"]["type"] == "image/png") && $_FILES["file"]["size"] < 1024000) {
                //在服务器中新建一个uploads文件夹,图片名中也加入当前日期
                $filename = "../../uploads/" . date("Ymd") . $_FILES["file"]["name"];
                //转换编码格式，只有转换成GB2312，move_uploaded_file函数才不会把图片名字里的中文变成乱码
                $filename1 = iconv("UTF-8", "gb2312", $filename);
                //判断文件是否存在
                if (file_exists($filename1)) {
                    echo "<script>alert('图片已存在！');location='../../html/admin-module-add.html'</script>";
                } else {
                    //保存文件，将上传的临时文件移到web服务器中
                    move_uploaded_file($_FILES["file"]["tmp_name"], $filename1);
                    //这里的filename要utf8_general_ci格式,不然和数据库中编码不一致
                    $sql = "insert into bookinfo values('$ISBN', '$Bname', '$Bauthor', '$Bpress', '$Bnum', '$Bnum', '$Bclass','$filename' ,'$Bintro' ,'$Bplace')";
                    if ($conn->query($sql)) {
                        echo "<script>alert('添加成功！');location='../../html/admin-module-add.html'</script>";
                    } else {
                        echo "<script>alert('图书已存在！');location='../../html/admin-module-add.html'</script>";
                    }
                }
            } else {
                echo "<script>alert('文件类型错误或文件过大！');location='../../html/admin-module-add.html'</script>";
            }
        }
    }
    $conn->close();
} else {
    echo "<script>alert('权限不匹配！');location='../../html/login.html'</script>";
}
?>