# MAL - the MicroAnimLanguage (`mal.*`)

MAL is the animation language which drives the micro anim simulator. It mixes a core language with some basic animation and GUI commands. Overall, we strive to keep the language very simple. The core part is a very stripped down adaptation of ECMAScript, and the animation part offers a few basic commands to operate the simulator and animate the various objects in the simulator's viewport.

(Initially?) we run the simulator inside a web browser, i.e. it's running as a Javascript application. To keep things simple we largely follow the ECMAScript model. For example, variables are weakly typed - otherwise we'd need a strong type system on top of ECMAScript. This would blow the simulator's complexity out of proportion. We also deviate from the ECMAScript model. Most notably declarations, statements and expressions don't terminate with a semicolon, but with an end-of-line character (or start of a comment). This means that declarations, statements or expressions must be written one per line each (i.e. we don't allow for multiple statements/expressions in one line).

MAL programs can contain empty lines.


## Core language (`mal.core`)


### Comments

Programmer's remarks - for explanation purposes or entertainment. Comments...

* ... will be ignored by the simulator.
* ... can span one or more lines.
* ... can begin in the same line with a statement or expression.


We cater for...

* Single line comments. Prepended by a double forward slash `//`. Can be in it's own line or at the end of an expression or statement.

   ```
    // This is a single line comment

    x = 3                       // Single line comments can follow an expression...
    PushFirst (b, "myValue")    // ... or a statement
   ```

* Multiline comments. Marked by "/*" at the start and "*/" at the end. Can span one or more lines and can start at the end of an assignment or statement.

   ```
   /* And this is
      a multi line
      comment
    */

    /* Multi line comments can fit into one line */
    x = 17                      /* ... and be in the same line as some executable code  */
   ```

### Literals

Literals are fixed values in source code.


#### Numerical values

Internally, these will always be represented as a floating point number.

* Decimals. A sequence of decimal digits `[0-9]`, optionally with a decimal point `.`. If there's a decimal point, it must have at least one decimal digit before it.
   ```
   3
   30.35
   4.1
   0.8
   ```

* Hexadecimals. Start with `0x` followed by a sequence of hexadecimal digits `[0-9a-fA-F]`. We allow for upper and lower case characters.
   ```
   0x3
   0x02
   0xA35F
   0x2c7B
   ```
* Binaries. Start with '0b' followed by a sequence of binary digits `01]`.
   ```
   0b0
   0b101
   0b1001
   ```


#### Strings

Sequences of characters delimited by double quotes `"`.

    "This is a string"

We recognize a small set of special characters, signified by an escape sequence.

* `\n` - new line
   ```
   "Lorem ipsum\ndolor sit amet"
   ```
* `\"`  - double quote
   ```
   "He said: \"This is not a sentence.\""
   ```
* `\\`  - backslash
   ```
   "Find the file in C:\\Temp"
   ```

#### Others

* Booleans. Either `true` or `false`.
* `null`
* Array literals. A sequence of literals enclosed in square brackets, e.g. `[1, 5, 2, 8]`. For further information, see section on arrays.


### Variables  

* Variables must be declared before they can be used. This makes them known to the simulation environment.
   ```
   declare x        // Declare variable "x". It will be initialized to null.
   
   // Now x is ready to be used.
   ```

* A newly declared variable is always initialized to `null`
* Variables are weakly typed.
* Variables can be part of expressions and statements.
   ```
   declare x                // x := null
   x = 5                    // x := 5               (number)
   x = x + " hello"         // x := "5 hello"        (string)
   ```

#### Arrays (mal.core.TArray)

Arrays are special compount types. They can hold multiple values of any other variable type.

Arrays must be declared with dimensionless square brackets.

    declare x[]


Arrays can be set by using an array literal.

    declare x[]
    
    x = [1, 3, 7]       // Array literal.

    
Array elements can be accessed by index. The index must be written inside square brackets. 
Indices are zero-based.

    r = x[0]            // Set r to the value stored as the first element of x.


The array index must be a computable expression. The index expression can be a number literal or 
any other expression yielding a number as result.

    r = x[1]            // index is 1       -> Number literal
    r = x[i]            // index is i       -> Expression using a variable
    r = x[i+1]          // index is i + 1   -> Expression using a variable


Arrays elements are readable and writable.

    // Assume x = [15, 4, 12, 21] and i = 2
    temp   = x[i]       // temp := 12
    x[i]   = x[i+1]     // x := [15, 4, 21, 21]
    x[i+1] = temp       // x := [15, 4, 21, 12]


Arrays are dynamic, i.e. we can add/delete elements to/from an array at runtime.

    declare x[]         // x := []
    x[0] = "Hello"      // x := ["Hello"]
    x[1] = "World"      // x := ["Hello", "World"]
    s    = PopLast (x)  // x := ["Hello"]


We don't allow sparse arrays (i.e. no undefined values allowed). Setting a previously unset 
array element will initialize all other unset elements before it to `null`.

    declare x[]         // x := []
    x[0] = 5            // x := [5]
    x[3] = 10           // x := [5, null, null, 10]


Arrays can assigned to other arrays only.

    declare x[]
    declare y[]
    declare a;
    
    x = [2,4,5]
    y = x               // allowed
    a = x               // illegal

    
Arrays cannot be used in combination with any other variables or literals in right hand terms.

    declare x[]
    declare y[]
    declare z[]
    declare a
    declare b
    
    x = [2, 4, 5]
    y = [3, 5, 7]
    
    z = x + y           // illegal - arrays cannot be combined, even with other arrays.
    a = x + 2           // illegal - 2 is a numeric literal
    b = x + a           // illegal - a is not an array

    
##### Functions for arrays
<dl>
    <dt><code>int GetSize (TArray&lt;T&gt; x)</code></dt>
    <dd>
        Returns the number of elements stored in <code>x</code>.
        <dl>
            <dt>Parameters</dt>
            <dd>
                <dl>
                    <dt><code>TArray&lt;T&gt; x</code></dt>
                    <dd>The Array being queried</dd>
                </dl>
            </dd>
            <dt>Returns</dt>
            <dd><code>int</code> The number of elements in <code>x</code></dd>
            <dt></dt>
            <dd>
<pre>
                                // assume:  a == [4, 2, 6]
n = GetSize (a)                 // n := 3
</pre>
            </dd>
        </dl>
    </dd>
</dl>

<dl>
    <dt><code>T PopFirst&lt;T&gt; (TArray&lt;T&gt; x)</code></dt>
    <dd>
        Returns and deletes the first element in <code>x</code>, shifting any further entries one position down.
        <dl>
            <dd>
                <dl>
                    <dt><code>TArray&lt;T&gt; x</code></dt>
                    <dd>The Array of which we'd like to retrieve the first element</dd>
                </dl>
            </dd>
            <dt>Returns</dt>
            <dd><code>T</code> The first element in <code>x</code></dd>
            <dt>Examples</dt>
            <dd>
<pre>
                                // assume:  a == [4, 2, 6]
x = PopFirst (a)                // x := 4; a := [2, 6]
</pre>
            </dd>
        </dl>
    </dd>
</dl>

<dl>
    <dt><code>T PopLast&lt;T&gt; (TArray&lt;T&gt; x)</code></dt>
    <dd>
        <dl>
            <dt>Returns and deletes the last element in <code>x</code>.</dt>
            <dd>
                <dl>
                    <dt><code>TArray&lt;T&gt; x</code></dt>
                    <dd>The Array of which we'd like to retrieve the last element</dd>
                </dl>
            </dd>
            <dt>Returns</dt>
            <dd><code>T</code> The last element in <code>x</code></dd>
            <dt>Examples</dt>
            <dd>
<pre>
                                // assume:  a == [4, 2, 6]
x = PopLast (a)                 // x := 6, a := [4, 2]
</pre>
            </dd>
        </dl>
    </dd>
</dl>

<dl>
    <dt><code>void PushFirst&lt;T&gt; (TArray&lt;T&gt; x, T v)</code></dt>
    <dd>
        <dl>
            <dt>Adds value <code>v</code> at the beginning of <code>x</code>, shifting any further entries one position up.</dt>
            <dd>
                <dl>
                    <dt><code>TArray&lt;T&gt; x</code></dt>
                    <dd>The array onto which we'd like to push the given value</dd>
                    <dt><code>T v</code></dt>
                    <dd>The value being pushed</dd>
                </dl>
            </dd>
            <dt>Returns</dt>
            <dd><code>void</code> nothing</dd>
            <dt>Examples</dt>
            <dd>
<pre>
                                // assume:  a == [4, 2, 6]
PushFirst (a, 12)               // a := [12, 4, 2, 6]
</pre>
            </dd>
        </dl>
    </dd>
</dl>

<dl>
    <dt><code>void PushLast&lt;T&gt; (TArray&lt;T&gt; x, T v)</code></dt>
    <dd>
        <dl>
            <dt>Adds value <code>v</code> at the end of <code>x</code>.</dt>
            <dd>
                <dl>
                    <dt><code>TArray&lt;T&gt; x</code></dt>
                    <dd>The array onto which we'd like to push the given value</dd>
                    <dt><code>T v</code></dt>
                    <dd>The value being pushed</dd>
                </dl>
            </dd>
            <dt>Returns</dt>
            <dd><code>void</code> nothing</dd>
            <dt>Examples</dt>
            <dd>
<pre>
                                // assume:  a == [4, 2, 6]
PushLast (a, 12)                // a := [4, 2, 6, 12]
</pre>
            </dd>
        </dl>
    </dd>
</dl>


### Expressions (Assignments)

An expression computes a term and assigns the result to a variable. A term is a computable sequence of literals and operators returning a literalizable value [1].

    // Sets the content of variable `y` to the result of the term
    // '2 * 5'. Result will map directly to the literal 10.
    var = 2 * 5


#### Operators

|   Type        | Operator                          | Meaning                               |
| ---------     | --------------------------------- | ------------------------------------- |
| Arithmetic    | `a + b`                           | addition                              |
|               | `a - b`                           | subtraction                           |
|               | `a * b`                           | multiplication                        |
|               | `a / b`                           | division                              |
|               | `-a`                              | unary negation                        |
|               | `a % b`                           | Remainder (modulo)                    |
| Bitwise       | `a & b`                           | AND                                   |
|               | <code>a &#124; b</code>           | OR                                    |
|               | `a ^ b`                           | XOR                                   |
|               | `~a`                              | NOT                                   |
|               | `a << b`                          | LShift                                |
|               | `a >> b`                          | RShift                                |
|               | `a >>> b`                         | RShift + insert zeros                 |
| Comparison    | `a == b`                          | Loosely Equal                         |
|               | `a === b`                         | Strictly equal                        |
|               | `a != b`                          | Loosely unequal                       |
|               | `a !== b`                         | Strictly unequal                      |
|               | `a > b`                           | Greater than                          |
|               | `a >= b`                          | Greater than, or, equal to            |
|               | `a < b`                           | Smaller than                          |
|               | `a <= b`                          | Smaller than, or, equal to            |
| Logical       | `a && b`                          | AND                                   |
|               | <code>a &#124;&#124; b</code>     | OR                                    |
|               | `!b`                              | NOT                                   |
| String        | `a + b`                           | Concatenate                           |


#### Brackets

`(`, `)`                        Brackets - change the order of precendence.  


### Statements

Statements terminate with a newline character (i.e. we allow for one statement per line).
We support statement blocks. They have to be enclosed in brackets.


### Control flow

`If`

    if (condition)
    {
        // do stuff
    }

`if`/`else`

    if (condition)
    {
        // do stuff
    }
    else
    {
        // do other stuff
    }



    if (condition)
    {
        // do stuff
    }
    else if (condition)
    {
        // do stuff
    }
    else if (condition)
    {
        // do stuff
    }
    else
    {
        // do other stuff
    }

`for`

    for (initial-expression; continue-condition; iteration-expression)
    {
        // do stuff
    }

`while`

    while (continue-condition)
    {
        // do stuff
    }


### Functions

    T function<T> name (param, param, param, ...)


## Simulation (`mal.sim`)

Commands pertaining to running a simulation

    void Reset ()
    void StepBackward ()
    void StepForward ()
    TStackExec GetStack ()
    TScope GetScope ()
    void HideVar (String id)
    void ShowVar (String id)


## Animation (`mal.anim`)

We support a very basic set of animation commands.


### GUI

    void SetTransparency (String id, double alpha, int mSec)

Sets the transparency of the resource `id` to the given transparency level.
Parameters: Values for `alpha`.

* 0.0: Not transparent
* 1.0: Fully transparent


### Resources  

    void LoadImg (String id, String path, String layer)
    void CreateDisplay (String id, EDispType t, TPoint2D ref, String layer)   


### Transforms

    MoveBy (String id, double len, int mSec)
    MoveTo (String id, int x, int y, int mSec)
    RotateBy (String id, double alpha, int mSec)
    RotateTo (String id, double alpha, int mSec)


### Animation blocks

Multiple animations can be grouped. Animations that run concurrently must be enclosed in angled braces.

    <
        Cmd_1
        Cmd_2
        ...
    >

Animations that run in sequence must be enclosed in square brackets.  

    [
        Cmd_1
        Cmd_2
        ...
    [

Animation blocks can be combined

    <
        [
            MoveTo          (hunx, 2, 100, 100)
            SetTransparency (hunx, 0.0, 1000)
        ]
        [
            MoveTo          (helo, 10, 80, 1000)
            SetTransparency (helo, 1.0,    1000)
        ]
    >

----------------------------------------------------
[1] Literalizable value: A value that can be represented by a literal. E.g. `25`, `"Hello"`, `0b100`.
