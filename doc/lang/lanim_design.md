# MAL - the MicroAnimLanguage (`mal.*`)

MAL is the animation language which drives the micro anim simulator. It mixes a core language with some basic animation and GUI commands. Overall, we strive to keep the language very simple. The core part is a very stripped down adaptation of ECMAScript, and the animation part offers a few basic commands to operate the simulator and animate the various objects in the simulator's viewport.

(Initially?) we run the simulator inside a web browser, i.e. it's running as a Javascript application. To keep things simple we largely follow the ECMAScript model. For example, variables are weakly typed - otherwise we'd need a strong type system on top of ECMAScript. This would blow the simulator's complexity out of proportion

## Core language (`mal.core`)

### Literals

With respect to numerical values: Internally, they will always be represented as a floating point number.

#### Decimals

A sequence of decimal digits `[0-9]`, optionally with a decimal point `.`. If there's a decimal point, it must have at least one decimal digit before it.

    3
    30.35
    4.1
    0.8

    
#### Hexadecimals

Starts with `0x` followed by a sequence of hexadecimal digits `[0-9a-fA-F]`. For hexadecimal digits we cater for
upper and lower case characters. 
    
    0x3
    0x02
    0xA35F
    0x2c7B
    

#### Binary

Starts with '0b' followed by a sequence of binary digits `01]`.

    0b0
    0b101
    0b1001


#### Boolean

Either `true` or `false`

    true
    false


#### Null

    `null`
    
### Variables  

Variables must be declared before they can be used. This makes them known to the simulation environment. Please note that variables are always weakly typed.

    declare name 

Declare variable `name`.


#### Arrays

* Arrays are dynamic, i.e. we can add or delete elements to an array at runtime.
* We don't allow sparse arrays (i.e. no undefined values allowed).

Arrays must be declared with dimensionless square brackets

    declare x[]
    
Array elements can be accessed by index. Indices are zero-based.

    r = x[0]
    x[0] = 100

Setting a previously unset array element will initialize all other unset elements before it to `null`.

    declare x[]         // x = []
    x[0] = 5            // x = [5]
    x[2] = 10           // x = [5, null, 10]


##### Functions for arrays

Returns the number of elements in `x`.

    int GetSize (TArray x)

Returns and deletes the first element in the array, shifting any other entries one position down. 

    T Dequeue<T> (TArray x)
    
Adds value `v` at the beginning of `x`, shifting any other entries one position up.

    Enqueue<T> (TArray x, T v)   

Returns and deletes the last element of `x`.
 
    T Pop<T> (TArray x)

Add value `v` at the end of `x`.

    void Push<T> (TArray x, T v)


### Expressions (Assignments)

An expression computes a term and assigns the result to a variable. A term is a computable sequence of literals and operators returning a literalizable value [1].

    // Sets the content of variable `y` to the result of the term
    // '2 * 5'. Result will map directly to the literal 10.
    var = 2 * 5


#### Operators

|   Type        | Operator                          | Meaning                               | Examples                      |
| ---------     | --------------------------------- | ------------------------------------- | ----------------------------- |
| Arithmetic    | `a + b`                           | addition                              |                               |
|               | `a - b`                           | subtraction                           |                               |
|               | `a * b`                           | multiplication                        |                               |
|               | `a / b`                           | division                              |                               |
|               | `-a`                              | unary negation                        |                               |
|               | `a % b`                           | Remainder (modulo)                    |                               |
| Bitwise       | `a & b`                           | AND                                   |                               |
|               | <code>a &#124; b</code>           | OR                                    |                               |
|               | `a ^ b`                           | XOR                                   |                               |
|               | `~a`                              | NOT                                   |                               |
|               | `a << b`                          | LShift                                |                               |
|               | `a >> b`                          | RShift                                |                               |
|               | `a >>> b`                         | RShift + insert zeros                 |                               |
| Comparison    | `a == b`                          | Loosely Equal                         |                               |
|               | `a === b`                         | Strictly equal                        |                               |
|               | `a != b`                          | Loosely unequal                       |                               | 
|               | `a !== b`                         | Strictly unequal                      |                               |
|               | `a > b`                           | Greater than                          |                               |
|               | `a >= b`                          | Greater than, or, equal to            |                               |
|               | `a < b`                           | Smaller than                          |                               |
|               | `a <= b`                          | Smaller than, or, equal to            |                               |
| Logical       | `a && b`                          | AND                                   |                               |
|               | <code>a &#124;&#124; b</code>     | OR                                    |                               |
|               | `!b`                              | NOT                                   |                               |
| String        | `a + b`                           | Concatenate                           |                               |


#### Brackets

`(`, `)`                        Brackets - change the order of precendence.  


### Statements

Statements terminate with a newline character (i.e. we allow for one statement per line). 
We support statement blocks. They have to be enclosed in brackets.


### Control flow

Control flow expressions work as in Javascript. We support a subset of the Javascript control flow statements.

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
    
Sets the transparency of the Widget `id` to the given transparency level. Values for `alpha`:

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
