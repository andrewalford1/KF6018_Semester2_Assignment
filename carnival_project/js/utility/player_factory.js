"use strict";

/**
 * Factory to create players.
 * @author  Andrew Alford
 * @date    31/03/2019
 * @version 2.0 - 07/05/2019
 */
let playerFactory = (function() {
    let PlayerPrototype = {
        //Initialises the player.
        init: function(engine) {
            getBones(this);
            let group = new THREE.Group();
            group.scale.set(11, 11, 11);
            group.position.set(45, 11, -100);
            Object.values(this.bones).forEach(bone => {
                group.add(bone.mesh);    
            });
            engine.scene.add(group);
            this.object = group;
            if(engine.CameraController.getInstance() != null) {
                engine.CameraController.getInstance().position.set(0, 0, 0);
                this.bones.HEAD.mesh.add(camera);
            }
            this.loaded = true;
        },
        addCollider(bone, visible = false) {
            bone.collider = collisionFactory(
                bone.mesh,
                null,
                visible,
                0x00FFFF
            );
        },
        getLeftHandState: function() {
            return this.bones.HAND_LEFT.state;
        },
        getRightHandState: function() {
            return this.bones.HAND_RIGHT.state;
        },
        handsTogether: function() {
            return jointsTouching(this.bones.HAND_LEFT, this.bones.HAND_RIGHT);
        },
        feetTogether: function() {
            return jointsTouching(this.bones.FOOT_LEFT, this.bones.FOOT_RIGHT);
        },
        leftHandTouchingHead: function() {
            return jointsTouching(this.bones.HAND_LEFT, this.bones.HEAD);
        },
        leftHandTouchingMidSpine: function() {
            return jointsTouching(this.bones.HAND_LEFT, this.bones.SPINE_MID);
        },
        leftHandTouchingLeftShoulder: function() {
            return jointsTouching(this.bones.HAND_LEFT, this.bones.SHOULDER_LEFT);
        },
        leftHandTouchingRightShoulder: function() {
            return jointsTouching(this.bones.HAND_LEFT, this.bones.SHOULDER_RIGHT);
        },
        leftFootTouchingRightKnee: function() {
            return jointsTouching(this.bones.FOOT_LEFT, this.bones.KNEE_RIGHT);
        },
        leftHandAboveSpineBase: function() {
            return jointAboveOtherJoint(this.bones.HAND_LEFT, this.bones.SPINE_BASE);
        },
        leftHandAboveShoulder: function() {
            return jointAboveOtherJoint(this.bones.HAND_LEFT, this.bones.SHOULDER_LEFT);
        },
        leftHandAboveHead: function() {
            return jointAboveOtherJoint(this.bones.HAND_LEFT, this.bones.HEAD);
        },
        rightHandTouchingHead: function() {
            return jointsTouching(this.bones.HAND_RIGHT, this.bones.HEAD);
        },
        rightHandTouchingMidSpine: function() {
            return jointsTouching(this.bones.HAND_RIGHT, this.bones.SPINE_MID);
        },
        rightHandTouchingLeftShoulder: function() {
            return jointsTouching(this.bones.HAND_RIGHT, this.bones.SHOULDER_LEFT);
        },        
        rightHandTouchingRightShoulder: function() {
            return jointsTouching(this.bones.HAND_RIGHT, this.bones.SHOULDER_RIGHT);
        },
        rightFootTouchingLeftKnee: function() {
            return jointsTouching(this.bones.FOOT_RIGHT, this.bones.KNEE_LEFT);
        },
        rightHandAboveSpineBase: function() {
            return jointAboveOtherJoint(this.bones.HAND_RIGHT, this.bones.SPINE_BASE);
        },
        rightHandAboveShoulder: function() {
            return jointAboveOtherJoint(this.bones.HAND_RIGHT, this.bones.SHOULDER_RIGHT);
        },
        rightHandAboveHead: function() {
            return jointAboveOtherJoint(this.bones.HAND_RIGHT, this.bones.HEAD);
        },
        armsSpread: function() {
            armsSpreadLocal(this);
        },
        rightHandTouchingRightKnee: function() {
            return jointsTouching(this.bones.HAND_RIGHT, this.bones.KNEE_RIGHT);
        },
        leftHandTouchingLeftKnee: function() {
            return jointsTouching(this.bones.HAND_LEFT, this.bones.KNEE_LEFT);
        },
        //Updates the player with the skeleton tracked from the kinect.
        update: function(skeleton) {
            if(ENGINE.isLoaded() && this.loaded) {
                Object.values(this.bones).forEach((bone, i) => {
                    updatePositionAndRotation(skeleton.joints[i], bone, this.recoredPositions);
                    if(!(bone.collider === undefined)) {
                        bone.collider.update();
                    }
                });
                updateHandState(skeleton.leftHandState, this.bones.HAND_LEFT);
                updateHandState(skeleton.rightHandState, this.bones.HAND_RIGHT);
                movePlayer(this);

                if(!(this.gestures === undefined)) {
                    this.gestures.update();
                }
            }
        }
    };

    //Checks if two joints are touching.
    function jointsTouching(jointA, jointB) {
        let jointApos = new THREE.Vector3();
        jointApos.copy(jointA.mesh.position);
        let jointBpos = new THREE.Vector3();
        jointBpos.copy(jointB.mesh.position);

        jointApos.multiplyScalar(5);
        jointBpos.multiplyScalar(5);

        let distance = jointApos.distanceTo(jointBpos).toFixed(2);

        return distance < 1;
    }

    //Checks if one joint is raised above another.
    function jointAboveOtherJoint(jointA, jointB) {
        let jointApos = new THREE.Vector3();
        jointApos.copy(jointA.mesh.position);
        let jointBpos = new THREE.Vector3();
        jointBpos.copy(jointB.mesh.position);

        return jointApos.y > jointBpos.y;
    }
    
    //Checks if the players arms are spread.
    function armsSpreadLocal(player) {
        let leftHandPos = new THREE.Vector3();
        leftHandPos.copy(player.bones.HAND_LEFT.mesh.position);
        let leftElbowPos = new THREE.Vector3();
        leftElbowPos.copy(player.bones.ELBOW_LEFT.mesh.position);
        let rightHandPos = new THREE.Vector3();
        rightHandPos.copy(player.bones.HAND_RIGHT.mesh.position);
        let rightElbowPos = new THREE.Vector3();
        rightElbowPos.copy(player.bones.ELBOW_RIGHT.mesh.position);
        let spineShoulderPos = new THREE.Vector3();
        spineShoulderPos.copy(player.bones.SPINE_SHOULDER.mesh.position);
        
        leftHandPos.multiplyScalar(5);
        rightHandPos.multiplyScalar(5);
        leftElbowPos.multiplyScalar(5);
        spineShoulderPos.multiplyScalar(5);

        //The players hands must be spread apart.
        if(jointsTouching(player.bones.HAND_LEFT, player.bones.HAND_RIGHT)) {
            return false;
        } else if(jointsTouching(player.bones.HAND_LEFT, player.bones.HEAD)) {
            return false;
        } else if(jointsTouching(player.bones.HAND_RIGHT, player.bones.HEAD)) {
            return false;
        } 

        //Check hands are on the same level.
        let handsAligned_y = (leftHandPos.y - rightHandPos.y).toFixed(2);
        -handsAligned_y > 0 ? -handsAligned_y : handsAligned_y;
        //If the hands are not aligned, the player cannot be in a t-pose.
        if(handsAligned_y > 1 || handsAligned_y < 0) { return false; }

        //Check if the left arm is aligned with the left elbow.
        let leftHandAlignedWithLeftElbow_y = (leftElbowPos.y - leftHandPos.y).toFixed(2);
        -leftHandAlignedWithLeftElbow_y > 0 ? -leftHandAlignedWithLeftElbow_y : leftHandAlignedWithLeftElbow_y;
        let leftHandAlignedWithLeftElbow_z = (leftElbowPos.z - leftHandPos.z).toFixed(2);
        -leftHandAlignedWithLeftElbow_z > 0 ? -leftHandAlignedWithLeftElbow_z : leftHandAlignedWithLeftElbow_z;

        //Check if the right arm is aligned with the right elbow.
        let rightHandAlignedWithRightElbow_y = (rightElbowPos.y - rightHandPos.y).toFixed(2);
        -rightHandAlignedWithRightElbow_y > 0 ? -rightHandAlignedWithRightElbow_y : rightHandAlignedWithRightElbow_y;
        let rightHandAlignedWithRightElbow_z = (rightElbowPos.z - rightHandPos.z).toFixed(2);
        -rightHandAlignedWithRightElbow_z > 0 ? -rightHandAlignedWithRightElbow_z : rightHandAlignedWithRightElbow_z;

        //Check if the left arm is aligned with the spine shoulder.
        //(Note: We only need to do this with one arm 
        //as we already know if both arms are aligned).
        let leftHandAlignedWithShoulder_y = (spineShoulderPos.y - leftHandPos.y).toFixed(2);
        -leftHandAlignedWithShoulder_y > 0 ? -leftHandAlignedWithShoulder_y : leftHandAlignedWithShoulder_y;
        let leftHandAlignedWithShoulder_z = (spineShoulderPos.z - leftHandPos.z).toFixed(2);
        -leftHandAlignedWithShoulder_z > 0 ? -leftHandAlignedWithShoulder_z : leftHandAlignedWithShoulder_z;

        return (
            (handsAligned_y < 1) && 
            (leftHandAlignedWithLeftElbow_y < 1) &&
            (leftHandAlignedWithLeftElbow_z < 1) &&
            (rightHandAlignedWithRightElbow_y < 1) &&
            (rightHandAlignedWithRightElbow_z < 1) &&
            (leftHandAlignedWithShoulder_y < 1) && 
            (leftHandAlignedWithShoulder_z < 1)
        );
    }

    //Checks if the player should move forward.
    function moveFoward(player) {
        return jointsTouching(player.bones.HAND_LEFT, player.bones.SHOULDER_LEFT)
        && jointsTouching(player.bones.HAND_RIGHT, player.bones.SHOULDER_RIGHT);
    }

    //Checks if the player should move backward.
    function moveBackward(player) {
        return jointsTouching(player.bones.HAND_LEFT, player.bones.HIP_LEFT)
        && jointsTouching(player.bones.HAND_RIGHT, player.bones.HIP_RIGHT);
    }

    //Checks if the player shoud rotate to the right.
    function rotateRight(player) {
        // return jointAboveOtherJoint(player.bones.HAND_RIGHT, player.bones.HEAD) &&
        // !jointAboveOtherJoint(player.bones.HAND_LEFT, player.bones.HEAD);
        return !jointsTouching(player.bones.HAND_LEFT, player.bones.SHOULDER_LEFT)
        && jointsTouching(player.bones.HAND_RIGHT, player.bones.SHOULDER_RIGHT);
    }

    //Checks if the player should rotate to the left.
    function rotateLeft(player) {
        // return !jointAboveOtherJoint(player.bones.HAND_RIGHT, player.bones.HEAD) &&
        // jointAboveOtherJoint(player.bones.HAND_LEFT, player.bones.HEAD);
        return jointsTouching(player.bones.HAND_LEFT, player.bones.SHOULDER_LEFT)
        && !jointsTouching(player.bones.HAND_RIGHT, player.bones.SHOULDER_RIGHT);
    }

    //Moves the player if they should be moved.
    function movePlayer(player) {
        let forward = moveFoward(player);
        let backward = moveBackward(player);

        if(forward || backward) {
            let matrix = new THREE.Matrix4();
            matrix.extractRotation( player.object.matrix );

            let direction = new THREE.Vector3( 0, 0, 1 );
            direction.applyMatrix4(matrix);
            if(forward) {
                player.object.position.add((direction.multiplyScalar(-1)).divideScalar(2));                   
            }
            if(backward) {
                player.object.position.add((direction).divideScalar(2));
            }
        }
        if(rotateRight(player)) {
            player.object.rotation.y -= 0.01;
        }
        if(rotateLeft(player)) {
            player.object.rotation.y += 0.01;
        }
    }

    function updateHandState(handState, hand) {
                
        hand.state.open = false;
        hand.state.lasso = false;
        hand.mesh.material.color.setHex(0xFF0000);

        switch(handState) {
            case(2): 
                hand.state.open = true; 
                hand.mesh.material.color.setHex(0x00FF00);
                break;
            case(4): 
                hand.state.lasso = true; 
                hand.mesh.material.color.setHex(0x0000FF);
                break;
        }
    }

    function updatePositionAndRotation(trackedBone, bone, recoredPositions) {
        let position = new THREE.Vector3(
            trackedBone.cameraX,
            trackedBone.cameraY,
            trackedBone.cameraZ
        );
        let orientation = new THREE.Quaternion(
            trackedBone.orientationX,
            trackedBone.orientationY,
            trackedBone.orientationZ,
            trackedBone.orientationW
        );

        let averageFilter = new THREE.Vector3();
        let averageVelocity = 0;
        bone.previousPosistions.unshift(position);
        bone.previousPosistions.pop();
        bone.previousPosistions.forEach((position, i) => {
            averageFilter.add(position);
            if(i > 0) {
                averageVelocity += position.distanceTo(bone.previousPosistions[i - 1]);
            }
        });
        averageFilter.divideScalar(recoredPositions);
        bone.velocity = ((averageVelocity / recoredPositions) * 10);
        bone.velocity = Number(bone.velocity.toFixed(2));

        bone.mesh.position.copy(averageFilter);
        bone.mesh.rotation.setFromQuaternion(orientation);
    }

    function getBones(player) {
        let bone = new THREE.Mesh(
            new THREE.SphereGeometry(0.05, 9, 9),
            new THREE.MeshPhongMaterial({color: 0xDDDD00})
        );

        let leftHand = new THREE.Mesh(
            new THREE.SphereGeometry(0.075, 9, 9),
            new THREE.MeshPhongMaterial({color: 0xDDDD00})
        );

        let rightHand = new THREE.Mesh(
            new THREE.SphereGeometry(0.075, 9, 9),
            new THREE.MeshPhongMaterial({color: 0xDDDD00})
        );

        let previousPositions = [];
        for(let i = 0; i < player.recoredPositions; i++) {
            previousPositions.push(new THREE.Vector3());
        }

        player.bones = {
            SPINE_BASE:     { mesh: bone.clone(),   velocity: 0, previousPosistions: [...previousPositions] },
            SPINE_MID:      { mesh: bone.clone(),   velocity: 0, previousPosistions: [...previousPositions] },
            NECK:           { mesh: bone.clone(),   velocity: 0, previousPosistions: [...previousPositions] },
            HEAD:           { mesh: bone.clone(),   velocity: 0, previousPosistions: [...previousPositions] },
            SHOULDER_LEFT:  { mesh: bone.clone(),   velocity: 0, previousPosistions: [...previousPositions] },
            ELBOW_LEFT:     { mesh: bone.clone(),   velocity: 0, previousPosistions: [...previousPositions] },
            WRIST_LEFT:     { mesh: bone.clone(),   velocity: 0, previousPosistions: [...previousPositions] },
            HAND_LEFT:      { mesh: leftHand,       velocity: 0, previousPosistions: [...previousPositions], state: {open: false, lasso: false} },
            SHOULDER_RIGHT: { mesh: bone.clone(),   velocity: 0, previousPosistions: [...previousPositions] },
            ELBOW_RIGHT:    { mesh: bone.clone(),   velocity: 0, previousPosistions: [...previousPositions] },
            WRIST_RIGHT:    { mesh: bone.clone(),   velocity: 0, previousPosistions: [...previousPositions] },
            HAND_RIGHT:     { mesh: rightHand,      velocity: 0, previousPosistions: [...previousPositions], state: {open: false, lasso: false} },
            HIP_LEFT:       { mesh: bone.clone(),   velocity: 0, previousPosistions: [...previousPositions] },
            KNEE_LEFT:      { mesh: bone.clone(),   velocity: 0, previousPosistions: [...previousPositions] },
            ANKLE_LEFT:     { mesh: bone.clone(),   velocity: 0, previousPosistions: [...previousPositions] },
            FOOT_LEFT:      { mesh: bone.clone(),   velocity: 0, previousPosistions: [...previousPositions] },
            HIP_RIGHT:      { mesh: bone.clone(),   velocity: 0, previousPosistions: [...previousPositions] },
            KNEE_RIGHT:     { mesh: bone.clone(),   velocity: 0, previousPosistions: [...previousPositions] },
            ANKLE_RIGHT:    { mesh: bone.clone(),   velocity: 0, previousPosistions: [...previousPositions] },
            FOOT_RIGHT:     { mesh: bone.clone(),   velocity: 0, previousPosistions: [...previousPositions] },
            SPINE_SHOULDER: { mesh: bone.clone(),   velocity: 0, previousPosistions: [...previousPositions] },
            HAND_TIP_LEFT:  { mesh: new THREE.Object3D(), velocity: 0, previousPosistions: [...previousPositions] },
            THUMB_LEFT:     { mesh: new THREE.Object3D(), velocity: 0, previousPosistions: [...previousPositions] },
            HAND_TIP_RIGHT: { mesh: new THREE.Object3D(), velocity: 0, previousPosistions: [...previousPositions] },
            THUMB_RIGHT:    { mesh: new THREE.Object3D(), velocity: 0, previousPosistions: [...previousPositions] }
        }
    }

    return function(engine) {
        let player = Object.create(PlayerPrototype, {
           id: {writable: false, value: null}, 
           loaded: {writable: true, value: false},
           recoredPositions: {writable: false, value: 5},
           model: {writable: true, value: null}
        });
        player.init(engine);
        player.gestures = new UserGestures(player);
        player.addCollider(player.bones.HAND_LEFT);
        player.addCollider(player.bones.HAND_RIGHT);
        player.addCollider(player.bones.FOOT_LEFT);
        player.addCollider(player.bones.FOOT_RIGHT);
        return player;
    };
})();
