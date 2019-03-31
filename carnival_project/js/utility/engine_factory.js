"use strict"

let engineFactory = (function() {
    let enginePrototype = {
        addObjects: function(objects) {
            
        }
    };

    return function(debugMode) {
        let engine = Object.create(enginePrototype, {
            
            scene : {
                writeable: false, 
                value: new THREE.Scene()
            },

            camera : {
                writeable: false, 
                value: ENGINE.Camera(
                    new THREE.Vector3(0, 25, 20), 
                    false
                )
            },

            objectManager : {
                writeable: false, 
                value: ENGINE.ObjectManager()
            },

            physicsManager : {
                writeable: false, 
                value: ENGINE.Physics(
                    new THREE.Vector3(0, -9.8, 0), 
                    1 / 60
                )
            },

            engineDriver : {
                writable: true,
                value: null
            }
        });

        //Initalise the engine driver.
        engine.engineDriver = ENGINE.Driver(
            engine.scene, 
            engine.camera, 
            engine.objectManager,
            engine.physicsManager,
            debugMode
        );

        return engine;
    }
})();