/**
 * 
 */
package treewalk.framework.system;

import static jsweet.dom.Globals.window;

import java.util.function.Consumer;
import def.es6_promise.Promise;
import def.es6_promise.Promise.CallbackBiConsumer;
import jsweet.dom.Document;
import jsweet.dom.HTMLHeadElement;
import jsweet.dom.HTMLScriptElement;
import jsweet.dom.XMLHttpRequest;
import jsweet.lang.Error;

/**
 * @author peter
 */
public class TExtDependency
{
    private static final int        kDefaultTimeout = 2000;
    
    public static void AssertHasGlobalDependency (String libID, String libName)
    {
        boolean has;
        
        has = window.hasOwnProperty (libID);
        if (! has)
        {
            throw new Error ("Missing ext. library: '" + libName + "'. Needs to be loaded at the start of this program (treewalk.framework.system.TExtDependency.LoadJSLibrary()).");
        }
    }
    
    public static Promise<Object> LoadJSLibrary (String url)
    {
        Document            host;
        HTMLHeadElement     head;
        HTMLScriptElement   newScript;
        Promise<Object>     ret;
        
        host        = window.document;
        head        = host.head; 
        newScript   = (HTMLScriptElement) host.createElement ("script");
        
        ret = new Promise<Object>
        ((CallbackBiConsumer<Consumer<Object>, Consumer<Object>>)
            (resolve, reject) ->
            {
                newScript.onload = (e) ->
                {
                    TLogger.Message ("TExtDependencyLoader::LoadJSLibrary", "LoadSuccess: '" + url + "'");
                    resolve.accept (e);
                    return null;
                };
                newScript.onerror = (e) ->
                {
                    TLogger.Fatal ("TExtDependencyLoader::LoadJSLibrary", "Recource: LoadFailure: '" + url + "'", e, false);
                    reject.accept (e);
                    return null;
                };
                head.appendChild (newScript);
                newScript.src = url;
            }
        );
        
        return ret;
    }
    
    public static Promise<String> LoadText (String url, EMimeType mimeType, int timeout)
    {
        int                 tout;
        XMLHttpRequest      xhr;
        String              mt;
        Promise<String>     ret;
        
        tout            = (timeout >= 1)  ?  timeout : kDefaultTimeout;
        mt              = _GetMimeType (mimeType);
        xhr             = new XMLHttpRequest ();
        xhr.timeout     = tout;
        xhr.overrideMimeType (mt);
        xhr.open ("GET", url);
        xhr.responseType = "text";
        
        ret = new Promise<String>
        (
            (CallbackBiConsumer<Consumer<String>, Consumer<Object>>)
            (resolve, reject) ->
            {
                xhr.onreadystatechange = (e) ->
                {
                    if (xhr.readyState == 4)
                    {
                        if (xhr.status == 200)
                        {
                            TLogger.Message ("TExtDependencyLoader::LoadText", "Resource: LoadSuccess: '" + url + "'");
                            resolve.accept (xhr.responseText);
                        }
                        else
                        {
                            TLogger.Fatal ("TExtDependencyLoader::LoadText", "Recource: LoadFailure (" + xhr.status + "): '" + url + "'", e, false);
                            reject.accept (e);
                        }
                    }
                    return null;
                };
                xhr.onerror = (e) -> 
                {
                    TLogger.Fatal ("TExtDependencyLoader::LoadText", "Recource: LoadFailure (" + xhr.status + "): '" + url + "'", e, false);
                    reject.accept (e);
                    return null;
                };
                xhr.ontimeout = (e) ->
                {
                    TLogger.Fatal ("TExtDependencyLoader::LoadText", "Recource: LoadFailure (timeout): '" + url + "'. Max Load time [ms]: " + tout, e, false);
                    return null;
                };
                xhr.send ();
            }
        );
        
        return ret;
    }
    
    private static String _GetMimeType (EMimeType t)
    {
        String ret;
        
        ret = null;
        switch (t)
        {
            case kApplicationJSON:
                ret = "application/json";
                break;
            case kTextPlain:
                ret = "text/plain";
                break;
            default:
                throw new Error ("Unrecognized mime type. ID = " + t);
        }
        
        return ret;
    }
    
    /**
     * Reserved for later use.
     * 
     * @param t
     * @return
     */
    @SuppressWarnings ("unused")
    private static String _GetResponseType (EResponseType t)
    {
        String ret;
        
        ret = null;
        switch (t)
        {
            case kArrayBuffer:
                ret = "arraybuffer";
                break;
            case kBlob:
                ret = "blob";
                break;
            case kDocument:
                ret = "document";
                break;
            case kText:
                ret = "text";
                break;
            default:
                throw new Error ("Unrecognized response type. ID = " + t);
        }
        
        return ret;
    }

}
