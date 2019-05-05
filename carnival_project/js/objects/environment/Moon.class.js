/**
 * A class representing the Moon.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Ana-Sabina Irimia
 * @date 30/03/2019
 * @version 5.1 - 03/05/2019
 */
class Moon extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the moon.
     * @param {THREE.Vector3} position - Where the Moon is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //[m_player] The player who controls the moon.
        let m_player = null;

        let firstTime = true;
        //ADD LIGHTING... 

        let renderer = new THREE.WebGLRenderer();
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        //DirectionalLight for the environment light
        let moonLight = new THREE.DirectionalLight( 0x4F8AD9, 0.7);
        moonLight.position.set(400.0, 700, -200.0);
        moonLight.castShadow = true;
        moonLight.shadow.mapSize.width = 1024;  
        moonLight.shadow.mapSize.height = 1024;
        moonLight.shadow.camera.near = 500;    
        moonLight.shadow.camera.far = 1000;     
        //moonLight.shadow.camera.fov = 30;
        this.addObjectToGroup( moonLight );

        //let helper = new THREE.CameraHelper( moonLight.shadow.camera );
        //this.addObjectToGroup( helper );

        //PointLight to light up the MOON.model
        let lightUpTheMoon = new THREE.PointLight(0x4F8AD9, 2, 10000, 1);
        lightUpTheMoon.position.set(-500, 270, -100);
        lightUpTheMoon.castShadow = true;
        this.addObjectToGroup(lightUpTheMoon);

        //Add the Moon model.
        const MOON = ENGINE.ObjectLoader().loadModel(
            'moon',
            'gltf'
        );
        
        //Scale and position the HotAirBalloon
        MOON.model.scale.multiplyScalar(20);
        MOON.model.position.copy(position);
        this.addObjectToGroup(MOON.model);

        this.allocatePlayer = function(player) {
            m_player = player;
        }
        
        this.RotateMoon = function(){
             MOON.model.rotation.x = 0;
             MOON.model.rotation.y += 0.005;
             MOON.model.rotation.z = 0;
        }

        this.Initialise = function() {
            //Execute this code once on the first frame of animation.
            if(firstTime)
            {
                firstTime = false;
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
                                        color: 0xffffff,//0x637697
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

        /**
         * Updates the Moon. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            this.Initialise();
            //Makes the moon spin
            this.RotateMoon();

            if(m_player.geustures.MoonIsMooning()) {
                //Moon will moon the player
                MOON.model.rotation.set(-0.1, -2.0, -0.1);
            }
             if(m_player.geustures.MoonIsSpying()){
                 //Moon will face the player
                 MOON.model.rotation.set(0.6, 0.9, -0.4);
                 //this.RotateMoon();
             }

        }//end of update

    }//end of constructor

}//end of Moon class

