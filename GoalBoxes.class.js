/**
 * Physics Cubes for the goal
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Luke Rose
 * @date 1/05/2019
 * @version 1.0 - 3/05/2019
 */
class GoalBoxes extends ENGINE.OBJECTS.ClassicObject
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
        
        /*
        this.addObjectToGroup(new THREE.Mesh(
            new THREE.BoxGeometry(4, 4, 4),
            new THREE.MeshPhongMaterial({
                color: 0x0000FF
            })
        ));

        //Left Boxes
            //Left Box 1
            //Define any physical properties the object may have.
            let leftBox1 = new CANNON.Body({
                mass: 20,
                shape: new CANNON.Box(new CANNON.Vec3(2, 2, 2))
            });
            leftBox1.position.copy(new THREE.Vector3(-30, 5, -130));

        //add the physics objects
        this.addPhysics(leftBox1);

        this.getInstance().scale.set(0.75, 0.75, 0.75);
        this.getInstance().position.set(0, 0, 0);
        */
        this.update = function(frameTime)
        {
            //Fence does not need to update.
        }
    }

}
