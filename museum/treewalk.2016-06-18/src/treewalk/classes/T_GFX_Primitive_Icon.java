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
import jsweet.dom.HTMLImageElement;

/**
 * @author Peter Hoppe
 */
class T_GFX_Primitive_Icon extends V_GFX_Resource
{
      private HTMLImageElement    fBitmap;
      private double              fHeight;
      private boolean             fIsVisible;
      private int                 fOffsetX;
      private int                 fOffsetY;
      private String              fURL;
      private double              fWidth;
    
      public T_GFX_Primitive_Icon (String id, String url)
      {
          super (id);
          fID         = id;
          fURL        = url;
          fOffsetX    = 0;
          fOffsetY    = 0;
          fIsVisible  = false;
          fBitmap     = (HTMLImageElement) document.createElement ("img");
      }
    
      /* (non-Javadoc)
       * @see treewalk.classes.I_GFX_Resource#Draw(jsweet.dom.CanvasRenderingContext2D)
       */
      @Override
      public void Draw (CanvasRenderingContext2D graphics)
      {
          if (fIsVisible)
          {
              graphics.drawImage (fBitmap, fOffsetX, fOffsetY, fWidth, fHeight);
          }
      }
      
      public void Load ()
      {
          fBitmap.onload = (event) ->
          {
              fHeight  = fBitmap.clientHeight;
              fWidth   = fBitmap.clientWidth;
              fHost.OnLoadResource ();
              return true;
          };
          fBitmap.src = fURL;
      }
    
      public void SetPosition (int x, int y)
      {
          fOffsetX = x;
          fOffsetY = y;
      }
    
      /**
       * @param isVisible
       */
      public void SetVisible (boolean isVisible)
      {
          fIsVisible = isVisible;
      }

    
    
    
    
    
    
    
//    private HTMLImageElement    fBitmap;
//    private double              fHeight;
//    private T_SCN_ResourcePack  fHost;
//    private String              fID;
//    private boolean             fIsVisible;
//    private int                 fOffsetX;
//    private int                 fOffsetY;
//    private String              fURL;
//    private double              fWidth;
//
//    public T_GFX_Primitive_Icon (String id, String url)
//    {
//        super (id);
//        fID         = id;
//        fURL        = url;
//        fOffsetX    = 0;
//        fOffsetY    = 0;
//        fIsVisible  = false;
//        fBitmap     = (HTMLImageElement) document.createElement ("img");
//    }
//
//    /* (non-Javadoc)
//     * @see treewalk.classes.I_GFX_Resource#Draw(jsweet.dom.CanvasRenderingContext2D)
//     */
//    @Override
//    public void Draw (CanvasRenderingContext2D graphics)
//    {
//        if (fIsVisible)
//        {
//            graphics.drawImage (fBitmap, fOffsetX, fOffsetY, fWidth, fHeight);
//        }
//    }
//    
//    /* (non-Javadoc)
//     * @see treewalk.classes.I_GFX_Resource#GetID()
//     */
//    @Override
//    public String GetID ()
//    {
//        return fID;
//    }
//
//    public void Load ()
//    {
//        fBitmap.onload = (event) ->
//        {
//            fHeight  = fBitmap.clientHeight;
//            fWidth   = fBitmap.clientWidth;
//            fHost.OnLoadResource ();
//            return true;
//        };
//        fBitmap.src = fURL;
//    }
//
//    /* (non-Javadoc)
//     * @see treewalk.classes.I_SCN_Resource#SetHost(treewalk.classes.T_SCN_ResourcePack)
//     */
//    @Override
//    public void SetHost (T_SCN_ResourcePack host)
//    {
//        fHost = host;
//    }
//
//    public void SetPosition (int x, int y)
//    {
//        fOffsetX = x;
//        fOffsetY = y;
//    }
//
//    /**
//     * @param isVisible
//     */
//    public void SetVisible (boolean isVisible)
//    {
//        fIsVisible = isVisible;
//    }
}
