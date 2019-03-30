/**
 * A test object to show off physics.
 * @extends ENGINE.OBJECT
 * @author Andrew Alford
 * @date 23/03/2019
 * @version 1.0 - 23/03/2019
 */
class Cube extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the Test Object.
     * @param {THREE.Vector3} initialPosition - The initial position 
     *                                          the Cube.
     */
    constructor(initialPosition)
    {
        //Construct the superclass.
        super(initialPosition);

        this.addObjectToGroup(new THREE.Mesh(
            new THREE.BoxGeometry(30, 30, 30),
            new THREE.MeshPhongMaterial({
                color: 0x0000FF
            })
        ));

        let physicsProperties = new CANNON.Body({
            shape: new CANNON.Box(new CANNON.Vec3(30, 30, 30)),
            mass: 3
        });
        physicsProperties.angularVelocity.set(0, 50, 0);
        physicsProperties.angularDamping = 0.5;
        physicsProperties.position.copy(initialPosition);
        //this.addPhysics(physicsProperties);

        /**
         * Updates the object. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute
         *                              the previous frame of 
         *                              animation.
         */
        this.update = function(frameTime) { }
    }
}