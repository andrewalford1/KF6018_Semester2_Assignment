
/**
 * This class is the top of the heiriacrchy
 * for all objects created in the project.
 * @author Andrew Alford
 * @date 20/11/2018
 * @version 4.0 - 13/02/2019
 */
class RootObject
{
    /**
     * Constructor for a Root Object.
     */
    constructor()
    {
        //Define this class as abstract...
        if(this.constructor === RootObject)
        {
            ENGINE.DEBUGGER.abstractInstanciationException('RootObject');
        }

        //Define Member Variables...

        //[M_active] If 'true' then the object will become active in the
        //project. (False by default).
        let m_active = false;

        //Abstract Methods...

        /**
         * Retrives the instance of the object being managed by this class.
         * (Must be implemented by child classes).
         * @return Returns the main object being managed by this class.
         */
        this.getInstance = function()
        {
            ENGINE.DEBUGGER.abstractException('RootObject.getInstance()');
        }

        /**
         * Updates the object. (Must be implemented by child classes).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            ENGINE.DEBUGGER.abstractException('RootObject.update()');
        }

        //Public Methods...

        /**
         * Checks if the object is active.
         * @return Returns 'true' if the object is active.
         *         (Otherwise return 'false').
         */
        this.isActive = function()
        {
            return m_active;
        }

        /**
         * Toggles the object to be active/inactive in the project.
         * @param {boolean} active - If 'true' then the object will become
         *                           active in the project.
         */
        this.setActive = function(active)
        {
            //Check the appropriate parameter has been given.
            ENGINE.DEBUGGER.isBoolean(active, 'RootObject.setActive()');

            m_active = active;
        }
    }
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

/**
 * Class representing a classic THREE JS object.
 * @extends RootObject
 * @author Andrew Alford
 * @date 07/02/2019
 * @version 2.0 - 13/02/2019
 */
class ClassicObject extends RootObject
{
    /**
     * Constructor for the Classic Object.
     * @param {THREE.Vector3} initialPosition - The initial position
     *                                          of the object.
     */
    constructor(initialPosition)
    {
        //Construct the super class.
        super();

        //Define this class as abstract...
        if(this.constructor === ClassicObject)
        {
            ENGINE.DEBUGGER.abstractInstanciationException('ClassicObject');
        }

        //Error Check Parameters...
        ENGINE.DEBUGGER.isThreeVector3(initialPosition, 'ClassicObject');

        //Define Member Variables...

        //[M_OBJECT] This is the object encased by the class.
        const M_OBJECT = new THREE.Group();
        //Set the initial position of the object.
        M_OBJECT.position.copy(initialPosition);

        //Overide Abstract Methods...

        /**
         * Retrives the object being managed by this class.
         * (Overridden from the superclass).
         * @return Returns the main object being managed by this class.
         */
        this.getInstance = function()
        {
            return M_OBJECT;
        }

        //Public Methods...

        /**
         * Adds this object to the given scene.
         * @param {THREE.Scene} scene - This is the scene to add the object to.
         */
        this.addToScene = function(scene)
        {
            //Check the appropriate parameter has been given.
            ENGINE.DEBUGGER.isThreeScene(scene, 'ClassicObject.addToScene()');

            scene.add(M_OBJECT);
        }

        /**
         * Allows a THREE JS Object 3D to be added to this object.
         * @param {THREE.Object3D} object - The object to be added.
         */
        this.addObjectToGroup = function(object)
        {
            //Check the appropriate parameter has been given.
            ENGINE.DEBUGGER.isThreeObject3D(
                object,
                'ClassicObject.addObjectToGroup()'
            );

            M_OBJECT.add(object);
        }
    }
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

/**
 * A class used to add models into the scene.
 * @extends ClassicObject
 * @author Andrew Alford
 * @date 10/03/2019
 * @version 1.0 - 10/03/2019
 */
class Model extends ClassicObject
{
    /**
     * Constructor for a model.
     * @param {Object} model - The model to be loaded.
     */
    constructor(model)
    {
        //Construct the superclass.
        super(new THREE.Vector3(0, 0, 0));

        //Error check parameters.
        if(!(model.fileName) | !(model.extension))
        {
            throw new Error(`Model requires a file name and type.`);
        }

        //Retrieve the resource.
        const M_RESOURCE = ENGINE.ObjectLoader().loadModel(
            model.fileName,
            model.extension
        );

        if(model.position)
        {
            M_RESOURCE.model.position.fromArray(model.position);
        }
        if(model.scale)
        {
            M_RESOURCE.model.scale.fromArray(model.scale);
        }
        if(model.rotation)
        {
            M_RESOURCE.model.rotation.set(
                model.rotation[0] * (-Math.PI / 180),
                model.rotation[1] * (-Math.PI / 180),
                model.rotation[2] * (-Math.PI / 180)
            );
        }

        this.addObjectToGroup(M_RESOURCE.model);


        //[onStart] Used to check when the very first frame
        //of animation occurs.
        let onStart = true;        
        //[mixer] Manages the models different animations.
        //(If it has any).
        let mixer = null;

        if(model.animated)
        {
            mixer = new THREE.AnimationMixer(M_RESOURCE.model);
        }

        
        /**
         * Updates the model. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //Initialise the object on the first frame.
            if(onStart)
            {
                //If the resource has animations, animate it.
                if(M_RESOURCE.animations.length != 0)
                {
                    //Initialise the animation.
                    mixer.clipAction(
                        THREE.AnimationClip.findByName(
                            M_RESOURCE.animations,
                            M_RESOURCE.animations[0].name
                        )).play();
                }
                //Prevent further access to this code.
                onStart = false;
            }

            //Update the animation.
            if(M_RESOURCE.animations.length != 0 && mixer)
            {
                if(model.animationSpeed)
                {
                    mixer.update(frameTime / model.animationSpeed);
                }
                else
                {
                    mixer.update(frameTime / 1000);
                }
            }
        }
    }
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

/**
 * An abstract class representing objects which can be controlled with a
 * Microsoft Kinect device.
 * @extends RootObject
 * @author Andrew Alford
 * @date 17/02/2019
 * @version 1.0 - 03/10/2019
 */
class KinectObject extends RootObject
{
    /**
     * Constructor for the Kinect Object.
     */
    constructor()
    {
        //Construct the super class.
        super();

        //Define this class as abstract...
        if(this.constructor === KinectObject)
        {
            ENGINE.DEBUGGER.abstractInstanciationException('KinectObject');
        }

        //Define Member Variables...

        //[M_OBJECT] This is the object encased by the class.
        const M_OBJECT = new THREE.Group();

        //[M_JOINTS] Will hold of the joints in the object.
        const M_JOINTS = [];
        //[MAX_JOINTS] The maximum number of joints a the object can have.
        const MAX_JOINTS = 25;

        //[M_PREVIOUS_POSITIONS] An array to store the objects previous 
        //positions (for smooth filtering).
        const M_PREVIOUS_POSITIONS = [];
        //Populate arrays.
        for(let i = 0; i < MAX_JOINTS; i++)
        {
            M_PREVIOUS_POSITIONS.push([]);
        }
        M_PREVIOUS_POSITIONS.forEach(position => {
            for(let i = 0; i < 5; i++)
            {
                position.push(new THREE.Vector3(0,0,0));
            }
        });

        //Private Methods...

        /**
         * Validates a given index by checking if it is in the
         * range of given joints.
         * @param {number} index - The index being validated.
         * @returns 'true' if the given index is valid.
         */
        function validateIndex(index)
        {
            if(index > MAX_JOINTS || index < 0)
            {
                throw new Error('KinectObject.addJoint(): ' +
                    'Invalid Joint index has been given!');
            }
            return true;
        }
        
        //Public Methods...

        /**
         * Retrives the object being managed by this class.
         * (Overridden from the superclass).
         * @return Returns the main object being managed by this class.
         */
        this.getInstance = function()
        {
            return M_OBJECT;
        }
        
        /**
         * Adds this object to the given scene.
         * @param {THREE.Scene} scene - This is the scene to add the object to.
         */
        this.addToScene = function(scene)
        {
            //Check the appropriate parameter has been given.
            ENGINE.DEBUGGER.isThreeScene(scene, 'KinectObject.addToScene()');

            scene.add(M_OBJECT);
        }

        /**
         * Retrives all of this objects joints.
         * @retrun Returns all the joints in the object.
         */
        this.getJoints = function()
        {
            return M_JOINTS;
        }

        this.getJoint = function(index)
        {
           //Error Check Parameters...
           validateIndex(index);

           if(M_JOINTS[index])
           {
               return M_JOINTS[index];
           }
        }

        /**
         * Adds a joint to the object.
         * Notes:
         *  - Kinect will only track 24 of these.
         *  - You cannot call this method multiple times on the same joint.
         * @param {THREE.Object3D} joint - This is the joint to be added.
         * @param {number} index - Where the joint is to be stored.
         */
        this.addJoint = function(joint, index)
        {
            //Error Check Parameters...
            validateIndex(index);
            ENGINE.DEBUGGER.isThreeObject3D(joint, 'KinectObject.addJoint()');

            //If this joint already exists...
            if(M_JOINTS[index])
            {
                throw new Error('KinectObject.addJoint(): ' +
                    'Joint already exists.');
            }
            else
            {
                M_JOINTS[index] = joint;
                M_OBJECT.add(joint);
            }
        }

        /**
         * Updates the position of a joint.
         */
        this.updateJoint = function(position, orientation, index)
        {
            //Error Check Parameters...
            validateIndex(index);
            ENGINE.DEBUGGER.isThreeVector3(
                position, 'KinectObject.addJoint()');

            //If the joint exists...
            if(M_JOINTS[index])
            {
                //[averageFilter] Contains the average of all
                //previous positions.
                let averageFilter = new THREE.Vector3(0, 0, 0);

                //Update the previous positions.
                M_PREVIOUS_POSITIONS[index].unshift(position);
                M_PREVIOUS_POSITIONS[index].pop();
                M_PREVIOUS_POSITIONS[index].forEach(position => {
                    averageFilter.add(position);
                });
                averageFilter.divideScalar(M_PREVIOUS_POSITIONS[index].length);

                //Update its position.
                M_JOINTS[index].position.copy(averageFilter);
                M_JOINTS[index].rotation.setFromQuaternion(
                    orientation
                );
            }
        }
    }
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

module.exports = {
    RootObject: RootObject,
    ClassicObject: ClassicObject,
    Model: Model,
    KinectObject: KinectObject
}
