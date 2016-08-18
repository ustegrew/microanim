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

package treewalk.framework.controller;

import static jsweet.dom.Globals.console;
import static jsweet.dom.Globals.window;
import static jsweet.util.Globals.function;

import treewalk.framework.application.TApplication;
import treewalk.framework.aux.storage.TArray;

/**
 * @author Peter Hoppe
 */
public class TController
{
    private static enum EEvent
    {
        kNull,
    }
    
    private static enum EState
    {
        kAnimRunning,
        kNull,
        kStart,
    }
    
    private static final boolean kDoDebug = true;
    private static final int     kTCycle  = 100;
    
    private TApplication    fHost;
    private TArray<EEvent>  fQueue;
    private EState          fState;    
    
    public TController (TApplication host)
    {
        fHost   = host;
        fQueue  = new TArray<EEvent> ();
        fState  = EState.kNull;
    }
    
    public void OnProgramStart ()
    {
        if (fState == EState.kNull)
        {
            fState = EState.kStart;
            _Run ();
        }
    }
    
    private void _Dbg_ReportEvent (EState stateOld, EState stateNew, EEvent event, boolean isValid)
    {
        if (kDoDebug)
        {
            if (isValid)
            {
                console.log ("T_CTRL_Controller::Transition (valid)  : " + stateOld + " (" + event + ") -> " + stateNew);
            }
            else
            {
                console.log ("T_CTRL_Controller::Transition (invalid): " + stateOld + " (" + event + ")");
            }
        }
    }
    
    private void _DoCycle ()
    {
        EEvent          ev;
        int             nEv;
        EState          stO;
        boolean         isValid;
        
        nEv = fQueue.GetNumElements ();
        ev  = EEvent.kNull;
        if (nEv >= 1)
        {
            ev  = fQueue.Dequeue ();
            stO = fState;
            switch (ev)
            {
//                case kLoadResourcesCompleted:
//                    isValid = _EvHndl_LoadResourcesCompleted ();
//                    break;
//                case kLoadResourcesError:
//                    isValid = _EvHndl_LoadResourcesError ();
//                    break;
//                case kLoadResourcesRequest:
//                    isValid = _EvHndl_LoadResourcesRequest ();
//                    break;
                default:
                    isValid = true;
            }
            _Dbg_ReportEvent (stO, fState, ev, isValid);
        }
    }
    
    private void _Run ()
    {
        _DoCycle ();
        window.setTimeout 
        (
            function 
            (
                () ->
                {
                    _Run ();
                }
            ), kTCycle
        );
    }
}

/*
[100]:  When using an enum type, JSweet threw an error to the tune of 
        "Cannot find name 'treewalk'" with no further details shown. 
        Therefore I resorted to use integer constants, as done in pre java enum times.
        
         
*/