$(function(){
  
  $(".inputForm .submit")[0].onclick = function(){
    var inputInfo = $(".inputForm input").val();
    var searchType = $(".inputForm .way").val();
    addCookie('searchBookInfo', inputInfo, '5', '\\');
    addCookie("searchBookType", searchType, '5', '\\');
    // alert( getCookie('searchBookInfo'));
    
    $(window).attr('location','../html/search.html');
  }
  
})