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

import jsweet.lang.Math;

/**
 * @author Peter Hoppe
 */
public class T_AUX_Geom_Vector2D
{
    private boolean                 fHasChanged;
    private double                  fLen;
    private T_AUX_Geom_Coord2D      fP0;
    private T_AUX_Geom_Coord2D      fP1;
    private T_AUX_Geom_Coord2D      fPNorm;
    
    public T_AUX_Geom_Vector2D (double x, double y)
    {
        fP0         = new T_AUX_Geom_Coord2D (x, y);
        fP1         = new T_AUX_Geom_Coord2D (x, y);
        fHasChanged = true;
        _ReInit ();
    }
    
    public double GetLen ()
    {
        return fLen;
    }
    
    public T_AUX_Geom_Coord2D GetP0 ()
    {
        T_AUX_Geom_Coord2D      ret;
        
        ret = fP0.GetCopy ();
        
        return ret;
    }
    
    public T_AUX_Geom_Coord2D GetP1 ()
    {
        T_AUX_Geom_Coord2D      ret;
        
        ret = fP1.GetCopy ();
        
        return ret;
    }
    
    public T_AUX_Geom_Coord2D GetPNormalized ()
    {
        T_AUX_Geom_Coord2D      ret;
        
        ret = fPNorm.GetCopy ();
        
        return ret;
    }
    
    private void _ReInit ()
    {
        double xDiff;
        double yDiff;
        
        if (fHasChanged)
        {
            fHasChanged = false;
            xDiff       = fP1.fX - fP0.fX;
            yDiff       = fP1.fY = fP0.fY;
            fPNorm      = new T_AUX_Geom_Coord2D (xDiff, yDiff);
            fLen        = Math.sqrt (xDiff * xDiff  +  yDiff * yDiff);
        }
    }
}
