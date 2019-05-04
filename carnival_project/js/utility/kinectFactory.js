"use strict";

let kinectFactory = (function() {
    let kinectPrototype = {
        establishConnection: function() {
            this.instance.makeConnection();
        },
        startTrackedBodies: function(players) {

            console.log(this.instance);

            //Start tracking the player.
            this.instance.startTrackedBodies(function(skeleton) {
                if(ENGINE.isLoaded()) {
                    //console.log(`Body: ${skeleton.bodyIndex}, \t Tracking ID: ${skeleton.trackingId}`);
                    
                    players.forEach(player => {
                        if(player.ID == skeleton.bodyIndex) {                        
                            player.update(skeleton);
                        }
                    });
                }
            });
        }
    };

    return function(IP) {
        let kinect = Object.create(kinectPrototype, {
            IP : {writeable: false, value: IP},
            instance : {writeable: false, value: new Kinectron(IP)},
            playersTracked : {writeable: 0, value: []}
        });
        kinect.establishConnection();
        return kinect;
    }
})();