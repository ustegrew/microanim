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

import jsweet.lang.Error;
import jsweet.lang.Extends;
import jsweet.lang.Interface;

/**
 * @author Peter Hoppe
 */
public class V_SCN_Resource
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