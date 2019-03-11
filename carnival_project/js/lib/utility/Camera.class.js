/**
 * Utility class to control a THREEJS Camera.
 * @author Andrew Alford
 * @date 02/12/2018
 * @version 2.0 - 13/01/2019
 */
module.exports = class Camera
{
    /**
     * Gets the name of this class.
     * @return Returns the name of the class.
     */
    static getClassName()
    {
        return 'Camera';
    }

    /**
     * Constructor for the camera class.
     * @param {THREE.Vector3} initialPosition - The initial position
     *                                          of the camera.
     * @param {boolean} vrEnabled - If 'true' then the scene will be rendered
     *                              in virtual reality.
     */
    constructor(initialPosition, vrEnabled)
    {
        //ERROR CHECK PARAMETERS.
        ENGINE.DEBUGGER.isThreeVector3(initialPosition, Camera.getClassName());
        ENGINE.DEBUGGER.isBoolean(vrEnabled, Camera.getClassName());

        //[M_CAMERA]
        const M_CAMERA = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        //Set the initial position of the camera.
        M_CAMERA.position.copy(initialPosition);

        //[M_RENDERER] Used to render the scene to the camera.
        const M_RENDERER = new THREE.WebGLRenderer();
        //Initialise the properties of the renderer.
        M_RENDERER.setSize(window.innerWidth, window.innerHeight);
        M_RENDERER.setClearColor(0x000000);
        M_RENDERER.shadowMap.enabled = true;
        M_RENDERER.shadowMap.type = THREE.PCFSoftShadowMap;
        //Connect the renderer to the canvas.
        document.body.appendChild(M_RENDERER.domElement);

        //[m_useVR] If 'true' then the camera is renders in VR.
        let m_useVr = vrEnabled;
        //[M_VR_EFFECT] Duplicates the screen for a VR effect.
        const M_VR_EFFECT = new THREE.StereoEffect(M_RENDERER);
        M_VR_EFFECT.setSize(window.innerWidth, window.innerHeight);

        //[m_controls] These are the controls to be used for moving the camera.
        let m_controls;

        //If VR is enabled, then use VR controls.
        if(m_useVr)
        {
            m_controls = new THREE.DeviceOrientationControls(M_CAMERA);
        }
        else
        {
            m_controls = new THREE.OrbitControls(M_CAMERA);
        }

        //PUBLIC METHODS...

        /**
         * Updates the camera.
         * @param {THREE.Scene} scene - The scene that that camera is filming.
         */
        this.update = function(scene)
        {
            if(ENGINE.DEBUGGER.isThreeScene(
                scene, Camera.getClassName() + '.update()'))
            {
                //Update the controls.
                m_controls.update();

                //Start rendering process.
                requestAnimationFrame(animate);

                //Redner the scene...
                if(m_useVr)
                {
                    //in virtual reality.
                    M_VR_EFFECT.render(scene, M_CAMERA);
                }
                else
                {
                    //as normal.
                    M_RENDERER.render(scene, M_CAMERA);
                }
            }
        }

        /**
         * Toogle virtual reality rendering.
         * @param {boolean} vrEnabled - If 'true' then start rendering in VR.
         *                              (Otherwise render as normal).
         */
        this.enableVR = function(vrEnabled)
        {
            m_useVR = vrEnabled;
        }

        /**
         * Checks if the camera is looking at a specific point.
         * @param {THREE.Vector3} point - The point being checked.
         */
        this.isLookingAt = function(point)
        {
            if(ENGINE.DEBUGGER.isThreeVector3(
                point, Camera.getClassName() + '.isLookingAt()'))
            {
                M_CAMERA.updateMatrix();
                M_CAMERA.updateMatrixWorld();

                //[frustum] Contains everything that the camera can see.
                let frustum = new THREE.Frustum();
                frustum.setFromMatrix(
                    new THREE.Matrix4().multiplyMatrices(
                        M_CAMERA.projectionMatrix,
                        M_CAMERA.matrixWorldInverse
                    )
                );

                //Check if the point is within the camera's frustum.
                if(frustum.containsPoint(point))
                {
                    return true;
                }
                return false;
            }
        }

        /**
         * Sets the view port of the camera to be set.
         * @param {number} width - The width of the camera's viewport.
         * @param {number} height - The height of the camera's viewport.
         */
        this.setViewPort = function(width, height)
        {
            if(ENGINE.DEBUGGER.isNumber(
                width, Camera.getClassName() + '.setViewPort()') &&
            ENGINE.DEBUGGER.isNumber(
                height, Camera.getClassName() + '.setViewPort()'))
            {
                //Update the size of the renderer.
                M_RENDERER.setSize(width, height);
                //Update the aspect ratio of the camera.
                M_CAMERA.aspect = width/height;
                //Update the camrea projection matrix.
                M_CAMERA.updateProjectionMatrix();
            }
        }

        /**
         * Retrieves the camera encapsulated by this class.
         * @return Returns the camera encapsulated by this class.
         */
        this.getInstance = function()
        {
            return M_CAMERA;
        }
    }
}
