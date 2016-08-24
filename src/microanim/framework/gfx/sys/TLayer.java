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

package microanim.framework.gfx.sys;

import microanim.framework.aux.storage.TCollection;
import microanim.framework.gfx.primitives.VResourceGFX;

/**
 * @author Peter Hoppe
 */
public class TLayer
{
    private TCollection<VResourceGFX>             fResources;
    
    public TLayer (TView host, String id)
    {
        fResources  = new TCollection<VResourceGFX> ();
    }
    
    public void Draw (TViewport canvas)
    {
        int                 nR;
        int                 iR;
        VResourceGFX   r;
        
        nR  = fResources.GetNumElements ();
        if (nR >= 1)
        {
            for (iR = 0; iR < nR; iR++)
            {
                r   = fResources.GetElementByIndex (iR);
                canvas.Draw (r);
            }
        }
    }
    
    public int GetNumResources ()
    {
        return fResources.GetNumElements ();
    }
    
    public VResourceGFX GetResourceByIndex (int i)
    {
        VResourceGFX ret;
        
        ret = fResources.GetElementByIndex (i);
        
        return ret;
    }
    
    /**
     * @param res
     */
    public void Resource_GFX_Add (VResourceGFX res)
    {
        String key;
        
        key = res.GetID ();
        fResources.Add (key, res);
    }
}
