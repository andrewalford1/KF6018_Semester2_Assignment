"use strict"

const ENGINE_MANAGER = (function initEngine() {
    let scene = new THREE.Scene(); 
    let camera = ENGINE.Camera(
        new THREE.Vector3(0, 25, 50), false);
    let objectManager = ENGINE.ObjectManager();
    let physicsManager = ENGINE.Physics(
        new THREE.Vector3(0, -9.8, 0), 1 / 60);
    
    //[engineDriver] Used to manage all major engine components.
    let engineDriver = ENGINE.Driver(
        scene, camera, objectManager, physicsManager, true);
    
    //Skybox.
    ENGINE.TextureLoader().loadSkybox('skybox', '.bmp', scene);

    return {
        scene : scene,
        camera : camera,
        objectManager : objectManager,
        physicsManager : physicsManager,
        driver : engineDriver,
        debug : ENGINE.DEBUGGER
    }
})();



//[games] Holds all of our games.
let games = {
    darts : new DartsGame(),
    whackAMole : new WhackAMole(new THREE.Vector3(100, 0, 0)),
    strengthOMetre : new StrengthOMetre()
};

/**
 *  Add objects to the project
 */
(function addObjects() {
    ENGINE_MANAGER.debug.extractJSON(MODELS)
    .enviroment.forEach(model => {
        ENGINE_MANAGER.objectManager.addObject(
            new ENGINE.OBJECTS.Model(model));
    });

    //ADD OBJECTS USING JS CLASSES...
    ENGINE_MANAGER.objectManager.addObjects([
        //Enviroment
        new BalloonCover(),
        new Floor(),
        new Helicopter(),
        new HotAirBalloon(new THREE.Vector3(0, 250, 0)),
        new Moon(new THREE.Vector3(-600, 280, -400)),
        new MoreTents(),
        new Terrain(),
        new StreetLamp(),
        new WackCover(),
        //Games
        games.darts,
        new Football(),
        new Goal(new THREE.Vector3(25, 0, 0)),
        games.strengthOMetre,
        games.whackAMole
    ]);
    ENGINE_MANAGER.objectManager.addAllToScene(ENGINE_MANAGER.scene);
    ENGINE_MANAGER.objectManager.setAllActive(true);
})();

//Run the animation loop.
function animate() { ENGINE_MANAGER.driver.update(); }
animate();

//Create player.
let player = new Player();
ENGINE_MANAGER.objectManager.addObject(player);
player.addToScene(ENGINE_MANAGER.scene);
player.setActive(true);

games.whackAMole.allocatePlayer(player);

//Kinectron code
kinectFactory('192.168.60.56').startTrackedBodies(
    player, ENGINE_MANAGER.camera, false);


