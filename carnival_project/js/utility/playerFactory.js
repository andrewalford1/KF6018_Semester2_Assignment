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
            return this.joints[this.jointIndexes.HAND_LEFT].state;
        },
        getRightHandState : function() {
            return this.joints[this.jointIndexes.HAND_RIGHT].state;
        },
        handsTogether : function() {
            let leftHandPos = new THREE.Vector3();
            leftHandPos.copy(this.joints[this.jointIndexes.HAND_LEFT].mesh.value.position);
            let rightHandPos = new THREE.Vector3();
            rightHandPos.copy(this.joints[this.jointIndexes.HAND_RIGHT].mesh.value.position);

            leftHandPos.multiplyScalar(5);
            rightHandPos.multiplyScalar(5);

            let distance = leftHandPos.distanceTo(rightHandPos).toFixed(2);

            return distance < 1;
        },
        armsSpread : function() {
            let leftHandPos = new THREE.Vector3();
            leftHandPos.copy(this.joints[this.jointIndexes.HAND_LEFT].mesh.value.position);
            let rightHandPos = new THREE.Vector3();
            rightHandPos.copy(this.joints[this.jointIndexes.HAND_RIGHT].mesh.value.position);
            let spineShoulderPos = new THREE.Vector3();
            spineShoulderPos.copy(this.joints[this.jointIndexes.SPINE_SHOULDER].mesh.value.position);
            
            leftHandPos.multiplyScalar(5);
            rightHandPos.multiplyScalar(5);
            spineShoulderPos.multiplyScalar(5);

            //Check hands are on the same level.
            let handsAligned_y = (leftHandPos.y - rightHandPos.y).toFixed(2);
            -handsAligned_y > 0 ? -handsAligned_y : handsAligned_y;
            //If the hands are not aligned, the player cannot be in a t-pose.
            if(handsAligned_y > 1) { return false; }

            //Check if the left arm is aligned with the spine shoulder.
            //(Note: We only need to do this with one arm 
            //as we already know if both arms are aligned).
            let leftHandAlignedWithShoulder_y = (spineShoulderPos.y - leftHandPos.y).toFixed(2);
            -leftHandAlignedWithShoulder_y > 0 ? -leftHandAlignedWithShoulder_y : leftHandAlignedWithShoulder_y;
            let leftHandAlignedWithShoulder_z = (spineShoulderPos.z - leftHandPos.z).toFixed(2);
            -leftHandAlignedWithShoulder_z > 0 ? -leftHandAlignedWithShoulder_z : leftHandAlignedWithShoulder_z;

            return (
                (handsAligned_y < 1) && 
                (leftHandAlignedWithShoulder_y < 1) && 
                (leftHandAlignedWithShoulder_z < 1)
            );

        },
        leftHandTouchingHead : function() {
            let leftHandPos = new THREE.Vector3();
            leftHandPos.copy(this.joints[this.jointIndexes.HAND_LEFT].mesh.value.position);
            let headPos = new THREE.Vector3();
            headPos.copy(this.joints[this.jointIndexes.HEAD].mesh.value.position);

            leftHandPos.multiplyScalar(5);
            headPos.multiplyScalar(5);

            let distance = leftHandPos.distanceTo(headPos).toFixed(2);

            return distance < 1;
        },
        rightHandTouchingHead : function() {
            let rightHandPos = new THREE.Vector3();
            rightHandPos.copy(this.joints[this.jointIndexes.HAND_RIGHT].mesh.value.position);
            let headPos = new THREE.Vector3();
            headPos.copy(this.joints[this.jointIndexes.HEAD].mesh.value.position);

            rightHandPos.multiplyScalar(5);
            headPos.multiplyScalar(5);

            let distance = rightHandPos.distanceTo(headPos).toFixed(2);

            return distance < 1;
        },
        leftHandAboveShoulder : function() {
            let leftHandPos = new THREE.Vector3();
            leftHandPos.copy(this.joints[this.jointIndexes.HAND_LEFT].mesh.value.position);
            let leftShoulderPos = new THREE.Vector3();
            leftShoulderPos.copy(this.joints[this.jointIndexes.SHOULDER_LEFT].mesh.value.position);

            return leftHandPos.y > leftShoulderPos.y;
        },
        rightHandAboveShoulder : function() {
            let rightHandPos = new THREE.Vector3();
            rightHandPos.copy(this.joints[this.jointIndexes.HAND_RIGHT].mesh.value.position);
            let rightShoulderPos = new THREE.Vector3();
            rightShoulderPos.copy(this.joints[this.jointIndexes.SHOULDER_RIGHT].mesh.value.position);

            return rightHandPos.y > rightShoulderPos.y;
        },
        leftHandAboveHead : function() {
            let leftHandPos = new THREE.Vector3();
            leftHandPos.copy(this.joints[this.jointIndexes.HAND_LEFT].mesh.value.position);
            let headPos = new THREE.Vector3();
            headPos.copy(this.joints[this.jointIndexes.HEAD].mesh.value.position);

            return leftHandPos.y > headPos.y;
        },
        rightHandAboveHead : function() {
            let rightHandPos = new THREE.Vector3();
            rightHandPos.copy(this.joints[this.jointIndexes.HAND_RIGHT].mesh.value.position);
            let headPos = new THREE.Vector3();
            headPos.copy(this.joints[this.jointIndexes.HEAD].mesh.value.position);

            return rightHandPos.y > headPos.y;
        },
        dabbing : function() {

        },
        isUpsideDown : function() {
            let headPos = new THREE.Vector3();
            headPos.copy(this.joints[this.jointIndexes.HEAD].mesh.value.position);
            let leftFootPos = new THREE.Vector3();
            leftFootPos.copy(this.joints[this.jointIndexes.FOOT_LEFT].mesh.value.position);
            let rightFootPos = new THREE.Vector3();
            rightFootPos.copy(this.joints[this.jointIndexes.FOOT_RIGHT].mesh.value.position);

            return (headPos.y < leftFootPos.y) && (headPos.y < rightFootPos.y)
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
            
            this.joints[this.jointIndexes.HAND_LEFT].state.open = false;
            this.joints[this.jointIndexes.HAND_RIGHT].state.open = false;
            this.joints[this.jointIndexes.HAND_LEFT].state.lasso = false;
            this.joints[this.jointIndexes.HAND_RIGHT].state.lasso = false;

            switch(skeleton.leftHandState) {
                case(0 | 1) : break;
                case(2) : 
                    this.joints[this.jointIndexes.HAND_LEFT].state.open = true;
                    break;
                case(4) :
                    this.joints[this.jointIndexes.HAND_LEFT].state.lasso = true;
                    break;
            }

            switch(skeleton.rightHandState) {
                case(0 | 1) : break;
                case(2) : 
                    this.joints[this.jointIndexes.HAND_RIGHT].state.open = true;
                    break;
                case(4) :
                    this.joints[this.jointIndexes.HAND_RIGHT].state.lasso = true;
                    break;
            }

            if(this.joints[this.jointIndexes.HAND_LEFT].state.open) {
                this.joints[this.jointIndexes.HAND_LEFT].mesh.value
                .material.color.setHex(0x00FF00);
            } 
            else {
                this.joints[this.jointIndexes.HAND_LEFT].mesh.value
                .material.color.setHex(0xFF0000);
            }
            if(this.joints[this.jointIndexes.HAND_RIGHT].state.open) {
                this.joints[this.jointIndexes.HAND_RIGHT].mesh.value
                .material.color.setHex(0x00FF00);
            } 
            else {
                this.joints[this.jointIndexes.HAND_RIGHT].mesh.value
                .material.color.setHex(0xFF0000);
            }

            if(this.joints[this.jointIndexes.HAND_LEFT].state.lasso) {
                this.joints[this.jointIndexes.HAND_LEFT].mesh.value
                .material.color.setHex(0x0000FF);
            }

            if(this.joints[this.jointIndexes.HAND_RIGHT].state.lasso) {
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
                    state : {
                        open : {writeable: true, value: false},
                        lasso : {writeable: true, value: false}
                    }
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
                    state : {
                        open : {writeable: true, value: false},
                        lasso : {writeable: true, value: false}
                    }
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
                    // mesh: {wirteable: true, value :  new THREE.Mesh(
                    //     new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                    //     new THREE.MeshPhongMaterial({color: 0xFF0000})
                    // )}
                    mesh: {writeable: true, value : new THREE.Object3D()}
                }, 
                {
                    ID : {wirteable: false, value : "THUMB_LEFT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS / 2, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }, 
                {
                    ID : {wirteable: false, value : "HAND_TIP_RIGHT"},
                    // mesh: {wirteable: true, value :  new THREE.Mesh(
                    //     new THREE.SphereGeometry(BASE_BONE_RADIUS, 9, 9),
                    //     new THREE.MeshPhongMaterial({color: 0xFF0000})
                    // )}
                    mesh: {writeable: true, value : new THREE.Object3D()}
                }, 
                {
                    ID : {wirteable: false, value : "THUMB_RIGHT"},
                    mesh: {wirteable: true, value :  new THREE.Mesh(
                        new THREE.SphereGeometry(BASE_BONE_RADIUS / 2, 9, 9),
                        new THREE.MeshPhongMaterial({color: 0xFF0000})
                    )}
                }
            ]},
            numPreviousPositions : {writeable: false, value : 5},
            previousPositions : {writeable: true, value : []}
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