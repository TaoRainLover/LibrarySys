<?php
    /*验证验证码是否正确*/
    // session_start();
    // $acc = trim($_POST['userAccount']);//接收前端传来的数据
    // $pass = trim($_POST['userPassword']);
    // $raw_success = array('code' => $acc, 'msg' => $pass);
    // $raw_fail = array('code' => 2, 'msg' => '验证码错误');
     
    // $res_success = json_encode($raw_success);
    // $res_fail = json_encode($raw_fail);
     
    header('Content-Type:application/json');//这个类型声明非常关键
    // 测试POST传入内容
    if(!empty($_POST)){
      echo json_encode($_POST);
      die;
    }
    // $data = array("bookName" => "活着", "autor" => "余华", "bookType" => "文学类", "bookISBN" => "1-1-1-1", "bookNum" => "6", "bookPosition" => "位置-楼层-阅读室");
    // $data = array("userName" => "王二家的狗", "userAccount" => "110011", "userType" => "admin");
    // $data = array("userName" => "王二家的猫", "userAccount" => "tao21111", "userType" => "user");
    // $data = array("userName" => "王二家的猫", "Uid" => "tao21111", "Utype" => "user", "Utel"=>"134314444", "Umail"=>"email.@123.com", "Ukeep"=>14, "Uregtime"=>"2020-12-31");
  

    // $data = array("Bpic" => "../img/login-back.jpg", "Bintro" => "小人物的生活经历");
    // $data = array("bookName" => "活着", "作者" => "余华");
    // echo json_encode($data);
    // $data2 = "{'name': 'tao', 'age': '20'}";
    // echo json_encode($data2);
?>