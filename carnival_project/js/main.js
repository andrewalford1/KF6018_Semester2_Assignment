"use strict"

//[engineDriver] Used to manage all major engine components.
let engineDriver = ENGINE.Driver(
    new THREE.Scene(),
    ENGINE.Camera(new THREE.Vector3(0, 500, 750), false),
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
