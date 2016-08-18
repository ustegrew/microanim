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
public class T_APP_Application
{
    private T_CTRL_Controller                   fController;
    private T_SCN_Scene                         fScene;
    
    public T_APP_Application (String idCanvas)
    {
        fScene              = new T_SCN_Scene           (this, idCanvas);
//        fController         = new T_CTRL_Controller     (this);
    }
    
    /**
     * 
     */
    public void GFX_Refresh ()
    {
        fScene.GFX_Refresh ();
    }
    
    public void Resource_Img_Add (String id, String url, String idLayer)
    {
        T_GFX_Primitive_Icon        ico;
        
        ico = new T_GFX_Primitive_Icon (id, url);
        
        //TODO integrate layer support
        fScene.Resource_GFX_Add (ico, idLayer);
    }

    /**
     * @param key
     * @param x
     * @param y
     */
    public void Resource_Img_Pos_Set (String key, int x, int y)
    {
        fScene.Resource_Img_Pos_Set (key, x, y);
    }

    /**
     * @param key
     * @param isVisible
     */
    public void Resource_Img_Visible_Set (String key, boolean isVisible)
    {
        fScene.Resource_Img_Visible_Set (key, isVisible);
    }

    /**
     * 
     */
    public void Resources_Load ()
    {
        fScene.Resources_Load ();
        
    }

    public void View_Layer_Add (String name)
    {
        fScene.View_Layer_Add (name);
    }

}
