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

import jsweet.dom.CanvasRenderingContext2D;
import jsweet.lang.Error;

/**
 * @author Peter Hoppe
 */
public class IV_GFX_Resource extends IV_SCN_Resource implements I_GFX_Resource
{
    /**
     * @param id
     */
    public IV_GFX_Resource (String id)
    {
        super (id);
    }

    /* (non-Javadoc)
     * @see treewalk.classes.I_GFX_Resource#Draw(jsweet.dom.CanvasRenderingContext2D)
     */
    @Override
    public void Draw (CanvasRenderingContext2D graphics)
    {
        throw new Error ("Please override Draw (CanvasRenderingContext2D graphics)");
    }
}
