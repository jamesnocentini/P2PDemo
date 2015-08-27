/**
 * Created by tomcouchbase on 8/25/2015.
 */
package com.couchbase.cblwin;

import com.couchbase.lite.*;
import com.couchbase.lite.listener.LiteListener;
import com.couchbase.lite.listener.Credentials;
import com.couchbase.lite.util.Log;


import java.io.IOException;

public class CBLWin {

    public static void main(String[] args) {
        System.out.println("Hello, World");
        String DB_NAME = "mydb";
        int LISTENER_PORT = 5984;

        Manager manager = null;
        Database db = null;
        try {
            Manager.enableLogging("CBLWIN", Log.VERBOSE);
            manager = new Manager(new JavaContext("data"), Manager.DEFAULT_OPTIONS);
            db = manager.getDatabase(DB_NAME);
            Document doc = db.createDocument();
            System.out.println(doc.toString());
            Log.d("CBLWIN", doc.toString());

        } catch (IOException e) {
            e.printStackTrace();
        } catch (CouchbaseLiteException e) {
            e.printStackTrace();
        }

        LiteListener listener = new LiteListener(manager,LISTENER_PORT, new Credentials("", ""));


        listener.start();

    }
}