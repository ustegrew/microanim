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

package microanim.framework.res;

import def.es6_promise.Promise;
import jsweet.lang.Error;

/**
 * Please note: The name is prepended with 'A0', so the name of this class
 * is at the top up the alphabet. Thus, JSweet will put this class at the 
 * beginning of the compiled Javascript unit. A0_XXXX classes are at the 
 * root of our class hierarchy. 
 * 
 * If we don't have base classes at the top of the Javascript unit then
 * the Javascript unit will throw a rather obscure exception when it's executed:
 * 
 * <code>Uncaught TypeError: Cannot read property 'prototype' of undefined</code>
 * 
 * I assume, this is because there's some call to x.prototype in the Javascript file,
 * with x being undefined because this class is located below the child class in the 
 * generated Javascript file. 
 * 
 * @author Peter Hoppe
 */
public abstract class VSceneResource
{
    protected TResourcePack        fHost;
    protected String                    fID;
    
    public VSceneResource (String id)
    {
        fID     = id;
        fHost   = null;
    }
    
    public final String GetID ()
    {
        return fID;
    }

    public abstract Promise<Object> Load_Exec ();

    public final void SetHost (TResourcePack host)
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
