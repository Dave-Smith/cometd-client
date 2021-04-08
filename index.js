// Run the adapter code that implements XMLHttpRequest.
require('cometd-nodejs-client').adapt();

// Your normal CometD client application here.
var lib = require('cometd');
var cometd = new lib.CometD();

cometd.configure({
    url: 'http://localhost:55555'
});

cometd.handshake(function(h) {
    if (h.successful) {
        console.log('handshake successful');
        
        cometd.subscribe('/channel1', function(m) {
            console.log('receiving a new message', m);
        });
        setInterval(function() {
            cometd.publish('/channel1', {message: 'hi channel 1', when: Date.now()}, function() {
                console.log('new message published');
            });
        }, 1500);
    }
});
