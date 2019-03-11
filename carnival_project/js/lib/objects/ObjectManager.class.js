/**
 * A class to manage all the objects in a project.
 * @author Andrew Alford
 * @date 14/12/2018
 * @version 2.0 - 12/01/2019
 */
module.exports = class ObjectManager
{
    /**
     * Gets the name of this class.
     * @return Returns the name of the class.
     */
    static getClassName()
    {
        return 'ObjectManager';
    }

    /**
     * Constructor for the Object Manager.
     */
    constructor()
    {
        //INITIALISE MEMBER VARIABLES...
        //[m_updateableObjects] Array to hold all the objects being managed.
        let m_updateableObjects = [];

        //PUBLIC METHODS...

        /**
         * Adds an object to the list of objects being managed.
         * @param {Object} object - The object to be added.
         */
        this.addObject = function(object)
        {
            if(ENGINE.DEBUGGER.isEngineObject(
                object, ObjectManager.getClassName() + '.addObject()'))
            {
                //Add the object to the array.
                m_updateableObjects.push(object);

                //Return the location of that object in the array.
                return m_updateableObjects.length - 1;
            }
        }

        /**
         * Adds a collection of objects to the list of objects being managed.
         * @param {Object} objects - The objects to be added.
         * @returns A collection of indexes which corrolate to the object's 
         *          positions in the object manager.
         */
        this.addObjects = function(objects)
        {
            //[indexes] Keeps an array of object indexes in the object manager.
            let indexes = [];

            //Loop through all objects and add them to the array.
            if(ENGINE.DEBUGGER.isArray(objects))
            {
                objects.forEach(object => {
                    if(ENGINE.DEBUGGER.isEngineObject(
                        object, ObjectManager.getClassName() + '.addObject()'))
                    {
                        //Add the object to the array.
                        m_updateableObjects.push(object);
        
                        //Return the location of that object in the array.
                        indexes.push(m_updateableObjects.length - 1);
                    }
                });
            }

            return indexes;
        }

        /**
         * Retrieves an object from the list of objects.
         * @param {number} objectIndex - Points to the objects location
         *                               in the array.
         */
        this.getObject = function(objectIndex)
        {
            if(ENGINE.DEBUGGER.isNumber(
                objectIndex, ObjectManager.getClassName() + '.getObject()'))
            {
                return m_updateableObjects[objectIndex];
            }
        }

        /**
         * Retrieves the number of objects being managed.
         * @return Returns the number of objects being managed.
         */
        this.getSize = function()
        {
            return m_updateableObjects.length;
        }

        /**
         * Sets all objects active/inactive.
         * @param {boolean} active - If 'true' all objects will become active.
         *                           (Otherwise they become inactive).
         */
        this.setAllActive = function(active)
        {
            if(ENGINE.DEBUGGER.isBoolean(active,
                ObjectManager.getClassName() + '.getObject()'))
            {
                //Loop through all objects.
                for(let i = 0; i < m_updateableObjects.length; i++)
                {
                    m_updateableObjects[i].setActive(active);
                }
            }
        }

        /**
         * Sets a specific object active/inactive.
         * @param {number} objectIndex - Points to the object's location.
         * @param {boolean} active - If 'true' the object will become active.
         *                           (Otherwise it becomes inactive).
         */
        this.setActive = function(objectIndex, active)
        {
            if(ENGINE.DEBUGGER.isNumber(
                objectIndex, ObjectManager.getClassName() + '.setActive()') &&
            ENGINE.DEBUGGER.isBoolean(
                active, ObjectManager.getClassName() + '.setActive()'))
            {
                m_updateableObjects[objectIndex].setActive(active);
            }
        }

        /**
         * Adds all the objects being managed to the scene.
         * @param {THREE.Scene} scene - The scene to add the objects to.
         */
        this.addAllToScene = function(scene)
        {
            if(ENGINE.DEBUGGER.isThreeScene(
                scene, ObjectManager.getClassName() + '.addAllToScene()'))
            {
                //Loop through all objects and add them to the scene.
                for(let i = 0; i < m_updateableObjects.length; i++)
                {
                    m_updateableObjects[i].addToScene(scene);
                }
            }
        }

        /**
         * Updates all objects being managed.
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.updateObjects = function(frameTime)
        {
            if(ENGINE.DEBUGGER.isNumber(
                frameTime, ObjectManager.getClassName() + '.updateObjects()'))
            {
                //Loop through all objects and update them.
                for(let i = 0; i < m_updateableObjects.length; i++)
                {
                    m_updateableObjects[i].update(frameTime);
                }
            }
        }
    }
}
