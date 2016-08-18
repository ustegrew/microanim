/**
 * 
 */
package treewalk.framework.system;

import static jsweet.dom.Globals.alert;
import static jsweet.dom.Globals.console;

import jsweet.lang.Date;

/**
 * @author peter
 *
 */
public class TLogger
{
    public static void Fatal (String origin, String msg, boolean showMsgBox)
    {
        _Fatal (origin, msg, null, null, showMsgBox);
    }
    
    public static void Fatal (String origin, String msg, Object err, boolean showMsgBox)
    {
        _Fatal (origin, msg, err, null, showMsgBox);
    }
    
    public static void Fatal (String origin, String msg, Object oSubject, Object err, boolean showMsgBox)
    {
        _Fatal (origin, msg, err, oSubject, showMsgBox);
    }
    
    public static void Message (String origin, String msg)
    {
        String m;
        
        m = _GetMsg (origin, msg, "LOG", null, null);
        console.log (m);
    }
    
    public static void Message (String origin, String msg, Object oSubject)
    {
        String m;
        
        m = _GetMsg (origin, msg, "LOG", oSubject, null);
        console.log (m);
    }
    
    public static void Warn (String origin, String msg)
    {
        String m;
        
        m = _GetMsg (origin, msg, "WARNING", null, null);
        console.warn (m);
    }
    
    public static void Warn (String origin, String msg, Object oSubject)
    {
        String m;
        
        m = _GetMsg (origin, msg, "WARNING", oSubject, null);
        console.warn (m);
    }
    
    private static void _Fatal (String origin, String msg, Object err, Object oSubject, boolean showMsgBox)
    {
        String  mTerse;
        String  mDetail;
        
        mDetail = _GetMsg (origin, msg, "FATAL", oSubject, err);
        console.error (mDetail);
        if (showMsgBox)
        {
            mTerse  = _GetMsg (origin, msg, "FATAL", null, null);
            mTerse += "\n\nSee your browser's web console for further details.\n";
            alert (mTerse);
        }
    }
    
    private static String _GetMsg (String origin, String msg, String prologue, Object oSubject, Object err)
    {
        Date   now;
        String dt;
        String ret;
        
        now = new Date ();
        dt  = now.toISOString ();
        if (origin != null)
        {
            ret = origin + ": " + prologue + ": " + dt + ": " + msg;
        }
        else
        {
            ret = prologue + ": " + dt + ": " + msg;
        }
        
        if (err != null)
        {
            ret    += "\n--------------\n";
            ret    += "Error details:\n";
            ret    += "--------------\n";
            ret    += TDebug.GetStringified (err, false);
        }
        
        if (oSubject != null)
        {
            ret    += "\n-------\n";
            ret    += "Object:\n";
            ret    += "-------\n";
            ret    += TDebug.GetStringified (oSubject);
        }
        
        return ret;
    }
}
