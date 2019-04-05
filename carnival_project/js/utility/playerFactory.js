"use strict";

let playerFactory = (function() {
    let playerPrototype = {
        initPlayer : function() {
            //Initalisepositions.
            for(let i = 0; i < this.jointIndexes.Length; i++) {
                this.previousPositions.push([]);
                for(let j = 0; j < this.numPreviousPositions; j++) {
                    this.previousPositions[i].push([]);
                }
            }
        },
        addToScene : function(scene) {
            if(scene) {
                ENGINE.DEBUGGER.isThreeScene(scene, 'playerFactory');

                //[group] Groups together all of the players joints.
                let group = new THREE.Group();

                this.joints.foreach(joint => {
                    group.add(joint.mesh);
                });

                scene.add(group);
            }
        },
        attachCamera : function(camera) {
            if(camera) {
                ENGINE.DEBUGGER.isThreeCamera(camera, 'playerFactor');
                this.joints[this.jointIndexes.HEAD].mesh.add(camera);
            }
        },
        getLeftHandState : function() {

        },
        getRightHandState : function() {

        },
        handsTogether : function() {

        },
        armsSpread : function() {

        },
        leftHandTouchingHead : function() {

        },
        rightHandTouchingHead : function() {

        },
        leftHandAboveHead : function() {

        },
        rightHandsAboveHead : function() {

        },
        standingOnLeftLeg : function() {

        },
        standingOnRightLeg : function() {

        },
        dabbing : function() {

        },
        isAbove : function(yCoordinate) {

        },
        isUpsideDown : function() {

        },
        update : function(skeleton) {

            this.joints[this.jointIndexes.HAND_LEFT].open = false;
            this.joints[this.jointIndexes.HAND_RIGHT].open = false;
            this.joints[this.jointIndexes.HAND_LEFT].lasso = false;
            this.joints[this.jointIndexes.HAND_RIGHT].lasso = false;

            switch(skeleton.leftHandState) {
                case(0 | 1) : break;
                case(2) : 
                    this.joints[this.jointIndexes.HAND_LEFT].open = true;
                    this.joints[this.jointIndexes.HAND_LEFT].mesh
                    .material.color.setHex(0x00FF00);
                case(4) :
                    this.joints[this.jointIndexes.HAND_LEFT].lasso = true;
                    this.joints[this.jointIndexes.HAND_LEFT].mesh
                    .material.color.setHex(0x0000FF);
            }

            switch(skeleton.rightHandState) {
                case(0 | 1) : break;
                case(2) : 
                    this.joints[this.jointIndexes.HAND_RIGHT].open = true;
                    this.joints[this.jointIndexes.HAND_RIGHT].mesh
                    .material.color.setHex(0x00FF00);
                case(4) :
                    this.joints[this.jointIndexes.HAND_RIGHT].lasso = true;
                    this.joints[this.jointIndexes.HAND_RIGHT].mesh
                    .material.color.setHex(0x0000FF);
            }

            if(!this.joints[this.jointIndexes.HAND_LEFT].open) {
                this.joints[this.jointIndexes.HAND_LEFT].mesh
                .material.color.setHex(0xFF0000);
            } 
            if(!this.joints[this.jointIndexes.HAND_RIGHT].open) {
                this.joints[this.jointIndexes.HAND_RIGHT].mesh
                .material.color.setHex(0xFF0000);
            } 

            skeleton.joints.forEach(function(joint, index) {
                let position = new THREE.Vector3(
                    joint.cameraX,
                    joint.cameraY,
                    joint.cameraZ
                );
                let orientation = new THREE.Quaternion(
                    joint.orientationX,
                    joint.orientationY,
                    joint.orientationZ,
                    joint.orientationW
                );

                let averageFilter = new THREE.Vector3(0, 0, 0);

                //Update previous positions.
                this.previousPositions[index].unshift(position);
                this.previousPositions[index].pop();
                this.previousPositions[index].forEach(position => {
                    averageFilter.add(position);
                })
                averageFilter.divideScalar(
                    this.previousPositions[index].Length
                );

                //Update the joint's position & rotation.
                this.joints[index].mesh.position.copy(averageFilter);
                this.joints[index].rotation.setFromQuaternion(
                    orientation
                );
            });
        }
    };

    return function(camera, scene) {
        const BASE_BONE_RADIUS = 0.05;
        
        let player = Object.create(playerPrototype, {
            jointIndexes : {writeable: false, value : {
                SPINE_BASE      : {writeable: false, value : 1},
                SPINE_MID       : {writeable: false, value : 2},
                NECK            : {writeable: false, value : 3},
                HEAD            : {writeable: false, value : 4},
                SHOULDER_LEFT   : {writeable: false, value : 5},
                ELBOW_LEFT      : {writeable: false, value : 6},
                WRIST_LEFT      : {writeable: false, value : 7},
                HAND_LEFT       : {writeable: false, value : 8},
                SHOULDER_RIGHT  : {writeable: false, value : 9},
                WRIST_RIGHT     : {writeable: false, value : 10},
                HAND_RIGHT      : {writeable: false, value : 11},
                HIP_LEFT        : {writeable: false, value : 12},
                KNEE_LEFT       : {writeable: false, value : 13},
                ANKLE_LEFT      : {writeable: false, value : 14},
                FOOT_LEFT       : {writeable: false, value : 15},
                HIP_RIGHT       : {writeable: false, value : 16},
                KNEE_RIGHT      : {writeable: false, value : 17},
                ANKLE_RIGHT     : {writeable: false, value : 18},
                FOOT_RIGHT      : {writeable: false, value : 19},
                SPINE_SHOULDER  : {writeable: false, value : 20},
                HAND_TIP_LEFT   : {writeable: false, value : 21},
                THUMB_LEFT      : {writeable: false, value : 22},
                HAND_TIP_RIGHT  : {writeable: false, value : 23},
                THUMB_RIGHT     : {writeable: false, value : 24},
            }},
            joints : {writeable: false, value : [
                {
                    ID : {wirteable: false, value : "SPINE_BASE"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "SPINE_MID"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "NECK"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                },
                {
                    ID : {wirteable: false, value : "HEAD"},
                    mesh: {wirteable: true, value :  new THREE.Object3D()}
                }, 
                {
                    ID : {wirteable: false, value : "SHOULDER_LEFT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "ELBOW_LEFT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "WRIST_LEFT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "HAND_LEFT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )},
                    open : {writeable: true, value: false},
                    lasso : {writeable: true, value: false}
                }, 
                {
                    ID : {wirteable: false, value : "SHOULDER_RIGHT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "ELBOW_RIGHT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "WRIST_RIGHT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "HAND_RIGHT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )},
                    open : {writeable: true, value: false},
                    lasso : {writeable: true, value: false}
                }, 
                {
                    ID : {wirteable: false, value : "HIP_LEFT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "KNEE_LEFT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                },
                {
                    ID : {wirteable: false, value : "ANKLE_LEFT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "FOOT_LEFT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "HIP_RIGHT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "KNEE_RIGHT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "ANKLE_RIGHT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "FOOT_RIGHT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "SPINE_SHOULDER"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "HAND_TIP_LEFT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "THUMB_LEFT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "HAND_TIP_RIGHT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "THUMB_RIGHT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshBasicMaterial({color: 0xFF0000})
                    )}
                }
            ]},
            numPreviousPositions : {writeable: false, value : 5},
            previousPositions : {writeable: true, value : []}
        });

        this.attachCamera(camera);
        this.addToScene(scene);

        return player;
    }
})();