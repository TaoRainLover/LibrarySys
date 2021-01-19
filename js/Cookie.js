function addCookie(key, value, day, path ,domain){
  var index = window.location.pathname.lastIndexOf("/");
  var currentPath = window.location.pathname.slice(0, index);
  path = path || currentPath;

  domain = domain ||document.domain;

  if(!day){
    document.cookie = key+"="+value+";path="+path+";domain="+domain+";";

  }else{
    var date = new Date();
    date.setDate(date.getDate()+day);
    document.cookie = key+"="+value+";expires="+date.toGMTString()+";path="+path+";damain="+domain+";";
  }
}

function getCookie(key){
  var res = document.cookie.split(";");
  for(var i = 0; i < res.length; i++){
    var temp = res[i].split("=");
    if(temp[0].trim() == key){
      return temp[1];
    }
  }
}