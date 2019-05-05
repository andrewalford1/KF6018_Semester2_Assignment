"use strict";

let experimentalPlayerFactory = (function() {
    let experimentalPlayerPrototype = {
        init : function(engine, JSON) {
            
            ENGINE.DEBUGGER.extractJSON(JSON).
            player.forEach(model => {
                this.model = new ENGINE.OBJECTS.Model(model)
                this.model.addToScene(engine.scene);
            });
        },
        addCollider : function(bone, visible, scene) {
            bone.collider = {
                mesh : new THREE.Mesh(
                    new THREE.BoxGeometry( 2, 2, 2 ), 
                    new THREE.MeshBasicMaterial({color: 0x00ff00})
                )
            };

            
            console.log(bone.collider);
            
            bone.collider.mesh.position.copy(bone.mesh.position);
            
            bone.collider.box = collisionFactory(
                bone.collider.mesh,
                null,
                visible,
                0x00FFFF
            );
            bone.collider.box.update();
            scene.add(bone.collider.mesh);
        },
        update : function(scene) {
            if(ENGINE.isLoaded()) {
                //On Load...
                if(!this.loaded) { 
                    getBones(this);
                    console.log(this.bones.HAND_LEFT);
                    this.addCollider(this.bones.HAND_LEFT, true, scene);
                    this.addCollider(this.bones.HAND_RIGHT, true, scene);
                    this.addCollider(this.bones.FOOT_LEFT, true, scene);
                    this.addCollider(this.bones.FOOT_RIGHT, true, scene);
                    this.loaded = true;
                }
                else { //After load.
                    Object.values(this.bones).forEach(bone => {
                        if(!(bone.collider === undefined)) {
                            bone.collider.box.update();
                        }
                    });

                    this.bones.HAND_LEFT.mesh.position.x += 0.01;
                    this.bones.HAND_LEFT.collider.mesh.position.copy(this.bones.HAND_LEFT.mesh.position);
                }
            }
        },
        kinectUpdate: function(skeleton) {
            if(ENGINE.isLoaded()) {
                for(let i = 0; i < 20; i++) {
                    console.log('updating');
                    updatePositionAndRotation(skeleton.joints[i], this.bones[i]);
                }
            }
        }
    };

    function updatePositionAndRotation(skeletonJoint, playerJoint) {
        let position = new THREE.Vector3(
            skeletonJoint.cameraX,
            skeletonJoint.cameraY,
            skeletonJoint.cameraZ
        );
        let orientation = new THREE.Quaternion(
            skeleton.orientationX,
            skeleton.orientationY,
            skeleton.orientationZ,
            skeleton.orientationW
        );

        let averageFilter = new THREE.Vector3(0, 0, 0);

        playerJoint.previousPosistions.unshift(position);
        if(playerJoint.previousPosistions.length + 1 == 5) {
            playerJoint.previousPosistions.pop();
        }
        playerJoint.previousPosistions.forEach(pos => {
            averageFilter.add(pos);
        })
        averageFilter.divideScalar(5);

        playerJoint.mesh.position.copy(averageFilter);
        playerJoint.mesh.rotation.setFromQuaternion(orientation);
    }

    function getBones(player) {
        let spine_base = player.model.getInstance()
            .children[0].children[0].children[0].children[0];
        let spine_mid = spine_base.children[0];
        let spine_shoulder = spine_mid.children[0].children[0];
        let neck = spine_shoulder.children[0];
        let head = neck.children[0];

        let shoulder_left = spine_shoulder.children[1];
        let elbow_left = shoulder_left.children[0];
        let wrist_left = elbow_left.children[0];
        let hand_left = wrist_left.children[0];
        
        let shoulder_right = spine_shoulder.children[2];
        let elbow_right = shoulder_right.children[0];
        let wrist_right = elbow_right.children[0];
        let hand_right = wrist_right.children[0];

        let hip_left = spine_base.children[2];
        let knee_left = hip_left.children[0];
        let ankle_left = knee_left.children[0];
        let foot_left = ankle_left.children[0];

        let hip_right = spine_base.children[1];
        let knee_right = hip_right.children[0];
        let ankle_right = knee_right.children[0];
        let foot_right = ankle_right.children[0];

        player.bones = {
            SPINE_BASE: {
                index: 0,
                mesh: spine_base,
                previousPosistions: []
            },
            SPINE_MID: {
                index: 1,
                mesh: spine_mid,
                previousPosistions: []
            },
            NECK: {
                index: 2,
                mesh : neck,
                previousPosistions: []
            },
            HEAD: {
                index: 3, 
                mesh: head,
                previousPosistions: []
            },
            SHOULDER_LEFT: {
                index: 4, 
                mesh: shoulder_left,
                previousPosistions: []
            },
            ELBOW_LEFT: {
                index: 5,
                mesh: elbow_left,
                previousPosistions: []
            },
            WRIST_LEFT: {
                index: 6,
                mesh: wrist_left,
                previousPosistions: []
            },
            HAND_LEFT: {
                index: 7,
                mesh: hand_left,
                previousPosistions: [],
                state: {open: false, lasso: false}
            },
            SHOULDER_RIGHT: {
                index: 8, 
                mesh: shoulder_right,
                previousPosistions: []
            },
            ELBOW_RIGHT: {
                index: 9,
                mesh: elbow_right,
                previousPosistions: []
            },
            WRIST_RIGHT: {
                index: 10,
                mesh: wrist_right,
                previousPosistions: []
            },
            HAND_RIGHT: {
                index: 11,
                mesh: hand_right,
                previousPosistions: [],
                state: {open: false, lasso: false}
            },
            HIP_LEFT: {
                index: 12, 
                mesh: hip_left,
                previousPosistions: []
            },
            KNEE_LEFT: {
                index: 13,
                mesh: knee_left,
                previousPosistions: []
            },
            ANKLE_LEFT: {
                index: 14, 
                mesh: ankle_left,
                previousPosistions: []
            },
            FOOT_LEFT: {
                index: 15,
                mesh: foot_left,
                previousPosistions: [],
                state: {open: false, lasso: false}
            },
            HIP_RIGHT: {
                index: 16, 
                mesh: hip_right,
                previousPosistions: []
            },
            KNEE_RIGHT: {
                index: 17,
                mesh: knee_right,
                previousPosistions: []
            },
            ANKLE_RIGHT: {
                index: 18, 
                mesh: ankle_right,
                previousPosistions: []
            },
            FOOT_RIGHT: {
                index: 19,
                mesh: foot_right,
                previousPosistions: [],
                state: {open: false, lasso: false}
            },
            SPINE_SHOULDER: {
                index: 20,
                mesh: spine_shoulder,
                previousPosistions: []
            }
        }

        // let leftHandCollision = collisionFactory(
        //     player.bones.HAND_LEFT.mesh,
        //     null,
        //     true,
        //     0x00FFFF
        // );
        // player.bones.HAND_LEFT.collider = leftHandCollision;

        // player.addCollider(player.bones.HAND_LEFT);
        // player.addCollider(player.bones.HAND_RIGHT);
        // player.addCollider(player.bones.FOOT_LEFT);
        // player.addCollider(player.bones.FOOT_RIGHT);


    }

    return function(JSON, engine, id) {

        let player = Object.create(experimentalPlayerPrototype, {
           id: {writable: false, value: id}, 
           loaded: {writable: true, value: false},
           model: {writable: true, value: null}
        });

        player.init(engine, JSON);

        return player;
    };
})();
