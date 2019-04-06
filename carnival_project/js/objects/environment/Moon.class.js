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
        //let exmoonLight = new THREE.HemisphereLight(0x375D9C, 0x444444, 4);//0xFFFFFF, 0x444444
        //let moonLight = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF, 1);//0xFFFFFF, 0x444444
        //moonLight.position.set(0.0, 20.0, 0.0);
        //moonLight.castShadow = true;
        //this.addObjectToGroup(moonLight);
        /** 
        let exmoonLight = new THREE.HemisphereLight(0x375D9C, 0x444444, 4);//0xFFFFFF, 0x444444
        let moonLight = new THREE.PointLight(0xFFFFFF, 1, 100);//0xFFFFFF, 0x444444
        moonLight.position.set(600.0, 100, 300.0);
        moonLight.castShadow = true;
        let pointerLightHelper = new THREE.PointLightHelper(moonLight,50);
        this.addObjectToGroup(moonLight);
        this.addObjectToGroup(pointerLightHelper);
        this.addObjectToGroup(exmoonLight);
*/
        let renderer = new THREE.WebGLRenderer();
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        let moonLight = new THREE.DirectionalLight( 0x4F8AD9, 1.8);
        moonLight.position.set(-400.0, 900, 200.0);
        moonLight.castShadow = true;
        this.addObjectToGroup( moonLight );
        
        moonLight.shadow.mapSize.width = 1024;  
        moonLight.shadow.mapSize.height = 1024;
        moonLight.shadow.camera.near = 500;    
        moonLight.shadow.camera.far = 1000;     
        moonLight.shadow.camera.fov = 30;

        let helper = new THREE.CameraHelper( moonLight.shadow.camera );
        this.addObjectToGroup( helper );

        //Add the Moon model.
        const MOON = ENGINE.ObjectLoader().loadModel(
            'moon',
            'gltf'
        );
        
        //Scale and position the HotAirBalloon
        MOON.model.scale.multiplyScalar(20);
        MOON.model.position.copy(position);
        this.addObjectToGroup(MOON.model);
        

        let once = true;

        /**
         * Updates the Moon. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
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