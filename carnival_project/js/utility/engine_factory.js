"use strict"

/**
 * Creates quick and easy THREE JS scenes with integrated physics.
 * @param {boolean} debugMode - when 'true' the project 
 *                              is in debug mode.
 */
let engineFactory = (function() {
    let enginePrototype = {
        addObjects: function(json, objects) {
            //Add objects using JSON.
            if(json) {
                this.debug.extractJSON(json).
                enviroment.forEach(model => {
                    this.objectManager.addObject(
                        new ENGINE.OBJECTS.Model(model)
                    );
                });
            }

            //Add objects using JavaScript classes.
            this.objectManager.addObjects(objects);

            //Make all objects active.
            this.objectManager.addAllToScene(this.scene);
            this.objectManager.setAllActive(true);
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

            driver : {
                writable: true,
                value: null
            },

            debug : {
                writable: false,
                value : ENGINE.DEBUGGER
            }
        });

        //Initalise the engine driver.
        engine.driver = ENGINE.Driver(
            engine.scene, 
            engine.camera, 
            engine.objectManager,
            engine.physicsManager,
            debugMode
        );

        return engine;
    }
})();