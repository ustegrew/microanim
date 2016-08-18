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

/**
 * @author Peter Hoppe
 */
public class T_GFX_Sys_View
{
    private T_GFX_Sys_Viewport                              fCanvas;
    private T_AUX_Storage_Collection<T_GFX_Sys_Layer>       fLayers;
    
    public T_GFX_Sys_View (String idCanvas)
    {
        fLayers = new T_AUX_Storage_Collection<T_GFX_Sys_Layer> ();
        fCanvas = new T_GFX_Sys_Viewport (idCanvas);
    }
    
    public void Draw ()
    {
        
    }

    public void Layer_Add (String id)
    {
        T_GFX_Sys_Layer     layer;

        layer = new T_GFX_Sys_Layer (this, id);
        fLayers.Add (id,  layer);
    }
    
    /**
     * @param res
     * @param idLayer
     */
    public void Resource_GFX_Add (V_GFX_Resource res, String idLayer)
    {
        T_GFX_Sys_Layer     l;
        
        l = fLayers.GetElementByKey (idLayer);
        l.Resource_GFX_Add (res);
    }
}
