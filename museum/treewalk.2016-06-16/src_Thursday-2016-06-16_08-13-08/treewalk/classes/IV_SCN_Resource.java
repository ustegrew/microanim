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

/**
 * @author Peter Hoppe
 */
public class IV_SCN_Resource implements I_SCN_Resource                          // [100]
{
    protected String                    fID;
    protected T_SCN_ResourcePack        fHost;
    
    public IV_SCN_Resource (String id)
    {
        fID     = id;
        fHost   = null;
    }
    
    /* (non-Javadoc)
     * @see treewalk.classes.I_SCN_Resource#GetID()
     */
    @Override
    public final String GetID ()
    {
        return fID;
    }

    /* (non-Javadoc)
     * @see treewalk.classes.I_SCN_Resource#Load()
     */
    @Override
    public void Load ()
    {
        throw new Error ("Please override Load()");
    }

    /* (non-Javadoc)
     * @see treewalk.classes.I_SCN_Resource#SetHost(treewalk.classes.T_SCN_ResourcePack)
     */
    @Override
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

        Workaround: In addition to interfaces we create classes that implement them!
                    We must use concrete classes throughout, as JSweet creates buggy 
                    Javascript code when we use abstract classes.
 
            Create interface I_X
                  public interface I_X 
                  {
                      public void MX (); 
                  }
            And an interface Y which extends I_X
                  public interface I_Y extends I_X
                  {
                      public void MY ();
                  }
            And an 'abstract' base class IV_X
                  public class IV_X implements I_X
                  {
                      public void MX ()
                      {
                          throw new Error ("Please override this method");
                      }
                  } 
            And an 'abstract' base class IV_Y
                  public class IV_X implements I_Y
                  {
                      public void MX ()
                      {
                          throw new Error ("Please override this method");
                      }
                      public void MY ()
                      {
                          throw new Error ("Please override this method");
                      }
                  }
            Now our 'concrete' class which both, extends the 'abstract' base 
            AND inherits from the interface
                  public class A extends IV_Y implements I_Y
                  {
                      public void MX ()
                      {
                      }
                      public void MY ()
                      {
                      }
                  }
            Now we satisfy both sides - on the Java side I am forced to implement
            the methods MX and MY, and JSweet finds a class hierarchy it can cope with.
 
*/