"use strict"

//[engineDriver] Used to manage all major engine components.
let engineDriver = ENGINE.Driver(
    new THREE.Scene(),
    ENGINE.Camera(new THREE.Vector3(0, 25, 50), false),
    ENGINE.ObjectManager(),
    false //Debug Mode
);

//ADD LIGHTING... (I have not figured out a good way to do lighting yet).
let light = new THREE.HemisphereLight(0xFFFFFF, 0x444444);
light.position.set(0, 20, 0);
engineDriver.getScene().add(light);

ENGINE.DEBUGGER.extractJSON(MODELS)
.enviroment.forEach(model => {
    engineDriver.getObjectManager().addObject(
        new ENGINE.OBJECTS.Model(model));
});

//ADD OBJECTS USING JS CLASSES...
engineDriver.getObjectManager().addObjects([
    //Characters
    new BasicCharacter(new THREE.Vector3(25, 0, 0)),
    new Boy(new THREE.Vector3(25, 0, 0)),
    new GirlSitting(new THREE.Vector3(0, 0, 0)),
    new Jack(new THREE.Vector3(0, 0, 0)),
    //Darts Game
    new DartsGame(new THREE.Vector3(0, 0, 0)),
    //Enviroment
    new BalloonArch(new THREE.Vector3(0, 0, 0)),
    new Carousel(new THREE.Vector3(0, 0, 0)),
    new CircusTent(new THREE.Vector3(50, 0, 0)),
    new Helicopter(new THREE.Vector3(0, 0, 0)),
    new HotAirBalloon(new THREE.Vector3(0, 250, 0)),
    new MoreBalloons(new THREE.Vector3(0, 0, 0)),
    new RollerCoaster(new THREE.Vector3(0, 0, 0)),
    new SmallTent(new THREE.Vector3(0, 0, 0)),
    new StreetLamp(new THREE.Vector3(0, 0, 0)),
    new Teacup(new THREE.Vector3(25, 0, 0)),
    new Terrain(new THREE.Vector3(0, 0, 0)),
    //Football Game
    new Football(new THREE.Vector3(0, 0, 0)),
    new Goal(new THREE.Vector3(25, 0, 0)),
    //Strength-o-Meter Game
    new StrengthOMetre(new THREE.Vector3(0, 0, 0)),
    //Whack-a-Mole Game
    new WhackAMole(new THREE.Vector3(0, 0, 0))
]);
engineDriver.getObjectManager().addAllToScene(engineDriver.getScene());
engineDriver.getObjectManager().setAllActive(true);


// //Load models from JSON file
// let xmlhttp = new XMLHttpRequest();
// xmlhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
    
//     //ADD OBJECTS USING JSON...
//     ENGINE.DEBUGGER.extractJSON(this.responseText)
//     .enviroment.forEach(model => {
//         engineDriver.getObjectManager().addObject(
//             new ENGINE.OBJECTS.Model(model));
//     });

//     //ADD OBJECTS USING JS CLASSES...
//     engineDriver.getObjectManager().addObjects([
//         //Characters
//         new BasicCharacter(new THREE.Vector3(25, 0, 0)),
//         new Boy(new THREE.Vector3(25, 0, 0)),
//         new GirlSitting(new THREE.Vector3(0, 0, 0)),
//         new Jack(new THREE.Vector3(0, 0, 0)),
//         //Darts Game
//         new DartsGame(new THREE.Vector3(0, 0, 0)),
//         //Enviroment
//         new BalloonArch(new THREE.Vector3(0, 0, 0)),
//         new Carousel(new THREE.Vector3(0, 0, 0)),
//         new CircusTent(new THREE.Vector3(50, 0, 0)),
//         new Helicopter(new THREE.Vector3(0, 0, 0)),
//         new HotAirBalloon(new THREE.Vector3(0, 250, 0)),
//         new MoreBalloons(new THREE.Vector3(0, 0, 0)),
//         new RollerCoaster(new THREE.Vector3(0, 0, 0)),
//         new SmallTent(new THREE.Vector3(0, 0, 0)),
//         new StreetLamp(new THREE.Vector3(0, 0, 0)),
//         new Teacup(new THREE.Vector3(25, 0, 0)),
//         new Terrain(new THREE.Vector3(0, 0, 0)),
//         //Football Game
//         new Football(new THREE.Vector3(0, 0, 0)),
//         new Goal(new THREE.Vector3(25, 0, 0)),
//         //Strength-o-Meter Game
//         new StrengthOMetre(new THREE.Vector3(0, 0, 0)),
//         //Whack-a-Mole Game
//         new WhackAMole(new THREE.Vector3(0, 0, 0))
//     ]);
//     engineDriver.getObjectManager().addAllToScene(engineDriver.getScene());
//     engineDriver.getObjectManager().setAllActive(true);
//   }
// };
// xmlhttp.open("GET", "json/models.json", true);
// xmlhttp.send();

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

// Initialize kinectron
const IP = '192.168.60.56';
// Define and create an instance of kinectron, you must
let kinectron= new Kinectron(IP);
// Create connection between remote and application
kinectron.makeConnection();

//This is the player in the scene.
let player = new Player();
player.setActive(true);
//player.attachCamera(kinectron.HEAD, engineDriver.getCamera().getInstance());
player.addToScene(engineDriver.getScene());

// Start tracked bodies and set callback
kinectron.startTrackedBodies(getBodies);

// The getBodiescallbackfunction: called once every time kinect obtains a frame
function getBodies(skeleton)
{
    if(ENGINE.isLoaded())
    {
        for(let i = 0; i <= 24; i++)
        {
            let position = new THREE.Vector3(
                skeleton.joints[i].cameraX,
                skeleton.joints[i].cameraY,
                skeleton.joints[i].cameraZ
            );
                
            let orientation = new THREE.Quaternion(
                skeleton.joints[i].orientationX,
                skeleton.joints[i].orientationX,
                skeleton.joints[i].orientationZ,
                skeleton.joints[i].orientationW 
            );
                    
            player.updateJoint(position, orientation, i);
        }
    }
}
