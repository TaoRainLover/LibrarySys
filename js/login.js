$(function(){
  var submitBtn = $(".btn button")[0];
  var usrAccount = $(".usrAcc");
  var usrPass = $(".usrPass");
  submitBtn.onclick = function(){
    account = usrAccount.val();
    pass = usrPass.val();
    $.ajax({
      type: "POST",
      url: "../php/register/login.php", //PHP文件地址
      data: {userAccount: account, userPassword: pass},
      // data: { AlbumName: "shanghai", Entered: "5/9/2013" },
      dataType: "json",
      success: function (response) {
        // 成功返回数据

        console.log(response);
        // 判断是否存在该用户以及账号密码是否正确：
        if(response.error == "login"){
          alert("账号密码错误或未注册！请重新输入！")
        }else{
          // alert(response.userName);
          // 判断是管理员还是用户
          if(response[0].Utype == 1){
            // alert("管理员");
            addCookie("adminAccount", account, 5, '\\');
            addCookie("adminName",  response[0].Uname, 5, '\\');

            window.location.href = "../html/admin-module-add.html";
          }else if(response[0].Utype == 0){
            // alert("用户");
            addCookie("userAccount", account, 5, '\\');
            addCookie("userName", response[0].Uname, 5, '\\');

            window.location.href = "../html/user-module-record.html";
          }
        }

      },
      error: function (err) {
        console.log("fail")
        console.log(err);
      },
      
    });
  }
})