# P2PDemo

Sample application that's using the Couchbase Lite Listener for P2P syncing in a PhoneGap app and on Windows.

## PhoneGap

### Requirements

- Apache Cordova 5.0+
- Couchbase Lite PhoneGap SDK
- Apache Cordova Whitelist Plugin
- Apache Cordova Camera Plugin

### Getting started

After cloning the repository, run the following commands in the `cordova` folder:

```
$ cordova platform add android
```

Then install all the required plugins:

```
$ cordova plugin add cordova-plugin-whitelist
$ cordova plugin add https://github.com/jamiltz/Couchbase-Lite-PhoneGap-Plugin.git
```

Build the web app:

```
$ npm run build
```

### Resolving Gradle Conflicts For Android

At compile time, you may run into the following error message:

```
Error: duplicate files during packaging of APK
```

To resolve this, you must extend the Gradle build file for Android as outlined in the official [Apache Cordova documentation](https://cordova.apache.org/docs/en/5.0.0/guide_platforms_android_tools.md.html).

Create **platforms/android/build-extras.gradle** in your project and add the following:

```
android {
	packagingOptions {
		exclude 'META-INF/ASL2.0'
		exclude 'META-INF/LICENSE'
		exclude 'META-INF/NOTICE'
	}
}
```

### Usage (Android)

To build and run the project for Android, run the following from your Terminal or Command Prompt:

```
cordova build android
adb install -r platforms/android/build/outputs/apk/android-debug.apk
```

### Development environment

During development, it's preferable to run the app in the browser. To do so, you must run application once in your Android emulator to expose the CBLListener API (which will be available on `http://localhost:5984/` on your host machine).

Navigate to the `www` folder and serve the files on port 8000:

```
$ python -m SimpleHTTPServer 8000
```

At this point, you may find CORS errors because the web app is fetching data from the Couchbase Lite database on `http://localhost:5984` but the app is served on `http://localhost:8000`. To open Chrome with CORS disabled:

```
$ open -a Google\ Chrome\ Canary --args --disable-web-security
```

Open `localhost:8000` in Chrome and you see the UI:
 
![](http://cl.ly/image/320V1p1h1P43/Screen%20Shot%202015-08-27%20at%2011.44.10.png)

But because the Couchbase Lite Listener isn't running, nothing will be saved to the database. To run the application on an android device or emulator:

```
$ cordova run android --target=<device_id>
```

To get the list of target, run `cordova run --list`.

The Android stock emulators and Genymotion often run in their own VM. You can setup port forwarding with adb to expose the listener endpoint on your host machine:

```
$ adb -s <device_id> forward tcp:5984 tcp:5984
```

You can optionally set the `device_id` which is displayed by running the `adb devices` command.

### Usage (Sync Gateway)

This sample application can connect to the [Couchbase Sync Gateway](http://developer.couchbase.com/mobile/develop/guides/sync-gateway/) to keep data in sync across devices and platforms.  To use with Sync Gateway, first [download the latest version](http://www.couchbase.com/nosql-databases/downloads#cb-mobile) from the Couchbase website.  Extract the downloaded copy and from your Command Prompt (Windows) or Terminal (Linux / Mac) execute the following:

```
/path/to/sync/gateway/bin/sync_gateway /path/to/ionic/project/sync-gateway-config.json
```

This will start the Sync Gateway using the configuration file provided in this project.  It will be serving on http://localhost:4984 and http://localhost:4985.

Depending on your choice of device or emulator, the host address information found in your project's **www/js/app.js** file might differ.

### Resources

Couchbase Lite REST API - [http://developer.couchbase.com/mobile/develop/references/couchbase-lite/rest-api/index.html](http://developer.couchbase.com/mobile/develop/references/couchbase-lite/rest-api/index.html)

Couchbase Lite slide deck - [http://www.slideshare.net/Couchbase/building-hybrid-apps-with-couchbase-mobile-couchbase-connect-2015](http://www.slideshare.net/Couchbase/building-hybrid-apps-with-couchbase-mobile-couchbase-connect-2015)