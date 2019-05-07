/**
 * Physics Cubes for the goal
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Luke Rose
 * @date 1/05/2019
 * @version 1.0 - 3/05/2019
 */
class RightBox4 extends ENGINE.OBJECTS.ClassicObject
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
        
        this.addObjectToGroup(new THREE.Mesh(
            new THREE.BoxGeometry(5, 5, 5),
            new THREE.MeshPhongMaterial({
                color: 0x0000FF,
                castShadows: true,
                receiveShadows: true
            })
        ));

        //Left Boxes
            //Left Box 1
            //Define any physical properties the object may have.
            let physicsProperties = new CANNON.Body({
                mass: 20,
                shape: new CANNON.Box(new CANNON.Vec3(2.5, 2.5, 2.5))
            });
            physicsProperties.position.copy(new THREE.Vector3(-75, 10.1, -173.5));

        //add the physics objects
        this.addPhysics(physicsProperties);

        this.update = function(frameTime)
        {
            //Fence does not need to update.
        }
    }

}