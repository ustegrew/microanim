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
public class T_GFX_Sys_Layer
{
    private T_GFX_Sys_View                                          fHost;
    private String                                                  fID;
    private T_AUX_Storage_Collection<V_GFX_Resource>                fResources;
    
    public T_GFX_Sys_Layer (T_GFX_Sys_View host, String id)
    {
        fHost       = host;
        fID         = id;
        fResources  = new T_AUX_Storage_Collection<V_GFX_Resource> ();
    }
    
    /**
     * @param res
     */
    public void Resource_GFX_Add (V_GFX_Resource res)
    {
        String key;
        
        key = res.GetID ();
        fResources.Add (key, res);
    }
    
}
