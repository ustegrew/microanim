/**
 * 
 */
package treewalk.framework.program.res;

/**
 * @author peter
 *
 */
public class TResourceRefImage extends VResourceRef
{
    private String              fKey;
    private String              fURI;
    private String              fIDLayer;
    
    public TResourceRefImage (Object descriptor)
    {
        super (EResType.kImage);

        jsweet.lang.Object          d;

        d           = (jsweet.lang.Object) descriptor;
        fKey        = (String) d.$get ("key");
        fURI        = (String) d.$get ("uri");
        fIDLayer    = (String) d.$get ("targetLayer");
    }

    public String GetKey ()
    {
        return fKey;
    }

    public String GetURI ()
    {
        return fURI;
    }

    public String GetIDLayer ()
    {
        return fIDLayer;
    }
}
