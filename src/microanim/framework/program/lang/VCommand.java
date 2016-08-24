/**
 * 
 */
package microanim.framework.program.lang;

import jsweet.lang.SyntaxError;
import microanim.framework.aux.json.path.TJSONPathQuery;
import microanim.framework.system.TLogger;

/**
 * @author peter
 *
 */
public class VCommand
{
    public static VCommand Create (Object descriptor)
    {
        String          verb;
        VCommand        ret;
        
        verb  = (String) TJSONPathQuery.ValueOf (descriptor, "$.cmd");
        if (verb == "moveTo")
        {
            ret = new TCmdMoveTo (descriptor);
        }
        else if (verb == "setTransparency")
        {
            ret = new TCmdSetTransparency (descriptor);
        }
        else
        {
            TLogger.Fatal ("VCommand::Create", "Can't recognize given descriptor", descriptor, false);
            throw new SyntaxError ("VCommand::Create(): ");
        }
        
        return ret;
    }
}
