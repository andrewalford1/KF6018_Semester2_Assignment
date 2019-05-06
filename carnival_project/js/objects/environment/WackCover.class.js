/**
 * A class representing a WackCover.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 05/03/2019
 * @version 1.0 - 05/03/2019
 */
class WackCover extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the WackCover.
     * @param {THREE.Vector3} position - Where the WackCover is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the WackCover model.
        const WACKCOVER = ENGINE.ObjectLoader().loadModel(
            'wackCover',
            'glb'
        );
        let once = true;
        
        //Scale and position the WackCover
        WACKCOVER.model.scale.set(12, 12, 12);
        WACKCOVER.model.position.set(-20, -0.3, -220);
        WACKCOVER.model.rotation.set(0, Math.PI/ 2, 0);
        
        this.addObjectToGroup(WACKCOVER.model);
        /**
         * Updates the WackCover. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
           //The WackCover is not updated.
           if(once) {
                once = false;
                let scene = WACKCOVER.model.children[0];
                //Make the WACKCOVER receive and cast shadows 
                //from the other models in the environment.
                //Search though the object tree and change the material of every mesh.
                if(scene) {
                    let object = scene.children[0];
                    if(object) {
                        let object2 = object.children[0];
                        if(object2) {
                            let object3 = object2.children[0];
                            if(object3) {
                                let object4 = object3.children[0];
                                if(object4) {
                                    let object5 = object4.children[0];
                                    if(object5){
                                         let meshes = object5.children;
                                         //Change the material of every mesh.
                                         meshes.forEach(mesh => {
                                         mesh.castShadow = true;
                                         mesh.receiveShadow = true;
                                         });
                                    }
                                }
                             }
                        }
                    }
                }
            }//end of if(once) 
        }
    }

}