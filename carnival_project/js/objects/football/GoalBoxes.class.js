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
        
        let BOX =  (new THREE.Mesh(
            new THREE.BoxGeometry(4, 4, 4),
            new THREE.MeshPhongMaterial({
                color: 0x0000FF
            })));

        let BOX2 =  (new THREE.Mesh(
            new THREE.BoxGeometry(4, 4, 4),
            new THREE.MeshPhongMaterial({
                color: 0x0000FF
            })));

        //box material
        let box1 = new THREE.BoxGeometry(5, 5, 5);
        let box2 = new THREE.MeshPhongMaterial( { color: 0xffffff } );

        let boxLeft = new THREE.Mesh(box1, box2);
        boxLeft.position.set(-50, -2, -2);
        let boxLeft1 = new THREE.Mesh(box1, box2);
        boxLeft1.position.set(-50, -2, -9);
        let boxLeft2 = new THREE.Mesh(box1, box2);
        boxLeft2.position.set(-50, -2, -16);
        let boxLeft3 = new THREE.Mesh(box1, box2);
        boxLeft3.position.set(-50, 3, -5.5);
        let boxLeft4 = new THREE.Mesh(box1, box2);
        boxLeft4.position.set(-50, 3, -12.5);
        let boxLeft5 = new THREE.Mesh(box1, box2);
        boxLeft5.position.set(-50, 8, -9);

        //Left Boxes
            //Left Box 1
            //Define any physical properties the object may have.
            let leftBox1 = new CANNON.Body({
                mass: 20,
                shape: new CANNON.Box(new CANNON.Vec3(2, 2, 2))
            });
            leftBox1.position.copy(new THREE.Vector3(-30, 5, -130));

            //Define any physical properties the object may have.
            let leftBox2 = new CANNON.Body({
                mass: 20,
                shape: new CANNON.Box(new CANNON.Vec3(2, 2, 2))
            });
            leftBox2.position.copy(new THREE.Vector3(-30, 5, -140));

        //add the physics objects
        this.addPhysics(leftBox1);
        this.addPhysics(leftBox2);

        this.addObjectToGroup(BOX);
        this.addObjectToGroup(BOX2);

        this.addObjectToGroup(boxLeft);
        this.addObjectToGroup(boxLeft1);
        this.addObjectToGroup(boxLeft2);
        this.addObjectToGroup(boxLeft3);
        this.addObjectToGroup(boxLeft4);
        this.addObjectToGroup(boxLeft5);

        this.getInstance().scale.set(0.75, 0.75, 0.75);
        this.getInstance().position.set(0, 0, 0);

        this.update = function(frameTime)
        {
            //Fence does not need to update.
        }
    }

}
