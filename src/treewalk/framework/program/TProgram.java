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

package treewalk.framework.program;

import treewalk.framework.aux.storage.TArray;
import treewalk.framework.aux.storage.TCollection;
import treewalk.framework.program.lang.VCommand;
import treewalk.framework.program.res.VResourceRef;

/**
 * @author Peter Hoppe
 */
public class TProgram
{
    private TCollection<TArray<VResourceRef>>               fResDescriptors;
    private TArray<VCommand>                                fSteps;
    
    public TProgram ()
    {
        fSteps              = new TArray<VCommand>                      ();
        fResDescriptors     = new TCollection<TArray<VResourceRef>>     ();
    }
    
    public TCollection<TArray<VResourceRef>> GetResources ()
    {
        return fResDescriptors;
    }

    void AddRefStore (String typeID, TArray<VResourceRef> store)
    {
        fResDescriptors.Add (typeID, store);
        
    }

    void AddStep (VCommand c)
    {
        fSteps.Push (c);
    }
}
