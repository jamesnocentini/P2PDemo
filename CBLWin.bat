echo @off
echo "Starting Couchbase Lite and Couchbase Lite Listener"
cd java
start java -cp "build/classes/main;build/libs/lib/*" com.couchbase.cblwin.CBLWin
timeout /t 5
cd ..
cd cordova\www
start python -m SimpleHTTPServer
timeout /t 5
start C:\"Program Files"\Google\Chrome\Application\chrome.exe "http://localhost:8000" --disable-web-security
cd ..\..