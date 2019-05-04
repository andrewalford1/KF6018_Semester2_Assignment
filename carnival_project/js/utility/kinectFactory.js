"use strict";

let kinectFactory = (function() {
    let kinectPrototype = {
        establishConnection: function() {
            this.instance.makeConnection();
        },
        startTrackedBodies: function(players) {

            console.log(this.instance);

            this.instance.startBodies(function(trackingData) {
                
                if(ENGINE.isLoaded()) {
                    console.log(trackingData);
                    
                    // console.log(`Body: ${skeleton.bodyIndex}, \t Tracking ID: ${skeleton.trackingId}`);

                    trackingData.bodies.forEach(skeleton => {
                        players.forEach(player => {
                            if(player.ID == skeleton.bodyIndex) {                        
                                player.update(skeleton);
                            }
                        });
                    })
                }
            });
        }
    };

    return function(IP) {
        let kinect = Object.create(kinectPrototype, {
            IP : {writeable: false, value: IP},
            instance : {writeable: false, value: new Kinectron(IP)}
        });
        kinect.establishConnection();
        return kinect;
    }
})();