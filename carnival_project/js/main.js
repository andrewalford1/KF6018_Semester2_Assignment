"use strict"

//[engineDriver] Used to manage all major engine components.
let engineDriver = ENGINE.Driver(
    new THREE.Scene(),
    ENGINE.Camera(new THREE.Vector3(0, 25, 50), false),
    ENGINE.ObjectManager(),
    true
);

//ADD LIGHTING... (I have not figured out a good way to do lighting yet).
let light = new THREE.HemisphereLight(0xFFFFFF, 0x444444);
light.position.set(0, 20, 0);
engineDriver.getScene().add(light);

//ADD OBJECTS...
engineDriver.getObjectManager().addObject(
    new BasicFloor(engineDriver.getCamera().getInstance().far)
);
engineDriver.getObjectManager().addObject(
    new WhackAMole(new THREE.Vector3(0, 0, 0))
);
engineDriver.getObjectManager().addObject(
    new StrengthOMetre(new THREE.Vector3(0, 0, 0))
);
engineDriver.getObjectManager().addObject(
    new BasicCharacter(new THREE.Vector3(25, 0, 0))
);
engineDriver.getObjectManager().addObject(
    new Goal(new THREE.Vector3(25, 0, 0))
);
engineDriver.getObjectManager().addObject(
    new CircusTent(new THREE.Vector3(50, 0, 0))
);
engineDriver.getObjectManager().addAllToScene(engineDriver.getScene());
engineDriver.getObjectManager().setAllActive(true);

//Skybox.
ENGINE.TextureLoader().loadSkybox('skybox', '.bmp', engineDriver.getScene());

/**
 * Animates the project.
 */
function animate()
{
    engineDriver.update();
}

//Run the animation loop.
animate();

///////////////////////////////////////////////////////////////////////////////
// Kinectron codes starting from here//////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//This is the player in the scene.
let player = new Player();
player.setActive(true);
player.addToScene(engineDriver.getScene());

// Initialize kinectron
const IP = '192.168.60.56';
// Define and create an instance of kinectron, you must
let kinectron= new Kinectron(IP);
// Create connection between remote and application
kinectron.makeConnection();
// Start tracked bodies and set callback
kinectron.startTrackedBodies(getBodies);

// The getBodiescallbackfunction: called once every time kinect obtains a frame
function getBodies(skeleton)
{
	for(let i = 0; i <= 24; i++)
	{
        let position = new THREE.Vector3(
            skeleton.joints[i].cameraX,
            skeleton.joints[i].cameraY,
            skeleton.joints[i].cameraZ
        );

        player.updateJoint(position, i);
    }
}
