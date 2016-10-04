if (typeof window.MAL == "undefined")
{
    window.MAL =
    {
        test:       {},
        grammkit:   {},
        util:
        {
            LoadStylesheet: function (url)
            {
                var head;
                var styleElement;
                
                styleElement                = window.document.createElement ("link");
                styleElement.rel            = "stylesheet";
                styleElement.type           = "text/css";
                styleElement.href           = url;
                head                        = document.getElementsByTagName('head')[0];
                
                head.appendChild (styleElement);
            },
            LoadScript: function (url)  /* [100] */
            {
                var head;
                var scriptElement;
                
                scriptElement               = window.document.createElement ("script");
                scriptElement.src           = url;
                head                        = document.getElementsByTagName('head')[0];
                
                head.appendChild (scriptElement);
            }
        }
    }
}

/*

[100] I've wrestled with umpteen external libraries... avoiding the depths of RequireJS
      is a seriously attractive proposal right now!

*/