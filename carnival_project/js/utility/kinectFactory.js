"use strict";

let kinectFactory = (function() {
    let kinectPrototype = {
        establishConnection: function() {
            this.instance.makeConnection();
        },
        startBodies: function(players) {

            let trackingIDs = [];
            console.log(this.instance);

            this.instance.startTrackedBodies(function(skeleton) {
                if(ENGINE.isLoaded()) {

                    let bodyPos = new THREE.Vector3(
                        skeleton.joints[0].cameraX, 
                        skeleton.joints[0].cameraY,
                        skeleton.joints[0].cameraZ,
                    );

                    console.log(bodyPos.distanceTo(new THREE.Vector3(0, 0, 0)));

                    if(bodyPos.distanceTo(new THREE.Vector3(0, 0, 0)) < 2) {
                        console.log('should be updating player');

                        players.forEach(player => {
                            if(player.id == skeleton.bodyIndex) {
                                player.update(skeleton);
                            }
                        });
                    }
                }
            });
        },
        startTrackedBodies: function(players) {

            this.instance.startBodies(function(trackingData) {
                if(ENGINE.isLoaded()) {

                    // console.log('regular bodies');

                    // for(let i = 0; i < 6; i++) {
                    //     if(!trackingData.bodies[i].tracked) {
                    //         players[i].hide(true);
                    //     }
                    // }
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