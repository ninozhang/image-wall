var touch = new Touch(),
    events;
function onDragging(event) {
    var $target = $(event.target),
        transform = getTransform($target),
        regExp = /(.*)(px)(,)(.*)(px)/ig,
        result = regExp.exec(transform.translate),
        top = result && result[4] ? Number(result[4]) : 0,
        left = result && result[1] ? Number(result[1]) : 0;
    transform.translate = (left + event.deltaX) + 'px,' + (top + event.deltaY) + 'px';
    setTransform($target, transform);
}

function onDrag(event) {
    var $target = $(event.target),
        offset = $target.offset();
}

function onHold(event) {
    var $target = $(event.target);
    $target.addClass('holding');
}

function onPinching(event) {
    var $target = $(event.target),
        transform = getTransform($target),
        scale = event.scale,
        originScale = $target.data('scale') || 1;
    transform.scale = originScale * scale;
    setTransform($target, transform);
}

function onPinch(event) {
    var $target = $(event.target),
        transform = getTransform($target),
        scale = transform.scale;
    $target.data('scale', scale);
}

function onRotating(event) {
    var $target = $(event.target),
        transform = getTransform($target),
        delta = event.delta,
        angle = extractDegree(transform.rotate);
    transform.rotate = (angle + delta) + 'deg';
    setTransform($target, transform);
}

function onRotate(event) {
    var $target = $(event.target),
        transform = getTransform($target),
        rotate = transform.rotate;
    $target.data('rotate', rotate);
}

function extractDegree(rotate) {
    if (rotate.indexOf('deg')) {
        return Number(rotate.replace('deg', ''));
    }
    return 0;
}

function getTransform(target) {
    var $target = $(target),
        transformString = $target.css('-webkit-transform'),
        transformArray = transformString.split(')'),
        transform = {
            translate: '0,0',
            scale: 1,
            rotate: 0
        },
        result, prop, value;
    if (transformString === 'none') {
        return transform;
    }
    for (var i = 0; i < transformArray.length; i++) {
        result = transformArray[i].split('(');
        prop = result[0].trim();
        value = result[1];
        if (prop) {
            transform[prop] = value;
        }
    }console.log('get:' + JSON.stringify(transform));
    return transform;
}

function setTransform(target, transform) {
    var $target = $(target),
        transformString = '';
    for (var name in transform) {
        transformString += name + '(' + transform[name] + ')';
    }console.log('set:' + transformString);
    $target.css('-webkit-transform', transformString);
    return transformString;
}

events = {
    'dragging .image': onDragging,
    'drag .image': onDrag,
    'hold .image': onHold,
    'pinching .image': onPinching,
    'pinch .image': onPinch,
    'rotating .image': onRotating,
    'rotate .image': onRotate
};
touch.on(events);