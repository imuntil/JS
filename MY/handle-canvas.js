/**
 * Created by jtun02 on 15/8/7.
 */

;(function(window, document, undefined) {

    var synthetic = {};
    synthetic.init = function(w, h) {
        this.photoCanvas = document.createElement('canvas');
        this.photoCanvas.width = w;
        this.photoCanvas.height = h;
        this.photoContext = this.photoCanvas.getContext('2d');
    };
    synthetic.drawPhoto = function(_callback) {
        var self = this;
        self.photoContext.clearRect(0, 0, self.photoCanvas.width, self.photoCanvas.height);
        var tc = document.createElement('canvas');
        var photo = IMGS['w-photo'];
        if (!photo) return;
        tc.width = photo.img.naturalWidth;
        tc.height = photo.img.naturalHeight;
        var tt = tc.getContext('2d');

        tt.save();
        tt.translate(tc.width/2 + photo.tx, tc.height/2 + photo.ty);
        tt.scale(photo.scale, photo.scale);
        tt.rotate(photo.angle * Math.PI / 180);
        tt.drawImage(photo.img, 0, 0, photo.img.naturalWidth, photo.img.naturalHeight,
            -tc.width/2, -tc.height/2, tc.width, tc.height);
        tt.restore();

        self.photoContext.drawImage(tc, 0, 0);

        drawDeco('w-deco-a');
        drawDeco('w-deco-b');
        drawDeco('w-deco-c');
        drawDeco('w-deco-d');

//        $('.ttt').attr('src', self.photoCanvas.toDataURL());
        ac.uploadPhoto(self.photoCanvas.toDataURL().replace('data:image/png;base64,',''), _callback);
    };

    function drawDeco(deco) {
        var _d = IMGS[deco];
        if (!_d) return;

        var _s = _d.scale,
            _tx = _d.tx,
            _ty = _d.ty,
            _im = _d.img;

        synthetic.photoContext.save();
        synthetic.photoContext.translate(80 + _im.width/2 + _tx, 100 + _im.height/2 + _ty);
        synthetic.photoContext.scale(_s, _s);
        synthetic.photoContext.drawImage(_im, 0, 0, _im.width, _im.height,
        -_im.width/2, -_im.height/2, _im.width, _im.height);
        synthetic.photoContext.restore();
    }

    window.ST = synthetic;
})(window, window.document, undefined);