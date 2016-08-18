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

import static jsweet.dom.Globals.document;

import jsweet.dom.CanvasRenderingContext2D;
import jsweet.dom.HTMLCanvasElement;
import jsweet.lang.Error;
import jsweet.util.StringTypes;

/**
 * @author Peter Hoppe
 */
class T_GFX_Sys_Viewport
{
    private HTMLCanvasElement                       fCanvas;
    private CanvasRenderingContext2D                fGraphics;
    private double                                  fHeight;
    private double                                  fWidth;
    
    public T_GFX_Sys_Viewport (String id)
    {
        fCanvas = (HTMLCanvasElement) document.getElementById (id);
        if (fCanvas == null)
        {
            throw new Error ("Canvas element does not exist: " + id);
        }
        
        fGraphics   = fCanvas.getContext (StringTypes._2d);
        fHeight     = fCanvas.height;
        fWidth      = fCanvas.width;
    }
    
    public void Draw (I_GFX_Resource p)
    {
        p.Draw (fGraphics);
    }
}
