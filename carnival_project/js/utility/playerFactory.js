"use strict";

let playerFactory = (function() {
    let playerPrototype = {
        initPlayer : function() {
            for(let i = 0; i < this.joints.length; i++) {

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

                this.joints.forEach(joint => {
                    group.add(joint.mesh.value);
                });

                group.scale.set(11, 11, 11);
                group.position.set(0, 11, 0);

                scene.add(group);
            }
        },
        attachCamera : function(camera) {
            if(camera) {
                ENGINE.DEBUGGER.isThreeCamera(camera, 'playerFactory');
                camera.position.set(0, 0, 0);
                console.log(`head ${this.jointIndexes.HEAD}`);
                this.joints[this.jointIndexes.HEAD].mesh.value.add(camera);
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
        addCollider : function(jointIndex, visible = true) {
            let collision = collisionFactory(
                this.joints[jointIndex].mesh.value,
                null,
                visible,
                0x00FFFF
            );
            this.joints[jointIndex].collider = collision;
            console.log(this.joints[jointIndex]);
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
                    break;
                case(4) :
                    this.joints[this.jointIndexes.HAND_LEFT].lasso = true;
                    break;
            }

            switch(skeleton.rightHandState) {
                case(0 | 1) : break;
                case(2) : 
                    this.joints[this.jointIndexes.HAND_RIGHT].open = true;
                    break;
                case(4) :
                    this.joints[this.jointIndexes.HAND_RIGHT].lasso = true;
                    break;
            }

            if(this.joints[this.jointIndexes.HAND_LEFT].open) {
                this.joints[this.jointIndexes.HAND_LEFT].mesh.value
                .material.color.setHex(0x00FF00);
            } 
            else {
                this.joints[this.jointIndexes.HAND_LEFT].mesh.value
                .material.color.setHex(0xFF0000);
            }
            if(this.joints[this.jointIndexes.HAND_RIGHT].open) {
                this.joints[this.jointIndexes.HAND_RIGHT].mesh.value
                .material.color.setHex(0x00FF00);
            } 
            else {
                this.joints[this.jointIndexes.HAND_RIGHT].mesh.value
                .material.color.setHex(0xFF0000);
            }

            if(this.joints[this.jointIndexes.HAND_LEFT].lasso) {
                this.joints[this.jointIndexes.HAND_LEFT].mesh.value
                .material.color.setHex(0x0000FF);
            }

            if(this.joints[this.jointIndexes.HAND_RIGHT].lasso) {
                this.joints[this.jointIndexes.HAND_RIGHT].mesh.value
                .material.color.setHex(0x0000FF);
            }

            for(let i = 0; i < skeleton.joints.length; i++) {
                let position = new THREE.Vector3(
                    skeleton.joints[i].cameraX,
                    skeleton.joints[i].cameraY,
                    skeleton.joints[i].cameraZ
                );
                let orientation = new THREE.Quaternion(
                    skeleton.joints[i].orientationX,
                    skeleton.joints[i].orientationY,
                    skeleton.joints[i].orientationZ,
                    skeleton.joints[i].orientationW
                );

                //[averageFilter] A filter to smooth out kinect movement.
                let averageFilter = new THREE.Vector3(0, 0, 0);

                //Update previous positions.
                this.previousPositions[i].unshift(position);
                this.previousPositions[i].pop();
                this.previousPositions[i].forEach(pos => {
                     averageFilter.add(pos);
                });
                averageFilter.divideScalar(
                     this.previousPositions[i].length
                );

                //Update the joint's position & rotation.
                this.joints[i].mesh.value.position.copy(averageFilter);
                this.joints[i].mesh.value.rotation.setFromQuaternion(
                    orientation
                );

                //Update the joints collider (if it has one).
                if(!(this.joints[i].collider === undefined)) {
                    this.joints[i].collider.update();
                }
            }
        }
    };

    return function(camera, scene) {
        const BASE_BONE_RADIUS = 0.05;
        
        let player = Object.create(playerPrototype, {
            jointIndexes : {writeable: false, value : {
                SPINE_BASE      : 0,
                SPINE_MID       : 1,
                NECK            : 2,
                HEAD            : 3,
                SHOULDER_LEFT   : 4,
                ELBOW_LEFT      : 5,
                WRIST_LEFT      : 6,
                HAND_LEFT       : 7,
                SHOULDER_RIGHT  : 8,
                ELBOW_RIGHT     : 9,
                WRIST_RIGHT     : 10,
                HAND_RIGHT      : 11,
                HIP_LEFT        : 12,
                KNEE_LEFT       : 13,
                ANKLE_LEFT      : 14,
                FOOT_LEFT       : 15,
                HIP_RIGHT       : 16,
                KNEE_RIGHT      : 17,
                ANKLE_RIGHT     : 18,
                FOOT_RIGHT      : 19,
                SPINE_SHOULDER  : 20,
                HAND_TIP_LEFT   : 21,
                THUMB_LEFT      : 22,
                HAND_TIP_RIGHT  : 23,
                THUMB_RIGHT     : 24,
            }},
            joints : {writeable: false, value : [
                {
                    ID : {wirteable: false, value : "SPINE_BASE"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "SPINE_MID"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "NECK"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
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
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "ELBOW_LEFT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "WRIST_LEFT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "HAND_LEFT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )},
                    open : {writeable: true, value: false},
                    lasso : {writeable: true, value: false}
                }, 
                {
                    ID : {wirteable: false, value : "SHOULDER_RIGHT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "ELBOW_RIGHT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "WRIST_RIGHT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "HAND_RIGHT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )},
                    open : {writeable: true, value: false},
                    lasso : {writeable: true, value: false}
                }, 
                {
                    ID : {wirteable: false, value : "HIP_LEFT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "KNEE_LEFT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                },
                {
                    ID : {wirteable: false, value : "ANKLE_LEFT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "FOOT_LEFT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "HIP_RIGHT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "KNEE_RIGHT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "ANKLE_RIGHT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "FOOT_RIGHT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "SPINE_SHOULDER"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "HAND_TIP_LEFT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "THUMB_LEFT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "HAND_TIP_RIGHT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "THUMB_RIGHT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }
            ]},
            numPreviousPositions : {writeable: false, value : 5},
            previousPositions : {writeable: true, value : []},
            colliders : {writable: true, value : []}
        });

        player.initPlayer();
        player.attachCamera(camera);
        player.addToScene(scene);
        player.addCollider(player.jointIndexes.HAND_LEFT, true);
        player.addCollider(player.jointIndexes.HAND_RIGHT, true);
        player.addCollider(player.jointIndexes.FOOT_LEFT, true);
        player.addCollider(player.jointIndexes.FOOT_RIGHT, true);

        return player;
    }
})();