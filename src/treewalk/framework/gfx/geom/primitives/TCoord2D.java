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

package treewalk.framework.gfx.geom.primitives;

/**
 * @author Peter Hoppe
 */
public class TCoord2D
{
    public double   fX;
    public double   fY;
    
    public TCoord2D (double x, double y)
    {
        fX = x;
        fY = y;
    }
    
    public TCoord2D GetCopy ()
    {
        TCoord2D ret;
        
        ret = new TCoord2D (fX, fY);
        
        return ret;
    }
}
 