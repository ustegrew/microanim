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

package microanim.framework.gfx.primitives;

import jsweet.dom.CanvasRenderingContext2D;
import jsweet.lang.Error;
import microanim.framework.res.VSceneResource;

/**
 * Please note: The name is prepended with 'A1', so the name of this class
 * is high up the alphabet. Thus, JSweet will put this class at the beginning of the 
 * compiled Javascript unit. A1_XXXX classes inherit from A0_XXXX classes. 
 *     
 * @author Peter Hoppe
 */
public abstract class VResourceGFX extends VSceneResource
{
    /**
     * @param id
     */
    public VResourceGFX (String id)
    {
        super (id);
    }

    public void Draw (CanvasRenderingContext2D graphics)
    {
        throw new Error ("Please override Draw (CanvasRenderingContext2D graphics)");
    }
}
