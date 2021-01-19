$(function(){
  
  var userAcc = getCookie("userAccount");
  $(".userInfo .userName span").text('[ '+getCookie("userName")+" ]");
  $.ajax({
    type: "POST",
    url: "../php/user/userinfo_display.php",
    // data: {userName: userName, userEmail: userEmail, userTel: userTel}, //{name: value, name:value}
    dataType: "json",
    success: function (response) {
      console.log(response);
      // 将之前的个人信息填上
      $(".modifyContainer .userName").val(response[0].Uname);
      console.log(response[0].Umail);
      console.log(response[0].Utel);
      $(".modifyContainer .userEmail").val(response[0].Umail);
      $(".modifyContainer .userTel").val(response[0].Utel);

      
    },
    error : function(response){
      console.log("request fail");
      console.log(response);
    }
  });


  // $(".modifyContainer .userName").txt(get)
  $(".content .submit")[0].onclick = function(){

    var userName = $(".modifyContainer .userName").val();
    var userEmail = $(".modifyContainer .userEmail").val();
    var userTel = $(".modifyContainer .userTel").val();
    $.ajax({
      type: "POST",
      url: "../php/user/userinfo_change.php",
      data: {userName: userName, userEmail: userEmail, userTel: userTel}, //{name: value, name:value}
      dataType: "json",
      success: function (response) {
        console.log(response);
        if(response.success == 'update'){
          addCookie("userName", userName, 5, '\\');
          alert("修改成功！");
        }
        // 然后跳转到个人信息模块
        window.location.href = "../html/user-module-info.html";
      },
      error : function(response){
        console.log("request fail");
        console.log(response);
      }
    });
    

  }
  
  
})
