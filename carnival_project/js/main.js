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
camera.position.set(0, 20, 25);

//[engine] Manages the scene.
let engine = engineFactory(camera, false);

//[games] Holds all of our games.
let games = {
    darts : new DartsGame(),
    whackAMole : new WhackAMole(new THREE.Vector3(100, 0, 0)),
    strengthOMetre : new StrengthOMetre(),
};

let moon = new Moon(new THREE.Vector3(-600, 280, -200));
let firework = new Fireworks(new THREE.Vector3(-300, 250, -700));
let fireball = new Fireball(new THREE.Vector3(85, 12, -402.5 ));
let cans = new Cans(new THREE.Vector3(-50, 0, -265));

//Add all objects to the scene.
engine.addObjects(MODELS, [
    //Enviroment
    //new Fireworks(),
    new BalloonCover(),
    new Floor(),
    new MrBeep(),
    new MrBeepLatitude(),
    new Helicopter(),
    new Banner(),
    new Duck(),
    new HotAirBalloon(new THREE.Vector3(0, 250, 0)),
    moon,firework,fireball,cans,
    new MoreTents(),
    new Smoke(),
    new Terrain(),
    new WaterFountain(),
    new StreetLamp(),
    new WackCover(),
    //Games
    games.darts,
    new Football(),
    new Fence(),
    new GoalTarget(),
    new PhysicsCubes(),
    new GoalBoxes(),
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
        games.strengthOMetre,
        games.whackAMole,
        new LightGUI()
]);

//[player] tracks the user playing the game.
let player = playerFactory(engine, 0);

games.whackAMole.allocatePlayer(player);
games.strengthOMetre.allocatePlayer(player);
moon.allocatePlayer(player);
firework.allocatePlayer(player);
fireball.allocatePlayer(player);
cans.allocatePlayer(player);

//Run the animation loop.
function animate() { engine.driver.update();}
animate();

//Kinect code.
let kinect = kinectFactory(parameters.IP);
kinect.startBodies(player);
kinect.experimentalTracking(player);
