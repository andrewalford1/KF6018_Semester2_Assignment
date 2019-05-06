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
        update : function(scene) {
            if(ENGINE.isLoaded()) {
                //On Load...
                if(!this.loaded) { 
                    getBones(scene, this);

                    this.loaded = true;
                }
                else { //After load.

                }
            }
        },
        kinectUpdate: function(skeleton) {
            if(ENGINE.isLoaded() && this.loaded) {
                Object.values(this.bones).forEach((bone, i) => {
                    updatePositionAndRotation(skeleton.joints[i], bone);
                });
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
            skeletonJoint.orientationX,
            skeletonJoint.orientationY,
            skeletonJoint.orientationZ,
            skeletonJoint.orientationW
        );

        playerJoint.helper.position.copy(position);
        playerJoint.helper.rotation.setFromQuaternion(orientation);
    }

    function getBones(scene, player) {
        let spineBaseBone = player.model.getInstance()
            .children[0].children[0].children[0].children[0];

        let spineMidBone = spineBaseBone.children[0];
        let spineShoulderBone = spineMidBone.children[0].children[0];
        let neckBone = spineShoulderBone.children[0];
        let headBone = neckBone.children[0];

        let shoulderLeftBone = spineShoulderBone.children[1];
        let elbowLeftBone = shoulderLeftBone.children[0];
        let wristLeftBone = elbowLeftBone.children[0];
        let handLeftBone = wristLeftBone.children[0];
        
        let shoulderRightBone = spineShoulderBone.children[2];
        let elbowRightBone = shoulderRightBone.children[0];
        let wristRightBone = elbowRightBone.children[0];
        let handRightBone = wristRightBone.children[0];

        let hipLeftBone = spineBaseBone.children[2];
        let kneeLeftBone = hipLeftBone.children[0];
        let ankleLeftBone = kneeLeftBone.children[0];
        let footLeftBone = ankleLeftBone.children[0];

        let hipRightBone = spineBaseBone.children[1];
        let kneeRightBone = hipRightBone.children[0];
        let ankleRightBone = kneeRightBone.children[0];
        let footRightBone = ankleRightBone.children[0];

        let boneHelper = new THREE.Mesh(
            new THREE.SphereGeometry(0.05, 9, 9),
            new THREE.MeshPhongMaterial({color: 0xFF0000})
        );

        player.bones = {
            SPINE_BASE:     { helper: boneHelper.clone(), previousPosistions: [] },
            SPINE_MID:      { helper: boneHelper.clone(), previousPosistions: [] },
            NECK:           { helper: boneHelper.clone(), previousPosistions: [] },
            HEAD:           { helper: boneHelper.clone(), previousPosistions: [] },
            SHOULDER_LEFT:  { helper: boneHelper.clone(), previousPosistions: [] },
            ELBOW_LEFT:     { helper: boneHelper.clone(), previousPosistions: [] },
            WRIST_LEFT:     { helper: boneHelper.clone(), previousPosistions: [] },
            HAND_LEFT:      { helper: boneHelper.clone(), previousPosistions: [], state: {open: false, lasso: false} },
            SHOULDER_RIGHT: { helper: boneHelper.clone(), previousPosistions: [] },
            ELBOW_RIGHT:    { helper: boneHelper.clone(), previousPosistions: [] },
            WRIST_RIGHT:    { helper: boneHelper.clone(), previousPosistions: [] },
            HAND_RIGHT:     { helper: boneHelper.clone(), previousPosistions: [], state: {open: false, lasso: false} },
            HIP_LEFT:       { helper: boneHelper.clone(), previousPosistions: [] },
            KNEE_LEFT:      { helper: boneHelper.clone(), previousPosistions: [] },
            ANKLE_LEFT:     { helper: boneHelper.clone(), previousPosistions: [] },
            FOOT_LEFT:      { helper: boneHelper.clone(), previousPosistions: [], },
            HIP_RIGHT:      { helper: boneHelper.clone(), previousPosistions: [] },
            KNEE_RIGHT:     { helper: boneHelper.clone(), previousPosistions: [] },
            ANKLE_RIGHT:    { helper: boneHelper.clone(), previousPosistions: [] },
            FOOT_RIGHT:     { helper: boneHelper.clone(), previousPosistions: [], },
            SPINE_SHOULDER: { helper: boneHelper.clone(), previousPosistions: [] },
            HAND_TIP_LEFT:  { helper: boneHelper.clone(), previousPosistions: [] },
            THUMB_LEFT:     { helper: boneHelper.clone(), previousPosistions: [] },
            HAND_TIP_RIGHT: { helper: boneHelper.clone(), previousPosistions: [] },
            THUMB_RIGHT:    { helper: boneHelper.clone(), previousPosistions: [] }
        }

        
        let group = new THREE.Group();
        Object.values(player.bones).forEach(bone => {
            group.add(bone.helper);    
        })
        group.scale.set(11, 11, 11);
        group.position.set(0, 11, 0);
        scene.add(group);

        player.bones.SPINE_BASE.helper.add(spineBaseBone);
        player.bones.SPINE_MID.helper.add(spineMidBone);
        player.bones.SPINE_SHOULDER.helper.add(spineShoulderBone);
        player.bones.NECK.helper.add(neckBone);
        player.bones.HEAD.helper.add(headBone);
        player.bones.SHOULDER_LEFT.helper.add(shoulderLeftBone);
        player.bones.ELBOW_LEFT.helper.add(elbowLeftBone);
        player.bones.WRIST_LEFT.helper.add(wristLeftBone);
        player.bones.HAND_LEFT.helper.add(handLeftBone);
        player.bones.SHOULDER_RIGHT.helper.add(shoulderRightBone);
        player.bones.ELBOW_RIGHT.helper.add(elbowRightBone);
        player.bones.WRIST_RIGHT.helper.add(wristRightBone);
        player.bones.HAND_RIGHT.helper.add(handRightBone);
        player.bones.HIP_LEFT.helper.add(hipLeftBone);
        player.bones.KNEE_LEFT.helper.add(kneeLeftBone);
        player.bones.ANKLE_RIGHT.helper.add(ankleLeftBone);
        player.bones.FOOT_LEFT.helper.add(footLeftBone);
        player.bones.HIP_RIGHT.helper.add(hipRightBone);
        player.bones.KNEE_RIGHT.helper.add(kneeRightBone);
        player.bones.ANKLE_RIGHT.helper.add(ankleRightBone);
        player.bones.FOOT_RIGHT.helper.add(footRightBone);
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
