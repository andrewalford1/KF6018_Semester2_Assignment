/**
 * Physics Cubes
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Luke Rose
 * @date 1/05/2019
 * @version 1.0 - 21/02/2019
 */
class PhysicsCubes extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * constructor for a Basic Character.
     * @param {THREE.Vector3} initialPosition - The initial position of the
     *                                          character.
     */
    constructor(position)
    {
         //Construct the superclass.
        super(position);
        
        //Define any physical properties the object may have.
        let physicsProperties = new CANNON.Body({
            mass: 42,
            shape: new CANNON.Sphere(new CANNON.Vec3(42, 42, 42))
        });

        physicsProperties.position.copy(new THREE.Vector3(0, 70, 0));
        
        this.addPhysics(physicsProperties);
        
        this.update = function(frameTime)
        {
            //Fence does not need to update.
        }
    }

}
