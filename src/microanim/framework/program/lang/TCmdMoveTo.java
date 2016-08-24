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
public class TCmdMoveTo extends VCommand
{
    private String          fIDSubject;
    private double          fX;
    private double          fY;
    private int             fTime;
    
    public TCmdMoveTo (Object descriptor)
    {
        fIDSubject  = TJSONPathQuery.ValueOf (descriptor, "$.args.subject");
        fX          = TJSONPathQuery.ValueOf (descriptor, "$.args.x");
        fY          = TJSONPathQuery.ValueOf (descriptor, "$.args.y");
        fTime       = TJSONPathQuery.ValueOf (descriptor, "$.args.time");
        
        _AssertOK ();
        TLogger.Message ("TCmdMoveTo::cTor", "Created new command. Details: ", this);
    }
    
    private void _AssertOK ()
    {
        if (this.fTime < 0)
        {
            TLogger.Fatal ("TCmdMoveTo::_AssertOK", "Transition time must be in [0, maxInt]. Given: " + fTime, this, false);
            throw new SyntaxError ("Faulty initialization parameters.");
        }
    }
}
