var touch = new Touch(),
    events;
function onDragging(event) {
    var $target = $(event.target),
        offset = $target.offset();
    if (offset) {
        $target.css({
            top: offset.top + event.deltaY,
            left: offset.left + event.deltaX
        });
        // $target.css('-webkit-transform', 'translate(' + event.deltaX + 'px, ' + event.deltaY+ 'px)');
    }
}

function onHold(event) {
    var $target = $(event.target),
        current = event.current,
        x = current[0].x,
        y = current[0].y;
    $target.addClass('holding');
}

function onPinching(event) {
    var $target = $(event.target),
        scale = event.scale,
        offset = $target.offset(),
        originWidth = $target.data('width'),
        originHeight = $target.data('height'),
        currentWidth = $target.width(),
        currentHeight = $target.height(),
        width, height,
        deltaX, deltaY;
    if (!originWidth || !originHeight) {
        originWidth = currentWidth;
        originHeight = currentHeight;
        $target.data('width', originWidth).data('height', originHeight);
    }
    width = originWidth * scale;
    height = originHeight * scale;
    deltaX = (currentWidth - width) / 2;
    deltaY = (currentHeight - height) / 2;
    $target.width(width).height(height).css({
        top: offset.top + deltaY,
        left: offset.left + deltaX
    });
    // var $target = $(event.target),
        // scale = event.scale;
    // $target.css('-webkit-transform', 'scale(' + scale + ', ' + scale + ')');
}

function onPinch(event) {
    var $target = $(event.target),
        width = $target.width(),
        height = $target.height();
    $target.data('width', width).data('height', height);
}

function onRotating(event) {
    var $target = $(event.target),
        tramsform = $target.css('-webkit-transform'),
        originAngle = $target.data('angle'),
        initAngle = event.initAngle,
        angle = event.angle,
        css;
    if (isNaN(originAngle)) {
        if (tramsform === 'none') {
            originAngle = 0;
        } else {
            originAngle = tramsform.replace('rotate(', '').replace('deg)', '');
        }
        $target.data('angle', originAngle);
    }
    originAngle = Number(originAngle);
    css = {
        '-webkit-transform': 'rotate(' + (originAngle + angle - initAngle) + 'deg)'
    };
    console.log(initAngle + ',' + angle);
    console.log(originAngle);
    console.log('tramsform:' + tramsform);
    $target.css(css);
}

function onRotate(event) {

}

events = {
    'dragging .image': onDragging,
    'hold .image': onHold,
    'pinching .image': onPinching,
    'pinch .image': onPinch,
    // 'rotating .image': onRotating,
    // 'rotate .image': onRotate
};
touch.on(events);