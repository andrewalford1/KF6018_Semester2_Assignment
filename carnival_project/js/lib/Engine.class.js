//Node JS commands:
// - live rebuild: watchify Engine.class.js -o engine_build.js -v

"use strict";

//[EngineSingleton] Encapsulates the engine in a singleton so
//only one instance can exist.
let EngineSingleton = (function() {

    let instance;
    let engine;

    //Import library files.
    require('./lib/DeviceOrientationControls');
    require('./lib/MTLLoader');
    require('./lib/OBJLoader');
    require('./lib/DRACOLoader');
    require('./lib/GLTFLoader');
    require('./lib/OrbitControls');
    require('./lib/StereoEffect');

    /**
     * Class combining all the engine componentents.
     * @author Andrew Alford
     * @date 11/01/2019
     * @version 1.6 - 27/01/2019
     */
    class Engine
    {
        /**
         * Constructor for the engine.
         * Defines all the components.
         */
        constructor()
        {
            //Define engine components.
            this.DEBUGGER = require('./utility/Debugger.class');

            this.KEYBOARD_INPUT = require('./input/KeyboardInput.class');

            this.LOADING_MANAGER = require('./loaders/LoadingManager.class');
            this.LOADERS = require('./loaders/loaders');

            this.CAMERA = require('./utility/Camera.class');
            this.TIMER = require('./utility/Timer.class');

            this.OBJECTS = require('./objects/objects');
            this.OBJECT_MANAGER = require('./objects/ObjectManager.class');

            this.DRIVER = require('./Driver.class');

            //DEFINE INSTANCES...

            //[keyboardInputInstance] An instance of the  keyboard Input
            //component to track user input.
            let keyboardInputInstance = new this.KEYBOARD_INPUT();

            //[loadingManagerInstance] An instance of the Loading Manager
            //to manage loading in the engine.
            let loadingManagerInstance;

            //[objectLoaderInstance] An instance of the Object Loader
            //for the engine to use when loading objects.
            let objectLoaderInstance;

            //[textureLoaderInstance] An instance of the Texture Loader for
            //the engine to use when loading textures.
            let textureLoaderInstance;

            /**
             * Creates a debugger.
             * @return Returns the newly created Debugger.
             */
            this.Debugger = function()
            {
                return new this.DEBUGGER();
            }

            /**
             * Creates a Camera.
             * @return Returns the newly created Camera.
             */
            this.Camera = function(initialPosition, vrEnabled)
            {
                //Error check parameters.
                this.DEBUGGER.isThreeVector3(
                    initialPosition, this.CAMERA.getClassName());
                this.DEBUGGER.isBoolean(vrEnabled, this.CAMERA.getClassName());

                return new this.CAMERA(initialPosition, vrEnabled);
            }

            /**
             * Creates a Timer.
             * @return Returns the newly created Timer.
             */
            this.Timer = function()
            {
                return new this.TIMER();
            }

            /**
             * Retrieves the instance of the Keyboard Input component to
             * enable the tracking of user input through the keyboard.
             * @return Returns the Keyboard Input component.
             */
            this.KeyboardInput = function()
            {
                return keyboardInputInstance;
            }

            /**
             * Checks if the engine is fully loaded.
             * @return Returns 'true' if everything has loaded.
             */
            this.isLoaded = function()
            {
                //If loading has/is taking place, check its progress.
                if(loadingManagerInstance)
                {
                    return loadingManagerInstance.isLoaded();
                }
                else
                {
                    //If no loading has taken place then simply return 'true'.
                    return true
                }
            }

            /**
             * Retrieves the instance of the Object Loader to enable the
             * loading of models into the project.
             * @return Returns the Object Loader.
             */
            this.ObjectLoader = function()
            {
                //Since loading is occurring, a loading manager is required.
                //If the loading manager does not exist, create one.
                if(!loadingManagerInstance)
                {
                    loadingManagerInstance = new this.LOADING_MANAGER();
                }

                //If the object loader does not exist, create one.
                if(!objectLoaderInstance)
                {
                    objectLoaderInstance = new this.LOADERS.ObjectLoader(
                        loadingManagerInstance.getLoadingManager()
                    );
                }
                return objectLoaderInstance;
            }

            /**
             * Retrieves the instance of the Texture Loader to enable the
             * loading of textures into the project.
             * @return Returns the Texture Loader.
             */
            this.TextureLoader = function()
            {
                //Since loading is occurring, a loading manager is required.
                //If the loading manager does not exist, create one.
                if(!loadingManagerInstance)
                {
                    loadingManagerInstance = new this.LOADING_MANAGER();
                }

                //If the texture loader does not exist, create one.
                if(!textureLoaderInstance)
                {
                    textureLoaderInstance = new this.LOADERS.TextureLoader(
                        loadingManagerInstance.getLoadingManager()
                    );
                }
                return textureLoaderInstance;
            }

            /**
             * Creates an object out of a mixamo character.
             * @param {string} character - The name of the character.
             *                             (Must correspond with the filename).
             */
            this.MixamoCharacter = function(character)
            {
                return new this.OBJECTS.MixamoCharacter(character);
            }

            /**
             * Creates an Object Manager
             * @return Returns the newly created ObjectManager.
             */
             this.ObjectManager = function()
             {
                 return new this.OBJECT_MANAGER();
             }

             /**
              * Creates a Driver for the engine.
              * @param {THREE.Scene} scene - The scene being animated.
              * @param {Engine.Camera} camera - The camera used to
              *                                 film the scene.
              * @param {ENGINE.ObjectManager} - Manages all objects in a scene.
              * @return Returns the newly created Driver.
              */
             this.Driver = function(scene, camera, objectManager, debugMode)
             {
                 this.DEBUGGER.isThreeScene(
                     scene, this.DRIVER.getClassName());
                 this.DEBUGGER.isEngineCamera(
                     camera, this.DRIVER.getClassName());
                 this.DEBUGGER.isEngineObjectManager(
                     objectManager, this.DRIVER.getClassName());
                 this.DEBUGGER.isBoolean(
                     debugMode, this.DRIVER.getClassName());

                 return new this.DRIVER(
                     scene, camera, objectManager, debugMode);
             }
        }
    }

    function createInstance()
    {
        engine = new Engine();
        return engine;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();


//Add the engine to the window.
window.ENGINE = EngineSingleton.getInstance();
