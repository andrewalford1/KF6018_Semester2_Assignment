/**
 * A class representing the world's floor.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Andrew Alford
 * @date 24/03/2019
 * @version 1.0 - 24/03/2019
 */
class Floor extends ENGINE.OBJECTS.ClassicObject {
    /**
     * Constructor for a floor.
     */
    constructor() {
        //Construct the superclass.
        super(new THREE.Vector3(0, 0, 0));

        //Define any physical properties the floor may have.
        let physicsProperties = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3(1000, 1, 1000))
        });
        physicsProperties.position.copy(new THREE.Vector3(0, 0, 0));
        this.addPhysics(physicsProperties);

        /**
         * Updates the Floor. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime) { }
    }
}