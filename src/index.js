/**
 * @description Simple library to trigger custom events
 * @example
 * import EventBus from '@docomodigital/js-eventbus';
 *
 * const Bus = new EventBus();
 * const callback = (args) => {
 *   // Do something...
 * };
 *
 * Bus.on('customEvent', callback);
 * Bus.trigger('customEvent', {foo: 'bar'}); // callback is called
 */
class EventBus {
    constructor() {
        this.events = {};
    }

    /**
     * @description Register a new callback for the specified custom event
     * @param {String} eventType - if not exists it defines a new one
     * @param {Function} func - the function to call when the event is triggered
     * @param {Object} [context=null] - the 'this' applied to the function. default null,
     * this will not work with arrow functions.
     * @return {void}
     * @example
     * const Bus = new EventBus();
     * Bus.on('customEvent', (args) => {
     *     // Do something...
     * });
     *
     * const ctx = {foo: 'bar'}
     * Bus.on('customEvent', (args) => {
     *     console.log(this.foo) // Uncaught TypeError: Cannot read property 'foo' of undefined
     * }, ctx);
     * Bus.on('customEvent', function(args) {
     *     console.log(this.foo) // 'bar'
     * }, ctx);
     */
    on(eventType, func, context = null) {
        if (!this.events[eventType]) {
            this.events[eventType] = [];
        }
        this.events[eventType].push({ func, context });
    }

    /**
     * @description Trigger the specified event, pass the other arguments to the callbacks
     * @param {String} eventType - the eventType to trigger. if not exists nothing happens
     * @param {*} args - Arguments to pass to the eventType callbacks
     * @return {void}
     * @example
     * const Bus = new EventBus();
     * const cb = (args) => {}
     * Bus.on('customEvent', cb);
     * Bus.trigger('customEvent'); //cb is called
     */
    trigger(eventType, ...args) {
        const { [eventType]: event } = this.events;
        if (!event || event.length === 0) {
            return;
        }
        event.map((obj) => {
            obj.func.apply(obj.context, args);
            return obj;
        });
    }

    /**
     * @description Remove the specified callback from the specified event
     * @param {String} eventType - the eventType
     * @param {Function} func - the reference of the function to remove from the list of function
     * @return {void}
     * @example
     *const cb = (args) => {};
     * Bus.on('evt', cb);
     * Bus.off('evt', cb);
     * Bus.trigger('evt') // cb is not called
     */
    off(eventType, func) {
        const { [eventType]: event } = this.events;
        if (!event) {
            return;
        }

        this.events[eventType] = event.reduceRight((prev, current) => {
            if (current.func !== func) {
                prev.push(current);
            }
            return prev;
        }, []);
    }

    /**
     * @description Remove all the callbacks from the specified event
     * if the event not exists nothing happens
     * @param {String} eventType - the event type to clear
     * @return {void}
     * @example
     * Bus.clear('evt');
     */
    clear(eventType) {
        if (!this.events[eventType]) {
            return;
        }
        this.events[eventType] = [];
    }

    /**
     * @description Remove all the callbacks from all the events
     * @return {void}
     * @example
     * Bus.clearAll();
     */
    clearAll() {
        this.events = {};
    }
}

export default EventBus;
