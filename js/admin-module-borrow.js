$(function(){
  $(".userInfo .userName span").text('[ '+getCookie("adminName")+" ]");

  $(".submit button")[0].onclick = function(){
    var userID = $(".userID").val();
    var bookISBN = $(".bookISBN").val();
    console.log(userID);
    console.log(bookISBN);
    $.ajax({
      type: "POST",
      url: "../php/admin/borrowbook.php", //PHP文件地址
      data: {id: userID, ISBN: bookISBN},
      // data: { AlbumName: "shanghai", Entered: "5/9/2013" },
      dataType: "json",
      success: function (response) {
        console.log(response);
        // 根据返回内容进行弹窗判断
        if(response.error == 'remain'){
          alert("库存不足！");
        }
        else if(response.error == 'overdue'){
          alert("借书失败，有超期未还的图书，请尽快归还！")
        }
        else if(response.error == 'alreadyhave'){
          alert("借书失败，借了相同的书暂未归还！")
        }
        else if(response.success == 'insert'){
          alert("借出成功！！！");
          window.location.href = "../html/admin-module-borrow.html";
        }
      },
      error: function (err) {
        console.log("fail")
        console.log(err);
      },
      
    });
  }
})