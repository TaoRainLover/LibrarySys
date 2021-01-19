$(function(){
  var bookComment = getCookie('bookComment');
  var bookRid = getCookie('bookRid');
  console.log(bookRid);
  console.log(bookComment);
  $('.bookName input').val(bookComment);
  $(".submit")[0].onclick = function(){
    var bookName = $(".bookName input").val();
    var bookComment = $(".bookComment textarea").val();
    console.log(bookName);
    console.log(bookComment);
    $.ajax({
      type: "POST",
      url: "../php/user/addcomment.php",
      data: {comment: bookComment, Rid:bookRid}, //{name: value, name:value}
      dataType: "json",
      success: function (response) {
        console.log(response);
        if(response.success == 'update'){
          alert("添加评论成功！！！")
          window.location.href = '../html/user-module-record.html';
        }
      },
      error : function(response){
        console.log("request fail!");
        console.log(response);
      }
    });
  }
})