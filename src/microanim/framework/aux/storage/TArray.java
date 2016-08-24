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

package microanim.framework.aux.storage;

import static jsweet.util.Globals.array;

import jsweet.lang.Array;
import jsweet.lang.Object;
import jsweet.lang.RangeError;

/**
 * -----------
 * Head notes:
 * <pre>
 * [TArray_100]:    Quickest way according to http://stackoverflow.com/a/1232046. In general,
 *                  clearing an array by re-assigning the reference to a new (empty) one won't
 *                  actually clear the array elements. Consider this:
 *                       var a1 = [0, 1, 2];
 *                       var a2 = a1;
 *                       a1 = [];
 *                       console.log (a2) // Will show: "[0,1,2]"
 *                  This would be bad here - however:
 *                  -  In this class we ensure that there's ever only one copy of the data store. 
 *                  -  We declare data store private and don't allow direct access to the store
 *                     from outside the class. Whilst this doesn't protect the class when someone
 *                     modifies the trans-piled javascript code, it does prevent programmer errors
 *                     within the dev environment (which uses Java). If I violate the "private"
 *                     qualifier there, then the java environment will flag such attempts as a
 *                     compiler error. Meaning - insiginificant security when dealing with the 
 *                     javascript output, but significant safety during dev. We are protected from
 *                     the developer's mistakes, but not from the developer's irresponsibility.
 * </pre>
 * @author Peter Hoppe
 */
public class TArray<T>
{
    private Object[]        fValues;
    
    public TArray ()
    {
        fValues = new Object [0];
    }
    
    public void Clear ()
    {
        fValues = new Object [0];                   /* [TArray_100] */
    }
    
    @SuppressWarnings ("unchecked")
    public T Dequeue ()
    {
        Array<Object>   ar;
        T               ret;
        
        _AssertHasElements ();
        ar  = array (fValues);
        ret = ((T) ar.shift ());
        
        return ret;
    }
    
    public void Enqueue (T obj)
    {
        Array<Object>       ar;
        
        ar = array (fValues);
        ar.unshift ((Object) obj);
    }
    
    @SuppressWarnings ("unchecked")
    public T GetElementByIndex (int i)
    {
        T ret;
        
        _AssertInRange (i);
        ret = ((T) fValues [i]);
        
        return ret;
    }
    
    public int GetNumElements ()
    {
        return fValues.length;
    }

    @SuppressWarnings ("unchecked")
    public T Pop ()
    {
        Array<Object>       ar;
        T                   ret;
        
        _AssertHasElements ();
        ar = array (fValues);
        ret = ((T) ar.pop ());
        
        return ret;
    }
    
    public void Push (T obj)
    {
        Array<Object>       ar;
        
        ar = array (fValues);
        ar.push ((Object) obj);
    }
    
    /**
     * 
     */
    private void _AssertHasElements ()
    {
        if (fValues.length <= 0)
        {
            throw new RangeError ("Array is empty. Can't delete any elements.");
        }
    }
    
    private void _AssertInRange (int i)
    {
        if (fValues.length <= 0)
        {
            throw new RangeError ("Array is empty. Can't retrieve any elements.");
        }
        else if (i < 0)
        {
            throw new RangeError ("Index too small. Must be in range: [0, " + fValues.length + "[. Given: " + i);
        }
        else if (i >= fValues.length)
        {
            throw new RangeError ("Index too large. Must be in range: [0, " + fValues.length + "[. Given: " + i);
        }
    }
}
