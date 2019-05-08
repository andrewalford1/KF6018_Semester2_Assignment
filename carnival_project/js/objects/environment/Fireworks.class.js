/**
 * A class representing the Fireworks.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author  Zoe Irwin
 * @date    30/03/2019
 * @version 5.1 - 04/04/2019
 */
class Fireworks extends ENGINE.OBJECTS.ClassicObject {
    
    /**
     * Constructor for the Fireworks.
     * @param {THREE.Vector3} position - Where the Fireworks is located.
     */
    constructor(position) {
        //Construct the superclass.
        super(position);

        //[m_player] The player who controls the moon.
        let m_player = null;

        this.allocatePlayer = function(player) {
            m_player = player;
        }

        // An array of particles
        let meshArray = [];
        let iNumber = 100;
        let posInititalArray = [];
        let dirArray = [];

        // Create the particles
        for (let i = 0; i < iNumber; i++) {
            meshArray.push(new THREE.Mesh(
                new THREE.SphereGeometry(1.3, 6, 6), 
                new THREE.MeshPhongMaterial({
                    color: Math.random() * 0xffffff, 
                    opacity: 0.3
                })
            ));

            // For explosion
            meshArray[i].position.set(-300, 250, -700); 

            dirArray.push(new THREE.Vector3(
                Math.random() * 2 - 0.25,
                Math.random() * 2 - 0.25,
                Math.random() * 2 - 0.25
            ));
    
            // Backup initial position
            posInititalArray.push(new THREE.Vector3() );
            posInititalArray[i].copy(meshArray[i]);
            this.addObjectToGroup(meshArray[i])
        };
        
        this.ExplosionFireworks = function(){
             // Move the particles
            for (let i=0; i<iNumber; i++) {
                // Explosion
                meshArray[i].position.add(dirArray[i]);
                if (iFrame % 100 == 0) { 
                    meshArray[i].position.set(-300, 250, -700); 
                }
            }    
            iFrame++;
        }

        let iFrame = 0;
        /**
         * Updates the Fireworks. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime) 
        {
            if(m_player && !(m_player.gestures === undefined)) {
                //  console.log(m_player);
                if(m_player.gestures.RFootToLKnee()) { 
                      //Fireworks
                      this.ExplosionFireworks();    
                }
            }
        }
    }
}
          

