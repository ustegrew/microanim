/**
 * This file is part of microanim.
 * 
 * microanim is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * microanim is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with microanim.  If not, see <http://www.gnu.org/licenses/>.
 */

package microanim.framework.res;

import static jsweet.util.Globals.array;

import java.util.function.Consumer;

import def.es6_promise.Promise;
import def.es6_promise.Promise.CallbackBiConsumer;
import jsweet.lang.Array;
import jsweet.lang.Error;
import microanim.framework.aux.storage.TCollection;
import microanim.framework.scene.TScene;
import microanim.framework.system.TLogger;

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
public class TResourcePack
{
    private TCollection<VSceneResource>     fResources;
    private E_SCN_ResourcePack_State        fState;

    public TResourcePack (TScene t_SCN_Scene)
    {
        fResources      = new TCollection<VSceneResource> ();
        fState          = E_SCN_ResourcePack_State.kInit;
    }
    
    public void Add (VSceneResource r)
    {
        String k;
        
        k = r.GetID ();
        if (fState == E_SCN_ResourcePack_State.kInit)
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
    public VSceneResource GetElementByID (String key)
    {
        VSceneResource      ret;
        
        ret = fResources.GetElementByKey (key);
        
        return ret;
    }
    
    public VSceneResource GetElementByIndex (int i)
    {
        VSceneResource      ret;
        
        ret = fResources.GetElementByIndex (i);
        
        return ret;
    }
    
    /**
     * @return
     */
    public int GetNumElements ()
    {
        int ret;
        
        ret = fResources.GetNumElements ();
        
        return ret;
    }

    public Promise<Object> Load_Exec ()
    {
        Promise<Object>         ret;
        
        ret = new Promise<Object>
        ((CallbackBiConsumer<Consumer<Object>, Consumer<Object>>)
            (resolve, reject) ->
            {
                _Load ()
                .thenOnFulfilledFunction 
                (
                    (e) ->
                    {
                        TLogger.Message ("TResourcePack::_Load", "Successfully loaded resources.");
                        resolve.accept (e);
                        return null;
                    }
                )
                .catchOnRejectedFunction 
                (
                    (error) ->
                    {
                        TLogger.Fatal ("TResourcePack::_Load", "FAILED to load resources.", error, true);
                        reject.accept (error);
                        return null;
                    }
                );
            }
        );
        
        return ret;
    }
    
    @SuppressWarnings ("unchecked")
    private Promise<Object[]> _Load ()
    {
        Array<Promise<Object>>      pR;
        Promise<Object>             p;
        int                         i;
        int                         n;
        VSceneResource              r;
        Promise<Object[]>           ret;
        
        n   = fResources.GetNumElements ();
        pR  = new Array<Promise<Object>> ();
        if (n >= 1)
        {
            for (i = 0; i < n; i++)
            {
                r = fResources.GetElementByIndex (i);
                p = r.Load_Exec ();
                pR.push (p);
            }
        }
        ret = Promise.all (array (pR));
        
        return ret;
    }
}

enum E_SCN_ResourcePack_State
{
    kInit,
    kLoading,
    kWait,
}