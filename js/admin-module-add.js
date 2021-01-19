$(function(){
  $(".userInfo .userName span").text('[ '+getCookie("adminName")+" ]");
  $(".content .funTitle")[0].onclick = function(){
    var bookName = $(".bookName").val();
    var bookAutor = $(".bookAutor").val();
    var bookType = $(".bookType").val();
    var bookISBN = $(".bookISBn").val();
    var bookNum = $(".bookNum").val();
    var bookPosition = $(".bookPosition").val();
    var fileInfo = $(".file").val();
    console.log($(".file"));
    // console.log(fileInfo);
    $.ajax({
      type: "POST",
      url: "../php/test.php", //PHP文件地址
      data: {bookName: bookName, bookAutor: bookAutor, bookType:bookType, bookISBN:bookISBN, bookNum:bookNum, bookPosition:bookPosition},
      // data: { AlbumName: "shanghai", Entered: "5/9/2013" },
      dataType: "json",
      success: function (response) {
        console.log(response);
        // 这里返回一个添加图书的状态，成功失败进行弹窗显示
        // if(){
        //   alert("添加成功！");
        // }else{
        //   alert("添加失败");
        // }
        
      },
      error: function (err) {
        console.log("fail")
        console.log(err);
      },
      
    });
  }
})



