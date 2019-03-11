/**
 * Utility class to time events in the project.
 * @author Andrew Alford
 * @date 06/11/2018
 * @version 2.0 - 14/01/2019
 */
module.exports = class Timer
{
    /**
     * Gets the name of this class.
     * @return Returns the name of this class.
     */
    static getClassName()
    {
        return 'Timer';
    }
    
    /**
     * Constructor for a Timer.
     */
    constructor()
    {
        //INITIALISE MEMBER VARIABLES...
        //[frameTime] The amount of time taken to compute and render
        //a frame of animation.
        let m_frameTime = 0;
        //[previousTime] The amoint of time taken to compute and render the
        //previous frame of animation.
        let m_previousTime = 0;
        //[currentTime] Stores the current time in milliseconds.
        let m_currentTime = 0;

        /**
         * Retrieves the time taken to compute and render the previous frameTime
         * of animation.
         * @return Returns the frame time.
         */
        this.getFrameTime = function()
        {
            return m_frameTime;
        }

        /**
         * Updates the timer.
         */
        this.update = function()
        {
            //Update timing variables.
            m_currentTime = performance.now();
            m_frameTime = m_currentTime - m_previousTime;
            m_previousTime = m_currentTime;
        }
    }
}
