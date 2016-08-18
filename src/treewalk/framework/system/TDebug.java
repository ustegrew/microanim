/**
 * 
 */
package treewalk.framework.system;

import static jsweet.lang.Globals.eval;

import jsweet.dom.Event;
import jsweet.lang.Error;
import jsweet.lang.JSON;

/**
 * @author peter
 *
 */
public class TDebug
{
    private static final int        kIndentSpaces = 4;

    public static void DebuggerTrap ()
    {
        eval ("debugger;");
    }
    
    public static String GetStringified (Object o)
    {
        String ret;
        
        ret = _GetStringified (o, false);
        
        return ret;
    }
    
    public static String GetStringified (Object o, boolean doSuppressNull)
    {
        String ret;
        
        ret = _GetStringified (o, doSuppressNull);
        
        return ret;
    }
    
    /**
     * Returns a dump of an object as string. Dump is pretty printed.
     * Method will also stringify objects of type Error.
     * 
     * @param o     The error object to be dumped.
     * @return      The dump, in JSON format.
     * @see         http://stackoverflow.com/a/20405830
     */
    private static String _GetStringified (Object o, boolean doSuppressNull)
    {
        final String[] kReplEv = 
        {
            "bubbles",
            "cancelBubble",
            "cancelable",
            "defaultPrevented",
            "eventPhase",
            "isTrusted",
            "returnValue",
            "target",
            "timeStamp",
            "type"
        };
        
        jsweet.lang.Object      copy;
        Error                   eCast;
        Object[]                nullO;
        String                  ret;
        
        nullO = null;
        if (o == null)
        {
            ret = doSuppressNull  ?  "" : "null";
        }
        else if (o instanceof Error)
        {
            eCast = (Error) o;
            copy  = new jsweet.lang.Object ();
            copy.$set ("message",   eCast.message);
            copy.$set ("name",      eCast.name);
            ret   = JSON.stringify (copy, nullO, kIndentSpaces);
        }
        else if (o instanceof Event)
        {
            ret = JSON.stringify (o, kReplEv, kIndentSpaces);
        }
        else
        {
            ret = JSON.stringify (o, nullO, kIndentSpaces);
        }
        
        return ret;
    }
}
