/**
 * A class representing a Duck
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 06/03/2019
 * @version 1.0 - 06/03/2019
 */
class Duck extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the duck.
     * @param {THREE.Vector3} position - Where the Duk is located.
     */
    constructor(position)
    {
        console.log('constructing duck');
        //Construct the superclass.
        super(position);

        //Add the HotAirBalloon model.
        const DUCK = ENGINE.ObjectLoader().loadModel(
            'duck',
            'glb'
        );
        const DUCK2 = ENGINE.ObjectLoader().loadModel(
            'duck',
            'glb'
        );
        let once = true;
        let twice = true;

        //Scale and position the HotAirBalloon
        DUCK.model.scale.set(5, 5, 5);
        DUCK.model.rotation.set(0, 0, 0);
        DUCK.model.position.set(-150, -14, -700);
        DUCK.model.castShadow = true;
        DUCK.model.receiveShadow = true;
        this.addObjectToGroup(DUCK.model);

        //Scale and position the HotAirBalloon
        DUCK2.model.scale.set(5, 5, 5);
        DUCK2.model.rotation.set(0, 0, 0);
        DUCK2.model.position.set(-300, -14, -700);
        DUCK2.model.castShadow = true;
        DUCK2.model.receiveShadow = true;
        this.addObjectToGroup(DUCK2.model);



        this.MoveDucks = function(){
        DUCK.model.position.z = -700 +Math.sin(++updateCount/100)*10;
        DUCK.model.position.x =-200 +Math.cos(++updateCount/100)*10;

        DUCK2.model.position.z = -700 -Math.sin(++updateCount/100)*10;
        DUCK2.model.position.x =-280 -Math.cos(++updateCount/100)*10;
        }


        //[updateCount] Counts how many times this class has
        //been updated.
        let updateCount = 0;

        /**
         * Updates the HotAirBalloon. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //this is for the animation of the duck
            this.MoveDucks(); 
                
    
            if(once) {
                once = false;
                let scene = DUCK.model.children[0];
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
                }
                 if(twice) {
                twice = false;
                let scene2 = DUCK2.model.children[0];
                //Make the Terrain be able to receive and cast shadows 
                //from the other models in the environment.
                //Search though the object tree and change the material of every mesh.
                if(scene2) {
                    let object = scene2.children[0];
                    if(object) {
                        let meshes = object.children;

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