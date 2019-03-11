/**
 * A loading class to manage the loading of objects into the project.
 * @author Andrew Alford
 * @date 15/01/2019
 * @version 2.0 - 23/01/2019
 */
 class ObjectLoader
 {
     /**
      * Gets the name of this class.
      * @return Returns the name of this class.
      */
      static getClassName()
      {
          return 'ObjectLoader';
      }

      /**
       * Constructor for the Object Loader.
       * Notes:
       * - Loaders assume the file path for models is 'res/models/'.
       * - Loaders assume the file path for materials is 'res/materials/'.
       * - Loaders assume the file path for textures is 'res/textures/'.
       */
       constructor(loadingManager)
       {
           //Provide a DRACOLoader instance to decode compressed mesh data
           THREE.DRACOLoader.setDecoderPath( '/lib/draco' );

           //Initialise member variables.
           const M_GLTF_LOADER = new THREE.GLTFLoader(loadingManager);
           M_GLTF_LOADER.setDRACOLoader( new THREE.DRACOLoader() );

           //Set the paths for the loaders.
           M_GLTF_LOADER.setPath('res/models/');

           //Public Methods...

           /**
            * Loads either a 'GLTF' or 'GLB' web friendly model.
            * @param {string} fileName - The name of the model to be loaded.
            * @param {string} fileType - The type of file to be loaded.
            *                            (Must be either 'GLTF' or 'GLB').
            * @param {THREE.Material} overrideMaterial - A material to
            *                                            override the material
            *                                            of the model.
            *                                            (Defaults to null).
            */
           this.loadModel = function(
               fileName, fileType, overrideMaterial = null)
           {
               //Error check parameters.
               ENGINE.DEBUGGER.isString(fileName, ObjectLoader.getClassName());
               ENGINE.DEBUGGER.isString(fileType, ObjectLoader.getClassName());
               if(!(fileType == 'gltf' || fileType == 'glb'))
               {
                   throw new Error(
                       ObjectLoader.getClassName()
                       + ' will only load gltf or glb objects.');
               }
               if(overrideMaterial)
               {
                   ENGINE.DEBUGGER.isThreeMaterial(
                       overrideMaterial, ObjectLoader.getClassName());
               }

               //Set the resource path incase this model
               //has any resources which need loading.
               M_GLTF_LOADER.setResourcePath('res/models/' + fileName + '/');

               //[model] Will hold the model once it is loaded.
               let model = new THREE.Object3D();
               //[animations] Will hold the models animations (if it has any).
               let animations = [];

               //Load the model.
               M_GLTF_LOADER.load(
                   fileName + '/' + fileName + '.' + fileType,
                   function(loadedModel)
                   {
                       //If the model has a scene, add it...
                       if(loadedModel.scene)
                       {
                           //If an override material has been given, add it...
                           if(overrideMaterial && loadedModel.scene.children)
                           {
                               let meshes = loadedModel.scene.children;
                               meshes.forEach(function(mesh)
                               {
                                   if(mesh instanceof THREE.Mesh)
                                   {
                                       mesh.material = overrideMaterial;
                                   }
                               });
                           }
                           model.add(loadedModel.scene);
                       }
                       //If the model has animations, add them.
                       if(loadedModel.animations)
                       {
                           loadedModel.animations.forEach(function(animation)
                           {
                               animations.push(animation);
                           });
                       }
                   }
               );

               //Return the newly loaded model.
               return {model: model, animations: animations};
           }
       }
 }

 //////////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////////

/**
 * A loading class to manage the loading of textures into the project.
 * @author Andrew Alford
 * @date 16/01/2019
 * @version 1.1 - 16/01/2019
 */
class TextureLoader
{
  /**
   * Gets the name of this class.
   * @return Returns the name of this class.
   */
   static getClassName()
   {
       return 'TextureLoader';
   }

   /**
    * Constructor for the Texture Loader.
    * Notes:
    * - Loaders assume the file path for models is 'res/models/'.
    * - Loaders assume the file path for materials is 'res/materials/'.
    * - Loaders assume the file path for textures is 'res/textures/'.
    * - WebGL likes textures to be powers of 2. (E.g. 64x64px / 256x256px).
    *   If you don't do this you will get program warnings.
    */
    constructor(loadingManager)
    {
        //Initalise member variables.
        //[M_TEXTURE_LOADER] Used to load textures into the project.
        const M_TEXTURE_LOADER = new THREE.TextureLoader(loadingManager);
        //[M_SKYBOX_LOADER] Used to load the projects skybox.
        const M_SKYBOX_LOADER = new THREE.CubeTextureLoader(loadingManager);

        //Set the path for the loader.
        M_TEXTURE_LOADER.setPath('res/textures/');
        M_SKYBOX_LOADER.setPath('res/textures/');

        //Public Methods...

        /**
         * Loads a texture.
         * @param {string} fileName - The name of the texture to be loaded.
         * @return Returns the loaded texture.
         */
        this.loadTexture = function(fileName)
        {
            //Error check parameters.
            ENGINE.DEBUGGER.isString(
                fileName, TextureLoader.getClassName());

            //Load the texture and return it.
            return M_TEXTURE_LOADER.load(fileName);
        }

        /**
         * Loads a skybox for the scene.
         * @param {string} fileName - The name of the file to be loaded.
         * @param {string} fileType - The type of file being loaded.
         * @param {THREE.Scene} scene - The scene to use the skybox.
         */
        this.loadSkybox = function(fileName, fileType, scene)
        {
            //[textures] These are the textures for the skyboxes to use.
            let textures = [
                fileName + '/' + fileName + '_px' + fileType,
                fileName + '/' + fileName + '_nx' + fileType,
                fileName + '/' + fileName + '_py' + fileType,
                fileName + '/' + fileName + '_ny' + fileType,
                fileName + '/' + fileName + '_pz' + fileType,
                fileName + '/' + fileName + '_nz' + fileType
            ];

            //Load the skybox.
            M_SKYBOX_LOADER.load(
                textures,
                function(cubeTexture)
                {
                    //Add the skybox to the scene.
                    scene.background = cubeTexture;
                }
            )
        }
    }
}

 //////////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////////

 module.exports = {
     ObjectLoader: ObjectLoader,
     TextureLoader: TextureLoader
 }
