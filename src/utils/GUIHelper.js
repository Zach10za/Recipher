const $ = require("jquery");

let isResizing = false;

$(function () {
    const container = $('.App');
    let gui = $('.gui-editor');
    let gui_cover = $('.gui-editor .disabled-overlay');
    let handle = $('.handle');

    handle.on('mousedown', function (e) {
        isResizing = true;
    });

    $(document).on('mousemove', function (e) {
        // we don't want to do anything if we aren't resizing.
        if (!isResizing) 
            return;
        let container_width = container.width();
        let width = container_width - (e.clientX - container.offset().left)
        if (width > container_width * 0.7) {
            width = container_width * 0.7;
        } else if (width < container_width * 0.35) {
            width = container_width * 0.35;
        }
        gui.css('width', width);
        gui_cover.css('width', width - 10);
        handle.css('left', container_width - width);
    }).on('mouseup', function (e) {
        // stop resizing
        isResizing = false;
    });
});