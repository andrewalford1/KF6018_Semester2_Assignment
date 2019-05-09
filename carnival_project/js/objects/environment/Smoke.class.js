/**
 * A class representing the Smoke.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author  Zoe Irwin
 * @date    30/03/2019
 * @version 5.1 - 04/04/2019
 */
class Smoke extends ENGINE.OBJECTS.ClassicObject {
    
    /**
     * Constructor for the Smoke.
     * @param {THREE.Vector3} position - Where the Smoke is located.
     */
    constructor(position) {
        //Construct the superclass.
        super(position);

        //[m_player] The player who controls the moon.
       // let m_player = null;

       // this.allocatePlayer = function(player) {
       //     m_player = player;
       // }

        //fire

    var geoArray = [];
    var matArray = [];
    var fireMeshArray = [];
    var iNumber = 1500;
    var posInititalArray = [];
    var dirArray = [];
    for (var i=0; i<iNumber; i++)
    {
        geoArray.push(new THREE.SphereGeometry(Math.random() - 0.1, 6, 6));
        matArray.push(new THREE.MeshPhongMaterial( {color: 0xffffff, opacity: 0.1 * Math.random() + 0.1} ));
        fireMeshArray.push(new THREE.Mesh(geoArray[i], matArray) );
        fireMeshArray[i].position.y = Math.random()*15 - 11;
       
        fireMeshArray[i].position.x = Math.random()*30.5 - 17.25;
        //fireMeshArray[i].position.z = Math.random()*3 - 10;
        this.addObjectToGroup(fireMeshArray[i]);
        this.getInstance().position.set(37, 15, -522 );

     }
        
        this.Smoke = function(){
            for (var i=0; i<iNumber; i++)
             {  

                // fire

            fireMeshArray[i].position.y = fireMeshArray[i].position.y + 0.1;

                if (fireMeshArray[i].position.y > 4.6)

                {

                    fireMeshArray[i].position.y = 1;

                }   

       

                }
        }

        /**
         * Updates the Fireworks. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime) 
        {
          //  console.log(m_player);
        //  if(m_player.geustures.IsSmashingHammer()) 
        // {
                //Fireworks
                this.Smoke();    
        //  }

        }
    }
}
