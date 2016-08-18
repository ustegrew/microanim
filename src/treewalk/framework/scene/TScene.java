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

package treewalk.framework.scene;

import def.es6_promise.Promise;
import treewalk.framework.application.TApplication;
import treewalk.framework.aux.storage.TArray;
import treewalk.framework.gfx.primitives.TImage;
import treewalk.framework.gfx.sys.TView;
import treewalk.framework.program.res.EResType;
import treewalk.framework.program.res.TResourceRefImage;
import treewalk.framework.program.res.VResourceRef;
import treewalk.framework.res.TResourcePack;
import treewalk.framework.system.TDebug;
import treewalk.framework.system.TLogger;

/**
 * @author Peter Hoppe
 */
public class TScene
{
    private TApplication            fHost;
    private TResourcePack           fResources;
    private TView                   fView;
    
    public TScene (TApplication host, String idCanvas)
    {
        fHost           = host;
        fResources      = new TResourcePack    (this);
        fView           = new TView            (idCanvas);
    }
    
    public int GetNumResources ()
    {
        int ret;
        
        ret = fResources.GetNumElements ();
        
        return ret;
    }
    
    /**
     * 
     */
    public void GFX_Refresh ()
    {
        fView.Draw ();
    }
    
    public void RegisterResources (TArray<VResourceRef> descriptors)
    {
        int                 nRes;
        int                 i;
        VResourceRef        r;
        
        nRes = descriptors.GetNumElements ();
        if (nRes >= 1)
        {
            for (i = 0; i < nRes; i++)
            {
                r = descriptors.GetElementByIndex (i);
                _RegisterResource (r);
            }
        }
    }
    
    public Promise<Object> Resources_Load_Exec ()
    {
        return fResources.Load_Exec ();
    }
    
    private void _RegisterResource (VResourceRef descr)
    {
        EResType            rt;
        
        rt = descr.GetType ();
        TLogger.Message ("TScene::_RegisterResource", "Registering resource:\n", descr);
        switch (rt)
        {
            case kImage:
                _RegisterResource_Image (descr);
                break;
            default:
                throw new Error ("Unknown resource type (" + rt + ") for descriptor " + TDebug.GetStringified (descr));
        }
    }
    
    private void _RegisterResource_Image (VResourceRef descr)
    {
        TResourceRefImage           dImg;
        String                      key;
        String                      url;
        String                      idLayer;
        TImage                      img;
        
        dImg = (TResourceRefImage) descr;
        key     = dImg.GetKey       ();
        url     = dImg.GetURI       ();
        idLayer = dImg.GetIDLayer   ();
        
        img     = new TImage (key, url);
        fResources.Add  (img);
        fView.Image_Add (img, idLayer);
    }
}