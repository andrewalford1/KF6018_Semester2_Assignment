/**
 * Factory to create collison objects.
 * @param {THREE.Object3D} object - The object the collider tracks.
 * @param {THREE.Matrix4} offset - Relative to the object.
 * @param {boolean} visible - Show a outline of the collider.
 * @param {color} colour - The colour for the outline (defualts to pink).
 */
let collisionFactory = (function(){
    let colliderPrototype = {
        setUp: function(object, offset, visible, colour) {
            let collisionBox = new THREE.Box3();
            if(object)
                collisionBox.setFromObject(object);
            if(offset)
                collisionBox.applyMatrix4(offset);
            if(visible) {
                let visual = new THREE.Box3Helper(collisionBox, colour);
                visual.updateMatrixWorld(true);
                object.add(visual);
            }
            return collisionBox;
        },
        update: function() {
            this.box = new THREE.Box3();
            this.box.setFromObject(this.object);
        },
        checkCollisions: function(otherColliders) {
            let hasCollided = false;
            otherColliders.forEach(collider => {
                if(!(this === collider)) {
                    if(this.box.intersectsBox(collider.box)) {
                        hasCollided = true;
                        collider.collided = hasCollided;
                    }
                }
            });
            this.collided = hasCollided;
        }
    };

    return function(object, offset, visible, colour = 0xFF00FF) {
        let collider = Object.create(colliderPrototype, {
            object: {writable: false, value: object},
            box : {writable: true, value: null},
            collided : {writable: true, value: false}
        });
        collider.box = collider.setUp(
            collider.object,
            offset,
            visible,
            colour
        );
        return collider;
    }
})();