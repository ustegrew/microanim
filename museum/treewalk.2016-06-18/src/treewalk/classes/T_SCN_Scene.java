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

package treewalk.classes;

import static jsweet.dom.Globals.alert;

/**
 * @author Peter Hoppe
 */
public class T_SCN_Scene
{
    private T_APP_Application                       fHost;
    private T_SCN_ResourcePack                      fResources;
    private T_GFX_Sys_View                          fView;
    
    public T_SCN_Scene (T_APP_Application host, String idCanvas)
    {
        fHost           = host;
        fResources      = new T_SCN_ResourcePack    (this);
        fView           = new T_GFX_Sys_View        (idCanvas);
    }
    
    /**
     * 
     */
    public void GFX_Refresh ()
    {
        fView.Draw ();
    }
    
    public void Resource_GFX_Add (V_GFX_Resource res, String idLayer)
    {
        fResources.Add (res);
        fView.Resource_GFX_Add (res, idLayer);
    }

    public void Resource_Img_Pos_Set (String key, int x, int y)
    {
        T_GFX_Primitive_Icon        img;

        img = (T_GFX_Primitive_Icon) fResources.GetElementByID (key);
        img.SetPosition (x, y);
    }
    
    /**
     * @param key
     * @param isVisible
     */
    public void Resource_Img_Visible_Set (String key, boolean isVisible)
    {
        T_GFX_Primitive_Icon        img;

        img = (T_GFX_Primitive_Icon) fResources.GetElementByID (key);
        img.SetVisible (isVisible);
    }
    
    public void Resources_Load ()
    {
        fResources.Load ();
    }

    public void View_Layer_Add (String name)
    {
        fView.Layer_Add (name);
    }
    
    /**
     * Event handler: Resource pack has finished loading all resources.
     */
    void OnLoadResources ()
    {
        alert ("All resources loaded");
    }

//    public void DrawOld ()
//    {
//        int                 i;
//        int                 n;
//        String              k;
//        I_GFX_Resource     p;
//        
//        n = fKeys.length;
//        if (n >= 1)
//        {
//            for (i = 0; i < n; i++)
//            {
//                k = fKeys[i];
//                p = (I_GFX_Resource) fElements.$get (k);
//                fCanvas.Draw (p);
//            }
//        }
//    }
}