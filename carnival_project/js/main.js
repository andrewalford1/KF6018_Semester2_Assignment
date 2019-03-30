"use strict"

//[engineDriver] Used to manage all major engine components.
let engineDriver = ENGINE.Driver(
    new THREE.Scene(),
    ENGINE.Camera(new THREE.Vector3(0, 25, 50), false),
    ENGINE.ObjectManager(),
    ENGINE.Physics(new THREE.Vector3(0, -9.8, 0), 1 / 60),
    true //Debug Mode
);


//[games] Holds all of our games.
let games = {
    darts : new DartsGame(new THREE.Vector3(0, 0, 0)),
    whackAMole : new WhackAMole(new THREE.Vector3(100, 0, 0)),
    strengthOMetre : new StrengthOMetre(new THREE.Vector3(0, 0, 0))
};

/**
 * Use me for local testing.
 */
function getObjectsLocal()
{
    ENGINE.DEBUGGER.extractJSON(MODELS)
    .enviroment.forEach(model => {
        engineDriver.getObjectManager().addObject(
            new ENGINE.OBJECTS.Model(model));
    });

    //ADD OBJECTS USING JS CLASSES...
    engineDriver.getObjectManager().addObjects([
        //Darts Game
        games.darts,
        //Enviroment
        new Moon(new THREE.Vector3(-600, 280, -400)),
        new Helicopter(new THREE.Vector3(0, 0, 0)),
        new HotAirBalloon(new THREE.Vector3(0, 250, 0)),
        new StreetLamp(new THREE.Vector3(0, 0, 0)),
        new Terrain(new THREE.Vector3(0, 0, 0)),
        new MoreTents(new THREE.Vector3(0, 0, 0)),
        new WackCover(new THREE.Vector3(0, 0, 0)),
        new BalloonCover(new THREE.Vector3(0, 0, 0)),
        //Football Game
        new Football(new THREE.Vector3(0, 0, 0)),
        new Goal(new THREE.Vector3(25, 0, 0)),
        //Strength-o-Meter Game
        games.strengthOMetre,
        //Whack-a-Mole Game
        games.whackAMole,
        //Experimental
        new Cube(new THREE.Vector3(0, 150, 0)),
        new Floor()
    ]);
    engineDriver.getObjectManager().addAllToScene(engineDriver.getScene());
    engineDriver.getObjectManager().setAllActive(true);
}

/**
 * Don't use me if you're testing the project locally.
 */
function getObjectsServer()
{
    //Load models from JSON file
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        
        //ADD OBJECTS USING JSON...
        ENGINE.DEBUGGER.extractJSON(this.responseText)
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
            new Moon(new THREE.Vector3(0, 20, 0)),
            new BalloonArch(new THREE.Vector3(0, 0, 0)),
            new Carousel(new THREE.Vector3(0, 0, 0)),
            new CircusTent(new THREE.Vector3(50, 0, 0)),
            new Helicopter(new THREE.Vector3(0, 0, 0)),
            new HotAirBalloon(new THREE.Vector3(0, 250, 0)),
            new MoreBalloons(new THREE.Vector3(0, 0, 0)),
            new RollerCoaster(new THREE.Vector3(0, 0, 0)),
            new SmallTent(new THREE.Vector3(0, 0, 0)),
            new StreetLamp(new THREE.Vector3(0, 0, 0)),
            new Terrain(new THREE.Vector3(0, 0, 0)),
            new MoreTents(new THREE.Vector3(0, 0, 0)),
            new WackCover(new THREE.Vector3(0, 0, 0)),
            new BalloonCover(new THREE.Vector3(0, 0, 0)),
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
      }
    };
    xmlhttp.open("GET", "json/models.json", true);
    xmlhttp.send();
}

//Add all the objects to the project.
this.getObjectsLocal();
//this.getObjectsServer(); Comment out until the end.

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

//Create player.
let player = new Player();
engineDriver.getObjectManager().addObject(player);
player.addToScene(engineDriver.getScene());
player.setActive(true);

games.whackAMole.allocatePlayer(player);

//Kinectron code
kinectFactory('192.168.60.56').startTrackedBodies(
    player, 
    engineDriver.getCamera().getInstance(), 
    false
);


