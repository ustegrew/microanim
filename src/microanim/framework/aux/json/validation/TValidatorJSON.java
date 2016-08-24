/**
 * 
 */
package microanim.framework.aux.json.validation;

import static jsweet.dom.Globals.window;
import static jsweet.util.Globals.$apply;
import static jsweet.util.Globals.$get;

import jsweet.lang.Function;
import jsweet.lang.JSON;
import microanim.framework.aux.storage.TArray;
import microanim.framework.system.TExtDependency;

/**
 * @author peter
 * @see    https://github.com/cincheo/jsweet/issues/144
 */
public class TValidatorJSON
{
    private Object              fSchema;
    private Function            fValidator;
    private jsweet.lang.Object  fOptions;
    
    public TValidatorJSON (Object schema)
    {
        Function        imjv;
        
        TExtDependency.AssertHasGlobalDependency ("isMyJsonValid", "Is-My-Json-Valid");
        
        fOptions        = new jsweet.lang.Object ();
        fOptions.$set ("verbose", true);
        
        fSchema         = schema;
        imjv            = (Function) window.$get ("isMyJsonValid");
        fValidator      = (Function) imjv.call (window, fSchema, fOptions);
    }
    
    public TArray<TValidatorJSONErr> Validate (Object oJS)
    {
        boolean                             hasPassed;
        int                                 i;
        jsweet.lang.Object[]                errors;
        TValidatorJSONErr                   erx;
        TArray<TValidatorJSONErr>           ret;
        
        ret         = new TArray<TValidatorJSONErr> ();
        hasPassed   = (boolean) fValidator.call (window, oJS);
        if (! hasPassed)
        {
            errors = (jsweet.lang.Object[]) fValidator.$get ("errors");
            for (i = 0; i < errors.length; i++)
            {
                erx = new TValidatorJSONErr (errors [i]);
                ret.Enqueue (erx);
            }
        }
        
        return ret;
    }
}
