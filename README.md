## js-eventbus

Simple library to trigger custom events

### Example
```javascript
import EventBus from '@docomodigital/js-eventbus';

const Bus = new EventBus();

const callback = (args) => {
    // Do something...
};

Bus.on('customEvent', callback);

Bus.trigger('customEvent', {foo: 'bar'}); // callback is called
```

### Api

#### on(eventType: string, func: function, context = null)
Register a callback **func** to the custom event **eventType**
optionally pass a custom **context** (the **this** inside the callback), **BEWARE**, this will not work with arrow functions.
```javascript
Bus.on('customEvent', (args) => {
    console.log(args);
});

const ctx = {foo: 'bar'}

Bus.on('customEvent', (args) => {
    console.log(this.foo) // Uncaught TypeError: Cannot read property 'foo' of undefined
}, ctx);

Bus.on('customEvent', function(args) {
    console.log(this.foo) // 'bar'
}, ctx);
```

### trigger(eventType: string, ...args)
Trigger the given event **eventType**, call all the registered callbacks (if any) and pass the **args** to them
```javascript
Bus.trigger('customEvents', {bar: 'baz'});
```

### off(eventType: string, func: function)
Remove the specified callback **func** from the specified event **eventType**
```javascript
const cb = (args) => {};
Bus.on('evt', cb);
Bus.off('evt', cb);
Bus.trigger('evt') // cb is not called
```

### clear(eventType: string)
Remove all the callbacks from the specified event **eventType**
```javascript
Bus.clear('evt');
```

### clearAll()
Remove all the callbacks from all the events
```javascript
Bus.clearAll();
```