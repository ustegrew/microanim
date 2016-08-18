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

package treewalk;

import static jsweet.dom.Globals.alert;
import static jsweet.dom.Globals.document;
import static jsweet.dom.Globals.window;
import static jsweet.util.Globals.function;

import jsweet.dom.CanvasRenderingContext2D;
import jsweet.dom.HTMLCanvasElement;
import jsweet.dom.HTMLImageElement;
import jsweet.lang.Error;
import jsweet.lang.Math;
import jsweet.lang.Object;
import jsweet.lang.RangeError;
import jsweet.lang.ReferenceError;
import jsweet.util.StringTypes;

/**
 * @author Peter Hoppe
 */
class T_APP_Application
{
    private T_CTRL_Controller                   fController;
    private T_SCN_Scene                         fScene;
    
    public T_APP_Application (String idCanvas)
    {
        fScene              = new T_SCN_Scene           (this, idCanvas);
//        fController         = new T_CTRL_Controller     (this);
    }
    
    /**
     * 
     */
    public void GFX_Refresh ()
    {
        fScene.GFX_Refresh ();
    }
    
    public void Resource_Img_Add (String id, String url, String idLayer)
    {
        T_GFX_Primitive_Icon        ico;
        
        ico = new T_GFX_Primitive_Icon (id, url);
        
        //TODO integrate layer support
        fScene.Resource_GFX_Add (ico, idLayer);
    }

    /**
     * @param key
     * @param x
     * @param y
     */
    public void Resource_Img_Pos_Set (String key, int x, int y)
    {
        fScene.Resource_Img_Pos_Set (key, x, y);
    }

    /**
     * @param key
     * @param isVisible
     */
    public void Resource_Img_Visible_Set (String key, boolean isVisible)
    {
        fScene.Resource_Img_Visible_Set (key, isVisible);
    }

    /**
     * 
     */
    public void Resources_Load ()
    {
        fScene.Resources_Load ();
        
    }

    public void View_Layer_Add (String name)
    {
        fScene.View_Layer_Add (name);
    }

}

/**
 * @author Peter Hoppe
 */
class T_AUX_Geom_Coord2D
{
    public double   fX;
    public double   fY;
    
    public T_AUX_Geom_Coord2D (double x, double y)
    {
        fX = x;
        fY = y;
    }
    
    public T_AUX_Geom_Coord2D GetCopy ()
    {
        T_AUX_Geom_Coord2D ret;
        
        ret = new T_AUX_Geom_Coord2D (fX, fY);
        
        return ret;
    }
}

/**
 * @author Peter Hoppe
 */
class T_AUX_Geom_Vector2D
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

/**
 * @author Peter Hoppe
 */
class T_AUX_Storage_Collection<T>
{
    private Object                  fHashMap;
    private Object[]                fValues;
    
    public T_AUX_Storage_Collection ()
    {
        fHashMap = new Object ();
        fValues  = new Object [0];                                              // [100]
    }
    
    public void Add (String key, T obj)
    {
        Object      node;
        
        _AssertExistsByKey (key, true);
        
        node = new Object ();
        node.$set ("value", obj);
        node.$set ("i",     fValues.length);
        node.$set ("key",   key);

        fHashMap.$set (key, node);
        fValues[fValues.length] = node;
    }
    
    @SuppressWarnings ("unchecked")
    public T GetElementByIndex (int i)                                          // [120]
    {
        Object  node;
        T       ret;
        
        _AssertExistsByIndex (i);
        node    = fValues [i];
        ret     = ((T) node.$get ("value"));                                    // [110]
        
        return ret;
    }
    
    @SuppressWarnings ("unchecked")
    public T GetElementByKey (String key)                                       // [120]
    {
        Object  node;
        T       ret;
        
        _AssertExistsByKey (key, false);
        node    = ((Object) fHashMap.$get (key));
        ret     = ((T) node.$get ("value"));                                    // [110]
        
        return ret;
    }
    
    public int GetLookup_IndexByKey (String key)
    {
        Object  node;
        int     ret;
        
        _AssertExistsByKey (key, false);
        node    = ((Object) fHashMap.$get (key));                               // [110]
        ret     = (Integer) node.$get ("i");                                    // [110][150]
        
        return ret;
    }
    
    public String GetLookup_KeyByIndex (int i)
    {
        Object  node;
        String  ret;
        
        _AssertExistsByIndex (i);
        node    = ((Object) fValues[i]);                                        // [110]
        ret     = ((String) node.$get ("key"));                                 // [110]
        
        return ret;
    }
    
    public int GetNumElements ()
    {
        return fValues.length;
    }
    
    private void _AssertExistsByIndex (int i)
    {
        if ((i < 0)  ||  (i >= fValues.length))
        {
            throw new RangeError ("Index must be an integer in range: [0, " + fValues.length + "[. Given: " + i);
        }
    }
    
    private void _AssertExistsByKey (String key, boolean doInvert)
    {
        String  err;
        boolean isOK;
        
        isOK = fHashMap.hasOwnProperty (key);
        isOK = doInvert ? (! isOK) : (isOK);
        if (! isOK)
        {
            err = doInvert ? ("Duplicate key: '" + key + "'") : ("Non-existant key: '" + key + "'");
            throw new ReferenceError (err);
        }
    }
}

/*
 *
 * [100]       This program is meant to be trans-compiled to Javascript, and not 
 *             (actually) to be run in Java. In Javascript, arrays are runtime dynamic. 
 *             JSweet will trans-compile the code
 *                 fValues = new Object [0];
 *             to
 *                 this.fValues = []
 *             and the code 
 *                 fValues[i] = obj;
 *             to
 *                 this.fValues[i] = obj;
 *                 
 *             In Javascript (not Java!) arrays are runtime dynamic, therefore such constructs
 *             do work in Javascript (but not in Java):
 *                 var x = [];         // x := []
 *                 x [0] = 4;          // x := [4]
 *                 x [1] = 2;          // x := [4, 2]
 *
 * [110]        Ugly typecasting in Java - but it's not being executed as Java program. 
 *              Instead, it trans-compiles to valid Javascript like this:
 *              
 *                  T_AUX_Storage_Collection.prototype.GetElementByIndex = function (i) {
 *                          var node;
 *                          var ret;
 *                          this._AssertExistsByIndex(i);
 *                          node = this.fValues[i];
 *                          ret = node["value"];
 *                          return ret;
 *                      };
 *
 * [120]        Javascript does not support method overloading, therefore we have to 
 *              use uniquely named methods for otherwise similar operations.
 *              
 * [130]        We create a wrapper around each element which carries the meta info - where
 *              the element is located in the collection (index) and what key it's known as.
 *              This enables us to do lookups, such as index by key.
 *              
 * [150]        This will compile due to Java autoboxing: Object->Integer->int
 */

/**
 * @author Peter Hoppe
 */
class T_CTRL_Controller
{
    private static final int        kTCycle = 100;
    
    private T_SCN_Scene             fScene;
    
    public T_CTRL_Controller (T_SCN_Scene scene)
    {
        fScene = scene;
    }
    
    public void OnFinishedLoad (int i)
    {
        
    }
    
    public void Run ()
    {
        _DoCycle ();
        window.setTimeout 
        (
            function 
            (
                () ->
                {
                    Run ();
                }
            ), kTCycle
        );
    }
    
    private void _DoCycle ()
    {
    }
}

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

/**
 * @author Peter Hoppe
 */
class T_GFX_Sys_Layer
{
    private T_GFX_Sys_View                                          fHost;
    private String                                                  fID;
    private T_AUX_Storage_Collection<V_GFX_Resource>                fResources;
    
    public T_GFX_Sys_Layer (T_GFX_Sys_View host, String id)
    {
        fHost       = host;
        fID         = id;
        fResources  = new T_AUX_Storage_Collection<V_GFX_Resource> ();
    }
    
    /**
     * @param res
     */
    public void Resource_GFX_Add (V_GFX_Resource res)
    {
        String key;
        
        key = res.GetID ();
        fResources.Add (key, res);
    }
    
}

/**
 * @author Peter Hoppe
 */
class T_GFX_Sys_View
{
    private T_GFX_Sys_Viewport                              fCanvas;
    private T_AUX_Storage_Collection<T_GFX_Sys_Layer>       fLayers;
    
    public T_GFX_Sys_View (String idCanvas)
    {
        fLayers = new T_AUX_Storage_Collection<T_GFX_Sys_Layer> ();
        fCanvas = new T_GFX_Sys_Viewport (idCanvas);
    }
    
    public void Draw ()
    {
        
    }

    public void Layer_Add (String id)
    {
        T_GFX_Sys_Layer     layer;

        layer = new T_GFX_Sys_Layer (this, id);
        fLayers.Add (id,  layer);
    }
    
    /**
     * @param res
     * @param idLayer
     */
    public void Resource_GFX_Add (V_GFX_Resource res, String idLayer)
    {
        T_GFX_Sys_Layer     l;
        
        l = fLayers.GetElementByKey (idLayer);
        l.Resource_GFX_Add (res);
    }
}

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
    
    public void Draw (V_GFX_Resource p)
    {
        p.Draw (fGraphics);
    }
}

/**
 * @author     Peter Hoppe
 * 
 * [100]       Resource loading is asynchronous; therefore we can't handle it the old-style
 *             synchronous way ("for each res in resources do: res.Load ()"). Instead we need to
 *             issue a LOAD request for each resource and wait for that resource's onLoad 
 *             confirmation event that it has finished loading. Upon the confirmation event we 
 *             load the next-in-line resource. Once all resources have loaded we issue a confirmation 
 *             event to the next higher object (client hosting this resource pack, i.e. the host).
 * 
 */
class T_SCN_ResourcePack
{
    private static int                                  giResLoading = -1;
    
    private T_SCN_Scene                                 fHost;
    private T_AUX_Storage_Collection<V_SCN_Resource>    fResources;
    private T_SCN_ResourcePack_State                    fState;

    public T_SCN_ResourcePack (T_SCN_Scene t_SCN_Scene)
    {
        giResLoading    = 0;
        fHost           = t_SCN_Scene;
        fResources      = new T_AUX_Storage_Collection<V_SCN_Resource> ();
        fState          = T_SCN_ResourcePack_State.kInit;
    }
    
    public void Add (V_SCN_Resource r)
    {
        String k;
        
        k = r.GetID ();
        if (fState == T_SCN_ResourcePack_State.kInit)
        {
            r.SetHost (this);
            fResources.Add (k, r);
        }
        else
        {
            throw new Error ("Can't add more resources once we have called Load ().");
        }
    }
    
    /**
     * @param key
     * @return
     */
    public V_SCN_Resource GetElementByID (String key)
    {
        V_SCN_Resource      ret;
        
        ret = fResources.GetElementByKey (key);
        
        return ret;
    }
    
    public V_SCN_Resource GetElementByIndex (int i)
    {
        V_SCN_Resource      ret;
        
        ret = fResources.GetElementByIndex (i);
        
        return ret;
    }
    
    public void Load ()
    {
        _LoadNextResource ();
    }

    /**
     * Event handler (package internal): Resource has loaded. 
     * Will be called by each resource (i.e. from outside this class)
     * when it has finished loading.  See [100]
     */
    void OnLoadResource ()
    {
        _LoadNextResource ();
    }
    
    /**
     * Loads the next-to-be-loaded resource. See [100].
     */
    private void _LoadNextResource ()
    {
        int                     n;
        V_SCN_Resource          r;
        
        if (fState != T_SCN_ResourcePack_State.kInit)
        {
            throw new Error ("Resources can only be loaded once. You must Add(...) all resources before calling Load ().");
        }

        n = fResources.GetNumElements ();
        if (giResLoading < n)
        {
            r = fResources.GetElementByIndex (giResLoading);
            giResLoading++;
            r.Load ();
        }
        else
        {
            fHost.OnLoadResources ();
        }
    }
}

enum T_SCN_ResourcePack_State
{
    kInit,
    kLoading,
    kWait,
}

/**
 * @author Peter Hoppe
 */
class T_SCN_Scene
{
    private T_APP_Application                       fHost;
    private T_SCN_ResourcePack                      fResources;
    private T_GFX_Sys_View                          fView;
    
    public T_SCN_Scene (T_APP_Application host, String idCanvas)
    {
        fHost           = host;
        fResources      = new T_SCN_ResourcePack    (this);
        fView           = new T_GFX_Sys_View        (idCanvas);
    }
    
    /**
     * 
     */
    public void GFX_Refresh ()
    {
        fView.Draw ();
    }
    
    public void Resource_GFX_Add (V_GFX_Resource res, String idLayer)
    {
        fResources.Add (res);
        fView.Resource_GFX_Add (res, idLayer);
    }

    public void Resource_Img_Pos_Set (String key, int x, int y)
    {
        T_GFX_Primitive_Icon        img;

        img = (T_GFX_Primitive_Icon) fResources.GetElementByID (key);
        img.SetPosition (x, y);
    }
    
    /**
     * @param key
     * @param isVisible
     */
    public void Resource_Img_Visible_Set (String key, boolean isVisible)
    {
        T_GFX_Primitive_Icon        img;

        img = (T_GFX_Primitive_Icon) fResources.GetElementByID (key);
        img.SetVisible (isVisible);
    }
    
    public void Resources_Load ()
    {
        fResources.Load ();
    }

    public void View_Layer_Add (String name)
    {
        fView.Layer_Add (name);
    }
    
    /**
     * Event handler: Resource pack has finished loading all resources.
     */
    void OnLoadResources ()
    {
        alert ("All resources loaded");
    }

//    public void DrawOld ()
//    {
//        int                 i;
//        int                 n;
//        String              k;
//        I_GFX_Resource     p;
//        
//        n = fKeys.length;
//        if (n >= 1)
//        {
//            for (i = 0; i < n; i++)
//            {
//                k = fKeys[i];
//                p = (I_GFX_Resource) fElements.$get (k);
//                fCanvas.Draw (p);
//            }
//        }
//    }
}

/**
 * @author Peter Hoppe
 */
class V_GFX_Resource extends V_SCN_Resource
{
    /**
     * @param id
     */
    public V_GFX_Resource (String id)
    {
        super (id);
    }

    public void Draw (CanvasRenderingContext2D graphics)
    {
        throw new Error ("Please override Draw (CanvasRenderingContext2D graphics)");
    }
}

/**
 * @author Peter Hoppe
 */
class V_SCN_Resource
{
    protected String                    fID;
    protected T_SCN_ResourcePack        fHost;
    
    public V_SCN_Resource (String id)
    {
        fID     = id;
        fHost   = null;
    }
    
    public final String GetID ()
    {
        return fID;
    }

    public void Load ()
    {
        throw new Error ("Please override Load()");
    }

    public final void SetHost (T_SCN_ResourcePack host)
    {
        if (fHost == null)
        {
            fHost = host;
        }
        else
        {
            throw new Error ("Host is already set.");
        }
    }
}

/**
[100]   JSweet can't cope with interfaces that inherit from other interfaces. One of the problems:
            If I have an interface I_X
                  public interface I_X 
                  {
                      public void MX (); 
                  }
            And an interface Y which extends I_X
                  public interface I_Y extends I_X
                  {
                      public void MY ();
                  }
            And a class A implementing I_Y
                  public class A implements I_Y
                  {
                      public void MX ()
                      {
                      }
                      public void MY ()
                      {
                      }
                  }
            And a client class Client:
                  public class Client
                  {
                      public void Test (I_X param1)
                      {
                      }
                  }
            and use Client like this:
                  public void TestClient ()
                  {
                      Client    myClient    = new Client ();
                      A         myA         = new A ();
                      
                      myClient.Test (myA)
                  }
        then JSweet will complain: 
            "Argument of type 'Y' is not assignable to parameter of type 'X'."

        Workaround: We don't use interfaces, but classes! Also, we must use 
                    concrete classes throughout, as JSweet creates buggy 
                    Javascript code when we use abstract classes.
        Unfortunately, this negates a major advantage of interfaces/abstract classes
        that Java forces concrete classes to contain concrete implementations
        of the methods in the interface/abstract methods in the abstract base class.
        On the other hand, at least I can implement methods that are common to 
        all descendant classes. 
 
            Create an 'abstract' base class V_X
                  public class V_X
                  {
                      public void MX ()
                      {
                          throw new Error ("Please override this method");
                      }
                  } 
            And an 'abstract' base class V_Y
                  public class V_Y extends V_X
                  {
                      public final void MX ()     // <-- Overrides V_X::MX(). Make it final!
                      {
                          // Yay, I can do stuff common to all sub classes here!
                      }
                      public void MY ()
                      {
                          throw new Error ("Please override this method");
                      }
                  }
            Now our 'concrete' class which extends the 'abstract' base class
                  public class A extends V_Y
                  {
                      public void MY ()
                      {
                      }
                  }
            Now we satisfy both sides - on the Java side I am forced to implement
            the methods MX and MY, and JSweet finds a class hierarchy it can cope with.
 
*/

public class TTreewalk
{
    public static void main (String[] args)
    {
        window.onload = (e) ->
        {
            _InitApp ();
            return true;
        };
    }
    
    private static void _InitApp ()
    {
        final int                   kNImg = 8;
        
        T_APP_Application           app;
        TResImg []                  imgRes;
        TResImg                     img;
        int                         i;
        
        imgRes      = new TResImg [kNImg];
        imgRes[0]   = new TResImg ("img.tree",              "../../target/img/tree/11.png",                 "0", 0, 0);
        imgRes[1]   = new TResImg ("img.banana",            "../../target/img/banana/banana.png",           "1", 0, 0);
        imgRes[2]   = new TResImg ("img.monkey.happy.01",   "../../target/img/monkey/monkey.happy.01.png",  "2", 0, 0);
        imgRes[3]   = new TResImg ("img.monkey.think.01",   "../../target/img/monkey/monkey.think.01.png",  "2", 0, 0);
        imgRes[4]   = new TResImg ("img.monkey.think.02",   "../../target/img/monkey/monkey.think.02.png",  "2", 0, 0);
        imgRes[5]   = new TResImg ("img.monkey.think.03",   "../../target/img/monkey/monkey.think.03.png",  "2", 0, 0);
        imgRes[6]   = new TResImg ("img.monkey.walk.01",    "../../target/img/monkey/monkey.walk.01.png",   "2", 0, 0);
        imgRes[7]   = new TResImg ("img.monkey.walk.02",    "../../target/img/monkey/monkey.walk.02.png",   "2", 0, 0);
                
        app = new T_APP_Application ("cnv");
        app.View_Layer_Add           ("0");
        app.View_Layer_Add           ("1");
        app.View_Layer_Add           ("2");
        for (i = 0; i < (kNImg-1); i++)
        {
            img = imgRes[i];
            app.Resource_Img_Add (img.fKey, img.fURI, img.fTargetLayer);
        }
        app.Resources_Load          ();
        
        for (i = 0; i < (kNImg-1); i++)
        {
            img = imgRes[i];
            app.Resource_Img_Visible_Set     (img.fKey, false);
            app.Resource_Img_Pos_Set              (img.fKey, img.fPosX, img.fPosY);
        }
        app.GFX_Refresh ();
    }
}