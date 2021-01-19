$(function(){
  $(".userInfo .userName span").text('[ '+getCookie("adminName")+" ]");

  $(".submit button")[0].onclick = function(){
    var userID = $(".userID").val();
    var bookISBN = $(".bookISBN").val();
    // console.log(userID);
    // console.log(bookISBN);
    $.ajax({
      type: "POST",
      url: "../php/admin/returnbook.php", //PHP还书文件地址
      data: {id: userID, ISBN: bookISBN},
      // data: { AlbumName: "shanghai", Entered: "5/9/2013" },
      dataType: "json",
      success: function (response) {
        console.log(response);
        // 根据返回内容进行弹窗判断
        if(response.success == 'return'){
          alert("还书成功！！！");
          window.location.href = "../html/admin-module-borrow.html";
        }else if(response.error == 'return'){
          alert("还书失败，查询不到相应的借书记录！");
        }
      },
      error: function (err) {
        console.log("fail");
        console.log(err);
      },
      
    });
  }
})