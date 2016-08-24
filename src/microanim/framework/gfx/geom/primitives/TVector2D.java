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

package microanim.framework.gfx.geom.primitives;

import jsweet.lang.Math;

/**
 * @author Peter Hoppe
 */
public class TVector2D
{
    private boolean                 fHasChanged;
    private double                  fLen;
    private TCoord2D      fP0;
    private TCoord2D      fP1;
    private TCoord2D      fPZeroed;
    
    public TVector2D (double x, double y)
    {
        fP0         = new TCoord2D (x, y);
        fP1         = new TCoord2D (x, y);
        fHasChanged = true;
        _ReInit ();
    }
    
    public double GetLen ()
    {
        return fLen;
    }
    
    public TCoord2D GetP0 ()
    {
        TCoord2D      ret;
        
        ret = fP0.GetCopy ();
        
        return ret;
    }
    
    public TCoord2D GetP1 ()
    {
        TCoord2D      ret;
        
        ret = fP1.GetCopy ();
        
        return ret;
    }
    
    public TCoord2D GetPZeroed ()
    {
        TCoord2D      ret;
        
        ret = fPZeroed.GetCopy ();
        
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
            fPZeroed    = new TCoord2D (xDiff, yDiff);
            fLen        = Math.sqrt (xDiff * xDiff  +  yDiff * yDiff);
        }
    }
}
