if (typeof window.MAL == "undefined")
{
    throw ("Error: Missing object setup. Have you included '/js/testing/init.js'?");
}

window.MAL.grammkit = 
{
    program: null
}

window.MAL.grammkit.program = function ()
{
    var LoadCSS = function (url)
    {
        var head;
        var styleElement;
        
        /* Load Grammkit's style sheets. */
        styleElement                = window.document.createElement ("link");
        styleElement.rel            = "stylesheet";
        styleElement.type           = "text/css";
        styleElement.href           = url
        head                        = document.getElementsByTagName('head')[0];
        head.appendChild (styleElement);
    };
    
    /**
     * Event handler: Upon loading this page.
     */
    var onLoadPage = function ()
    {
        var head;
        var styleElement;
        
        /* Load Grammkit's style sheets. */
        LoadCSS ("/vendor/grammkit/css/grammkit.bootstrap.min.css");
        LoadCSS ("/vendor/grammkit/css/grammkit.style.css");
    };

    onLoadPage ();
};

window.MAL.grammkit.program ();

/*

    ----------------------------------------
    [100]:  Assumption: If test.expectedResult is a function we trust the hosting Javascript engine
            to compute the result correctly. In effect, the MAL parser test will follow the quality 
            of the hosting Javascript engine.
    
 */