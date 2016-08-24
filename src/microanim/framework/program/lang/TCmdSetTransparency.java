package microanim.framework.program.lang;

import jsweet.lang.SyntaxError;
import microanim.framework.aux.json.path.TJSONPathQuery;
import microanim.framework.system.TLogger;

public class TCmdSetTransparency extends VCommand
{
    private String          fIDSubject;
    private double          fAlpha;
    private int             fTime;
    
    public TCmdSetTransparency (Object descriptor)
    {
        fIDSubject  = TJSONPathQuery.ValueOf (descriptor, "$.args.subject");
        fAlpha      = TJSONPathQuery.ValueOf (descriptor, "$.args.alpha");
        fTime       = TJSONPathQuery.ValueOf (descriptor, "$.args.time");
        
        _AssertOK ();
        TLogger.Message ("TCmdSetTransparency::cTor", "Created new command. Details: ", this);
    }
    
    private void _AssertOK ()
    {
        if (this.fAlpha < 0.0  ||  this.fAlpha > 1.0)
        {
            TLogger.Fatal ("TCmdMoveTo::_AssertOK", "Alpha must be in [0.0, 1.0]. Given: " + fAlpha, this, false);
            throw new SyntaxError ("Faulty initialization parameters.");
        }
        if (this.fTime < 0)
        {
            TLogger.Fatal ("TCmdMoveTo::_AssertOK", "Transition time must be in [0, maxInt]. Given: " + fTime, this, false);
            throw new SyntaxError ("Faulty initialization parameters.");
        }
    }
}
