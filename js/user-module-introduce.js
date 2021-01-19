$(function(){
  // 保存图书的ISBN
  
  var intorBookName = getCookie("intorBookName");
  
  console.log(intorBookName);
  // 修改图片和介绍
  $.ajax({
    type: "POST",
    url: "../php/book/searchbook.php", //PHP文件地址
    data: {searchBooInfo: intorBookName, searchBookType: ''},
    // data: { AlbumName: "shanghai", Entered: "5/9/2013" },
    dataType: "json",
    success: function (response) {
      // 返回查询结果：
      console.log(response);
      var bookPic = response[0].Bpic;
      var bookintro = response[0].Bintro;
      var bookISBN = response[0].ISBN;
      console.log(bookISBN);
      // bookPic = '../img/login-back.jpg';
      $(".imgDiv img").attr("src",bookPic);
      $(".info .intro").text(bookintro);

      // 更改评论
      $.ajax({
        type: "POST",
        url: "../php/book/bookComment.php", //PHP文件地址
        data: {ISBN: bookISBN},
        // data: { AlbumName: "shanghai", Entered: "5/9/2013" },
        dataType: "json",
        success: function (response) {
          // 返回查询结果：
          console.log(response);
          // 删除之前的评论
          $(".comment").empty();
          for(let i = 0; i < response.length ;i++){

            var commentli = $("<li class='commentli'>"+response[i].Comment+"</li>")
            $(".comment").append(commentli);
          }
        
          
        },
        error: function (err) {
          console.log("---- ajax fail ----");

          console.log(err);
        },
        
      });
     
      
    },
    error: function (err) {
      console.log("---- ajax fail ----");

      console.log(err);
    },
    
  });
  console.log('---------分割线-------');
  // console.log(bookISBN);

  // 点击查询按钮，能够得到该书相关图片和介绍以及评论
  $(".searchBox .submit")[0].onclick = function(){
    var searchType = $(".inputContent .way").val();
    searchBookInfo = $(".inputContent .searchContent").val();
    console.log(searchType); //分别为bookName, bookAutor, BookISBN
    console.log(searchBookInfo); //用户输入的内容
    // addCookie("searchBookInfo", searchBookInfo, 5, "\\");
    $.ajax({
      type: "POST",
      url: "../php/book/searchbook.php", //PHP文件地址
      data: {searchBooInfo: searchBookInfo, searchBookType: searchType},

      // data: { AlbumName: "shanghai", Entered: "5/9/2013" },
      dataType: "json",
      success: function (response) {
        // 返回查询结果：
        // 返回查询结果：
      console.log(response);
      if(response.length == 0){
        alert("对不起，没有相关书籍或作者的信息，请重新输入！");
      }
      var bookPic = response[0].Bpic;
      var bookintro = response[0].Bintro;
      var bookISBN = response[0].ISBN;
      console.log(bookISBN);
      // bookPic = '../img/login-back.jpg';
      $(".imgDiv img").attr("src",bookPic);
      $(".info .intro").text(bookintro);

      // 更改评论
      $.ajax({
        type: "POST",
        url: "../php/book/bookComment.php", //PHP文件地址
        data: {ISBN: bookISBN},
        // data: { AlbumName: "shanghai", Entered: "5/9/2013" },
        dataType: "json",
        success: function (response) {
          // 返回查询结果：
          console.log(response);
          $(".comment").empty();
          for(let i = 0; i < response.length ;i++){

            var commentli = $("<li class='commentli'>"+response[i].Comment+"</li>")
            $(".comment").append(commentli);
          }
        
          
        },
        error: function (err) {
          console.log("---- ajax fail ----");

          console.log(err);
        },
        
      });
        
      },
      error: function (err) {
        console.log("---- ajax fail ----");
        console.log('-- 1.php路径错误--');
        console.log('-- 2.返回数据不是json--');
        console.log(err);
      },
      
    });
  }
  addCookie('intorBookName', '', 5, '\\');
})