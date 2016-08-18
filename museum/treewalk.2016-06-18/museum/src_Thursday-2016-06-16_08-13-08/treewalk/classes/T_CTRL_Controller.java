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

import static jsweet.dom.Globals.window;
import static jsweet.util.Globals.function;

/**
 * @author Peter Hoppe
 */
public class T_CTRL_Controller
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
