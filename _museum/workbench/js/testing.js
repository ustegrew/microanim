if (typeof window.MAL == "undefined")
{
    throw ("Error: Missing object setup. Have you included '/js/testing/init.js'?");
}

window.MAL.test.run = 
{
    nTestsPerBatch:     500,
    iBatch:             0,
    i:                  0,
    results:            [],
    callbacks:          [],
    program:            null
}

window.MAL.test.run.program = function ()
{
    /* GUI elements */
    var btnRunAll                   = document.getElementById ("btnRunAll");
    var txtReport                   = document.getElementById ("txtReport");
    
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
        
        /* Event handlers for various GUI elements. */
        btnRunAll.onclick   = RunTests;
        btnRunAll.disabled  = true;
        
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

    var RunCreateTestObjects = function ()
    {
        var i;
        var nTests;
        var prg;
        var res0;
        var res1;
        var test;
        var src;

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
                        result:         e.message,
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
                    "var msg;"                                                                                              + "\n" +
                    "if (r.expFail)"                                                                                        + "\n" +
                    "{"                                                                                                     + "\n" +
                    "    msg = r.hasFailed  ?  'EXPECTED: Parsing FAILED.' : "                                              + "\n" +
                    "                          'UNEXPECTED: Parsing SUCCEEDED';"                                            + "\n" +
                    "    assert.ok (r.hasFailed, msg);"                                                                     + "\n" +
                    "}"                                                                                                     + "\n" +
                    "else"                                                                                                  + "\n" +
                    "{"                                                                                                     + "\n" +
                    "    msg = r.hasFailed  ?  'UNEXPECTED: Parsing FAILED. Details: ' + r.result :"                        + "\n" +
                    "                          'EXPECTED: Parsing SUCCEEDED';"                                              + "\n" +
                    "    assert.notOk (r.hasFailed, msg);"                                                                  + "\n" +
                    "    if (! r.hasFailed)"                                                                                + "\n" +
                    "    {"                                                                                                 + "\n" +
                    "        assert.deepEqual (r.result.state, r.exp, \"Parser returned expected state?\");"                + "\n" +
                    "    }"                                                                                                 + "\n" +
                    "}"
                window.MAL.test.run.callbacks[i] = new Function ("assert", src);
            }
            
            PrintReport ("Starting test run...", false, 0);
            window.setTimeout (RunBatch, 500);
        }
    };
    
    /**
     * Runs a batch of 500 test cases, then schedules the next batch 500 ms later. 
     * This gives the web browser time to update the UI, so we don't have a frozen web page. 
     * After the batch run we report eh progress on the UI.
     */
    var RunBatch = function ()
    {
        var r               = window.MAL.test.run;
        var nTestsBatch     = r.nTestsPerBatch
        var nTestsTot       = objTests.length;
        var t               = null;
        
        while 
        (
            (r.iBatch < nTestsBatch) &&
            (r.i      < nTestsTot)
        )
        {
            t   = objTests [r.i];
            if (typeof (t.module) != "undefined")
            {
                QUnit.module (t.module);
            }
            QUnit.test (t.title, window.MAL.test.run.callbacks[r.i]);
            r.iBatch++;
            r.i++;
        }

        if (r.i < nTestsTot)
        {
            r.iBatch = 0;
            window.setTimeout (RunBatch, 500);
            PrintReport ("Done test case #" + (r.i) + " (" + nTestsTot + ").", false, 0);
        }
        else
        {
            PrintReport ("All tests finished. Results <a href='#tResult'>below</a>", false, 0);
            btnRunAll.disabled = false;
        }
    };
    
    /**
     * Run the current test corpus.
     */
    var RunTests = function ()
    {
        /* Create test objects. */
        PrintReport ("One moment please... Creating test objects...", false, 0);
        window.setTimeout (RunCreateTestObjects, 500);
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