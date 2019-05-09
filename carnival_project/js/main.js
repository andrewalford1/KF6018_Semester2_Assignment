"use strict";

//[parameters] Retrieves parameters from the projects URL.
let parameters = (function () {

    //[url] The project's URL
    let url = new URL(window.location.href);

    //[useKinect] If 'true' the kinect will be used.
    let useKinect = Boolean(parseInt(url.searchParams.get('useKinect'), 10));
    console.log(`use kinect:\t${useKinect}`);

    //[IP] The kinectron IP address.
    let IP = url.searchParams.get('ip');

    return {
        useKinect: useKinect || true,
        IP: IP || '192.168.60.56'
    };
})();

//[camera] Films the scene.
let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);
camera.position.set(0, 20, 25);
let controls = null;
if(!parameters.useKinect) { controls = new THREE.OrbitControls(camera); }

//[engine] Manages the scene.
let engine = engineFactory(camera, controls, false);

//[games] Holds all of our games.
let games = {
    darts : new DartsGame(),
    whackAMole : new WhackAMole(new THREE.Vector3(100, 0, 0)),
    strengthOMetre : new StrengthOMetre(),
};

let gestureControlledObjects = {
    moon: new Moon(new THREE.Vector3(-600, 280, -200)),
    firework: new Fireworks(new THREE.Vector3(-300, 250, -700)),
    fireball: new Fireball(new THREE.Vector3(85, 12, -402.5 )),
    cans: new Cans(new THREE.Vector3(-50, 0, -265)),
}

//Add all objects to the scene.
engine.addObjects(MODELS, [
    new BalloonCover(),
    new Banner(),
    new Duck(),
    new Fence(),
    new Floor(),
    new Football(),
    new GoalBoxes(),
    new Whale(),
    new GoalTarget(),
    games.darts,
    games.strengthOMetre,
    games.whackAMole,
    gestureControlledObjects.cans,
    gestureControlledObjects.fireball,
    gestureControlledObjects.firework,
    gestureControlledObjects.moon,
    new Helicopter(),
    new HotAirBalloon(new THREE.Vector3(0, 250, 0)),
    new MrBeep(),
    new MrBeepLatitude(),
    new MoreTents(),
    new PhysicsCubes(),
    new PhysicsCubes2(),
    new PhysicsCubes3(),
    new BackPhysicsWall(),
    new LeftPhysicsWall(),
    new RightPhysicsWall(),
    new Smoke(),
    new StreetLamp(),
    new Terrain(),
    new WackCover(),
    new WaterFountain(),
    //Boxes for Football
    //Left
    new LeftBox1(),
    new LeftBox2(),
    new LeftBox3(),
    new LeftBox4(),
    new LeftBox5(),
    new LeftBox6(),
    //Right
    new RightBox1(),
    new RightBox2(),
    new RightBox3(),
    new RightBox4(),
    new RightBox5(),
    new RightBox6(),
    new LightGUI()
]);

//[player] tracks the user playing the game.
let player = null;

if(parameters.useKinect) {
    player = playerFactory(engine);
    
    games.whackAMole.allocatePlayer(player);
    games.strengthOMetre.allocatePlayer(player);
    gestureControlledObjects.moon.allocatePlayer(player);
    gestureControlledObjects.firework.allocatePlayer(player);
    gestureControlledObjects.fireball.allocatePlayer(player);
    gestureControlledObjects.cans.allocatePlayer(player);
}

//Run the animation loop.
function animate() { engine.driver.update();}
animate();

if(parameters.useKinect) {
    //Kinect code.
    let kinect = kinectFactory(parameters.IP);
    kinect.startBodies(player);
    kinect.startTrackedBodies(player);
}
