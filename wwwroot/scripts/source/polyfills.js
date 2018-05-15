try {
    new CustomEvent("IE CustomEvent");
} catch(err) {
    window.CustomEvent = function(event, params) {
        let eventObject;
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        eventObject = document.createEvent("CustomEvent");
        eventObject.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return eventObject;
    };
    CustomEvent.prototype = Object.create(window.Event.prototype);
}