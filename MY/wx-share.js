/**
 * Created by jtun02 on 15/4/22.
 */

/**
 *<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
 */

$.getJSON('http://api.jtuntech.com/event/2015/roewe/jssdk.php?act=config', function(data){
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.AppId, // 必填，公众号的唯一标识
        timestamp: data.Stamp, // 必填，生成签名的时间戳
        nonceStr: data.NonceStr, // 必填，生成签名的随机串
        signature: data.Signature,// 必填，签名，见附录1
        jsApiList: [
            "onMenuShareTimeline",
            "onMenuShareAppMessage"
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
});

var WXREADY = false;

try {
    wx.ready(function() {
        wxShare();

        var te = document.createEvent('Event');
        te.initEvent('wxready', true, true);
        document.querySelector('body').dispatchEvent(te);
        WXREADY = true;
    });
} catch (e) {
    console.log('not wechat');
}



function wxShare(_title, _desc, _link, _img, callback) {

    var _share = {
        title: _title||'王祖蓝又有新模仿啦~~投币看一看，万千明星饭，我要赢高逼格鼎釜电饭煲，选我选我！！#一键炮制明星饭#@美的@爱奇艺',
        desc:_desc||'王祖蓝又有新模仿啦~~投币看一看，万千明星饭，我要赢高逼格鼎釜电饭煲，选我选我！！#一键炮制明星饭#@美的@爱奇艺',
        link: _link || 'http://api.jtuntech.com/event/2015/midea/index.html',
        imgUrl:_img||'http://api.jtuntech.com/event/2015/midea/pc/img/product_ms.jpg',
        callback: callback || function(){}
    };


    shareTL(_share.desc, _share.link, _share.imgUrl, _share.callback);
    shareAM(_share.title, _share.desc, _share.link, _share.imgUrl, _share.callback);
}


function shareTL(title, link, url, callback) {

    wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: link, // 分享链接
        imgUrl: url, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            if (callback) {
                callback();
            }
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}

function shareAM(title, desc, link, url, callback) {

    wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: url, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
            if (callback) {
                callback();
            }
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}