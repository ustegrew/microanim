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

import jsweet.lang.RangeError;

/**
 * @author Peter Hoppe
 * 
 * head notes:
 * [100]:   In mathematics, larger y-coordinates are above smaller ones (e.g. [0, 10] is ABOVE [0, -1]).
 *          By contrast, the HTML5 canvas is mirrored about the x axis, so higher y-coordinates are
 *          BELOW smaller ones.
 *          Our rectangle follows this design, i.e. the y-coordinate of the left TOP corner is smaller than 
 *          (or equal to) the y-coordinate of the right BOTTOM corner.  
 */
public class TRectangle
{
    private TCoord2D          fCornerLeftTop;
    private TCoord2D          fCornerRightBot;
    private double                      fHeight;
    private double                      fWidth;
    
    public TRectangle (double x0, double y0, double x1, double y1)
    {
        _AssertCornersOK (x0, y0, x1, y1);
        fCornerLeftTop      = new TCoord2D (x0, y0);
        fCornerRightBot     = new TCoord2D (x1, y1);          // [100]
        fWidth              = fCornerRightBot.fX - fCornerLeftTop.fX;
        fHeight             = fCornerRightBot.fY - fCornerLeftTop.fY;
    }
    
    public TCoord2D GetCornerLeftTop ()
    {
        TCoord2D ret;
        
        ret = fCornerLeftTop.GetCopy ();
        
        return ret;
    }

    public TCoord2D GetCornerRightBottom ()
    {
        TCoord2D ret;
        
        ret = fCornerRightBot.GetCopy ();
        
        return ret;
    }
    
    public double GetHeight ()
    {
        return fHeight;
    }
    
    public double GetWidth ()
    {
        return fWidth;
    }
    
    /**
     * Simple box test.
     * 
     * @param other
     * @return
     */
    public boolean IsIntersectWith (TRectangle other)
    {
        boolean isOut;
        boolean ret;
        
        isOut = (this.fCornerRightBot.fX  < other.fCornerLeftTop.fX)    ||   // this is left  of other
                (this.fCornerLeftTop.fX   > other.fCornerRightBot.fX)   ||   // this is right of other 
                (this.fCornerRightBot.fY  < other.fCornerLeftTop.fY)    ||   // this is above    other
                (this.fCornerLeftTop.fY   > other.fCornerRightBot.fY);       // this is below    other

        ret   = ! isOut;
        
        return ret;
    }
    
    public void SetHeight (double h)
    {
        _AssertIsNotNegative (h);
        fHeight            = h;
        fCornerRightBot.fY = fCornerLeftTop.fY + h;  
    }
    
    /**
     * @param x
     * @param y
     */
    public void SetLeftTop (double x, double y)
    {
        fCornerLeftTop.fX = x;
        fCornerLeftTop.fY = y;
    }
    
    public void SetWidth (double w)
    {
        _AssertIsNotNegative (w);
        fWidth             = w;
        fCornerRightBot.fX = fCornerLeftTop.fX + w;
    }
    
    private void _AssertCornersOK (double x0, double y0, double x1, double y1)
    {
        boolean hasError;
        String  msg;
        
        hasError    = false;
        msg         = "Required: ";
        if (x0 > x1)
        {
            hasError  = true;
            msg      += "x0 < x1";
        }
        else if (y0 > y1)
        {
            hasError  = true;
            msg      += "y0 < y1";
        }
        
        if (hasError)
        {
            msg += ". Given: x0=" + x0 + "y0=" + y0 + "x1=" + x1 + "y1=" + y1;
            throw new RangeError (msg);
        }
    }

    private void _AssertIsNotNegative (double x)
    {
        if (x < 0)
        {
            throw new RangeError ("Required: x >= 0. Given: " + x);
        }
    }
}
