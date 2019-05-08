"use strict";

let kinectFactory = (function() {
    let kinectPrototype = {
        establishConnection: function() {
            this.instance.makeConnection();
        },
        startTrackedBodies: function(player) {
            this.instance.startTrackedBodies(function(skeleton) {
                if(ENGINE.isLoaded) {
                    let bodyPos = new THREE.Vector3(
                        skeleton.joints[0].cameraX,
                        skeleton.joints[0].cameraY,
                        skeleton.joints[0].cameraZ                    
                    );
    
                    let inRange = bodyPos.distanceTo(new THREE.Vector3(0, 0, 0)) < 2.5;                 
    
                    if(skeleton.tracked && inRange) {
                        player.update(skeleton);
                    }
                }
            });
        },
        startBodies: function(player) {
            this.instance.startBodies(function(bodies) {

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