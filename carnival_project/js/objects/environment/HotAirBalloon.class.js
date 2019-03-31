/**
 * A class representing a HotAirBalloon
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 06/03/2019
 * @version 1.0 - 06/03/2019
 */
class HotAirBalloon extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the tent.
     * @param {THREE.Vector3} position - Where the HotAirBalloon is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the HotAirBalloon model.
        const AIRBALLOON = ENGINE.ObjectLoader().loadModel(
            'airballoon',
            'glb'
        );
        let once = true;

        //Scale and position the HotAirBalloon
        AIRBALLOON.model.scale.set(5, 5, 5);
        AIRBALLOON.model.rotation.set(0, 0, 0);
        AIRBALLOON.model.position.set(-50, 100, -750);
        AIRBALLOON.model.castShadow = true;
        AIRBALLOON.model.receiveShadow = true;
        this.addObjectToGroup(AIRBALLOON.model);

        //[updateCount] Counts how many times this class has
        //been updated.
        let updateCount = 0;
        //[M_SPEED] How fast the balloon travels.
        const M_SPEED = 300;
        //[M_HEIGHT] How height the balloon rises.
        const M_HEIGHT = 100;

        /**
         * Updates the HotAirBalloon. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //Make the hot air balloon bob up and down.
            AIRBALLOON.model.position.y = Math.sin(++updateCount / M_SPEED) * M_HEIGHT;
            if(once) {
                once = false;
                let scene = AIRBALLOON.model.children[0];
                //Make the Terrain be able to receive and cast shadows 
                //from the other models in the environment.
                //Search though the object tree and change the material of every mesh.
                if(scene) {
                    let object = scene.children[0];
                    if(object) {
                        let meshes = object.children;

                        //Change the material of every mesh.
                        meshes.forEach(mesh => {
                            mesh.castShadow = true;
                            mesh.receiveShadow = true;
                        });
                    }
                }
            }//end of if(once)
        }
    }
}
