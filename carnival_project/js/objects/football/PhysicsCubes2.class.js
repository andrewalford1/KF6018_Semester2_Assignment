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
        
        //Tracks the user playing the game.
        let m_player = {
            leftFoot  : null,
            rightFoot : null
            
        };

        //Ball
        let Ball = new THREE.Mesh(
            new THREE.SphereGeometry(3, 32, 32),
            new THREE.MeshStandardMaterial({
                color: 0x0000FF
            })
        );
        Ball.castShadow = true;
        Ball.receiveShadow = true;

        this.addObjectToGroup(Ball);

        //Left Boxes
            //Left Box 1
            //Define any physical properties the object may have.
            let physicsProperties = new CANNON.Body({
                mass: 800,
                shape: new CANNON.Box(new CANNON.Vec3(3, 3, 3))
            });
            physicsProperties.position.copy(new THREE.Vector3(-5, 4, -137));


        //add the physics objects
        this.addPhysics(physicsProperties);

        /**
         * @brief Assigned a player to the game.
         * @param {Player} player - Who is playing the game?
         */
        this.allocatePlayer = function(player) {
            m_player.leftFoot = player.bones.FOOT_LEFT.collider;
            m_player.rightFoot = player.bones.FOOT_RIGHT.collider;
        }

        //[collider] Tracks collision.
        let collider = setUpCollider();
        //Private Methods...

        /**
         * @returns a collider created from the head mesh.
         */
        function setUpCollider()
        {
            return collisionFactory(
                Ball, 
                new THREE.Matrix4().setPosition(
                    new THREE.Vector3(0, -1.25, 0)
                ), 
                true,
                0x0000FF
            );
            
        }

        /**
         * Updates all colliders.
         */
        function updateCollider()
        {
            collider.update();
            if(collider.collided) {
                Ball.material.color.setHex(0xFF0000);
                physicsProperties.angularVelocity.set(0, 0, 25);
                physicsProperties.angularDamping = 0.1;
            } else {
                Ball.material.color.setHex(0x0000FF);
            }
        }

        /**
         * @returns The Mole's collison box.
         */
        this.getCollider = function()
        {
            return collider;
        }

        this.update = function(frameTime)
        {
            if(m_player.leftFoot && m_player.rightFoot) {
                    collider.checkCollisions([
                        m_player.leftFoot,
                        m_player.rightFoot
                    ]);
                }
            updateCollider();
        }
    }

}