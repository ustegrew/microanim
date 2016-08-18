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

import treewalk.classes.T_APP_Application;

class TResImg
{
    public String       fKey;
    public String       fURI;
    public String       fTargetLayer;
    public int          fPosX;
    public int          fPosY;
    public TResImg (String key, String uri, String tLayer, int posX, int posY)
    {
        fKey            = key;
        fURI            = uri;
        fTargetLayer    = tLayer;
        fPosX           = posX;
        fPosY           = posY;
    }
}

/**
 * @author Peter Hoppe
 */
public class TMain
{
    public static void main (String[] args)
    {
        window.onload = (e) ->
        {
            _InitApp ();
            return true;
        };
    }
    
    private static void _InitApp ()
    {
        final int                   kNImg = 8;
        
        T_APP_Application           app;
        TResImg []                  imgRes;
        TResImg                     img;
        int                         i;
        
        imgRes      = new TResImg [kNImg];
        imgRes[0]   = new TResImg ("img.tree",              "../../target/img/tree/11.png",                 "0", 0, 0);
        imgRes[1]   = new TResImg ("img.banana",            "../../target/img/banana/banana.png",           "1", 0, 0);
        imgRes[2]   = new TResImg ("img.monkey.happy.01",   "../../target/img/monkey/monkey.happy.01.png",  "2", 0, 0);
        imgRes[3]   = new TResImg ("img.monkey.think.01",   "../../target/img/monkey/monkey.think.01.png",  "2", 0, 0);
        imgRes[4]   = new TResImg ("img.monkey.think.02",   "../../target/img/monkey/monkey.think.02.png",  "2", 0, 0);
        imgRes[5]   = new TResImg ("img.monkey.think.03",   "../../target/img/monkey/monkey.think.03.png",  "2", 0, 0);
        imgRes[6]   = new TResImg ("img.monkey.walk.01",    "../../target/img/monkey/monkey.walk.01.png",   "2", 0, 0);
        imgRes[7]   = new TResImg ("img.monkey.walk.02",    "../../target/img/monkey/monkey.walk.02.png",   "2", 0, 0);
                
        app = new T_APP_Application ("cnv");
        app.View_Layer_Add           ("0");
        app.View_Layer_Add           ("1");
        app.View_Layer_Add           ("2");
        for (i = 0; i < (kNImg-1); i++)
        {
            img = imgRes[i];
            app.Resource_Img_Add (img.fKey, img.fURI, img.fTargetLayer);
        }
        app.Resources_Load          ();
        
        for (i = 0; i < (kNImg-1); i++)
        {
            img = imgRes[i];
            app.Resource_Img_Visible_Set     (img.fKey, false);
            app.Resource_Img_Pos_Set              (img.fKey, img.fPosX, img.fPosY);
        }
        app.GFX_Refresh ();
    }
    
    private static void _Test ()
    {
/*
        T_SCN_Scene         s;
        
        s = new T_SCN_Scene ("cnv");
        s.AddPrimitive_Icon ("icoBanana", "../../target/img/banana_100.png", 20, 20);

        HTMLCanvasElement el = (HTMLCanvasElement) document.getElementById ("cnv");
        CanvasRenderingContext2D ctx = el.getContext (StringTypes._2d);
        HTMLImageElement eeii = (HTMLImageElement) document.createElement ("img");
        eeii.onload = (event) ->
        {
            ctx.drawImage (eeii, 10, 10);
            return event;
        };
        eeii.src = "../../target/img/banana_100.png";
        setTimeout 
        (
            function 
            (
                () -> 
                {
                    ctx.clearRect (0, 0, 600, 800);
                    ctx.drawImage (eeii, 50,  50);
                }
            ),4000
        );
*/
    }
}
