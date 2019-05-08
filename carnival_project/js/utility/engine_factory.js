"use strict"

/**
 * Creates quick and easy THREE JS scenes with integrated physics.
 * @param   {boolean} debugMode - when 'true' the project 
 *                                is in debug mode.
 * @author  Andrew Alford
 * @date    31/03/2019
 */
let engineFactory = (function() {
    //[enginePrototype] Defines all the methods for the object.
    let enginePrototype = {
        /**
         * Adds objects to the engine.
         * @param {string} json     - Any objects to be added via JSON.
         * @param {array} objects   - A list of all objects to be added.
         */
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

    return function(camera, debugMode) {
        let engine = Object.create(enginePrototype, {
            
            scene : {
                writeable: false, 
                value: new THREE.Scene()
            },

            CameraController : {
                writeable: false, 
                value: ENGINE.CameraController(
                    camera//,
                    //new THREE.OrbitControls(camera)
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
            engine.CameraController, 
            engine.objectManager,
            engine.physicsManager,
            debugMode
        );

        //Load the engines skybox.
        ENGINE.TextureLoader().loadSkybox('skybox', '.bmp', engine.scene);

        return engine;
    }
})();