import EventBus from '../src/index.js';

const Bus = new EventBus();

Bus.on('test', (args) => {
    console.log(args);
});

const toOff = (args) => {
    console.log('other');
};

Bus.on('test', toOff);

document.getElementById('trigger').addEventListener('click', (e) => {
    e.preventDefault();
    Bus.trigger('test', {test: 'ss', foo: 'bar'});
});

document.getElementById('off').addEventListener('click', (e) => {
    e.preventDefault();
    Bus.off('test', toOff);
});

document.getElementById('clear').addEventListener('click', (e) => {
    e.preventDefault();
    Bus.clear('test');
});

const ctx = {
    foo: 'bar'
};

Bus.on('context', function(args) {
    console.log(this.foo);
}, ctx);

document.getElementById('context').addEventListener('click', (e) => {
    e.preventDefault();
    Bus.trigger('context');
});