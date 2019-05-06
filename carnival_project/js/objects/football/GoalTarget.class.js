/**
 * Football goal for kicking game
 * for scale objects in our world
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Luke Rose
 * @date 21/02/2019
 * @version 1.0 - 21/02/2019
 */
class GoalTarget extends ENGINE.OBJECTS.ClassicObject
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

        //Right goal target
        let targetRight1 = new THREE.CylinderGeometry( 8, 8, 1, 32 );
        let targetRight2= new THREE.MeshBasicMaterial({ 
                map: ENGINE.TextureLoader().loadTexture( 'Targets/bullseye.jpeg' ),
                side: THREE.BackSide,
                flatShading: THREE.FlatShading});
        let targetRight = new THREE.Mesh(targetRight1, targetRight2);
        targetRight.castShadow = true;
        targetRight.receiveShadow = true;
        targetRight.position.x = -95;
        targetRight.position.y = 20;
        targetRight.position.z = -213;
        targetRight.rotation.z = Math.PI/2;

        
        //box material
        let box1 = new THREE.BoxGeometry(5, 5, 5);
        let box2 = new THREE.MeshPhongMaterial( { color: 0xffffff } );
        
        //Left boxes
        let boxLeft = new THREE.Mesh(box1, box2);
        boxLeft.castShadow = true;
        boxLeft.receiveShadow = true;
        boxLeft.position.set(-95, 2.5, -180);

        let boxLeft1 = new THREE.Mesh(box1, box2);
        boxLeft1.castShadow = true;
        boxLeft1.receiveShadow = true;
        boxLeft1.position.set(-95, 2.5, -187);

        let boxLeft2 = new THREE.Mesh(box1, box2);
        boxLeft2.castShadow = true;
        boxLeft2.receiveShadow = true;
        boxLeft2.position.set(-95, 2.5, -194);

        let boxLeft3 = new THREE.Mesh(box1, box2);
        boxLeft3.castShadow = true;
        boxLeft3.receiveShadow = true;
        boxLeft3.position.set(-95, 7.5, -183.5);

        let boxLeft4 = new THREE.Mesh(box1, box2);
        boxLeft4.castShadow = true;
        boxLeft4.receiveShadow = true;
        boxLeft4.position.set(-95, 7.5, -190.5);

        let boxLeft5 = new THREE.Mesh(box1, box2);
        boxLeft5.castShadow = true;
        boxLeft5.receiveShadow = true;
        boxLeft5.position.set(-95, 12.5, -187);


        //Right boxes
        let boxRight = new THREE.Mesh(box1, box2);
        boxRight.castShadow = true;
        boxRight.receiveShadow = true;
        boxRight.position.set(-95, 2.5, -230);

        let boxRight1 = new THREE.Mesh(box1, box2);
        boxRight1.castShadow = true;
        boxRight1.receiveShadow = true;
        boxRight1.position.set(-95, 2.5, -237);
        
        let boxRight2 = new THREE.Mesh(box1, box2);
        boxRight2.castShadow = true;
        boxRight2.receiveShadow = true;
        boxRight2.position.set(-95, 2.5, -244);

        let boxRight3 = new THREE.Mesh(box1, box2);
        boxRight3.castShadow = true;
        boxRight3.receiveShadow = true;
        boxRight3.position.set(-95, 7.5, -233.5);

        let boxRight4 = new THREE.Mesh(box1, box2);
        boxRight4.castShadow = true;
        boxRight4.receiveShadow = true;
        boxRight4.position.set(-95, 7.5, -240.5);

        let boxRight5 = new THREE.Mesh(box1, box2);
        boxRight5.castShadow = true;
        boxRight5.receiveShadow = true;
        boxRight5.position.set(-95, 12.5, -237);

        //Add object to group
        this.addObjectToGroup(targetRight);
        this.addObjectToGroup(boxLeft);
        this.addObjectToGroup(boxLeft1);
        this.addObjectToGroup(boxLeft2);
        this.addObjectToGroup(boxLeft3);
        this.addObjectToGroup(boxLeft4);
        this.addObjectToGroup(boxLeft5);

        this.addObjectToGroup(boxRight);
        this.addObjectToGroup(boxRight1);
        this.addObjectToGroup(boxRight2);
        this.addObjectToGroup(boxRight3);
        this.addObjectToGroup(boxRight4);
        this.addObjectToGroup(boxRight5);

        //Scale and position the game.
        this.getInstance().scale.set(0.75, 0.75, 0.75);
        this.getInstance().position.set(0, 0, 0);
        
        this.update = function(frameTime)
        {
            
        }
    }

}
