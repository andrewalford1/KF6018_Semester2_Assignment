/**
 * A class representing the Moon.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Ana-Sabina Irimia
 * @date 30/03/2019
 * @version 5.0 - 30/03/2019
 */
class Moon extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the tent.
     * @param {THREE.Vector3} position - Where the Moon is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //ADD LIGHTING... (I have not figured out a good way to do lighting yet).
        let moonLight = new THREE.HemisphereLight(0x375D9C, 0x444444, 1);//0xFFFFFF, 0x444444
        //moonLight.position.set(0.0, 20.0, 0.0);
        //moonLight.castShadow = true;
        this.addObjectToGroup(moonLight);
        /** */

        //Add the HotAirBalloon model.
        const MOON = ENGINE.ObjectLoader().loadModel(
            'moon',
            'gltf'
        );
        
        //Scale and position the HotAirBalloon
        MOON.model.scale.multiplyScalar(20);
        //MOON.model.rotation.set(2, 3, 0);
        MOON.model.position.copy(position);
        MOON.model.castShadow = true;
        MOON.model.receiveShadow = true;
        this.addObjectToGroup(MOON.model);
        

        let once = true;

        /**
         * Updates the Moon. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //Moon does not need to update.
            console.log(MOON.model);
            MOON.model.rotation.y += 0.005;
            //Execute this code once on the first frame of animation.
            if(once)
            {
                once = false;
                let scene = MOON.model.children[0];

                //Search though the object tree and 
                //change the material of every mesh.
                if(scene)
                {
                    let object = scene.children[0];
                    if(object)
                    {
                        let secondObject = object.children[0];
                        if(secondObject){
                            let thirdObject = secondObject.children[0];
                            if(thirdObject){
                                let meshes = thirdObject.children;
                                //Change the material of every mesh.
                                meshes.forEach(mesh => {
                                    //let originalColour = mesh.material.color;
                                    mesh.material = new THREE.MeshPhysicalMaterial({
                                        color: 0x637697,
                                        roughness: 0.8,
                                        metalness: 0.5,
                                        reflectivity: 0.5
                                    });
                                });
                            }
                        }
                        
                    }
                }
            }
        }
    }
}

/**
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
                        */