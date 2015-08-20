/**
 * Created by jtun02 on 15/8/6.
 */
;(function(window, document, undefined) {

    if (Q.view) return;

    var body = document.querySelector('.hammer-area');
    var mc = new Hammer.Manager(body);
    var oldTarget = undefined;

    var pe = undefined, pk = undefined;

    mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
    mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
    mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan'), mc.get('rotate')]);
    mc.add(new Hammer.Tap());
    mc.add(new Hammer.Press({time:800}));

    mc.on("panstart panmove", onPan);
    mc.on("rotatestart rotatemove", onRotate);
    mc.on("pinchstart pinchmove", onPinch);
    mc.on("tap", onTap);
    mc.on("press", onPress);


    function onPan(e) {

        if (!pe) return;
        if (e.type == 'panstart') {
            pe.transform.x = pe.tx || 0;
            pe.transform.y = pe.ty || 0;
        }

        var _x = pe.transform.x + e.deltaX;
        var _y = pe.transform.y + e.deltaY;

        pe.tx = _x;
        pe.ty = _y;

        updateElementTransform();
    }
    function onRotate(e) {
        if (!pe) return;
        if (pk != 'w-photo') return;
        if (e.type == 'rotatestart') {
            pe.transform.a = pe.angle || 0;
        }

        var _a = pe.transform.a + e.rotation;
        pe.angle = _a;

        updateElementTransform();
    }
    function onPinch(e) {
        if (!pe) return;
        if (e.type == 'pinchstart') {
            pe.transform.s = pe.scale || 1;
        }

        var _s = pe.transform.s * e.scale;
        pe.scale = _s;

        updateElementTransform();
    }

    function onTap(e) {
        $('#f-btn').trigger('click');
    }

    function onPress(e) {
        if (!pe) return;
        pe.img.style.display = 'none';
        pe.tx = pe.ty = pe.angle = 0;
        pe.scale = 1;
        updateElementTransform();
        delete IMGS[pk];
        console.log(IMGS);
    }

    function setPE(target) {
        pk = target;
        pe = IMGS[target];
        console.log(IMGS);
    }

    function updateElementTransform() {
        if (!pe) return;
        var value = [
            'translate3d(' + pe.tx + 'px, ' + pe.ty + 'px, 0)',
            'scale(' + pe.scale + ', ' + pe.scale + ')',
            'rotate3d(0, 0, 1, '+  pe.angle + 'deg)'
        ];

        value = value.join(" ");
        pe.img.style.webkitTransform = value;
        pe.img.style.mozTransform = value;
        pe.img.style.transform = value;
    }

    window.setPE = setPE;
    window.uET = updateElementTransform;
    window.deleteDeco = onPress;

})(window, window.document, undefined);