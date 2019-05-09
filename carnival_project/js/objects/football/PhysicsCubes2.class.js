/**
 * Physics Cubes
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Luke Rose
 * @date 1/05/2019
 * @version 1.0 - 21/02/2019
 */
class PhysicsCubes2 extends ENGINE.OBJECTS.ClassicObject
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
        
        //Ball
        this.addObjectToGroup(new THREE.Mesh(
            new THREE.SphereGeometry(3, 32, 32),
            new THREE.MeshPhongMaterial({
                color: 0x0000FF
            })
        ));

        //Left Boxes
            //Left Box 1
            //Define any physical properties the object may have.
            let physicsProperties = new CANNON.Body({
                mass: 800,
                shape: new CANNON.Box(new CANNON.Vec3(3, 3, 3))
            });
            physicsProperties.position.copy(new THREE.Vector3(-5, 4, -137));
            physicsProperties.angularVelocity.set(0, 0, 25);
            physicsProperties.angularDamping = 0.1;


        //add the physics objects
        this.addPhysics(physicsProperties);

        this.update = function(frameTime)
        {
            //Fence does not need to update.
        }
    }

}