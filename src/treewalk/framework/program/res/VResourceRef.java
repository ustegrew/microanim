/**
 * 
 */
package treewalk.framework.program.res;

import treewalk.framework.system.TDebug;

/**
 * @author peter
 *
 */
public abstract class VResourceRef
{
    public static final String GetResTypeID (EResType t)
    {
        String ret;
        
        switch (t)
        {
            case kImage:
                ret = "image";
                break;
            default:
                ret = "unknown";
        }
        
        return ret;
    }
    
    public static VResourceRef Create (EResType t, Object oRef)
    {
        String          sD;
        VResourceRef    ret;
        
        switch (t)
        {
            case kImage:
                ret = new TResourceRefImage (oRef);
                break;
            default:
                sD = TDebug.GetStringified (oRef, false);
                throw new jsweet.lang.Error ("Unknown resource type (" + t + ") for resource descriptor:\n" + sD);
        }
        
        return ret;
    }
    
    private EResType                fType;
    
    protected VResourceRef (EResType t)
    {
        fType = t;
    }
    
    public EResType GetType ()
    {
        return fType;
    }
}
