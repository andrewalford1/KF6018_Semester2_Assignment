"use strict";

let experimentalPlayerFactory = (function() {
    let experimentalPlayerPrototype = {
        init: function(scene) {
            getBones(this);
            let group = new THREE.Group();
            group.scale.set(11, 11, 11);
            group.position.set(45, 11, -100);
            Object.values(this.bones).forEach(bone => {
                group.add(bone.mesh);    
            });
            scene.add(group);
            this.loaded = true;
        },
        addCamera: function(camera) {
            if(camera != null) {
                camera.position.set(0, 0, 0);
                this.bones.HEAD.mesh.add(camera);
            }
        },
        getLeftHandState: function() {
            return this.bones.HAND_LEFT.state;
        },
        getRightHandState: function() {
            return this.bones.HAND_RIGHT.state;
        },
        update: function(skeleton) {
            if(ENGINE.isLoaded() && this.loaded) {
                Object.values(this.bones).forEach((bone, i) => {
                    updatePositionAndRotation(skeleton.joints[i], bone, this.recoredPositions);
                });
                updateHandState(skeleton.leftHandState, this.bones.HAND_LEFT);
                updateHandState(skeleton.rightHandState, this.bones.HAND_RIGHT);
            }
        }
    };

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

        player.init(engine.scene);
        player.addCamera(engine.CameraController.getInstance());
        //player.geustures = new UserGeustures(player);
        return player;
    };
})();