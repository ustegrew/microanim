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

package treewalk;

import static jsweet.dom.Globals.window;

import java.util.function.Consumer;

import def.es6_promise.Promise;
import def.es6_promise.Promise.CallbackBiConsumer;
import jsweet.lang.Function;
import jsweet.lang.JSON;
import treewalk.framework.application.TApplication;
import treewalk.framework.aux.json.path.TJSONPathQuery;
import treewalk.framework.system.EMimeType;
import treewalk.framework.system.TExtDependency;
import treewalk.framework.system.TLogger;

/**
 * Headnotes:
 * -------------------
 * [TMain_100]      Eek, awful double cast! We need this to satisfy the Java compiler, but 
 *                  we know that x is in fact of type String at runtime. JSweet will tran-spile it
 *                  to working Javascript code. Remember - this program won't run in a Java 
 *                  environment!
 *                  
 * @author Peter Hoppe
 */
public class TMain
{
    private static final int            kTimeoutLoading             = 2000;
    private static final String         kURLLibIsMyJSONValid        = "../../target/lib/is-my-json-valid/is-my-json-valid_standalone.js";
    private static final String         kURLLibParserLangAnim       = "../../target/lib/lang_anim/parser.js";
    private static final String         kURLLibJSONPath             = "../../target/lib/jsonpath/jsonpath.js";
    private static final String         kURLProgram                 = "../../target/prog/treewalk.p";
    private static final String         kURLJSONSchemata            = "../../target/dist/schemata.json";
    
    private static Object               gJSONSchemaProgram          = null;
    private static Object               gJSONSchemataLanguage       = null;
    private static Object               gProgram                    = null;
    
    public static void main (String[] args)
    {
        final String    kOrigin = "TMain::main";
        
        window.onload = (e) ->
        {
            TApplication.CreateInstance ("cnv");
            
            TLogger.Message (kOrigin, "Loading JSON validator library...");
            TExtDependency.LoadJSLibrary (kURLLibIsMyJSONValid)
            .thenOnFulfilledFunction 
            (
                (x) -> 
                {
                    TLogger.Message (kOrigin, "Loading JSONpath library...");
                    return TExtDependency.LoadJSLibrary (kURLLibJSONPath);
                }
            )
            .thenOnFulfilledFunction 
            (
                (x) -> 
                {
                    TLogger.Message (kOrigin, "Loading anim language library...");
                    return TExtDependency.LoadJSLibrary (kURLLibParserLangAnim);
                }
            )
            .thenOnFulfilledFunction 
            (
                (x) -> 
                {
                    TLogger.Message (kOrigin, "Loading JSON validation schemata for animation program...");
                    return TExtDependency.LoadText (kURLJSONSchemata, EMimeType.kApplicationJSON, kTimeoutLoading);
                }
            )
            .thenOnFulfilledFunction
            (
                (x) -> 
                {
                    String sSchem;
                    Object oSchem;
                    
                    sSchem                  = (String)(Object) x;
                    oSchem                  = JSON.parse (sSchem);
                    gJSONSchemaProgram      = TJSONPathQuery.ValueOf (oSchem, "$.program");
                    gJSONSchemataLanguage   = TJSONPathQuery.ValueOf (oSchem, "$.language");
                    TLogger.Message (kOrigin, "Loading program object...");
                    return TExtDependency.LoadText (kURLProgram, EMimeType.kApplicationJSON, kTimeoutLoading);
                }
            )
            .thenOnFulfilledFunction
            (
                (x) ->
                {
                    Function            pFunc;
                    jsweet.lang.Object  parser;
                    String sPr;
                    
                    TLogger.Message (kOrigin, "Parsing and validating program...", x);
                    sPr      = (String) (Object) x;
                    parser   = (jsweet.lang.Object) window.$get ("lang_anim");
                    pFunc    = (Function) parser.$get ("parse");
                    gProgram = pFunc.call (window, sPr);
                    return TApplication.Program_Load (gProgram, gJSONSchemaProgram, gJSONSchemataLanguage);
                }
            )
            .thenOnFulfilledFunction
            (
                (x) -> 
                {
                    TLogger.Message (kOrigin, "Initializing system...");
                    return _InitApp ();
                }
            )
            .thenOnFulfilledFunction
            (
                (x) -> 
                {
                    TLogger.Message (kOrigin, "Running animation...");
                    return _Run ();
                }
            )
            .thenOnFulfilledFunction 
            (
                (x) -> 
                {
                    _Cleanup ();
                    return null;
                }
            )
            .catchOnRejectedFunction 
            (
                (err) ->
                {
                    TLogger.Fatal ("TMain::main", "Serious problem... Bailing out", err, true);
                    return null;
                }
            );
            return true;
        };
    }
    
    private static Promise<Object> _InitApp ()
    {
        return TApplication.Resources_Load_Exec ();
    }
        
        
        
//        TApplication                app;
//        TResImg []                  imgRes;
//        TResImg                     img;
//        int                         i;
//        
//        Promise<Object>             ret;
//        TLogger.Message ("Executing: _03_InitApp ()");
//        
//        ret = null;
/*
        imgRes      = new TResImg [kNImg];
        imgRes[0]   = new TResImg ("img.tree",              "../../target/img/tree/11.png",                 "0", 0, 0);
        imgRes[1]   = new TResImg ("img.banana",            "../../target/img/banana/banana.png",           "1", 0, 0);
        imgRes[2]   = new TResImg ("img.monkey.happy.01",   "../../target/img/monkey/monkey.happy.01.png",  "2", 0, 0);
        imgRes[3]   = new TResImg ("img.monkey.think.01",   "../../target/img/monkey/monkey.think.01.png",  "2", 0, 0);
        imgRes[4]   = new TResImg ("img.monkey.think.02",   "../../target/img/monkey/monkey.think.02.png",  "2", 0, 0);
        imgRes[5]   = new TResImg ("img.monkey.think.03",   "../../target/img/monkey/monkey.think.03.png",  "2", 0, 0);
        imgRes[6]   = new TResImg ("img.monkey.walk.01",    "../../target/img/monkey/monkey.walk.01.png",   "2", 0, 0);
        imgRes[7]   = new TResImg ("img.monkey.walk.02",    "../../target/img/monkey/monkey.walk.02.png",   "2", 0, 0);
                
        app = new TApplication ("cnv");
        app.View_Layer_Add           ("0");
        app.View_Layer_Add           ("1");
        app.View_Layer_Add           ("2");
        for (i = 0; i < kNImg; i++)
        {
            img = imgRes[i];
            app.Resource_Img_Add (img.fKey, img.fURI, img.fTargetLayer);
        }
        app.Resources_Load ();
//        app.Ctrl_OnProgramStart          ();
*/      
    
    private static Promise<Object> _Run ()
    {
        Promise<Object>         ret;

        ret = new Promise<Object>
        ((CallbackBiConsumer<Consumer<Object>, Consumer<Object>>)
            (resolve, reject) ->
            {
                TLogger.Message ("TMain::_Run", "Executing: _04_Run ()");
                resolve.accept  (null);
            }
        );
        
        return ret;
    }

    private static void _Cleanup ()
    {
        TLogger.Message ("TMain::_Cleanup", "Program finished");
    }
}
