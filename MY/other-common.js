/**
 * Created by jtun02 on 15/4/22.
 */

var Q = (function() {
    var qs = (location.search.length > 0 ? decodeURIComponent(location.search.substring(1)) : '');

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
    PraMethod: {},

    TempMethod: {}
};
//手机号码正则表达式
commons.Regexp.mRep = /^0?(13[0-9]|15[0123456789]|17[0-9]|18[0123456789]|14[57])[0-9]{8}$/;
commons.Regexp.eRep = /^([a-zA-Z0-9\._-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
commons.Regexp.ticket = /^[1-9]\d*$/;
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

//微信浏览器
commons.PraMethod.isWeichatBro = function() {
    var device = navigator.userAgent.toLowerCase();
    if (/mobile/.test(device) && /micromessenger/.test(device)) {
        return true;
    }
    return false;
};

//分享到微博
/**
 *
 * @param sns : sina or tencent
 * @param para {title:String(分享title), desc:String(分享内容), url:String(分享地址), pic:String(图片地址)}
 * @constructor
 */
commons.PraMethod.shareToWeibo = function(sns, para) {

    var _pre = sns == 'sina' ?
        'http://v.t.sina.com.cn/share/share.php?searchPic=false&' :
        'http://v.t.qq.com/share/share.php?';

    var link = _pre + 'title=' +
        _e(para.title) +
        _e(para.desc) +
        '&url=' + _e(para.url) +
        (sns == 'sina' ?
        '&content=utf-8&sourceUrl=' + _e(para.url) + '&pic=' + _e(para.picurl) :
        '&pic=' + _e(para.picurl));

    window.open(link, 'newwindow','height=400,width=400,top=100,left=100');

    function _e(t) {
        return encodeURIComponent(t)
    }
};

//浏览器种类
commons.PraMethod.transitionEvent = function() {
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
        'transition':'transitionend',
        'OTransition':'oTransitionEnd',
        'MozTransition':'transitionend',
        'WebkitTransition':'webkitTransitionEnd'
    };

    var animations = {
        'animation':'animationend',
        'OAnimation':'oAnimationEnd',
        'MozAnimation':'animationend',
        'WebkitAnimation':'webkitAnimationEnd'
    };

    var e = {};

    for(t in transitions){
        if( el.style[t] !== undefined ){
            e.tr = transitions[t];
        }
    }

    for(t in animations) {
        if (el.style[t] !== undefined) {
            e.ani = animations[t];
        }
    }

    return e;
};

//local storage
commons.PraMethod.localStorage = function(key, obj) {
    var l = window.localStorage;
    if (typeof key != 'string') {
        throw new Error('wrong key !!!');
    }

    if (obj) {
        l.removeItem(key);
        if (obj == true) {
            return;
        }
        if (typeof obj != 'object') {
            l.setItem(key, obj);
        } else {
            l.setItem(key, JSON.stringify(obj));
        }
    }
    else {
        var ls = undefined;
        try {
            ls = JSON.parse(l.getItem(key));
        } catch (err) {
            ls = l.getItem(key);
        }
        return ls;
    }
};


/**
 *
 * @param range :jquery|zepto
 * @param onloading :function
 * @param onfinishload :function
 * @constructor
 */
//页面加载loading
commons.PraMethod.ImgLoader = function(range, onloading, onfinishload) {
    this.total = 0;
    this.imgs = [];
    this.current = 0;
    this.range = range || $('body');
    this.onloading = onloading;
    this.onfinishload = onfinishload;
};
commons.PraMethod.ImgLoader.prototype.init = function() {
    var self = this;

    function imgload() {
        if (self.current == self.total) {
            typeof self.onfinishload == 'function' && self.onfinishload();
            return;
        }
        if (self.current > self.total) return;
        typeof self.onloading == 'function' && self.onloading(self.current, self.total);
    }

    self.range.find('img').each(function() {
        var i = new Image();
        i.src = $(this).attr('src');
        if (/(.jpg|.png|.gif)/gi.test(i.src)) {
            self.imgs.push(i);
        }
    });
    self.total = self.imgs.length;
    self.imgs.forEach(function(item, index, array) {
        if (item.complete) {
            self.current += 1;
            imgload();
        }
        else {
            item.onload = function(e) {
                self.current += 1;
                imgload();
            };
            item.onerror = function() {
                self.current += 1;
                imgload();
                throw new Error(item.src + ' was not found');
            };
        }
    });
};


//身份证号验证
commons.PraMethod.IDvf = function(_n) {

    var _nx = ('7－9－10－5－8－4－2－1－6－3－7－9－10－5－8－4－2').split('－');
    var _an = _n.split('');
    var _vf = ('1－0－X－9－8－7－6－5－4－3－2').split('－');
    var _sum = 0;

    var _r = /^(\d{17}(\d|X|x))$/;

    if (_n.length != 18) {
        return false;
    }

    if (!_r.test(_n)) {
        return false;
    }

    for (var i = 0; i < _nx.length; i++) {
        _sum += _nx[i]*_an[i];
    }

    if (_an[17].toUpperCase() == _vf[_sum%11]) {

        return true;
    }

    return false;
};

//base64
commons.PraMethod.base64 = (function() {
    var base64 = {};
    base64.map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    base64.decode = function(s){
        s += '';
        var len = s.length;
        if((len === 0) || (len % 4 !== 0)){
            return s;
        }

        var pads = 0;
        if(s.charAt(len - 1) === base64.map[64]){
            pads++;
            if(s.charAt(len - 2) === base64.map[64]){
                pads++;
            }
            len -= 4;
        }

        var i, b, map = base64.map, x = [];
        for(i = 0; i < len; i += 4){
            b = (map.indexOf(s.charAt(i)) << 18) | (map.indexOf(s.charAt(i + 1)) << 12) | (map.indexOf(s.charAt(i + 2)) << 6) | map.indexOf(s.charAt(i + 3));
            x.push(String.fromCharCode(b >> 16, (b >> 8) & 0xff, b & 0xff));
        }

        switch(pads){
            case 1:
                b = (map.indexOf(s.charAt(i)) << 18) | (map.indexOf(s.charAt(i)) << 12) | (map.indexOf(s.charAt(i)) << 6);
                x.push(String.fromCharCode(b >> 16, (b >> 8) & 0xff));
                break;
            case 2:
                b = (map.indexOf(s.charAt(i)) << 18) | (map.indexOf(s.charAt(i)) << 12);
                x.push(String.fromCharCode(b >> 16));
                break;
        }
        return unescape(x.join(''));
    };

    base64.encode = function(s){
        if(!s){
            return;
        }

        s += '';
        if(s.length === 0){
            return s;
        }
        s = escape(s);

        var i, b, x = [], map = base64.map, padchar = map[64];
        var len = s.length - s.length % 3;

        for(i = 0; i < len; i += 3){
            b = (s.charCodeAt(i) << 16) | (s.charCodeAt(i+1) << 8) | s.charCodeAt(i+2);
            x.push(map.charAt(b >> 18));
            x.push(map.charAt((b >> 12) & 0x3f));
            x.push(map.charAt((b >> 6) & 0x3f));
            x.push(map.charAt(b & 0x3f));
        }

        switch(s.length - len){
            case 1:
                b = s.charCodeAt(i) << 16;
                x.push(map.charAt(b >> 18) + map.charAt((b >> 12) & 0x3f) + padchar + padchar);
                break;
            case 2:
                b = (s.charCodeAt(i) << 16) | (s.charCodeAt(i + 1) << 8);
                x.push(map.charAt(b >> 18) + map.charAt((b >> 12) & 0x3f) + map.charAt((b >> 6) & 0x3f) + padchar);
                break;
        }
        return x.join('');
    };

    return base64;
})();


commons.PraMethod.Base64 = function () {

    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    var _utf8_encode = function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    var _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}


commons.TempMethod.imgLayout = function(ele) {
    var imgs = document.querySelectorAll(ele);
    [].forEach.call(imgs, function(img, index, array) {

        if (img.complete) {
            console.log('complete');
            ol(img);
        } else {
            img.onload = function() {
                console.log('load');
                ol(img);
            }
        }

    });

    function ol(img) {
        img.removeAttribute('width');
        img.removeAttribute('height');
        var nh = img.naturalHeight,
            nw = img.naturalWidth;
        if (nh > nw) {
            $(img).attr('width','100%')
        } else {
            $(img).attr('height','100%');
        }
    }
};