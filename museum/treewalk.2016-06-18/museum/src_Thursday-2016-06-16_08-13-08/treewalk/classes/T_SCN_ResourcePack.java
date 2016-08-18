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

import jsweet.lang.Error;

/**
 * @author     Peter Hoppe
 * 
 * [100]       Resource loading is asynchronous; therefore we can't handle it the old-style
 *             synchronous way ("for each res in resources do: res.Load ()"). Instead we need to
 *             issue a LOAD request for each resource and wait for that resource's onLoad 
 *             confirmation event that it has finished loading. Upon the confirmation event we 
 *             load the next-in-line resource. Once all resources have loaded we issue a confirmation 
 *             event to the next higher object (client hosting this resource pack, i.e. the host).
 * 
 */
public class T_SCN_ResourcePack
{
    private static int                                  giResLoading = -1;
    
    private T_SCN_Scene                                 fHost;
    private T_AUX_Storage_Collection<I_SCN_Resource>    fResources;
    private T_SCN_ResourcePack_State                    fState;

    public T_SCN_ResourcePack (T_SCN_Scene t_SCN_Scene)
    {
        giResLoading    = 0;
        fHost           = t_SCN_Scene;
        fResources      = new T_AUX_Storage_Collection<I_SCN_Resource> ();
        fState          = T_SCN_ResourcePack_State.kInit;
    }
    
    public void Add (I_SCN_Resource r)
    {
        String k;
        
        k = r.GetID ();
        if (fState == T_SCN_ResourcePack_State.kInit)
        {
            r.SetHost (this);
            fResources.Add (k, r);
        }
        else
        {
            throw new Error ("Can't add more resources once we have called Load ().");
        }
    }
    
    /**
     * @param key
     * @return
     */
    public I_SCN_Resource GetElementByID (String key)
    {
        I_SCN_Resource      ret;
        
        ret = fResources.GetElementByKey (key);
        
        return ret;
    }
    
    public I_SCN_Resource GetElementByIndex (int i)
    {
        I_SCN_Resource      ret;
        
        ret = fResources.GetElementByIndex (i);
        
        return ret;
    }
    
    public void Load ()
    {
        _LoadNextResource ();
    }

    /**
     * Event handler (package internal): Resource has loaded. 
     * Will be called by each resource (i.e. from outside this class)
     * when it has finished loading.  See [100]
     */
    void OnLoadResource ()
    {
        _LoadNextResource ();
    }
    
    /**
     * Loads the next-to-be-loaded resource. See [100].
     */
    private void _LoadNextResource ()
    {
        int                     n;
        I_SCN_Resource          r;
        
        if (fState != T_SCN_ResourcePack_State.kInit)
        {
            throw new Error ("Resources can only be loaded once. You must Add(...) all resources before calling Load ().");
        }

        n = fResources.GetNumElements ();
        if (giResLoading < n)
        {
            r = fResources.GetElementByIndex (giResLoading);
            giResLoading++;
            r.Load ();
        }
        else
        {
            fHost.OnLoadResources ();
        }
    }
}

enum T_SCN_ResourcePack_State
{
    kInit,
    kLoading,
    kWait,
}