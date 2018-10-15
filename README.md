# js-eventbus

[![Build Status](https://travis-ci.com/docomodigital/js-eventbus.svg?branch=master)](https://travis-ci.com/docomodigital/js-eventbus)
[![Coverage Status](https://coveralls.io/repos/github/docomodigital/js-eventbus/badge.svg?branch=master)](https://coveralls.io/github/docomodigital/js-eventbus?branch=master)
[![npm version](https://badge.fury.io/js/%40docomodigital%2Fjs-eventbus.svg)](https://badge.fury.io/js/%40docomodigital%2Fjs-eventbus)
[![Greenkeeper badge](https://badges.greenkeeper.io/docomodigital/js-eventbus.svg)](https://greenkeeper.io/)

Simple library to trigger custom events

## Usage
```javascript
import EventBus from '@docomodigital/js-eventbus';

const Bus = new EventBus();

const callback = (options) => {
    console.log(options.foo);
};

Bus.on('customEvent', callback);

Bus.trigger('customEvent', { foo: 'bar' }); // console.log('bar')
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