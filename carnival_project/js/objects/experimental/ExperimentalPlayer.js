"use strict";

/**
 * Factory to create players.
 * @author  Andrew Alford
 * @date    31/03/2019
 * @version 2.0 - 07/05/2019
 */
let experimentalPlayerFactory = (function() {
    let experimentalPlayerPrototype = {
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
        rightHandAboveShoulder: function() {
            return jointAboveOtherJoint(this.bones.HAND_RIGHT, this.bones.SHOULDER_RIGHT);
        },
        rightHandAboveHead: function() {
            return jointAboveOtherJoint(this.bones.HAND_RIGHT, this.bones.HEAD);
        },
        armsSpread: function() {
            armsSpreadLocal(this);
        },
        //Updates the player with the skeleton tracked from the kinect.
        update: function(skeleton) {
            if(ENGINE.isLoaded() && this.loaded) {
                Object.values(this.bones).forEach((bone, i) => {
                    updatePositionAndRotation(skeleton.joints[i], bone, this.recoredPositions);
                });
                updateHandState(skeleton.leftHandState, this.bones.HAND_LEFT);
                updateHandState(skeleton.rightHandState, this.bones.HAND_RIGHT);
                movePlayer(this);
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
        let rightHandPos = new THREE.Vector3();
        rightHandPos.copy(player.bones.HAND_RIGHT.mesh.position);
        let spineShoulderPos = new THREE.Vector3();
        spineShoulderPos.copy(player.bones.SPINE_SHOULDER.mesh.position);
        
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
    }

    //Rotates the player right.
    function rotateRight(player) {
        return jointAboveOtherJoint(player.bones.HAND_RIGHT, player.bones.HEAD) &&
        !jointAboveOtherJoint(player.bones.HAND_LEFT, player.bones.HEAD);
    }

    //Rotates the player left.
    function rotateLeft(player) {
        return !jointAboveOtherJoint(player.bones.HAND_RIGHT, player.bones.HEAD) &&
        jointAboveOtherJoint(player.bones.HAND_LEFT, player.bones.HEAD);
    }

    //Moves the player if they should be moved.
    function movePlayer(player) {
        if(armsSpreadLocal(player)) {
            let matrix = new THREE.Matrix4();
            matrix.extractRotation( player.object.matrix );

            let direction = new THREE.Vector3( 0, 0, 1 );
            direction.applyMatrix4(matrix);
            player.object.position.add(direction.multiplyScalar(-1));                   
        }
        if(rotateRight(player)) {
            player.object.rotation.y += 0.05;
        }
        if(rotateLeft(player)) {
            player.object.rotation.y -= 0.05;
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
        bone.previousPosistions.unshift(position);
        bone.previousPosistions.pop();
        bone.previousPosistions.forEach(position => {
            averageFilter.add(position);
        });
        averageFilter.divideScalar(recoredPositions);

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
            SPINE_BASE:     { mesh: bone.clone(), previousPosistions: [...previousPositions] },
            SPINE_MID:      { mesh: bone.clone(), previousPosistions: [...previousPositions] },
            NECK:           { mesh: bone.clone(), previousPosistions: [...previousPositions] },
            HEAD:           { mesh: bone.clone(), previousPosistions: [...previousPositions] },
            SHOULDER_LEFT:  { mesh: bone.clone(), previousPosistions: [...previousPositions] },
            ELBOW_LEFT:     { mesh: bone.clone(), previousPosistions: [...previousPositions] },
            WRIST_LEFT:     { mesh: bone.clone(), previousPosistions: [...previousPositions] },
            HAND_LEFT:      { mesh: leftHand, previousPosistions: [...previousPositions], state: {open: false, lasso: false} },
            SHOULDER_RIGHT: { mesh: bone.clone(), previousPosistions: [...previousPositions] },
            ELBOW_RIGHT:    { mesh: bone.clone(), previousPosistions: [...previousPositions] },
            WRIST_RIGHT:    { mesh: bone.clone(), previousPosistions: [...previousPositions] },
            HAND_RIGHT:     { mesh: rightHand, previousPosistions: [...previousPositions], state: {open: false, lasso: false} },
            HIP_LEFT:       { mesh: bone.clone(), previousPosistions: [...previousPositions] },
            KNEE_LEFT:      { mesh: bone.clone(), previousPosistions: [...previousPositions] },
            ANKLE_LEFT:     { mesh: bone.clone(), previousPosistions: [...previousPositions] },
            FOOT_LEFT:      { mesh: bone.clone(), previousPosistions: [...previousPositions] },
            HIP_RIGHT:      { mesh: bone.clone(), previousPosistions: [...previousPositions] },
            KNEE_RIGHT:     { mesh: bone.clone(), previousPosistions: [...previousPositions] },
            ANKLE_RIGHT:    { mesh: bone.clone(), previousPosistions: [...previousPositions] },
            FOOT_RIGHT:     { mesh: bone.clone(), previousPosistions: [...previousPositions] },
            SPINE_SHOULDER: { mesh: bone.clone(), previousPosistions: [...previousPositions] },
            HAND_TIP_LEFT:  { mesh: new THREE.Object3D(), previousPosistions: [...previousPositions] },
            THUMB_LEFT:     { mesh: new THREE.Object3D(), previousPosistions: [...previousPositions] },
            HAND_TIP_RIGHT: { mesh: new THREE.Object3D(), previousPosistions: [...previousPositions] },
            THUMB_RIGHT:    { mesh: new THREE.Object3D(), previousPosistions: [...previousPositions] }
        }
    }

    return function(engine, id) {
        let player = Object.create(experimentalPlayerPrototype, {
           id: {writable: false, value: id}, 
           loaded: {writable: true, value: false},
           recoredPositions: {writable: false, value: 5},
           model: {writable: true, value: null}
        });
        player.init(engine);
        return player;
    };
})();