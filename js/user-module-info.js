
$(function(){
  // 用户进入到这个页面就将用户的借阅记录全部展示出来,然后将所需要的数据展示在页面上
  var userAcc = getCookie("userAccount");
  $(".userInfo .userName span").text('[ '+getCookie("userName")+" ]");
  $.ajax({
    type: "POST",
    url: "../php/user/userinfo_display.php",
    // data: {userAccount: userAcc},
    dataType: "json",
    success: function (res) {
      response = res[0];
      console.log(response);
      $(".userInformation .Uname").text(response.Uname);
      $(".userInformation .Uacc").text(response.Uid);
      $(".userInformation .Uregis").text(response.Uregtime);
      $(".userInformation .Uemail").text(response.Umail);
      $(".userInformation .Utel").text(response.Utel);
      $(".userInformation .Ukeep").text(response.Ukeep);
    },
    error : function(response){
      console.log("request fail");
      console.log(response);
    }
  });
  // 修改个人信息按钮：
  $(".content .modify")[0].onclick = function(){
    // 跳转到修改个人信息页面
    window.location.href = "../html/user-info-modify.html";
  }
})
