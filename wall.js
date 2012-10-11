var touch = new Touch(),
    events;
function onDragging(event) {
    var $target = $(event.target),
        offset = $target.offset();console.log(offset);
    $target.css({
        top: offset.top + event.deltaY,
        left: offset.left + event.deltaX
    });
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
        height = $target.height(),
        width = $target.width();
        direction = event.direction,
        distance = event.distance,
        delta = event.delta,
        scale = event.scale;
    $target.width(width * (1 + delta)).height(height * (1 + delta));
}

events = {
    'dragging .image': onDragging,
    'hold .image': onHold,
    'pinching .image': onPinching
};
touch.on(events);