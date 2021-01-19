$(function(){
  var userAcc = getCookie("userAccount");
  $(".userInfo .userName span").text('[ '+getCookie("userName")+" ]");


  $(".funTitle .submit")[0].onclick = function(){
    // 获取输入的旧密码和新密码，并对两次输入的新输入进行比对：
    var oldPass = $(".modifyContainer .oldPass").val();
    var newPass1 = $(".modifyContainer .newPass1").val();
    var newPass2 = $(".modifyContainer .newPass2").val();
    if(oldPass == ''){
      alert("请输入旧密码！");
    }else if (newPass1 != newPass2 ){
      alert("两次密码输入不正确，请重新输入！");
    }else{
      $.ajax({
        type: "POST",
        url: "../php/user/changepass.php",
        // 传入旧密码和新密码
        data: {oldPass: oldPass, newPass: newPass2},
        dataType: "json",
        success: function (res) {
          console.log(res);
          if(res.error){
            alert("旧密码输入错误，请重新输入！");
          }else{
            alert("密码更改成功, 将跳转到借阅信息模块！");
            window.location.href = "../html/user-module-record.html";
          }
        },
        error : function(response){
          console.log("request fail");
          console.log(response);
        }
      });
    }
  }
})