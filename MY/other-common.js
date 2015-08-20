/**
 * Created by jtun02 on 15/4/22.
 */

var Q = (function() {
    var qs = (location.search.length > 0 ? location.search.substring(1) : '');

    var args = {};

    var items = qs.split('&');
    var item = null,
        key = null,
        value = null;

    for (var i = 0; i < items.length; i ++) {
        item = items[i].split('=');
        key = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        args[key] = value;
    }
    return args;
})();

//常用
var commons = {
    //正则
    Regexp : {},
    //实用方法  Practical Method
    PraMethod: {}
};
//手机号码正则表达式
commons.Regexp.mRep = /^0?(13[0-9]|15[0123456789]|18[0123456789]|14[57])[0-9]{8}$/;
//分页
commons.PraMethod.pagination = function(arr, count) {
    var result = [];
    var i;
    var len = arr.length;
    var num = Math.ceil(len / count);

    for(i = 0; i < num; i++)
    {
        var child = [];
        var next = i +1;
        if(next*count < len)
        {
            child = arr.slice(i*count,next*count);
        }
        else
        {
            child = arr.slice(i*count,arr.length);
        }
        result.push(child);
        if(child.length == 0)
        {
            break;
        }
    }
    return result;
};

//函数
commons.PraMethod.isFunction = function(callback) {
    if (Object.prototype.toString.call(callback).slice(8, -1) == 'Function') {
        return true;
    }
    return false;
};

if (window.location.href.indexOf('jtuntech') != -1) {
    commons.tempPrix = 'http://api.jtuntech.com/event/2015/Q2/Georgia';
} else {
    commons.tempPrix = 'http://georgia.heur.cn'
}
$(function(){
    if($(window).width()>360){
        $(".index_bg").attr("src","img/index_bg.jpg");
        $(".lose_bg_6").attr("src","img/lose_bg_6.jpg");
        $(".bean_bg_6").attr("src","img/bean_bg_6.jpg");
    }

});