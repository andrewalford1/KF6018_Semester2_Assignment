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
 
        this.update = function(frameTime)
        {
            //Fence does not need to update.
        }
    }

}
