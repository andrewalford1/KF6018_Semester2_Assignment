/**
 * A class representing a football object.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Andrew Alford & Zoë Irwin
 * @date 26/02/2019
 * @version 1.2 - 12/03/2019
 */
class Terrain extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the dart.
     * @param {THREE.Vector3} position - Where the dart is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the dart model.
        const TERRAIN = ENGINE.ObjectLoader().loadModel(
            'terrain_obj',
            'glb'
        );
        //Scale and position the dart
        TERRAIN.model.scale.set(30.5, 20.5, 30.5);
        TERRAIN.model.rotation.set(0, 0, 0);
        TERRAIN.model.position.set(0, -4, 0);
        this.addObjectToGroup(TERRAIN.model);
        
        //[once] Boolean to check if the first 
        //frame of animation is being executed.
        let once = true;

        /**
         * Updates the dart. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //Execute this code once on the first frame of animation.
            if(once)
            {
                once = false;
                let scene = TERRAIN.model.children[0];

                //Search though the object tree and 
                //change the material of every mesh.
                if(scene)
                {
                    let object = scene.children[0];
                    if(object)
                    {
                        let meshes = object.children;

                        //Change the material of every mesh.
                        meshes.forEach(mesh => {
                            let originalColour = mesh.material.color;
                            mesh.material = new THREE.MeshPhysicalMaterial({
                                color: originalColour,
                                roughness: 0.8,
                                metalness: 0.6,
                                reflectivity: 0.5
                            });
                        });
                    }
                }
            }
            //Circus dart does not need to update.
        }
    }
}