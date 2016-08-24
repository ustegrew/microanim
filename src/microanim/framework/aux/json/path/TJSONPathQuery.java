/**
 * 
 */
package microanim.framework.aux.json.path;

import static jsweet.dom.Globals.window;
import static jsweet.util.Globals.$get;

import jsweet.lang.Function;
import microanim.framework.system.TExtDependency;

/**
 * @author peter
 *
 */
public class TJSONPathQuery
{
    public static Object[] Query (Object oSubject, String path)
    {
        Object[]        ret;
        
        ret = _Apply ("query", oSubject, path);
        
        return ret;
    }
    
    public static<T> T ValueOf (Object oSubject, String path)
    {
        T ret;
        
        ret = _Apply ("value", oSubject, path);
        
        return ret;
    }
    
    @SuppressWarnings ({ "unchecked" })
    private static <T> T _Apply (String method, Object oSubject, String arg)
    {
        Object                  jp;
        Function                func;
        T                       ret;
        
        TExtDependency.AssertHasGlobalDependency ("jsonpath", "JSONPath");
        
        jp      = $get (window, "jsonpath");
        func    = $get (jp, method);
        ret     = (T) func.call (jp, oSubject, arg);
        
        return ret;
    }
}
