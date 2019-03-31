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
        let once;
        
        //Scale and position the WackCover
        WACKCOVER.model.scale.set(12, 12, 12);
        WACKCOVER.model.rotation.set(0, Math.PI/ 2, 0);
        WACKCOVER.model.position.set(-20, 0, -220);
        this.addObjectToGroup(WACKCOVER.model);

        /**
         * Updates the WackCover. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            ///Still have to work on this
            if(once) {
                once = false;
                let scene = WACKCOVER.model.children[0];
                //Make the Terrain be able to receive and cast shadows 
                //from the other models in the environment.
                //Search though the object tree and change the material of every mesh.
                if(scene) {
                    let object = scene.children[0];
                    if(object) {
                        let secondObject = object.children[0];
                        if(secondObject){
                            let thirdObject = secondObject.children[0];
                            if(thirdObject){
                                let forthObject = thirdObject.children[0];
                                if(forthObject){
                                    let parent = forthObject.children[0];
                                    if(parent){
                                        let parentObject = parent.children[0];
                                        if(parentObject){
                                            let secondParentObject = parentObject.children[0];
                                            if(secondParentObject){
                                                let meshes = secondParentObject.children;
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
                    }
                }
            }//end of if(once)
        }
    }

}