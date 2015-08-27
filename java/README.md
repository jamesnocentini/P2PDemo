# Windows

This java directory contains a very basic, pre-built application that uses Couchbase Lite Java Listener.

The app simple opens a database hardcoded to "mydb", and then starts a Couchbase Lite Listener on port 5984.

## Running the Listener

A minimum of Java 7 SE is required.

The application can be run with the following command:

`java -cp "build/classes/main;build/libs/lib/*" com.couchbase.cblwin.CBLWin`


## Notes on included JARs

The build/libs/lib directory contains a number of jars which the application relies on. It should be noted that couchabse-lite-java-native includes some platform specific code, and the version of the jar included here only has platform specific Libraries for Windows 32bit x86 and Windows 64bit x64.