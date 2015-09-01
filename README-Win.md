# Windows Setup

## Pre-Requisites

* Java 7 Runtime
* Python 2.7:
	* 32bit:  https://www.python.org/ftp/python/2.7.10/python-2.7.10.msi
	* 64bit: https://www.python.org/ftp/python/2.7.10/python-2.7.10.amd64.msi
* Google Chrome: (to default install location)
	* https://www.google.com/chrome/browser/ 

Once both Java and Python have been installed, it is recommended to add both to the Windows PATH environment variable, so that they can be launched without specifying full location of the JRE / Python application each time.

The following page has good step-by-step instructions for altering the PATH variable on Windows:
http://condor.depaul.edu/slytinen/instructions/setupj2sewin7.html

Both Java *and* Python directories should be added, each separate by a semicolon.

## Running under Windows

### Using CBLWin.bat

The easiest way to run the P2PDemo under Windows is to use the CBLWin.bat file, which is part of this repository.

Note that the bat file must be run from the top-level directory of the repo, as it relies on relative paths to access the demo files.
Additionally, the bat file will not work unless both Java and Python have been added to the Windows PATH.

The bat file will start 3 main applications:

1. Starts the Couchbase Lite Listener (and Couchabse Lite Database) running under Java
2. Starts a simple web server in the www directory running under Python
3. Opens the demo web-app in Google Chrome with a specific security setting


The commands for each of these steps can be seen diretly in the CBLWin.bat file.

