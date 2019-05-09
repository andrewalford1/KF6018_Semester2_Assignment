/**
 * A class representing the world's floor.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Luke Rose
 * @date 24/03/2019
 * @version 1.0 - 24/03/2019
 */
class RightPhysicsWall extends ENGINE.OBJECTS.ClassicObject {
    /**
     * Constructor for a floor.
     */
    constructor() {
        //Construct the superclass.
        super(new THREE.Vector3(0, 0, 0));
        
        //Ball
        /*
        this.addObjectToGroup(new THREE.Mesh(
            new THREE.BoxGeometry(100, 40, 1),
            new THREE.MeshPhongMaterial({
                color: 0x0000FF
            })
        ));
        */

        //Define any physical properties the floor may have.
        let physicsProperties = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3(100, 40, 1))
        });
        physicsProperties.position.copy(new THREE.Vector3(-45, 20, -200));
        this.addPhysics(physicsProperties);

        /**
         * Updates the Floor. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime) { }
    }
}