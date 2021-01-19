<?php
header('content-type:text/html;charset=utf-8');
session_start();
if (isset($_SESSION['user'])) {
    session_unset();
    session_destroy();
    echo "<script>alert('注销成功，正在跳转');location='../../html/index-test.html'</script>"; //主页
} else
    echo "<script>alert('您还未登录，请先登录');location='../../html/login.html'</script>"; //登录页
?>