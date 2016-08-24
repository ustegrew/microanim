/**
 * 
 */
package microanim.framework.program;

import jsweet.lang.SyntaxError;
import microanim.framework.aux.json.path.TJSONPathQuery;
import microanim.framework.aux.json.validation.TValidatorJSON;
import microanim.framework.aux.json.validation.TValidatorJSONErr;
import microanim.framework.aux.storage.TArray;
import microanim.framework.aux.storage.TCollection;
import microanim.framework.program.lang.VCommand;
import microanim.framework.program.res.EResType;
import microanim.framework.program.res.VResourceRef;
import microanim.framework.system.TLogger;

/**
 * @author peter
 *
 */
public class TCompiler
{
    public static TProgram Parse (Object prog, Object sProg, Object sLang)
    {
        TProgram                ret;
        
        ret = _Parse (prog, sProg, sLang);
        
        return ret;
    }
    
    private static TProgram _Parse (Object prog, Object sProg, Object sLang)
    {
        TValidatorJSON                              globalValidator;
        TCollection<TValidatorJSON>                 localValidators;
        TValidatorJSON                              v;
        Object                                      sl;
        int                                         i;
        String[]                                    keys;
        String                                      k;
        String                                      p;
        Object                                      cSchema;
        TProgram                                    ret;

        TLogger.Message ("TCompiler::_Parse", "Reading JSON schemata...");
        globalValidator     = new TValidatorJSON                        (sProg);
        localValidators     = new TCollection<TValidatorJSON>           ();
        sl                  = TJSONPathQuery.ValueOf (sLang, "$.commands");
        keys                = jsweet.lang.Object.getOwnPropertyNames (sl);
        if (keys.length >= 1)
        {
            for (i = 0; i < keys.length; i++)
            {
                k       = keys [i];
                p       = "$.commands." + k;
                cSchema = TJSONPathQuery.ValueOf    (sLang, p);
                v       = new TValidatorJSON        (cSchema);
                localValidators.Add              (k, v);
            }
        }
        
        TLogger.Message ("TCompiler::_Parse", "Parsing program...");
        _AssertValid    (prog, globalValidator, localValidators);

        ret = new TProgram ();
        _ReadResources  (ret, prog);
        _ReadSteps      (ret, prog);
        
        return ret;
    }
    
    private static void _AssertValid (Object prog, TValidatorJSON globalValidator, TCollection<TValidatorJSON> localValidators)
    {
        Object[]                    descr;
        int                         i;
        Object                      d;
        String                      k;
        TValidatorJSON              v;

        _AssertValid_Work (globalValidator, prog);
        
        descr = TJSONPathQuery.Query (prog, "$.program.*");
        if (descr.length >= 1)
        {
            for (i = 0; i < descr.length; i++)
            {
                d   = descr[i];
                k   = TJSONPathQuery.ValueOf (d, "$.cmd");
                v   = localValidators.GetElementByKey (k);
                _AssertValid_Work (v, d);
            }
        }
    }
    
    private static void _AssertValid_Work (TValidatorJSON v, Object o)
    {
        int                         i;
        TArray<TValidatorJSONErr>   err; 
        TValidatorJSONErr           erx;
        String                      msg;
        int                         nErr;
        
        err  = v.Validate (o);
        nErr = err.GetNumElements ();
        if (nErr >= 1)
        {
            TLogger.Fatal ("TCompiler::_AssertValid_Work", "Validation error on object", o, false);
            msg  = "TCompiler::_AssertValid_DumpErrors: Given program failed validation. Specifics:\n";
            for (i = 0; i < nErr; i++)
            {
                erx     = err.GetElementByIndex (i);
                msg    += erx.GetDump ();
                if (i < nErr-1)
                {
                    msg += "\n";
                }
            }
            throw new SyntaxError (msg);
        }
    }

    private static void _ReadResources (TProgram oProg, Object prog)
    {
        Object []           descr;
        
        descr = TJSONPathQuery.Query (prog, "$.resources.images.*");
        
        TLogger.Message ("TCompiler::_ReadResources", "Got image descriptors", descr);
        _ReadResources_Add (oProg, descr, EResType.kImage);
    }
    
    private static void _ReadResources_Add (TProgram oProg, Object [] descr, EResType type)
    {
        int                     i;
        Object                  dRef;
        VResourceRef            vrRef;
        TArray<VResourceRef>    store;
        String                  typeID;

        typeID  = VResourceRef.GetResTypeID (type);
        store   = new TArray<VResourceRef> ();
        if (descr.length >= 1)
        {
            for (i = 0; i < descr.length; i++)
            {
                dRef    = descr [i];
                vrRef   = VResourceRef.Create (type, dRef);
                store.Push (vrRef);
            }
        }
        oProg.AddRefStore (typeID, store);
    }
    
    private static void _ReadSteps (TProgram oProg, Object prog)
    {
        Object[]            descr;
        int                 i;
        Object              d;
        VCommand            c;
        
        descr = TJSONPathQuery.Query (prog, "$.program.*");
        TLogger.Message ("TCompiler::_ReadSteps", "Got program descriptor", descr);

        if (descr.length >= 1)
        {
            for (i = 0; i < descr.length; i++)
            {
                d = descr[i];
                c = VCommand.Create (d);
                oProg.AddStep (c);
            }
        }
    }
}
