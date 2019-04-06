"use strict"

let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);
camera.position.set(0, 25, 20);

let engine = engineFactory(camera, false);

//[games] Holds all of our games.
let games = {
    darts : new DartsGame(),
    whackAMole : new WhackAMole(new THREE.Vector3(100, 0, 0)),
    strengthOMetre : new StrengthOMetre()
};

//Add all objects to the scene.
engine.addObjects(MODELS, [
    //Enviroment
    new Fireworks(),
    new BalloonCover(),
    new Floor(),
    new Helicopter(),
    new HotAirBalloon(new THREE.Vector3(0, 250, 0)),
    new Moon(new THREE.Vector3(-600, 280, -400)),
    new MoreTents(),
    new Terrain(),
    //new StreetLamp(),
    new WackCover(),
    //Games
    games.darts,
    new Football(),
    new Goal(new THREE.Vector3(25, 0, 0)),
    games.strengthOMetre,
    games.whackAMole
]);

let player = playerFactory(null, engine.scene);//camera,engine.scene
let guestures = new UserGestures(player);

//Allocate the player to the games.
games.whackAMole.allocatePlayer(player);

//Run the animation loop.
function animate() { engine.driver.update(); guestures.update();}
animate();

//Kinect code.
kinectFactory('192.168.60.56').startTrackedBodies(player);