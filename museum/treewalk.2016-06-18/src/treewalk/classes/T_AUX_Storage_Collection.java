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

import jsweet.lang.Object;
import jsweet.lang.RangeError;
import jsweet.lang.ReferenceError;

/**
 * @author Peter Hoppe
 */
public class T_AUX_Storage_Collection<T>
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
