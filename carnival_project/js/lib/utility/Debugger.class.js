/**
 * A class to help debug the engine.
 * @author Andrew Alford
 * @date 12/01/2019
 * @version 2.1 - 09/03/2019
 */
module.exports = class Debugger
{
    constructor()
    {
        //Set up stats and add it to the document.
        //(Code modified from https://github.com/mrdoob/stats.js/).
        let statsScript = document.createElement('script');
        statsScript.onload = function()
        {
            let stats = new Stats();
            document.body.appendChild(stats.dom);
            requestAnimationFrame(function loop()
            {
                stats.update();
                requestAnimationFrame(loop);
            });
        };
        statsScript.src = '//mrdoob.github.io/stats.js/build/stats.min.js';
        document.head.appendChild(statsScript);
    }

    /**
     * Parses a JSON string into a JS object.
     * @param {*} json - This is the JSON to be parsed.
     * @returns the object parsed from the JSON.
     */
    static extractJSON(json)
    {
        try 
        {
            return JSON.parse(json);
        } 
        catch(exception)
        {
            throw new Error(`Given string is not JSON.`);
        }
    }

///////////////////////////////////////////////////////////////////////////////
//////////////////////////...CHECK JS VARIABLES.../////////////////////////////
///////////////////////////////////////////////////////////////////////////////

    /**
     * Checks if a given variable is an array.
     * @param {*} array - The array being checked.
     * @param {*} caller - Who is calling this method?
     * @returns 'true' if the array is valid.
     */
    static isArray(array, caller)
    {
        if(!Array.isArray(array))
        {
            throw new Error(`${caller}: requires an array`);
        }
        return true;
    }

    /**
     * Checks if a given variable is a boolean.
     * @param {boolean} bool - The boolean being checked.
     * @param {string} caller - Who is calling this method?
     * @returns 'true' if the boolean scene is valid.
     */
    static isBoolean(bool, caller)
    {
        if(!(typeof bool === typeof true))
        {
            throw new Error(`${caller}: requires a boolean.`);
        }
        return true;
    }

    /**
     * Checks if a given variable is a number.
     * @param {number} number - The number being checked.
     * @param {string} caller - Who is calling this method?
     * @returns 'true' if the number scene is valid.
     */
    static isNumber(number, caller)
    {
        if(!(typeof number === 'number'))
        {
            throw new Error(`${caller}: requires a number.`);
        }
        return true;
    }

    /**
     * Checks if a given variable is a string.
     * @param {string} string - The string being checked.
     * @param {string} caller - Who is calling this method?
     * @returns 'true' if the string is valid.
     */
    static isString(string, caller)
    {
        if(!(typeof string === 'string') || string instanceof String)
        {
            throw new Error(`${caller}: requires a string.`);
        }
        return true;
    }

///////////////////////////////////////////////////////////////////////////////
///////////////////////...CHECK THREE JS VARIABLES...//////////////////////////
///////////////////////////////////////////////////////////////////////////////

    /**
     * Checks is a given scene is a Three JS scene.
     * @param {THREE.Scene} scene - The scene being checked.
     * @param {string} caller - Who is calling this method?
     * @returns 'true' if the given scene is valid.
     */
    static isThreeScene(scene, caller)
    {
        if(!(scene instanceof THREE.Scene))
        {
            throw new Error(`${caller}: requires a THREE.Scene.`);
        }
        return true;
    }

    /**
     * Checks a given 3D vector is a THREE.Vector3.
     * @param {THREE.Vector3} vector - The vector being checked.
     * @param {string} caller - Who is calling this method?
     * @returns 'true' if the given 3D vector is valid.
     */
    static isThreeVector3(vector, caller)
    {
        if(!(vector instanceof THREE.Vector3))
        {
            throw new Error(`${caller}: requires a THREE.Vector3.`);
        }
        return true;
    }

    /**
     * Checks a given material is a THREE.Material.
     * @param {THREE.Material} material - The material being checked.
     * @param {string} caller - Who is calling this method?
     * @returns 'true' if the given material is valid.
     */
    static isThreeMaterial(material, caller)
    {
        if(!(material instanceof THREE.Material))
        {
            throw new Error(`${caller}: requires a Three.Material.`);
        }
        return true;
    }

    /**
     * Checks if a given object is a THREE.Object3D.
     * @param {THREE.Object3D} object - The object being checked.
     * @param {string} caller - Who is calling this method?
     * @returns 'true' if the given object is valid.
     */
    static isThreeObject3D(object, caller)
    {
        if(!(object instanceof THREE.Object3D))
        {
            throw new Error(`${caller}: requires a THREE.Object3D.`);
        }
        return true;
    }

    /**
     * Checks if a given loading manager is a THREE.LoadingManager.
     * @param {THREE.LoadingManager} loadingManager - The loading manager
     *                                                being checked.
     * @param {string} caller - Who is calling this method?
     * @returns 'true' if the given loading manager is valid.
     */
    static isThreeLoadingManager(loadingManager, caller)
    {
        if(!(loadingManager instanceof THREE.LoadingManager))
        {
            throw new Error(`${caller}: requires a THREE.LoadingManager.`);
        }
        return true;
    }

    /**
     * Checks if a given camera is a THREE.Camera.
     * @param {THREE.Camera} camera - The camera being checked.
     * @param {string} caller - Who is calling this method?
     * @returns 'true' if the given camera is valid.
     */
    static isThreeCamera(camera, caller)
    {
        if(!(camera instanceof THREE.Camera))
        {
            throw new Error(`${caller}: requries a THREE.Camera.`);
        }
        return true;
    }

    /**
     * Checks if a given euler is a THREE.Euler.
     * @param {*} euler - The euler being checked.
     * @param {*} caller - Who is calling this method?
     * @returns 'true' if the given euler is valid.
     */
    static isEuler(euler, caller)
    {
        if(!(euler instanceof THREE.Euler))
        {
            throw new Error(`${caller}: requires a THREE.Euler.`);
        }
        return true;
    }

///////////////////////////////////////////////////////////////////////////////
////////////////////////...CHECK ENGINE VARIABLES...///////////////////////////
///////////////////////////////////////////////////////////////////////////////

    /**
     * Checks if a given object is a ENGINE.OBJECT.
     * @param {ENGINE.OBJECT} object - The object being checked.
     * @param {string} caller - Who is calling this method?
     * @returns 'true' if the given object is valid.
     */
    static isEngineObject(object, caller)
    {
        if(!(object instanceof ENGINE.OBJECTS.RootObject))
        {
            throw new Error(`${caller}: requires a ENGINE.OBJECT.`);
        }
        return true;
    }

    /**
     * Checks if a given object is a ENGINE.CAMERA.
     * @param {ENGINE.CAMERA} camera - The camera being checked.
     * @param {string} caller - Who is calling this method?
     * @returns 'true' if the given camera is valid.
     */
    static isEngineCamera(camera, caller)
    {
        if(!(camera instanceof ENGINE.CAMERA))
        {
            throw new Error(`${caller}: requires a ENGINE.CAMERA.`);
        }
        return true;
    }

    /**
     * Checks if a given object is a ENGINE.Camera.
     * @param {ENGINE.OBJECT_MANAGER} objectManger - The objectManager
     *                                               being checked.
     * @param {string} caller - Who is calling this method?
     * @returns 'true' if the given objectManager is valid.
     */
    static isEngineObjectManager(objectManager, caller)
    {
        if(!(objectManager instanceof ENGINE.OBJECT_MANAGER))
        {
            throw new Error(`${caller}: requires a ENGINE.OBJECT_MANAGER.`);
        }
        return true;
    }

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////...EXCEPTIONS.../////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

    /**
     * Throws a generic exception message when an abstract method has been
     * called and hasn't been overridden.
     * @param {string} caller - Who is calling this method?
     */
    static abstractException(caller)
    {
        throw new Error(`${caller} is abstract and needs to be overridden.`);
    }

    /**
     * Throws a generic exception message when an attempt is made to
     * instanciate an abstract class.
     * @param {string} caller - Who is calling this method?
     */
    static abstractInstanciationException(caller)
    {
        throw new Error(`${caller}: Cannot instanciate abstract class!`);
    }
}
