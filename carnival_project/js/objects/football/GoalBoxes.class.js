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
        
        //Ball
        this.addObjectToGroup(new THREE.Mesh(
            new THREE.BoxGeometry(5, 5, 5),
            new THREE.MeshPhongMaterial({
                color: 0x0000FF
            })
        ));

        //Left Boxes
            //Left Box 1
            //Define any physical properties the object may have.
            let leftBox1 = new CANNON.Body({
                mass: 20,
                shape: new CANNON.Box(new CANNON.Vec3(2.5, 2.5, 2.5))
            });
            leftBox1.position.copy(new THREE.Vector3(-70, 5, -130));

            //Left Box 2
            //Define any physical properties the object may have.
            let leftBox2 = new CANNON.Body({
                mass: 20,
                shape: new CANNON.Box(new CANNON.Vec3(2.5, 2.5, 2.5))
            });
            leftBox2.position.copy(new THREE.Vector3(-70, 5, -135));
        

        //add the physics objects
        this.addPhysics(leftBox1);
        this.addPhysics(leftBox2);

        this.update = function(frameTime)
        {
            //Fence does not need to update.
        }
    }

}
