$(function(){
  // 用户进入到这个页面就将用户的借阅记录全部展示出来
  var userAcc = getCookie("userAccount");
  $(".userInfo  .userName span").text('[ '+getCookie("userName")+" ]");
  // console.log(userAcc);
  $.ajax({
    type: "POST",
    url: "../php/user/borrowrecord.php",
    // data: {userAccount: userAcc},
    dataType: "json",
    success: function (response) {
      // 成功之后返回该用户的所有借阅信息(数组类型？？？)
      console.log(response);
      $(".formContainer .form").empty();
      var $li = $("<li class='des'>"+
        "<div class='id'>ID</div>"+
        "<div class='bookName'>书名</div>"+
        "<div class='borrowDate'>借书日期</div>"+
        "<div class='returnDate'>到期日期</div>"+
        "<div class='status2'>操作</div>"+
        "</li>");
      $(".formContainer .form").append($li);
      
      for(let i = 0; i < response.length; i = i+2){
        var recordObj = response[i];
        var bookName = response[i+1].Bname;
        var Borrowtime = recordObj.Borrowtime;
        var Returntime = recordObj.Returntime;
        var bookRid = recordObj.Rid;
        var Rstatus;
        if(recordObj.Rstatus == '0'){
          Rstatus = '未还';
        }else if(recordObj.Rstatus == "1"){
          Rstatus = '已还';
        }
        
        var $li = $("<li>"+
          "<div class='id'>"+bookRid+"</div>"+
          "<div class='bookName'>"+bookName+"</div>"+
          "<div class='borrowDate'>"+Borrowtime+"</div>"+
          "<div class='returnDate'>"+Returntime+"</div>"+
          "<div class='status2'>"+
          "<span><img src='../img/icon/add.png'>"+Rstatus+"</span>\n"+
          "<span class='comment'><img src='../img/icon/modify.png' >评价</span>"+

          "</div>"+
          "</li>")
        $(".formContainer .form").append($li);

      }
      

      // $(".formContainer .form").append($li);
      // $(".formContainer .form").append($li);
    },
    error : function(response){
      console.log("request fail");
      console.log(response);
    }
  });
  $(document).on('click', '.status2 .comment ', function(e) {
    var bookComment = $(this).parent(".status2").siblings(".bookName").text();
    var bookRid = $(this).parent(".status2").siblings(".id").text();
    console.log(bookRid);
    console.log(bookComment);
    addCookie('bookComment', bookComment, 5, '\\');
    addCookie('bookRid', bookRid, 5, '\\');

    window.location.href = "../html/book-comment.html"






  })

  // $(".form .status2 .comment").click(function(){
  //   var bookComment = $(this).parent(".status2").siblings(".bookName").text();
  //   console.log(bookComment);
  //   addCookie('bookComment', bookComment, 5, '\\');
  //   window.location.href = '../html/book-comment.html';
  // })
})