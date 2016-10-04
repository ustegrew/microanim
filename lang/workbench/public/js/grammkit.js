if (typeof window.MAL == "undefined")
{
    throw ("Error: Missing object setup. Have you included '/js/init.js'?");
}

window.MAL.grammkit.program = function ()
{
    window.MAL.util.LoadStylesheet  ("/vendor/grammkit/css/grammkit.style.css");
    window.MAL.util.LoadScript      ("/vendor/grammkit/grammkit.js");
};

window.MAL.grammkit.program ();
