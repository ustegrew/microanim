/*
    Animation sequence language
*/

program
 = list:srcline+
 {
    var i;
    var iptr;
    var cmd;
    var section;
    var content;
    var ret;

    iptr =
    {
        "resources":
        {
            "images":           -1
        },
        "program":              -1
    }
    ret = 
    {
        "resources":
        {
            "images": []
        },
        "program":    []
    }
    
    if (list.length >= 1)
    {
        for (i = 0; i < list.length; i++)
        {
            cmd = list [i];
            if (cmd != null)
            {
                section = cmd.section;
                content = cmd.content;
                if (section == "resources.images")
                {
                    iptr.resources.images++;
                    ret.resources.images[iptr.resources.images] = content;
                }
                else if (section == "program")
                {
                    iptr.program++;
                    ret.program [iptr.program] = content;
                }
            }
        }
    }
    
    return ret;
 }

srcline
    = (
        comment                     /
        C_LoadImg                   /
        C_MoveTo                    / 
        C_SetTransparency
      )

/* ---------------- A.1. Lexical Grammar -------------------- */

comment "comment"
    = '#' any* eol
    {
        return null;
    }

any "any char"
    = ([a-zA-Z0-9@#~{}()<>+=_!'"$%^&*,;.:/?] / ws / '-' / '[' / ']')
    
path "path"
    = x0:[.a-zA-Z0-9]+ x1:(('/' [.a-zA-Z0-9]+)*)
    {
        var i;
        var nde;
        var ret;
        
        ret = x0.join ("");
        if (x1.length >= 1)
        {
            for (i = 0; i < x1.length; i++)
            {
                nde  = x1[i][1];
                ret += x1[i][0];
                ret += nde.join ("");
            }
        }
        
        return ret;
    }

ident "identifier"
    = x:[a-zA-Z0-9_]*
    {
        var ret;
        
        ret = x.join("");
        
        return ret;
    }

float "float"
    = x0:'-'?   x1:[0-9]*   x2:'.'  x3:[0-9]+
    {
        var ret;
        
        ret = "";
        if (x0 != null)
            ret += x0;
        
        if (x1 != null)
            ret += x1;
        
        ret += x2;
        
        ret += x3;
        
        return ret;
    }
    
int "int"
    = x0:'-'?   x1:[0-9]+
    {
        var ret;
        
        ret = x0 + x1.join("");
        
        return ret;
    }
    
uint "uint"
    = x0:[0-9]+
    {
        var ret;
        
        ret = x0.join("");
        
        return ret;
    }

ws "whitespace"
    = [ \t]+
    
wsopt "optional whitespace"
    = [ \t]*
    
eol "eol"
    = [\n]+

/* -------------------- A.2. Tokens ------------------------- */
T_LoadImg           "LoadImg"           = "LoadImg"
T_MoveTo            "MoveTo"            = "MoveTo"
T_SetTransparency   "SetTransparency"   = "SetTransparency"
//T_ "" = ""
//T_ "" = ""
//T_ "" = ""
//T_ "" = ""
//T_ "" = ""
//T_ "" = ""
//T_ "" = ""
//T_ "" = ""
//T_ "" = ""

/* ------------------- A.3. Commands ------------------------ */

/* LoadImg (ident id, path p, ident l) */
C_LoadImg
    = t:T_LoadImg                       wsopt
      "("
            a0:ident                    wsopt
            ","                         wsopt
            a1:path                     wsopt
            ","                         wsopt
            a2:ident                    wsopt
      ")"                               wsopt eol
    {
        var ret;
        
        ret = 
        {
            "section":                  "resources.images",
            "content":
            {
                "key":                  a0,
                "uri":                  a1,
                "targetLayer" :         a2
            }
        }
        
        return ret;
    }

/* MoveTo (ident id, uint x, uint y, uint mSec) */ 
C_MoveTo
    = t:T_MoveTo                        wsopt
      "("                               wsopt
            a0:ident                    wsopt
            ","                         wsopt
            a1:uint                     wsopt
            ","                         wsopt
            a2:uint                     wsopt
            ","                         wsopt
            a3:uint                     wsopt
      ")"                               wsopt eol
    {
        var ret;
        
        ret = 
        {   
            "section":                  "program",
            "content":
            {
                "cmd":                  "moveTo",
                "args":
                {
                    "subject":          a0,
                    "x" :               parseInt (a1),
                    "y" :               parseInt (a2),
                    "t" :               parseInt (a3)
                }
            }
        }
        
        return ret;
    }
      
/* SetTransparency (Identifier id, float alpha, uint mSec) */ 
C_SetTransparency
    = t:T_SetTransparency               wsopt
      "("                               wsopt
            a0:ident                    wsopt
            ","                         wsopt
            a1:float                    wsopt
            ","                         wsopt
            a2:uint                     wsopt
      ")"                               wsopt eol
    {
        var ret;
        
        ret = 
        {   
            "section":                  "program",
            "content":
            {
                "cmd":                  "setTransparency",
                "args":
                {
                    "subject":          a0,
                    "alpha":            parseFloat (a1),
                    "t":                parseInt   (a2)
                }
            }
        }
                    
        return ret;
    }
      
