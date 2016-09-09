#!/bin/bash

# -----------------------------------------------------------------------------
# lanim development environment - workbench startup
# Note: Current working directory must be the directory where this file is located.
# -----------------------------------------------------------------------------

/usr/bin/chromium-browser http://127.0.0.1:3000 &
exec ./app.js
