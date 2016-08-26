/* 
 * Animation language grammar
 * ==========================
 *
 * A PEG to describe the animation language used in microanim.
 * Converted to a javascript component by the PEGjs parser generator [1].
 *
 * Developed with input from the Javascript expression grammar
 * example in the PEGjs project repository [2]. Many thanks to 
 * David Majda [3] without whom this parser would have been much 
 * more difficult to design. 
 *
 * --------
 *
 * [1] http://pegjs.org/
 * [2] https://github.com/pegjs/pegjs/blob/master/examples/javascript.pegjs
 * [3] http://majda.cz/
 *
 */

/* ----------------- A.1. Lexemes ----------------------  */


/* Generic */

SourceCharacter
    = .

WhiteSpace "whitespace"
    = "\t"
    / "\v"
    / "\f"
    / " "
    / "\u00A0"
    / "\uFEFF"
    / Zs

LineTerminator
  = [\n\r\u2028\u2029]

  
/* Operators */
  
Op_Add
    = $("+")
    
Op_Subtract
    = $("-")

Op_BitwiseAND
    = $("&")

Op_BitwiseOR
    = $("|")

Op_BitwiseShiftL
    = $("<<")

Op_BitwiseShiftR
    = $(">>")

Op_BitwiseShiftRFillZero
    = $(">>>")

Op_BitwiseXOR
    = $("^")

Op_Equal
    = "=="

Op_Divide
    = $("/")

Op_EqualStrict
    = "==="

Op_EqualNot
    = "!="

Op_EqualNotStrict
    = "!=="

Op_GreaterThan
    = $(">")
    
Op_GreaterThanOrEqualTo
    = ">="

Op_LogicalAND
    = "&&"

Op_LogicalOR
    = "||"

Op_Modulo
    = $("%")

Op_Multiply
    = $("*")

Op_SmallerThan
    = $("<")
    
Op_SmallerThanOrEqualTo
    = "<="
    
Op_UnaryPositive
    = $("+")

Op_UnaryNegative
    = $("-")

Op_UnaryBinaryNOT
    = "~"

Op_UnaryLogicalNOT
    = "!"

    
/* Keywords */

Keyword
  = Tok_Declare
  / Tok_Dequeue
  / Tok_Else
  / Tok_Enqueue
  / Tok_For
  / Tok_Function
  / Tok_GetScope
  / Tok_GetSize
  / Tok_GetStack
  / Tok_If
  / Tok_LoadImg
  / Tok_MoveBy
  / Tok_MoveTo
  / Tok_Pop
  / Tok_Push
  / Tok_Reset
  / Tok_RotateBy
  / Tok_RotateTo
  / Tok_SetTransparency
  / Tok_StepBack
  / Tok_StepForward
  / Tok_While


/* Tokens */

Tok_Declare         = "declare"
Tok_Dequeue         = "Dequeue"
Tok_Else            = "Else"
Tok_Enqueue         = "Enqueue"
Tok_For             = "For"
Tok_Function        = "Function"
Tok_GetScope        = "GetScope"
Tok_GetSize         = "GetSize"
Tok_GetStack        = "GetStack"
Tok_HideVar         = "HideVar"
Tok_If              = "If"
Tok_LoadImg         = "LoadImg"
Tok_MoveBy          = "MoveBy"
Tok_MoveTo          = "MoveTo"
Tok_Pop             = "Pop"
Tok_Push            = "Push"
Tok_Reset           = "Reset"
Tok_RotateBy        = "RotateBy"
Tok_RotateTo        = "RotateTo"
Tok_SetTransparency = "SetTransparency"
Tok_ShowVar         = "ShowVar"
Tok_StepBack        = "StepBack"
Tok_StepForward     = "StepForward"
Tok_While           = "While"


/* ----------------- A.2. Expressions ----------------------  */


/* ------------------- A.. Comments ------------------------  */

Comment "comment"
  = MultiLineComment
  / SingleLineComment

MultiLineComment
  = "/*" (!"*/" SourceCharacter)* "*/"

MultiLineCommentNoLineTerminator
  = "/*" (!("*/" / LineTerminator) SourceCharacter)* "*/"

SingleLineComment
  = "//" (!LineTerminator SourceCharacter)*



