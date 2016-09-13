if (typeof window.MAL == "undefined")
{
    throw ("Missing include file: '/public/js/testing_defaultCorpus.js'. Please include this page before including this one.");
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
    var btnSaveTests                = document.getElementById ("btnSaveTests");
    var txtReport                   = document.getElementById ("txtReport");
    var txtCurrentTestCorpus                    = document.getElementById ("txtCurrentTestCorpus");
    var txtDefaultTestCorpus        = document.getElementById ("txtDefaultTestCorpus");
    
    var srcTests;       /* Current test corpus (Source)                     */
    var objParser;      /* Parser as created from the work bench            */
    var objTests;       /* Current test corpus (As JS objects)              */
    
    /**
     * Event handler: Upon changing content in the editing area.
     */
    var onChangeTestCases = function ()
    {
        /* Just enable Save button. */
        btnSaveTests.disabled = false;
    };

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
        
        /* Write default test corpus into resp. text box. */
        txtDefaultTestCorpus.value  = JSON.stringify (window.MAL.test.defaultCorpus, null, 4);
        
        /* Retrieve test case corpus from local storage. */
        srcTests = localStorage.getItem ("mal.testcases");
        if (srcTests != null)
        {
            try
            {
                objTests = JSON.parse (srcTests);
            }
            catch (e)
            {
                objTests = [];      /* [100] */
                srcTests = "";
                PrintReport 
                (
                    "Failed to load current test corpus from localStorage (corrupted?). " + 
                    "<a href='defTCase'>Default test corpus</a> is available",
                    true, 
                    0
                );
            }
            txtCurrentTestCorpus.value  = srcTests;
        }
        
        /* Event handlers for various GUI elements. */
        txtCurrentTestCorpus.onkeyup        = onChangeTestCases;
        txtCurrentTestCorpus.onkeydown      = function (e)
        {
            if (e.keyCode === 9)
            {
                /* Capture TAB key and make it insert 4 spaces at caret position    */
                /*     Courtesy: http://stackoverflow.com/a/6140696.                */
                var sEnd;
                var sStart;
                var value;
                
                /* Retrieve caret position and code in edit area. */
                sStart                      = txtCurrentTestCorpus.selectionStart;
                sEnd                        = txtCurrentTestCorpus.selectionEnd;
                value                       = txtCurrentTestCorpus.value;
                
                /* Insert four spaces at caret position. */
                value                       = value.substring (0, sStart) +
                                            "    " +
                                            value.substring (sEnd);
                txtCurrentTestCorpus.value  = value;
                
                /* Offset caret position by four characters. */
                txtCurrentTestCorpus.selectionEnd       = sStart + 4;
                txtCurrentTestCorpus.selectionStart     = txtCurrentTestCorpus.selectionEnd;
                
                /* Prevent focus blur. */
                e.preventDefault ();
            }
        }
        btnSaveTests.onclick    = SaveCorpus;
        btnRunAll.onclick       = RunTests;
        
        /* Report successfull loading. */
        PrintReport ("Page loaded", false, 1000);
        
        /* Run tests. */
        RunTests ();
        
        /* Start auto save loop. */
        onTimerTick ();
    };

    /**
     * Autosave loop.
     */
    var onTimerTick = function ()
    {
        SaveCorpus ();
        window.setTimeout (onTimerTick, 30000);
    }
    
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
        var p;
        var r;
        var t;
        var src;
                        
        nTests = objTests.length;
        if (nTests >= 1)
        {
            for (i = 0; i < nTests; i++)
            {
                /* Create result record of i-th test. */
                t = objTests[i];
                p = t.program;
                try
                {
                    r = objParser.parse (p);
                    window.MAL.test.run.results[i] =
                    {
                        title:          t.title,
                        prg:            p,
                        exp:            t.expectedResult,
                        expFail:        t.expectToFail,
                        result:         r,
                        hasFailed:      false
                    }
                }
                catch (e)
                {
                    window.MAL.test.run.results[i] =
                    {
                        title:          t.title,
                        prg:            p,
                        exp:            t.expectedResult,
                        expFail:        t.expectToFail,
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
                    "    assert.ok           (r.hasFailed, \"Did parsing FAIL as expected?\")"                              + "\n" +
                    "}"                                                                                                     + "\n" +
                    "else"                                                                                                  + "\n" +
                    "{"                                                                                                     + "\n" +
                    "    assert.notOk        (r.hasFailed, \"Did parsing SUCCEED as expected?\");"                          + "\n" +
                    "    assert.deepEqual    (r.result, r.exp, \"Did the parser return the expected value?\");"             + "\n" +
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
    };
    
    /**
     * Save current test corpus. This will save a verbatim copy of the content of 
     * the editing area in the browser's localStorage - provided that the content 
     * has changed since last save and that it is valid JSON data.
     */
    var SaveCorpus = function ()
    {
        var srcNew;
        var objRec;
        
        /* Retrieve source code from editing area. */
        srcNew  = txtCurrentTestCorpus.value;
        
        /* Save source code (We will save source code if it is different from current test corpus). */
        if (srcNew !== srcTests)
        {   
            /* We save source code if it is valid JSON data. */
            try
            {
                /* Create JS Object from source code. */
                objRec = JSON.parse (srcTests);
                
                /* We survived JSON parsing - i.e. test cases are valid JSON. 
                 * Now we can commit source code as new (current) test corpus.
                 */
                srcTests = srcNew;
                objTests = objRec;
                localStorage.setItem ("mal.testcases", srcTests);
                
                /* Report success in the report bar above the edit area - message will auto clear after 1s. */
                PrintReport ("Test cases saved", false, 1000);
            }
            catch (e)
            {
                /* JSON parsing failed, i.e. source code is not valid JSON data. 
                 * We report failure in the report bar - message will show persistently 
                 * until next save attempt.
                 */
                PrintReport ("Faulty JSON data. (Auto) save aborted. Details: " + e.message, true, 0);
            }
        }
        else
        {
            /* No changes in editing area detected. */
            PrintReport ("Nothing to save", false, 1000);
        }
        btnSaveTests.disabled = true;
    }
    
    onLoadPage ();
};

window.MAL.test.run.program ();

/*

    ----------------------------------------
    [100]:  We won't load the default corpus automatically, because we want the user to see the problem.
    
 */