if (typeof window.MAL == "undefined")
{
    throw ("Missing test corpus. Has file '/js/testing_corpus.js' been included before this file ('/js/testing.js')?");
}

window.MAL.test.currentCorpus = [];
window.MAL.test.run = 
{
    results:    [],
    callbacks:  [],
    program:    null
}
window.MAL.test.run.program = function ()
{
    /* GUI elements */
    var btnRunAll                   = document.getElementById ("btnRunAll");
    var txtReport                   = document.getElementById ("txtReport");
    var txtTestCorpus               = document.getElementById ("txtTestCorpus");
    
    var objParser;      /* Parser as created from the work bench            */
    var objTests;       /* Current test corpus (As JS objects)              */
    
    /**
     * Event handler: Upon loading this page.
     */
    var onLoadPage = function ()
    {
        var records;
        var head;
        var styleElement;
        var parserSource;
        
        /* Load QUnit style sheet. */
        styleElement                = window.document.createElement ("link");
        styleElement.rel            = "stylesheet";
        styleElement.type           = "text/css";
        styleElement.href           = "/vendor/qunit/qunit-2.0.1.css"
        head                        = document.getElementsByTagName('head')[0];
        head.appendChild (styleElement);
        
        /* Create parser object from local storage. */
        parserSource = localStorage.getItem ("mal.parserSource");
        objParser    = eval (parserSource);
        objTests     = window.MAL.test.corpus;
        
        /* Write default test corpus into resp. text box. [110] */
        txtTestCorpus.value  = JSON.stringify (window.MAL.test.corpus, null, 4);
        
        /* Event handlers for various GUI elements. */
        btnRunAll.onclick = RunTests;
        
        /* Run tests. */
        RunTests ();
    };
    
    /**
     * Print message in the report bar above the test case editing area.
     *
     * @param string    msg         The message to print.
     * @param boolean   isError     If true, treat this message as an error message. If false, treat it as a normal message.
     * @param number    delay       Time (in ms) until report bar will clear. Values below 500 (0.5 s): Never clear area 
     *                              (message is persistent until next time this function is called).
     */
    var PrintReport = function (msg, isError, delay)
    {
        var bkgCol;
        
        bkgCol = isError  ?  "#ffeeee" : "#eeffee";
        txtReport.style.backgroundColor = bkgCol;
        txtReport.innerHTML = "<span>" + msg + "</span>";
        if (delay >= 500)
        {
            window.setTimeout 
            (
                function ()
                {
                    txtReport.style.backgroundColor = "#eeeeee";
                    txtReport.innerHTML = "";
                },
                delay
            );
        }
    }

    /**
     * Run the current test corpus.
     */
    var RunTests = function ()
    {
        var i;
        var nTests;
        var prg;
        var res0;
        var res1;
        var test;
        var src;

        /* Report successfull loading. */
        PrintReport ("Running tests...", false, 0);
        
        nTests = objTests.length;
        if (nTests >= 1)
        {
            for (i = 0; i < nTests; i++)
            {
                /* Create result record of i-th test. */
                test = objTests[i];
                prg = test.program;
                try
                {
                    /* [100] */
                    if (typeof test.expectedResult === "function")
                    {
                        res0 = test.expectedResult ();
                    }
                    else
                    {
                        res0 = test.expectedResult;
                    }
                    
                    res1 = objParser.parse (prg);
                    window.MAL.test.run.results[i] =
                    {
                        title:          test.title,
                        prg:            prg,
                        exp:            res0,
                        expFail:        test.expectToFail,
                        result:         res1,
                        hasFailed:      false
                    }
                }
                catch (e)
                {
                    window.MAL.test.run.results[i] =
                    {
                        title:          test.title,
                        prg:            prg,
                        exp:            res0,
                        expFail:        test.expectToFail,
                        result:         null,
                        hasFailed:      true
                    }
                }
                
                /* Create test callback. 
                 * Note: JS scopes are function-level, not block-level - i.e. we can't simply use 
                 *       the for loop counter inside a function closure. We create a function with 
                 *       index i hardcoded into it. Otherwise, all tests will run with the last test case 
                 *       as that one is within the function's lexical scope when the tests are performed.
                 *       With the result that all but the last test result will be wrong.
                 */
                 src =
                    "var r = window.MAL.test.run.results [" + i + "];"                                                      + "\n" +
                    "if (r.expFail)"                                                                                        + "\n" +
                    "{"                                                                                                     + "\n" +
                    "    assert.ok           (r.hasFailed, \"Did parsing FAIL as expected [flag must be TRUE]?\")"          + "\n" +
                    "}"                                                                                                     + "\n" +
                    "else"                                                                                                  + "\n" +
                    "{"                                                                                                     + "\n" +
                    "    assert.notOk        (r.hasFailed, \"Did parsing SUCCEED as expected [flag must be FALSE]?\");"     + "\n" +
                    "    if (! r.hasFailed)"                                                                                + "\n" +
                    "    {"                                                                                                 + "\n" +
                    "        assert.deepEqual    (r.result, r.exp, \"Did the parser return the expected value?\");"         + "\n" +
                    "    }"                                                                                                 + "\n" +
                    "}"
                window.MAL.test.run.callbacks[i] = new Function ("assert", src);
            }
            
            /* Run tests */
            for (i = 0; i < nTests; i++)
            {
                t = objTests [i];
                QUnit.test (t.title, window.MAL.test.run.callbacks[i]);
            }
        }
        
        PrintReport ("Tests finished", false, 0);
    };
    
    onLoadPage ();
};

window.MAL.test.run.program ();

/*

    ----------------------------------------
    [100]:  Assumption: If test.expectedResult is a function we trust the hosting Javascript engine
            to compute the result correctly. In effect, the MAL parser test will follow the quality 
            of the hosting Javascript engine.
    
 */