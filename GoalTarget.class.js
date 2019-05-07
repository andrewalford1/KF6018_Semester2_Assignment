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

        
        
        //Add object to group
        this.addObjectToGroup(targetRight);

        //Scale and position the game.
        this.getInstance().scale.set(0.75, 0.75, 0.75);
        this.getInstance().position.set(0, 0, 0);
        
        this.update = function(frameTime)
        {
            
        }
    }

}
