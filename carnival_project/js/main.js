"use strict";

//[parameters] Retrieves parameters from the projects URL.
let parameters = (function () {

    //[url] The project's URL
    let url = new URL(window.location.href);

    //[playerIndex] The main player.
    let playerIndex = parseInt(url.searchParams.get('playerIndex'), 10);

    //[IP] The kinectron IP address.
    let IP = url.searchParams.get('ip');

    return {
        playerIndex: playerIndex || 0,
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
camera.position.set(0, 25, 20);

//[engine] Manages the scene.
let engine = engineFactory(camera, false);

//[games] Holds all of our games.
let games = {
    darts : new DartsGame(),
    whackAMole : new WhackAMole(new THREE.Vector3(100, 0, 0)),
    strengthOMetre : new StrengthOMetre(),
};

let moon = new Moon(new THREE.Vector3(-600, 280, -200));

//Add all objects to the scene.
engine.addObjects(MODELS, [
    //Enviroment
    new Fireworks(),
    new BalloonCover(),
    new Floor(),
    new MrBeep(),
    new MrBeepLatitude(),
    new Helicopter(),
    new HotAirBalloon(new THREE.Vector3(0, 250, 0)),
    moon,
    new MoreTents(),
    new Terrain(),
    new StreetLamp(),
    new WackCover(),
    //Games
    games.darts,
    new Football(),
    new Goal(new THREE.Vector3(25, 0, 0)),
    games.strengthOMetre,
    games.whackAMole,
    new Cans(new THREE.Vector3(0, 150, 0)),
    new LightGUI()
]);

//[player] tracks the user playing the game.
let players = [
    playerFactory(engine.camera, engine.scene, new THREE.Color(0x84B1AA), 0),
    playerFactory(null, engine.scene, new THREE.Color(0xFFD700), 1),
    playerFactory(null, engine.scene, new THREE.Color(0xB94F74), 2),
    playerFactory(null, engine.scene, new THREE.Color(0xC7AFD0), 3),
    playerFactory(null, engine.scene, new THREE.Color(0x74F016), 4),
    playerFactory(null, engine.scene, new THREE.Color(0x1ACEC5), 5)
];
games.whackAMole.allocatePlayer(players[parameters.playerIndex]);
moon.allocatePlayer(players[parameters.playerIndex]);

//Run the animation loop.
function animate() { engine.driver.update(); }
animate();

//Kinect code.
kinectFactory(parameters.IP).startTrackedBodies(players);
