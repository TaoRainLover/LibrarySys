$(function(){
  $(".btn button")[0].onclick = function(){
    var userName = $(".userName input").val();
    var userAccount = $(".userAccount input").val();
    var userPass1= $(".userPass1 input").val();
    var userPass2 = $(".userPass2 input").val();
    console.log(userName);
    console.log(userAccount);
    console.log(userPass1);
    console.log(userPass2);
    if(userName == ''){
      alert("用户名为空，请重新输入！");
    }
    else if(userAccount == ''){
      alert("账号不能为空，请重新输入！");
    }
    else if(userPass1 != userPass2){
      alert("两次密码输入不一致，请重新确认！")
    }else{
      $.ajax({
        type: "POST",
        url: "../php/register/regist.php", //PHP文件地址
        data: {userName: userName, userAccount: userAccount, userPassword: userPass2},
        // data: { AlbumName: "shanghai", Entered: "5/9/2013" },
        dataType: "json",
        success: function (response) {
          // 成功返回数据
          console.log(response);
          if(response.error){
            alert("输入有误，请重新输入！")
          }if(response.success){
            alert("注册成功！点击确认跳转到登录页面！")
            $(window).attr('location','../html/login.html');
          }

        },
        error: function (err) {
          console.log("fail")
          console.log(err);
        },
        
      });
    }
  }
})