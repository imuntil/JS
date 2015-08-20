/**
 * Created by jtun02 on 15/6/11.
 */

IMGS = {};

/**
 * Img Function
 * @param {HTMLElement} img
 * @param {object} options
 * @return {object} Img
 */
function Img(img, options) {
    return (this instanceof Img)
        ? this.init(img, options)
        : new Img(img, options);
}
Img.prototype.init = function(img, options) {
    var self = this;
    self.img = img;
    self.scale = options.scale || 1;
    self.tx = options.tx || 0;
    self.ty = options.ty || 0;
    self.angle = options.angle || 0;
    self.transform = {
        x:0, y:0, s:1, a:0
    };
};


function handleFiles(e, ele) {
    var files = e || window.event,
        img = document.querySelector('.' + ele),
        d = utils.getDevice();

    var file = files.files[0],
        mpimg = new MegaPixImage(file);

    var tcanvas = document.createElement('canvas');
    tcanvas.width = 500;
    tcanvas.height = 500;
    mpimg.render(tcanvas, {maxWidth:500, maxHeight:500});

    setTimeout(function() {
        img.removeAttribute('width');
        img.src = tcanvas.toDataURL();
        img.onload = function() {
            layoutImg();
        }
    }, 1000);

    function layoutImg() {
        var parent = $(img).parent();
        var cw = parent.width(),
            nw = img.naturalWidth,
            ch = parent.height(),
            nh = img.naturalHeight;
        var ratio = cw / nw,
            tx = -(nw - cw) / 2 | 0,
            ty = -(nh - ch) / 2 | 0;

        var _img = new Img(img, {scale:ratio, tx:tx, ty:ty});
        var value = [
            'translate3d(' + tx + 'px, ' + ty + 'px, 0)',
            'scale(' + ratio + ', ' + ratio + ')'
        ];
        value = value.join(" ");
        img.style.webkitTransform = value;
        img.style.mozTransform = value;
        img.style.transform = value;


        IMGS[ele] = _img;
        var event = document.createEvent('Event');
        event.initEvent('typep', true, true);
        document.querySelector('body').dispatchEvent(event);

//        setPE(ele);
    }
}



