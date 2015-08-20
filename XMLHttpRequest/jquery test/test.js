/**
 * Created by jtun02 on 14-9-18.
 */
//这部分是显示进度条效果
var progress_id = "loading";
function SetProgress(progress)
{
    if (progress)
    {
    $("#" + progress_id + " > div").css("width", String(progress) + "%"); //控制#loading div宽度
    $("#" + progress_id + " > div").html(String(progress) + "%"); //显示百分比
    }
}
var i=0;
function doProgress()
{
    if (i > 100)
    {
//clearInterval(handle);
//$("#box").text("全部备份成123功！");
    $("#message").html("全部备份成功！").fadeIn("fast");//加载完毕提示
    window.location.href="al_copy.php";
    return;
    }
if (i <= 100)
{
    setTimeout("doProgress()", 1);
    SetProgress(i);
    i++;
    }
}
//$(document).ready(function(){doProgress();});
以下这部分是第二个ajax
function get_2()
{
    $.ajax({
        url:"ses_1.php",
        type:"post",
        data:{"xx":"xx"},
//async:true,
beforeSend:function()
{
//这里是开始执行方法，显示效果，效果自己写
    },
complete:function()
{
//方法执行完毕，效果自己可以关闭，或者隐藏效果
    },
success:function(a)
{
//alert(a);
//以下是效果进度条
    doProgress();
    },
error:function()
{
//数据加载失败
    }
});
}
以下这部分是触发的第一个ajax
function get_1()
{
    var layout = document.getElementByIdx_x("layout");
    var box = document.getElementByIdx_x("box");
    var closed = document.getElementByIdx_x("closed");
    $.ajax({
    url:"yj.php",
    type:"post",
    data:{"xx":"xx"},
//async:false,
beforeSend:function()
{
//这里是开始执行方法，显示效果，效果自己写
    handle=setInterval(get_2,50);
    },
complete:function()
{
    clearInterval(handle);
//方法执行完毕，效果自己可以关闭，或者隐藏效果
    },
success:function(a)
{
//alert(a);
    //alert("成功")
    //数据加载成功
    },
});
layout.style.display = "block";
box.style.display = "block";
}