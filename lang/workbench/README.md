# MAL Workbench

This is a development and test environment for the MAL language. Most notably, includes 
a grammar editor for development and a test bench to perform automated testing. There's 
also a documentation section where you can look up information on the PEG used by PEGjs. 

This application requires [Nodejs](https://nodejs.org/en/) and a web browser to run. 


## Development

To edit the MAL grammar use the **Workbench**. This is a simple editor where you can change the 
grammar and do small scale testing of the corresponding parser.

Do your grammar changes in the editor (left hand side). Any changes to the MAL grammar 
will generate a new parser corresponding to the current grammar. At any time you can 
download the parser from the workbench. 

The grammar's source code will be automatically saved to your web browser's localStorage.
This happens automatically whenever you type into the editor. Advantage, obviously you 
don't loose the changes and don't need to worry about File|Save. Disadvantage is 
that you can mess up the grammar with nothing to go back to. Therefore it's recommended 
you copy and paste the source code from the editor into a text file to keep the grammar 
backed up.

The Workbench provides a test area where you can do some small scale testing of your 
current parser.


## Testing

The environment provides a **Testbench** where you run an automated test suite on the current 
version of the parser. Just switching to the Testbench tab will perform a number of predefined 
tests on the parser. The tests can take a few minutes, and at the end there's a report 
with the test results. It's recommended to run the tests after any change to the grammar.

Whilst no amount of testing can make 100% sure that the parser is correct the test suite 
*does* catch a lot of problems so that you can have resonable confidence in the generated parser.

For your info, internally, the test bench utilizes the [QUnit](https://qunitjs.com/)_ framework.


## Debugging tips ##

To inspect parser failures you can use the test area on the **Workbench**. It's recommended to do
this in conjunction with your web browser's own developer tools (Provided out of the box by 
most major web browsers). 

* To inspect the AST of your test program, the Workbench has an option _Trace code_. When this
  option is checked then the web browser's Javascript console will show an AST printout on any
  change to the grammar's source code.

* To inspect the inner workings of any of the production rules, write `console.log` statements
  into the Javascript section of the resp. rules. This will allow you to inspect the parser
  whenever it encounters the corresponding tokens.

* To inspect the parser's execution flow, use the `debugger` statement inside your production 
  rule. This will show the parser's source code at the point of the debugged production rule 
  in the web browser's debug panel and allow you do step-by-step inspection of the parser.


## Installation & running ##

The workbench is an adapted version of the [PEG.js website](http://pegjs.org). 
It’s a small [Express](http://expressjs.com/) application. The application
requires [Nodejs](https://nodejs.org/en/) and a web browser to run. 

To install the MAL workbench, clone the repository and install its dependencies:

    $ git clone git clone https://github.com/ustegrew/microanim.git
    $ cd microanim/lang/workbench
    $ npm install
    
To run the workbench, issue

    $ ./app.js
        
The website will be available at <http://localhost:3000/>.

If you develop on a linux machine and have chromium installed, you can also use the 
lazyman's way and issue

    $ ./run.sh
    
This will (try to) start the chrome web browser, have it open <http://localhost:3000/>
and then run `app.js`. Edit `run.sh` to suit your needs.
