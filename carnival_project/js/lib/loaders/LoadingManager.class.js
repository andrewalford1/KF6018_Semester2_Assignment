/**
 * A loading class to manage the loading of files into the project.
 * @author Andrew Alford
 * @date 15/01/2019
 * @version 1.2 - 27/01/2019
 */
module.exports = class LoadingManager
{
    /**
     * Static method to toggle all loading screen elements.
     * (They will also be removde if they become hidden).
     * @param {boolean} visible - If 'true' then show the loading screen.
     */
    static toggleLoadingScreen(visible)
    {
        //[elements] All the loading screen elements in the html document.
        let elements = document.getElementsByClassName('loading_screen');
        if(elements)
        {
            if(visible)
            {
                for(let i = 0; i < elements.length; i++)
                {
                    elements[i].style.visibility = 'visible';
                }
            }
            else
            {
                for(let i = 0; i < elements.length; i++)
                {
                    elements[i].style.visibility = 'hidden';
                    elements[i].style.display = 'none';
                }
            }
        }
    }

    /**
     * Constructor for the loading manager.
     * Notes:
     * - If you have a loading screen css file, live data can be
     *   displayed to the page whilst the program is loading. This is done
     *   by giving an element an CSS ID of "loading_info".
     * - Any document tags with the CSS class of "loading_screen" will be
     *   removed once loading is finished.
     */
    constructor()
    {
        //[LOADING_MANAGER] Manages the loading of files into the project.
        const LOADING_MANAGER = new THREE.LoadingManager();
        
        //[loaded] Will be 'true' when all resources have loaded.
        let loaded = false;
        //[startTime] The time when loading started.
        let startTime = 0;
        //[endTime] The total time it took to load the resources.
        let endTime = 0;
        //[resourcesLoaded] Contains the URLS of all resources loaed
        //and the order in which they were loaded.
        let resourcesLoaded = [];
        //Private Methods...

        /**
         * Display information about the current resource being loaded.
         * @param {string} url - The location of the resource being loaded.
         * @param {number} itemsLoaded - How many items have been loaded
         *                               so far.
         * @param {number} itemsTotal - How many items will be loaded in
         *                              in total.
         */
        function displayLoadStatus(url, itemsLoaded, itemsTotal)
        {
            if(document.getElementById('loading_info'))
            {               
                document.getElementById('loading_info').innerHTML = (
                    `Loading file: \"${url}\"
                    Items Loaded: ${itemsLoaded} of ${itemsTotal}`
                );
                resourcesLoaded.push({
                    Resource : url
                });
            }
            if(document.getElementById('loading_progress'))
            {
                //[percentageLoaded] How much of the program has loaded.
                let percentageLoaded = 
                    ((itemsLoaded / itemsTotal) * 100).toFixed(0);
                document.getElementById('loading_progress').style.width = 
                    percentageLoaded.toString() + '%';
            }
        }

        //LOADING_MANAGER functions...
        LOADING_MANAGER.onStart = function(url, itemsLoaded, itemsTotal)
        {
            startTime = performance.now();
            loaded = false;
            LoadingManager.toggleLoadingScreen(true);
            displayLoadStatus(url, itemsLoaded, itemsTotal);
        }
        LOADING_MANAGER.onProgress = function(url, itemsLoaded, itemsTotal)
        {
            displayLoadStatus(url, itemsLoaded, itemsTotal);
        }
        LOADING_MANAGER.onError = function(url)
        {
            console.log(`There was an error loading file: ${url}`);
        }
        LOADING_MANAGER.onLoad = function()
        {
            endTime = ((performance.now() - startTime)/1000).toFixed(2);
            console.table(resourcesLoaded);
            console.log(`Loading completed in: ${endTime} seconds.`);
            LoadingManager.toggleLoadingScreen(false);
            loaded = true;
        }

        //Public Methods...

        /**
         * Retrieves the loading manager.
         * @return Returns an instance of the loading manager.
         */
        this.getLoadingManager = function()
        {
            return LOADING_MANAGER;
        }

        /**
         * Checks if all assets have been loaded.
         * @return Returns 'true' if all assets have loaded.
         */
        this.isLoaded = function()
        {
            return loaded;
        }
    }
}
