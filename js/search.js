$(function(){
  var searchBookInfo = getCookie("searchBookInfo");
  var searchBookType = getCookie("searchBookType");
  console.log(searchBookInfo);
  console.log(searchBookType);
  $.ajax({
    type: "POST",
    url: "../php/book/searchbook.php", //PHP文件地址
    data: {searchBooInfo: searchBookInfo, searchBookType: searchBookType},
    // data: { AlbumName: "shanghai", Entered: "5/9/2013" },
    dataType: "json",
    success: function (response) {
      // 成功返回数据
      $(".formContainer .form").empty();
      console.log(response);
      var $li = $("<li class=\"des\">\n" +
          "              <div class=\"bookName \">书名</div>\n" +
          "              <div class=\"bookAutor\">作者</div>\n" +
          "              <div class=\"isbn\">ISBN</div>\n" +
          "              <div class=\"type\">类别</div>\n" +
          "              <div class=\"num\">数量</div>\n" +
          "              <div class=\"remain\">剩余数量</div>\n" +
          "              <div class=\"place\">位置</div>\n" +
          "            </li>");
      $(".formContainer .form").append($li);

      // if(response.length == 0){
      //   alert("对不起，没有相关书籍或作者的信息，请重新输入！");
      // }
      for(let i = 0; i < response.length; i++){
        var bookObj = response[i];
        var $li = $("<li class='bookResult'>"+
          "<div class='bookName bookResName'>"+bookObj.Bname+"</div>"+
          "<div class='bookAutor'>"+bookObj.Bauthor+"</div>"+
          "<div class='isbn'>"+bookObj.ISBN+"</div>"+
          "<div class='type'>"+bookObj.Bclass+"</div>"+
          "<div class='num'>"+bookObj.Bnum+"</div>"+
          "<div class='remain'>"+bookObj.Bremain+"</div>"+
          "<div class='place'>"+bookObj.Bplace+"</div></li>");

        $(".formContainer .form").append($li);
      }

    },
    error: function (err) {
      console.log("fail")
      console.log(err.status);
    },

  });
  addCookie('searchBookInfo', "null", '5', '\\');
  addCookie("searchBookType", "null", '5', '\\');
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
        // 成功返回数据
        console.log(response);
        $(".formContainer .form").empty();
        console.log(response);
        var $li = $("<li class=\"des\">\n" +
            "              <div class=\"bookName \">书名</div>\n" +
            "              <div class=\"bookAutor\">作者</div>\n" +
            "              <div class=\"isbn\">ISBN</div>\n" +
            "              <div class=\"type\">类别</div>\n" +
            "              <div class=\"num\">数量</div>\n" +
            "              <div class=\"remain\">剩余数量</div>\n" +
            "              <div class=\"place\">位置</div>\n" +
            "            </li>");
        $(".formContainer .form").append($li);
        if(response.length == 0){
          alert("对不起，没有相关书籍或作者的信息，请重新输入！");
        }
        for(let i = 0; i < response.length; i++){
          var bookObj = response[i];
          var $li = $("<li class='bookResult'>"+
            "<div class='bookName bookResName'>"+bookObj.Bname+"</div>"+
            "<div class='bookAutor'>"+bookObj.Bauthor+"</div>"+
            "<div class='isbn'>"+bookObj.ISBN+"</div>"+
            "<div class='type'>"+bookObj.Bclass+"</div>"+
            "<div class='num'>"+bookObj.Bnum+"</div>"+
            "<div class='remain'>"+bookObj.Bremain+"</div>"+
            "<div class='place'>"+bookObj.Bplace+"</div></li>");

          $(".formContainer .form").append($li);
        }

      },
      error: function (err) {
        console.log("fail")
        console.log(err);
      },
      
    });
  }

  $(document).on('click', '.bookResName', function(e) {
 
    var intorBookName = $(this).text();
    console.log(intorBookName);
    // 添加到Cookie里面
    addCookie('intorBookName', intorBookName, 5, '\\');
    window.location.href = '../html/user-module-introduce.html';
   
  });
  // $(".formContainer .bookResult .bookName").click(function(){
  //   var intorBookName = $(this).text();
  //   console.log(intorBookName);
  //   // 添加到Cookie里面
  //   addCookie('intorBookName', intorBookName, 5, '\\');
  //   // window.location.href = '../html/user-module-introduce.html';
  // })
})