
# A miniature Javascript animation framework.
Animation framework to demonstrate cource code examples using a very simple machine model. 

Will replace the source code example runner in the [it001](https://github.com/ustegrew/ustegrew.github.io) course. The 
present source code example runner is very cumbersome to integrate into the site which makes maintenance difficult.

Note that this project is still in very early stages. 

I've looked high and low on the internet to find a Javascript execution environment which can be embedded into a web page and works like the  debugger as found in Chrome or Firefox. Specifically, I'm looking for an environment which  

1. Allows me to step through a program line by line,
2. Allows me to query any object at any time,
3. Can be embedded into a web page (i.e. visually and functionally),
4. Works out of the box, i.e. without the need of installing a browser extension.

Requirement 1 and 2 are easy to fulfill, as Chrome and Firefox have inbuilt debuggers which allow line-by-line stepping and variable querying. However, requirements 3 and 4 aren't supported by any browser. The debuggers provided by Chrome and Firefox are fine for development, but too clunky for a learning environment. 

I'm exploring whether it's possible to create an independent execution model which operates sufficiently to demonstrate the programming concepts shown in the `it001` course in a line-by-line-stepping fashion.

## Dependencies
This project depends on various other libraries and frameworks. Thankfully, they don't need 
to be bound explicitly into each web page which uses microanim. Microanim loads all dependencies
automatically. 

## Reverse plug...
I don't have intentions to develop this project into a fully blown animation engine. It's 
primarily for personal learning, and it's meant to provide simple animations which I can 
use in the it001 course. 

If you are looking for an animation/gaming framework that you can use now then 
there are already many frameworks out there. For an overview, see
[here](https://html5gameengine.com) and [here](https://en.wikipedia.org/wiki/List_of_game_engines).
 
Games engines I've tried in the past / would like to try in the future:
*   [Godot engine](http://godotengine.org)
*   [crafty js](http://craftyjs.com)
