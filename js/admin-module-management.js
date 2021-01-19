$(function(){

  $(".userInfo .userName span").text('[ '+getCookie("adminName")+" ]");
  $(".searchBox .submit")[0].onclick = function(){
    var searchType = $(".inputContent .way").val();
    var searchBookInfo = $(".inputContent .searchContent").val();
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
        console.log(response);

        $(".formContainer .form").empty();
        var $li = $("<li class='des'>"+
        "<div class='bookName'>书名</div>"+
        "<div class='bookAutor'>作者</div>"+
        "<div class='isbn'>ISBN</div>"+
        "<div class='type'>类别</div>"+
        "<div class='num'>总库存</div>"+
        "<div class='reNum'>剩余库存</div>"+
        "<div class='position'>位置</div>"+
        "<div class='operation'>库存管理</div>"+
        "</li>");
        $(".formContainer .form").append($li);

        for(let i = 0; i < response.length ;i++){
          var bookObj = response[i];
          var $li = $("<li class='bookResult'>"+
          "<div class='bookName'>"+bookObj.Bname+"</div>"+
          "<div class='bookAutor'>"+bookObj.Bauthor+"</div>"+
          "<div class='isbn'>"+bookObj.ISBN+"</div>"+
          "<div class='type'>"+bookObj.Bclass+"</div>"+
          "<div class='num'>"+bookObj.Bnum+"</div>"+
          "<div class='reNum'>"+bookObj.Bremain+"</div>"+
          "<div class='position'>"+bookObj.Bplace+"</div>"+
          "<div class='operation'>"+
          "<span class='add'><img src='../img/icon/modify.png'>增加</span>\n"+
          "<span class='down'><img src='../img/icon/delete.png'>减少</span>"+
          "</div></li>");
          $(".formContainer .form").append($li);

        }
       


        
      },
      error: function (err) {
        console.log("fail")
        console.log(err);
      },
      
    });
  }
  //添加图书数量
  $(document).on('click', '.operation .add', function(e) {
 
    var bookManageName = $(this).parent(".operation").siblings(".isbn").text();
    console.log(bookManageName);
    // 首先查询这本书的数据
    $.ajax({
      type: "POST",
      url: "../php/book/searchbook.php", //PHP文件地址
      data: {searchBooInfo: bookManageName, searchBookType: 'ISBN'},
      // data: { AlbumName: "shanghai", Entered: "5/9/2013" },
      dataType: "json",
      success: function (response) {
        // 成功返回数据
        console.log(response);
        var oldBookNum = response[0].Bnum;
        var oldBookReNum = response[0].Bremain;
        var bookISBN = response[0].ISBN;
        var addBookNum = prompt("请输入增加库存的数量：");
        console.log(addBookNum);
        if(addBookNum > 0){
          
          // 修改书的数量：
          $.ajax({
            type: "POST",
            url: "../php/book/changebooknum.php", //PHP文件地址
            data: {act: 1, ISBN: bookISBN, num: addBookNum},
            // data: { AlbumName: "shanghai", Entered: "5/9/2013" },
            dataType: "json",
            success: function (response) {
              // 成功返回数据
              console.log(response);
              if(response.success == 'update'){
                alert("添加成功！");
                
              }
              
            },
            error: function (err) {
              console.log("fail")
              console.log(err);
            },
            
          });

        }else{
          alert("失败！");
        }
      },
      error: function (err) {
        console.log("fail")
        console.log(err);
      },
      
    });
    // var code = prompt("请输入增加库存数量：");
	    
	  //    if(code.text!="我爱你"){
	  //   	alert("你真的不爱我么")
	  //   }else{
	  //   	alert("我不爱你,你是个好人")
	  //   }
  });
  // 减少图书数量
  $(document).on('click', '.operation .down', function(e) {
 
    var bookManageName = $(this).parent(".operation").siblings(".isbn").text();
    console.log(bookManageName);
    // 首先查询这本书的数据
    $.ajax({
      type: "POST",
      url: "../php/book/searchbook.php", //PHP文件地址
      data: {searchBooInfo: bookManageName, searchBookType: 'ISBN'},
      // data: { AlbumName: "shanghai", Entered: "5/9/2013" },
      dataType: "json",
      success: function (response) {
        // 成功返回数据
        console.log(response);
        var oldBookNum = response[0].Bnum;
        var oldBookReNum = response[0].Bremain;
        var bookISBN = response[0].ISBN;
        var reduceNum = prompt("请输入减少库存的数量：");
        console.log(reduceNum);
        console.log(oldBookReNum);
        if(parseInt(reduceNum) <= parseInt(oldBookReNum)){
          
          // 修改书的数量：
          $.ajax({
            type: "POST",
            url: "../php/book/changebooknum.php", //PHP文件地址
            data: {act: 0, ISBN: bookISBN, num: reduceNum},
            // data: { AlbumName: "shanghai", Entered: "5/9/2013" },
            dataType: "json",
            success: function (response) {
              // 成功返回数据
              console.log(response);
              if(response.success == 'update'){
                alert("减少成功！");
                
              }
              
            },
            error: function (err) {
              console.log("fail")
              console.log(err);
            },
            
          });

        }
        else{
          alert("输入数据有误！");
        }
      },
      error: function (err) {
        console.log("fail")
        console.log(err);
      },
      
    });
  });
})