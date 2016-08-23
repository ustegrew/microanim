# Anim-lang

## Comments
Lines starting with `#` are comments.

## Widgets

### GUI

    TViewport
    TWidget
        TButton
        TDisplay
            TDPrimitive
                TDGraphic
                TDNumber
                TDText
                TDTextArea
            TDCompound
                TDVarView

## Language constructs

### Literals

    3                   number
    3.5                 number
    -8                  number
    0xa0                number (hexadecimal)
    0b0101              number (binary)
    "hello world"       string    
    
### Comments

    // Single line comment
    
    /*
       Multi line comment
    */

### Variables  

Variables must be declared before they can be used. This makes them known to the simulation environment. 

`declare name` Declare variable `name`.

#### Arrays

We support arrays. They must be declared with dimensionless square bracket notation. 
Arrays are dynamic, indices are zero based.

    declare x[]

Access to array elements via index

    x[10]           // 11th element in x
    
We don't support sparse arrays.

#### Functions for arrays

    GetSize (x)     // Return number of elements in x
    
    Add (x, v)      // Append value at the end of x
    
    Delete (x, i)   // Delete element #i from x 

### Expressions (Assignments)

`var = term`. Sets content of variable `var ` to the result of term `term`.

Example:

    a = 25
    b = a + 5

Terms perform various computations using operators and operands. 

### Operators

It's not the place to explain all operators. Operators work the same as in Javascript - incl. precedence.
We support these:

#### Arithmetic

`a + b`                 addition  
`a - b`                 subtraction  
`a * b`                 multiplication  
`a / b`                 division  
`-a`                    unary negation  
`a++`, `++a`            Increment (post/prefix)  
`a--`, `--a`            Decrement (post/prefix)  
`a % b`                 Remainder (modulo)  

#### Bitwise

`a & b`                 AND  
`a | b`                 OR  
`a ^ b`                 XOR  
`~a`                    NOT  
`a << b`                LShift  
`a >> b`                RShift  
`a >>> b`               RShift + insert zeros  

#### Compound

`a += b`                        Addition  
`a -= b`                        Subtraction  
`a *= b`                        Multiplication  
`a /= b`                        Division  
`a %= b`                        Modulo  
`a <<= b`                       LShift  
`a >>= b`                       RShift  
`a >>>= b`                      RShift + zerofill  
`a &= b`                        Bitwise AND  
`a ^= b`                        Bitwise XOR  
`a |= b`                        Bitwise OR  

#### Comparison

`a == b`                        Loosely Equal  
`a === b`                       Strictly equal  
`a != b`                        Loosely unequal  
`a !== b`                       Strictly unequal  
`a > b`                         Greater than  
`a >= b`                        Greater than, or, equal to  
`a < b`                         Smaller than  
`a <= b`                        Smaller than, or, equal to  

#### Logical

`a && b`                        AND  
`a || b`                        OR  
`!b`                            NOT  

#### String operators

`a + b`                         Concatenate  
`a += b`                        Concatenate (compound)  

#### Conditional (Ternary) operator

`a ? b : c`                     Conditional operator  

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

### Functions

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

## Animation

We support a very basic set of animation commands. These commands are global to any microanim program. 

### Resources  

    `LoadImg (String id, String path, String layer)`  

### Transforms

    `MoveTo (String id, int x, int y, int mSec)`
    `MoveBy (String id, double len, int mSec)`
    `RotateBy (String id, double alpha, int mSec)`
    `SetTransparency (String id, double alpha, int mSec)`


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
