const EventEmitter = require('events');
//const emitter = new EventEmitter();

// exercise 1
// register a listener
/*emitter.addListener('messageLogged',(args) => {
    console.log('Listener called ', args )
});*/

// raise an event
//emitter.emit('messageLogged', {id: 1, url: 'http://'});

class LogEvent extends EventEmitter {
    log (message) {
        //send an HTTP request
        console.log(message);

        // raise an event// raise an event
        this.emit('logging', {sureName: 'reza', title: 'Master' });
    }
}

// export log
module.exports = LogEvent;