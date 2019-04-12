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

                if(player.geustures) {
                    player.geustures.update();
                }

                if(player.handsTogether()) {
                    console.log('hands together');
                };

                if(player.leftHandAboveHead()) {
                    console.log('left hand Above head');
                }

                if(player.rightHandAboveHead()) {
                    console.log('right hand above head');
                }

                if(player.leftHandTouchingHead()) {
                    console.log('left hand touching head');
                }

                if(player.rightHandTouchingHead()) {
                    console.log('right hand touching head');
                }

                if(player.armsSpread()) {
                    console.log('T-Pose');
                }

                if(player.leftHandAboveShoulder()) {
                    console.log('Left hand above shoulder');
                }

                if(player.rightHandAboveShoulder()) {
                    console.log('Right hand above shoulder');
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