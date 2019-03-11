/**
 * Input class which tracks keyboard input from the user.
 * @author Andrew Alford
 * @date 16/12/2018
 * @version 2.0 - 16/01/2019
 */
module.exports = class KeyboardInput
{
    /**
     * Gets the name of this class.
     * @return Returns the name of the class.
     */
    static getClassName()
    {
        return 'KeyboardInput';
    }

    /**
     * Constructor for the Keyboard Input class.
     * - It is not case sensitive.
     */
    constructor()
    {
        //Initialise member variables...
        //[m_keyPressed] Holds the name of the most recently pressed key.
        let m_keyPressed = null;
        //[m_lastKeyPressed] Holds the name of the previously pressed key.
        let m_lastKeyPressed = null;

        //Event Listeners...
        //When a key is being pressed.
        document.addEventListener("keypress", function(event)
        {
            m_keyPressed = event.key.toUpperCase();

            //If no keys have been pressed yet, set the previous
            //key to the first key pressed.
            if(!m_lastKeyPressed)
            {
                m_lastKeyPressed = m_keyPressed;
            }
        });
        //When a key has been released.
        document.addEventListener("keyup", function(event)
        {
            m_lastKeyPressed = m_keyPressed;
            m_keyPressed = null;
        });

        //Public Methods...

        /**
         * Checks if a key has been pressed.
         * @param {number} key - A reference to the key being checked.
         * @return Returns 'true' if the key has been pressed.
         *         (Otherwise 'false' is returned).
         */
        this.isPressed = function(key)
        {
            ENGINE.DEBUGGER.isString(key, KeyboardInput.getClassName());

            key = key.toUpperCase();

            if(key == m_keyPressed)
            {
                return true;
            }
            return false;
        }

        /**
         * Checks if a new key has been pressed.
         * @param {number} key - A reference to the key being checked.
         * @return Returns 'true' the key has been newly pressed.
         *         (Otherwise return 'false').
         */
        this.isNewKeyPressed = function(key)
        {
            ENGINE.DEBUGGER.isString(key, KeyboardInput.getClassName());

            key = key.toUpperCase();

            if(!(key == m_keyPressed))
            {
                if(key == m_lastKeyPressed)
                {
                    m_lastKeyPressed = null;
                    return true;
                }
            }
            return false;
        }
    }
}
