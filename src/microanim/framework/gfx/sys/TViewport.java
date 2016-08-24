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

import static jsweet.dom.Globals.document;

import jsweet.dom.CanvasRenderingContext2D;
import jsweet.dom.HTMLCanvasElement;
import jsweet.dom.HTMLElement;
import jsweet.lang.Error;
import jsweet.util.StringTypes;
import microanim.framework.gfx.geom.primitives.TRectangle;
import microanim.framework.gfx.primitives.VResourceGFX;

/**
 * The graphics viewport. Binds to a a HTML element on the hosting web page. 
 * It's best to bind this viewport to a <code>DIV</code> element. Graphics will 
 * be drawn inside the hosting element, i.e. any graphics (part) outside 
 * the geometric bounds of the hosting element will not draw.   
 * 
 * @author Peter Hoppe
 */
class TViewport
{
    TRectangle                                      fDimensions;
    private HTMLElement                             fGraphics;
    
    public TViewport (String id)
    {
        double              h;
        double              w;
        
        fGraphics = (HTMLCanvasElement) document.getElementById (id);
        if (fGraphics == null)
        {
            fDimensions = new TRectangle (0, 0, fGraphics.clientWidth, fGraphics.clientHeight);
        }
        else
        {
            throw new Error ("Canvas element does not exist: " + id);
        }
    }
    
    public void Clear ()
    {
    }
    
    public void Draw (VResourceGFX res)
    {
        
    }
}
