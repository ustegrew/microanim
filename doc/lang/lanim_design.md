## Comments

Lines starting with `#` are comments.

## Commands

### Resources
`LoadImg (String id, String path, String layer)`

### Transforms
`MoveTo (String id, int x, int y, int mSec)`

`SetTransparency (String id, double alpha, int mSec)`

`MoveBy (String id, double len, int mSec)`

`RotateBy (String id, double alpha, int mSec)`

### Flow control

`Sleep (int mSec)`

## Animation blocks
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

    {
        [
            MoveTo          (hunx, 2, 100, 100)
            SetTransparency (hunx, 0.0, 1000)
        ]
        [
            MoveTo          (helo, 10, 80, 1000)
            SetTransparency (helo, 1.0,    1000)
        ]
    }

