# js-eventbus

Simple library to trigger custom events

## Usage
```javascript
import EventBus from '@docomodigital/js-eventbus';

const Bus = new EventBus();

const callback = (args) => {
    // Do something...
};

Bus.on('customEvent', callback);

Bus.trigger('customEvent', {foo: 'bar'}); // callback is called
```

## Installation

### NPM
```bash
npm install --save js-eventbus
```

## Documentation

To read documentation, go to:

[http://docomodigital.github.io/js-eventbus/latest](http://docomodigital.github.io/js-eventbus/latest)

or run the following command inside the js-eventbus folder: 
```bash
npm run doc:open
```