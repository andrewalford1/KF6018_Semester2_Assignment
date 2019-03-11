/**
 * A class to drive the engine. It is responisble for updating all major
 * engine variables.
 * @author Andrew Alford
 * @date 09/01/2019
 * @version 2.0 - 14/01/2019
 */
module.exports = class Driver
{
    /**
     * Gets the name of this class.
     * @return Returns the name of the class.
     */
    static getClassName()
    {
        return 'Driver';
    }
    /**
     * Constructs the engine driver.
     * @param {THREE.Scene} scene - The scene being animated.
     * @param {ENGINE.CAMERA} camera - The camera used to film the scene.
     * @param {ENGINE.OBJECT_MANAGER} objectManager - Manages all objects
     *                                                in a scene.
     * @param {booolean} debugMode - If 'true' then debugging information will
     *                               become available.
     */
    constructor(scene, camera, objectManager, debugMode)
    {
        //Error check parameters.
        ENGINE.DEBUGGER.isThreeScene(scene, Driver.getClassName());
        ENGINE.DEBUGGER.isEngineCamera(camera, Driver.getClassName());
        ENGINE.DEBUGGER.isEngineObjectManager(
            objectManager, Driver.getClassName());
        ENGINE.DEBUGGER.isBoolean(debugMode, Driver.getClassName());

        //Initialise member variables.
        //[M_SCENE] The scene being animated.
        const M_SCENE = scene;
        //[M_CAMERA] The camera used to film the scene.
        const M_CAMERA = camera;
        //[M_OBJECT_MANAGER] Manages all objects in a scene.
        const M_OBJECT_MANAGER = objectManager;

        //[M_TIMER] Keeps track of time for performing updates.
        const M_TIMER = ENGINE.Timer();
        //[m_frameTime] Holds the amount of time taken to render and compute
        //the previous frame of animation.
        let m_frameTime = M_TIMER.getFrameTime();

        //[debugTool] Used to debug the engine.
        let debugTool;
        if(debugMode)
        {
            debugTool = ENGINE.Debugger();
        }

        //EVENT LISTENERS...
        //Event listener to allow the scene to resize when the window is resized.
        window.addEventListener('resize', function()
        {
            M_CAMERA.setViewPort(window.innerWidth, window.innerHeight);
        });

        //PUBLIC METHODS...

        /**
         * Updates all key components of the engine.
         */
        this.update = function()
        {
            //Update timing variables.
            M_TIMER.update();
            m_frameTime = M_TIMER.getFrameTime();

            //Update the camera.
            M_CAMERA.update(M_SCENE, m_frameTime);

            //Only update objects if all assets are loaded.
            if(ENGINE.isLoaded())
            {
                //Update all the objects in the scene.
                M_OBJECT_MANAGER.updateObjects(m_frameTime);
            }
        }

        /**
         * Retrieves the scene being animated.
         * @return Returns the scene.
         */
        this.getScene = function()
        {
            return M_SCENE;
        }

        /**
         * Retrieves the camera used to film the scene.
         * @return Returns the camera.
         */
        this.getCamera = function()
        {
            return M_CAMERA;
        }

        /**
         * Retrieves the object manager managing all objects in the scene.
         * @return Returns the object manager.
         */
        this.getObjectManager = function()
        {
            return M_OBJECT_MANAGER;
        }
    }
}
