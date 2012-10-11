var touch = new Touch(),
    events;
function onDragging(event) {
    var $target = $(event.target),
        current = event.current,
        x = current[0].x,
        y = current[0].y,
        css = {
            top: y,
            left: x
        };
    $target.css(css);
}

function onHold(event) {
    var $target = $(event.target),
        current = event.current,
        x = current[0].x,
        y = current[0].y;
    $target.addClass('holding');
}

events = {
    'dragging .image': onDragging,
    'hold .image': onHold
};
touch.on(events);