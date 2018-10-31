

// For compatibility with IE9+ use this event creating method
window.qEvent = function(event, data) {
    var evt;
    var params = {
            bubbles: false,
            cancelable: false,
            detail: data || {}
        };
    evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
};
window.qEvent.prototype =  Object.create(window.Event.prototype);
