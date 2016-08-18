/**
 * 
 */
package treewalk.framework.aux.json.validation;

/**
 * @author peter
 *
 */
public class TValidatorJSONErr
{
    private String fField;
    private String fMessage;
    
    TValidatorJSONErr (jsweet.lang.Object err)
    {
        fField      = (String) err.$get ("field");
        fMessage    = (String) err.$get ("message");
    }
    
    public String GetField()
    {
        return fField;
    }
    
    public String GetMessage ()
    {
        return fMessage;
    }
    
    public String GetDump ()
    {
        String ret;
        
        ret = "'" + fField + "': " + fMessage;
        
        return ret;
    }
}
