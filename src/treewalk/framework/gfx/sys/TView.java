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

package treewalk.framework.gfx.sys;

import treewalk.framework.aux.storage.TCollection;
import treewalk.framework.gfx.geom.primitives.TVector2D;
import treewalk.framework.gfx.primitives.TImage;

/**
 * @author Peter Hoppe
 */
public class TView
{
    private TViewport             fCanvas;
    private TCollection<TLayer>   fLayers;

    public TView (String idCanvas)
    {
        fLayers = new TCollection<TLayer> ();
        fCanvas = new TViewport (idCanvas);
    }

    public void Draw ()
    {
        int                 nL;
        int                 iL;
        TLayer     l;
        
        fCanvas.Clear ();
        nL = fLayers.GetNumElements ();
        if (nL >= 1)
        {
            for (iL = 0; iL < nL; iL++)
            {
                l   = fLayers.GetElementByIndex (iL);
                l.Draw (fCanvas);
            }
        }
    }
    
    /**
     * @param img
     * @param idLayer
     */
    public void Image_Add (TImage img, String idLayer)
    {
        boolean     hasLayer;
        TLayer      l;

        hasLayer = fLayers.HasElement (idLayer);
        if (! hasLayer)
        {
            l = new TLayer (this, idLayer);
            fLayers.Add (idLayer, l);
        }
        else
        {
            l = fLayers.GetElementByKey (idLayer);
        }

        l.Resource_GFX_Add (img);
    }

    public void Image_SetPos (String id, TVector2D target, boolean isRelative)
    {

    }

    public void Image_SetRot (String id, double angle, boolean isRelative)
    {

    }

    public void Image_SetScale (String id, double factor, boolean isRelative)
    {

    }

    public void Image_SetVisible (String id, boolean isVisible)
    {

    }
}
