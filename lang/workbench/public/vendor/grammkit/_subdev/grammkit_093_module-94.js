/* module id:  94 */
function (module,exports,__webpack_require__){eval(`
var React           = __webpack_require__(104);
var cx              = __webpack_require__(90);
var parse           = __webpack_require__(103).parse;
var diagram         = __webpack_require__(96);
var getReferences   = __webpack_require__(98);

var App = React.createClass
(
    /**
     * Class: App
     * 
     * Creates a railroad diagram collection for the current MAL grammar
     * and renders diagrams plus additional information on the hosting web 
     * page.
     */
    {
        displayName: "App",
        mixins:
        [
            React.addons.LinkedStateMixin
        ],

        /**
         * Called by ReactJS just before rendering the component.
         */
        componentWillMount: function ()
        {
            /* [100] */
            this.grammar =
            {
                ast:            null,
                src:            "",
                rules:          [],
                error:          null
            };
            
            this._UpdateGrammar ();
        },

        /**
         * Called by ReactJS upon initialization of this component.
         * [100]
         */
        getInitialState: function ()
        {
            var ret;
            
            ret = {};
            
            return ret;
        },

        /**
         * Called by ReactJS to render this component on the web browser.
         */
        render: function ()
        {
            /* Various styles; will be hard coded into the generated HTML code [110]  */
            var kStyleMain =
            {   /* Main panel containing all the diagram tiles */
                backgroundColor:    "#F5F3F0",              /* [120] */
                border:             "2px solid silver",
                borderRadius:       "8px",
                padding:            "8px"
            };
            var kStyleTOC =
            {   /* LH Table of contents */
                backgroundColor:    "#F5F3F0",              /* [120] */
                border:             "2px solid silver",
                borderRadius:       "8px",
                color:              "gray",
                display:            "inline-block",
                fontSize:           "small",
                height:             "450px",
                left:               "10px",
                marginLeft:         "1em",
                overflow:           "scroll",
                padding:            "8px",
                position:           "fixed",
                top:                "32px",
                width:              "200px"
            };
            var kStyleTile =
            {   /* Tile for each rule diagram  */
                border:             "2px silver solid",
                borderRadius:       "8px",
                boxSizing:          "border-box",
                marginBottom:       "0.8em",
                marginRight:        "12px",
                paddingLeft:        "0.8em",
                width:              "100%"
            };
            var kStyleSpacer =
            {   /* List title for "Referring" and "UsedBy" link lists */
                verticalAlign:      "middle",
                width:              "70px"
            };
            var kStyleLink =
            {   /* Links in "TOC", "Referring" lists and "UsedBy" lists */
                color:              "gray",
                marginRight:        "1em"
            };
            var kStyleLinkList =
            {   /* Container for "Referring" lists and "UsedBy" lists */
                marginBottom:       "0.5em",
                wordBreak:          "normal",
                wordWrap:           "break-word",
                width:              "640px"
            };
            var kStyleListCellL =
            {   /* Table cell containing "Referring"/"UsedBy" lists and headers */
                align:              "left",
                verticalAlign:      "top"
            };
            var kStyleListCellR =
            {   /* Table cell containing "Referring"/"UsedBy" lists and headers */
                align:              "left",
                verticalAlign:      "top"
            };
            var kStyleListTable =
            {   /* Table containing "Referring"/"UsedBy" lists and headers */
                fontSize:           "small",
                width:              "100%"
            };

            var anchorTile;
            var anchors;
            var diagram;
            var err;
            var hasError;
            var hasRules;
            var iRule;
            var iX;
            var link;
            var nRules;
            var nX;
            var name;
            var pnlDiagram;
            var pnlMain;
            var pnlName;
            var pnlRefs;
            var pnlSpacer;
            var pnlTOC;
            var pnlTiles;
            var pnlUsedBys;
            var refs;
            var ret;
            var rule;
            var rules;
            var tocLinks;
            var usedBys;
            var x;
            
            hasError = (this.grammar.error          !==     null    )
            hasRules = (this.grammar.rules.length   >=      1       )
            if (hasError)
            {
                // TODO finalize design
                pnlMain = React.createElement ("div", {class: "box0_fatal"}, "Error!");
            }
            else if (! hasRules)
            {
                // TODO finalize design
                pnlMain = React.createElement ("div",{class: "box0_warn"}, "No rules found!");
            }
            else
            {
                // TODO repetetive code -> export to private method.
                
                /* Create tiles containing rule name, diagram, Referring list and UsedBy list */
                pnlTiles    = [];
                rules       = this.grammar.rules;
                nRules      = rules.length;
                for (iRule = 0; iRule < nRules; iRule++)
                {
                    /* Retrieve next analyzed rule */
                    rule        = rules[iRule];
                    name        = rule.name;
                    diagram     = rule.diagram;
                    refs        = rule.references;
                    usedBys     = rule.usedBys;
                    
                    /* Named anchor for # link */
                    anchorTile  = React.createElement           ("a",   {name: name});
                    
                    /* Title showing rule name */
                    pnlName     = React.createElement           ("h3",  null, name);
                    
                    /* Railroad diagram (SVG element). Provides onclick handler which 
                     * scrolls to cross referenced rules used in this diagram.        */
                    pnlDiagram  = React.createElement
                    ("div",
                        {
                            dangerouslySetInnerHTML:
                            {
                                __html: diagram
                            },
                            onClick: this.onClickDiagram
                        }
                    );

                    /* Create list of Referring links. */
                    /* List title */
                    pnlSpacer   = React.createElement           ("div", {style: kStyleSpacer},   "Referring: ");
                    /* List items */
                    nX          = refs.length;
                    if (nX >= 1)
                    {
                        tocLinks = [];
                        for (iX = 0; iX < nX; iX++)
                        {
                            tocLinks [iX] = refs [iX];
                        }
                        tocLinks.sort ();
                        
                        anchors = [];
                        for (iX = 0; iX < nX; iX++)
                        {
                            x       = tocLinks [iX];
                            link    = "#" + x;
                            anchors[iX] = React.createElement   ("a", {href: link, style:kStyleLink}, x);
                        }
                        pnlRefs = React.createElement           ("div", {style: kStyleLinkList}, anchors);
                    }
                    else
                    {
                        pnlRefs = React.createElement           ("div", {style: kStyleLinkList}, "No reference to other rules");
                    }
                    /* Put list and heading into table row. */
                    tblCell_0        = React.createElement      ("td", {style: kStyleListCellL}, pnlSpacer);
                    tblCell_1        = React.createElement      ("td", {style: kStyleListCellR}, pnlRefs);
                    tblRow_0         = React.createElement      ("tr", null, tblCell_0, tblCell_1);
                    
                    /* Create list of UsedBy links (reverse referring). */
                    /* List title */
                    pnlSpacer   = React.createElement           ("div", {style: kStyleSpacer},  "Used by: ");
                    /* List items */
                    nX          = usedBys.length;
                    if (nX >= 1)
                    {
                        tocLinks = [];
                        for (iX = 0; iX < nX; iX++)
                        {
                            tocLinks [iX] = usedBys [iX];
                        }
                        tocLinks.sort ();
                        
                        anchors = [];
                        for (iX = 0; iX < nX; iX++)
                        {
                            x       = tocLinks [iX];
                            link    = "#" + x;
                            anchors[iX] = React.createElement   ("a", {href: link, style: kStyleLink}, x);
                        }
                        pnlUsedBys = React.createElement        ("div", {style: kStyleLinkList}, anchors);
                    }
                    else
                    {
                        pnlUsedBys = React.createElement        ("div", {style: kStyleLinkList},"Not used by other rules")
                    }
                    /* Put list and heading into table row. */
                    tblCell_0        = React.createElement      ("td", {style: kStyleListCellL}, pnlSpacer);
                    tblCell_1        = React.createElement      ("td", {style: kStyleListCellR}, pnlUsedBys);
                    tblRow_1         = React.createElement      ("tr", null, tblCell_0, tblCell_1);
                    
                    /* Assemble refs link table */
                    tblLists         = React.createElement      ("table", {style: kStyleListTable}, tblRow_0, tblRow_1);
                    
                    /* Assemble diagram tile. */
                    pnlTiles [iRule] = React.createElement      ("div", {style: kStyleTile}, anchorTile, pnlName, pnlDiagram, tblLists);
                }
                
                /* Create table of contents. This will appear in a fixed position on the LH side of the viewport. */
                /* Links will be in alphabetical order. */
                tocLinks = [];
                for (iRule = 0; iRule < nRules; iRule++)
                {
                    rule            = rules [iRule];
                    tocLinks [iRule] = rule.name;
                }
                tocLinks.sort ();
                
                anchors = [];
                iX      = -1;
                for (iRule = 0; iRule < nRules; iRule++)
                {
                    link    = "#" + tocLinks [iRule];
                    
                    /* Rule link */
                    iX++;
                    anchors[iX] = React.createElement           ("a", {href: link, style: kStyleLink}, tocLinks[iRule]);
                    
                    /* <br/> tag, so the next rule starts on a new line. */
                    iX++;
                    anchors[iX] = React.createElement           ("br");
                }
                /* Container for TOC */
                pnlTOC          = React.createElement           ("div", {style: kStyleTOC}, anchors);
                
                /* Assemble TOC and tiles in main panel object. Note - visually, the TOC panel will be outside the main panel. */
                pnlMain = React.createElement                   ("div", {style: kStyleMain}, pnlTOC, pnlTiles);
            }

            ret = pnlMain;
            return ret;
        },

        /**
         * Event handler: User clicked a rail diagram.
         */
        onClickDiagram: function (ev)
        {
            /* If the clicked node is a text node then it's likely being a cross 
             * referenceable rule -> Try to navigate to it.*/
            if (ev.target.tagName === "text")
            {
                var link;
                
                link          = ev.target.textContent.trim ();
                location.hash = link;
            }
        },

        /**
         * Reads the grammar from the local storage into memory. To avoid a monster method 
         * we split this into three steps, each handled by a separate method. 
         * 
         * At the end of a successfull update we have the analyzed grammar represented in 
         * the property (<code>this.grammar</code>).
         * 
         * Layout after update: <code>this.grammar</code>:
         * <pre>
         * {
         *     ast:                 (Object)            The Abstract Syntax Tree of the parsed grammar.
         *                                              Contains all the rules found. Will be null if parsing failed.
         *                      
         *     src:                 (String)            The grammar's underlying source code.
         *                      
         *     rules:               (Array<Object>)     The rules after analysis. To be used by the render method.
         *                      
         *     error:               (Error)             If parsing fails, will contain details of any error.
         *                                              Will be null if parsing succeeded.
         * }
         * </pre>
         * 
         * 
         * Layout after update: <code>this.grammar.rules</code>:
         * <pre>
         * [
         *     {
         *         name:            (String)            The name of the rule, as written in the grammar.
         *                              
         *         diagram:         (String)            The SVG code of the corresponding diagram
         *                              
         *         references:      (Array<String>)     The names of the rules referenced by this rule
         *                              
         *         usedBys:         (Array<String>)     The names of the rules that use this rule.
         *     },
         *
         *     {
         *         name:            ...
         *         diagram:         ...
         *         references:      ...
         *         usedBys:         ...
         *     },
         *
         *     ...
         * ]
         * </pre>
         */
        _UpdateGrammar: function (grammar)
        {
            this._UpdateGrammar_01_Read      ();
            this._UpdateGrammar_02_Parse     ();
            this._UpdateGrammar_03_Analyze   ();
        },

        /**
         * Grammar: Update: Step 1
         * 
         * Read grammar from local storage. Null readout will be normalized to an empty string.
         */
        _UpdateGrammar_01_Read: function ()
        {
            var grSrc;
            var err;
            
            err   = null;
            grSrc = localStorage.getItem ("mal.grammar");
            if (grSrc === null)
            {
                grSrc = "";
                err   = new ReferenceError ("Found no grammar in localStore.");
            }
            
            this.grammar.src    = grSrc;
            this.grammar.error  = err;
        },
 
        /**
         * Grammar: Update: Step 2
         * 
         * Parses the grammar read in step 1. Parsing skips if no grammar has been found.
         */
        _UpdateGrammar_02_Parse: function ()
        {
            var grammarAst;
            var synErr;
            
            if (this.grammar.error === null)
            {
                grammarAst  = null;
                synErr      = null;
                if (this.grammar.src !== "")
                {
                    try
                    {
                        grammarAst = parse (this.grammar.src);
                    }
                    catch (e)
                    {
                        synErr              = e;
                        synErr.grammarSrc   = this.grammar.src.split ("\\n")[e.line-1];
                    }
                }
                
                this.grammar.ast    = grammarAst;
                this.grammar.error  = synErr;
            }
        },
        
        /**
         * Grammar: Update: Step 3
         * 
         * Analyzes what the parser produced. Analysis skips if parsing failed.
         */ 
        _UpdateGrammar_03_Analyze: function ()
        {
            var references;
            var rules;
            var iRule;
            var nRules;
            var rule;
            var refs0;
            var usedBys0;
            var refs;
            var usedBys;
            var iRef;
            var svg;

            if (this.grammar.ast !== null)
            {
                rules  = [];
                nRules = this.grammar.ast.rules.length;
                if (nRules >= 1)
                {
                    references = getReferences (this.grammar.ast);
                    for (iRule = 0; iRule < nRules; iRule++)
                    {
                        rule    = this.grammar.ast.rules [iRule];
                        refs    = [];
                        usedBys = [];
                        svg     = diagram (rule);
                        if (typeof references[rule.name] != 'undefined')
                        {
                            refs0       = references[rule.name].references;
                            usedBys0    = references[rule.name].usedBy;
                            
                            if (refs0.length >= 1)
                            {
                                for (iRef = 0; iRef < refs0.length; iRef++)
                                {
                                    refs[iRef] = refs0[iRef];
                                }
                            }
                            if (usedBys0.length >= 1)
                            {
                                for (iRef = 0; iRef < usedBys0.length; iRef++)
                                {
                                    usedBys[iRef] = usedBys0[iRef];
                                }
                            }
                                
                        }
                        
                        rules[iRule] =
                        {
                            name:           rule.name,
                            diagram:        svg,
                            references:     refs,
                            usedBys:        usedBys
                        };
                    }
                }
                
                this.grammar.rules = rules;
            }
        }
    }
);

/*
 
 [100]: I found that the ReactJS provided .setState method didn't actually work 
        during the _UpdateGrammar run. When one of the _Update... steps called 
        .setState to set some of the .state properties, the next step would find 
        that those property changes were not there. I suspect, the .state/.setState 
        mechanism is for internal state tracking of the ReactJS engine and 
        shouldn't be used for keeping internal data. Before I embark on some epic
        journey to find out how to use .state I just assume it's not for me to use 
        it and resort to a custom property for my object data (.grammar).

 [110]: For some reason, the .class attribute won't carry over into the generated HTML 
        code. I'll try hard coding the stylesheet attributes. No time to deep learn ReactJS.
        
 [120]: Background color of each railroad diagram, as delivered by generator library.
 
*/

module.exports = App;

/*****************
 ** WEBPACK FOOTER
 ** ./app/app.js
 ** module id = 94
 ** module chunks = 0
 **/
//# sourceURL=webpack:///./app/app.js?
`
)},
