# Anim-lang


## Literals

    3                   number
    3.5                 number
    -8                  number
    0xa0                number (hexadecimal)
    0b0101              number (binary)
    "hello world"       string    
    

## Comments

    // Single line comment
    
    /*
       Multi line comment
    */


## Variables  

Variables must be declared before they can be used. This makes them known to the simulation environment. 

`declare name` Declare variable `name`.

Variables are weakly typed.


### Arrays

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


#### Functions for arrays

Returns the number of elements in `x`.

    n = GetSize (x)

Returns and deletes the first element in the array, shifting any other entries one position down. 

    v = Dequeue (x)
    
Adds value `v` at the beginning of `x`, shifting any other entries one position up.

    Enqueue (x, v)   

Returns and deletes the last element of `x`.
 
    v = Pop (x)

Add value `v` at the end of `x`.

    Push (x, v)


## Expressions (Assignments)

`var = term`. Sets content of variable `var ` to the result of term `term`.


### Operators

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


### Brackets

`(`, `)`                        Brackets - change the order of precendence.  


## Statements

Statements terminate with a newline character (i.e. we allow for one statement per line). 
We support statement blocks. They have to be enclosed in brackets.


## Control flow

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

`if`/`else if`/`else` 

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
    
`do...while`

    do
    {
        // do stuff
    }
    while (continue-condition)


## Functions

Work as in Javascript. Supports parameters and return values.

    function name (param, param, param, ...)
    {
        var x = 3;
        return x;
    }

Parameters and/or return values are optional.

    function name ()
    {
        do stuff
    }

## Simulation

Commands pertaining to running a simulation

	Reset ()
	StepBack ()
	StepForward ()
	GetStack ()
	GetScope ()


## Animation

We support a very basic set of animation commands.


### Resources  

    LoadImg (String id, String path, String layer)` 


### Transforms

    MoveTo (String id, int x, int y, int mSec)
    MoveBy (String id, double len, int mSec)
    RotateBy (String id, double alpha, int mSec)
    SetTransparency (String id, double alpha, int mSec)


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

