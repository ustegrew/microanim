/* module id:  97 */
function(module,exports,__webpack_require__){eval(`
var rd              = __webpack_require__(54);
var whitescape      = __webpack_require__(182);

var rdAst           = {};
var methods         = Object.keys(rd).concat(["Start", "End"]);
methods.forEach(function(type) {
  rdAst[type] = function() {
    return {
      type: type,
      arguments: [].slice.call(arguments)
    };
  }
});
rd = rdAst;

module.exports = function diagram(expr) 
{
    /**
     * If the given string is longer than a certain amount of characters, shorten it
     */
    var UnLengthen = function (str)
    {
        var kNCharsMax  = 60;
        
        var nChars;
        var nCharsNew;
        var ret;
        
        nChars = str.length;
        if (nChars > kNCharsMax)
        {
            nCharsNew = kNCharsMax - 1;
            ret  = "   ";
            ret += str.slice (0, nCharsNew);
            ret += " ...   ";
        }
        else
        {
            ret = "   " + str + "   ";
        }
        
        return ret;
    };
    
    var subDiagr;
    var sequence;
    var text;
    var whtScape;
    var endMark;
    var msg;
    var ret;
    
    switch (expr.type) 
    {
        case "rule":
            // rules = expression
            subDiagr  = diagram (expr.expression);
            ret       = rd.Diagram (subDiagr);
            break;
        case "text":
            // $expression
            ret = diagram (expr.expression);
            break;
        case "labeled":
            // label : expression
            ret = diagram (expr.expression);
            break;
        case "named":
            // rule \"name\" = expression
            ret = diagram (expr.expression);
            break;
        case "action":
            // expression {action}
            ret = diagram (expr.expression);
            break;
        case "sequence":
            // expression1 expression2 ...
            sequence = expr.elements.map (diagram);
            ret      = rd.Sequence.apply (null, sequence);
            break;
        case "choice":
            // expression1 / expression2 / ...
            sequence = expr.alternatives.map (diagram);
            sequence.unshift (0);
            ret     = rd.Choice.apply (null, sequence);
            break;
        case "optional":
            // expression ?
            subDiagr = diagram (expr.expression);
            ret      = rd.Optional (subDiagr);
            break;
        case "zero_or_more":
            // expression *
            subDiagr = diagram (expr.expression);
            ret      = rd.ZeroOrMore (subDiagr);
            break; 
        case "one_or_more":
            // expression +
            subDiagr = diagram (expr.expression);
            ret      = rd.OneOrMore (subDiagr);
            break; 
        case "rule_ref":
            // rule
            ret = rd.NonTerminal (expr.name);
            break;
        case "literal":
            // "literal"
            whtScape = whitescape (expr.value);
            text     = UnLengthen (whtScape);
            ret      = rd.Terminal (text);
            break;
        case "class":
            // [characters]
            text = UnLengthen (expr.rawText);
            ret  = rd.Terminal (text);
            break;
        case "any":
            // wildcard
            // .
            ret = rd.Terminal("[any character]");
            break;
        case "simple_and":
            // lookahead
            // & expression
            ret = diagram (expr.expression);
            break;
        case "simple_not":
            // negative lookahead
            // ! expression
            endMark  = rd.End ();
            subDiagr = diagram (expr.expression);
            sequence = rd.Sequence (endMark, subDiagr);
            ret      = rd.Optional (sequence, "skip");
            break;
        case "semantic_and":
            // predicate lookahead
            // & { predicate }
            text = 
            ret  = rd.Terminal ("[match:" + expr.code + "]");
            break;
        case "semantic_not":
            // negative predicate lookahead
            // ! { predicate }
            text = UnLengthen (expr.code);
            ret  = diagram
            (
                {
                    type:           "simple_not",
                    expression: 
                    {
                        type:       "class", 
                        rawText:    "[match:" + text + "]"
                    }
                }
            );
            break;
        default:
            msg = "Unknown expression:" + expr.type;            
            ret = rd.Terminal (msg);
            console.log (msg);
            console.log (expr);
    }
    
    return ret;
};


/*****************
 ** WEBPACK FOOTER
 ** ./lib/peg-rd.js
 ** module id = 97
 ** module chunks = 0
 **/
//# sourceURL=webpack:///./lib/peg-rd.js?
`
)},
