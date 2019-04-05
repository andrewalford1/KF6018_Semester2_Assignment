"use strict";

let kinectFactory = (function() {
    let kinectPrototype = {
        establishConnection: function() {
            this.instance.makeConnection();
        },
        startTrackedBodies: function(player) {
            //Start tracking the player.
            console.log(this.instance);
            this.instance.startTrackedBodies(function(skeleton) {
                player.update(skeleton);
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