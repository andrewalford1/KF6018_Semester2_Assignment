"use strict"

/**
 * Used to manage the programs connection to the connect.
 * @param {string} IP - The IP address of the kinect server.
 */
let kinectFactory = (function(){
    let kinectPrototype = {
        establishConnection: function() {
            this.instance.makeConnection();
        },
        startTrackedBodies: function(player, camera, firstPersonView) {
            //Set up the first person view.
            if(firstPersonView && camera)
            {
                camera.position.set(0, 0, 0);
                player.attachCamera(this.instance.HEAD, camera);
            }

            //Attach colliders to the player's hands.
            player.attachCollider(this.instance.HANDLEFT);
            player.attachCollider(this.instance.HANDRIGHT);

            let userGestures = new UserGestures(player);

            console.log(userGestures);

            console.log(this.instance);
            //Start tracking the player.
            this.instance.startTrackedBodies(function(skeleton) {
                if(ENGINE.isLoaded()) {

                    player.updateHand(skeleton.leftHandState, true);
                    player.updateHand(skeleton.rightHandState, false);

                    for(let i = 0; i < skeleton.joints.length; i++) {
                        let position = new THREE.Vector3(
                            skeleton.joints[i].cameraX,
                            skeleton.joints[i].cameraY,
                            skeleton.joints[i].cameraZ
                        );
                            
                        let orientation = new THREE.Quaternion(
                            skeleton.joints[i].orientationX,
                            skeleton.joints[i].orientationX,
                            skeleton.joints[i].orientationZ,
                            skeleton.joints[i].orientationW 
                        );

                        player.updateJoint(position, orientation, i);
                        /**Adds the functions from the UserGestures class
                         * To make the gesctures work, first you have to create them 
                         * in UserGestures class then call them in here
                        */
                        userGestures.handAboveSholder();
                        userGestures.kameHameHa();
                    }
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