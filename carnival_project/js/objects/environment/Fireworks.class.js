/**
 * A class representing the Fireworks.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoe Irwin
 * @date 30/03/2019
 * @version 5.0 - 30/03/2019
 */
class Fireworks extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the Fireworks.
     * @param {THREE.Vector3} position - Where the Fireworks is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        // An array of particles
    var geoArray = [];
    var matArray = [];
    var meshArray = [];
    var iNumber = 100;

    var posInititalArray = [];

    var dirArray = [];

    // Create the particles
    for (var i=0; i<iNumber; i++)
    {
    geoArray.push(new THREE.SphereGeometry(0.5, 6, 6));
    matArray.push(new THREE.MeshPhongMaterial( {color: Math.random() * 0xffffff, opacity: 0.3} ));
    meshArray.push(new THREE.Mesh(geoArray[i], matArray) );
    

    // For explosion
    meshArray[i].position.x = -300;
    meshArray[i].position.y = 250;
    meshArray[i].position.z = -700;
    dirArray.push(new THREE.Vector3() );
    dirArray[i].x = Math.random() * 2 - 0.25;
    dirArray[i].y = Math.random() * 2 - 0.25;
    dirArray[i].z = Math.random() * 2 - 0.25;
    

    // Backup initial position
    posInititalArray.push(new THREE.Vector3() );
    posInititalArray[i].x = meshArray[i].position.x;
    posInititalArray[i].y = meshArray[i].position.y;
    posInititalArray[i].z = meshArray[i].position.z;
    
    this.addObjectToGroup(meshArray[i]);

    };
        


        /**
         * Updates the Fireworks. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        var iFrame = 0;
        this.update = function(frameTime)
        {
            // Move the particles
        for (var i=0; i<iNumber; i++)
          {
        
          // Explosion
          meshArray[i].position.x = meshArray[i].position.x + dirArray[i].x;
             meshArray[i].position.y = meshArray[i].position.y + dirArray[i].y;
           meshArray[i].position.z = meshArray[i].position.z + dirArray[i].z;

            if (iFrame%100 == 0) 
            {
            meshArray[i].position.x = -300;
            meshArray[i].position.y = 250;
            meshArray[i].position.z = -700;
            }
    }    


    iFrame++;
        }
    }
}
          

