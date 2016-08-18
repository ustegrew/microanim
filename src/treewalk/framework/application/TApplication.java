/**
 * This file is part of treewalk.
 * 
 * treewalk is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * treewalk is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with treewalk.  If not, see <http://www.gnu.org/licenses/>.
 */

package treewalk.framework.application;

import java.util.function.Consumer;

import def.es6_promise.Promise;
import def.es6_promise.Promise.CallbackBiConsumer;
import treewalk.framework.aux.storage.TArray;
import treewalk.framework.aux.storage.TCollection;
import treewalk.framework.controller.TController;
import treewalk.framework.program.TCompiler;
import treewalk.framework.program.TProgram;
import treewalk.framework.program.res.VResourceRef;
import treewalk.framework.scene.TScene;
import treewalk.framework.system.TLogger;

/**
 * @author Peter Hoppe
 */
public class TApplication
{
    private static TApplication         gApplication = null;
    
    public static void CreateInstance (String idCanvas)
    {
        if (gApplication == null)
        {
            gApplication = new TApplication (idCanvas);
        }
        else
        {
            throw new Error ("Can't create multiple instances of the TApplication class");
        }
    }
    
    public static Promise<Object> Program_Load (Object prog, Object sProg, Object sLang)
    {
        return gApplication._Program_Load (prog, sProg, sLang);
    }
    
    public static Promise<Object> Resources_Load_Exec ()
    {
        return gApplication._Resources_Load_Exec ();
    }
    
    private TController                     fController;
    private TScene                          fScene;
    private TProgram                        fProgram;
    
    private TApplication (String idCanvas)
    {
        fScene              = new TScene        (this, idCanvas);
        fController         = new TController   (this);
        fProgram            = null;
    }
    
    private Promise<Object> _Resources_Load_Exec ()
    {
        return fScene.Resources_Load_Exec ();
    }

    private Promise<Object> _Program_Load (Object prog, Object sProg, Object sLang)
    {
        Promise<Object>             ret;
        
        ret = new Promise<Object>
        ((CallbackBiConsumer<Consumer<Object>, Consumer<Object>>)
            (resolve, reject) ->
            {
                TCollection<TArray<VResourceRef>>       descriptors;
                TArray<VResourceRef>                    dStore;
                TArray<String>                          dTypes;
                String                                  typeID;
                int                                     i;
                int                                     n;

                if (fProgram == null)
                {
                    try
                    {
                        fProgram        = TCompiler.Parse (prog, sProg, sLang); 
                        descriptors     = fProgram.GetResources         ();
                        dTypes          = descriptors.GetKeys           ();
                        n               = dTypes.GetNumElements ();
                        if (n >= 1)
                        {
                            for (i = 0; i < n; i++)
                            {
                                typeID = dTypes.GetElementByIndex       (i);
                                dStore = descriptors.GetElementByKey    (typeID);
                                fScene.RegisterResources                (dStore);
                            }
                        }
                        resolve.accept (null);
                    }
                    catch (Error e)
                    {
                        TLogger.Fatal ("TApplication::Program_Load", "Error whilst loading program", e, false);
                        reject.accept (e);
                    }
                }
                else
                {
                    TLogger.Fatal ("TApplication::Program_Load", "This application can't load a program more than once.", false);
                    reject.accept (null);
                }
            }
        );
        
        return ret;
    }
    
    /**
     * 
     */
    public void GFX_Refresh ()
    {
        fScene.GFX_Refresh ();
    }
}
