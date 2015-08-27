var api = {
    url: 'http://localhost:5984/',
    databaseName: 'mydb',
    fullUrl: 'http://localhost:5984/mydb/',
    createDatabase: function() {
        fetch(this.url + this.databaseName, {
            method: 'put'
        }).then(function(res) {
            return res.json();
        }).then(function(res) {
            console.log(res);
        });
    },
    allDocs: function() {
        return fetch(this.fullUrl + '_all_docs?include_docs=true', {
            method: 'get'
        }).then((res) => {
            return res.json();
        })
    },
    create: function(doc) {
        return fetch(this.fullUrl, {
            method: 'post',
            body: JSON.stringify(doc)
        }).then(function(res) {
            return res.json();
        }).then(function(res) {
            console.log(res);
        });
    },
    listen: function(callback) {
        var that = this;
        var poller = function (cseq) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    setTimeout(function () {
                        console.log(JSON.parse(xmlhttp.response));
                        poller(JSON.parse(xmlhttp.response).last_seq);
                        callback(JSON.parse(xmlhttp.response).results);
                    }, 10);
                }
            };
            xmlhttp.open("GET", that.fullUrl + "_changes?feed=longpoll&since=" + cseq, true);
            xmlhttp.send();
        };
        poller(0);
    },
    replicate: function(targetUrl) {
        return fetch(this.url + '_replicate', {
            method: 'post',
            body: JSON.stringify({
                source: 'mydb',
                target: 'http://' + targetUrl + ':5984/mydb',
                continuous: true
            })
        }).then(function(res) {
            return res.json();
        }).then(function(res) {
            console.log(res);
        });
    },
    deleteDatabase: function() {
        var self = this;
        return fetch(this.url + this.databaseName, {
            method: 'delete'
        }).then(function(res) {
            return res.json();
        }).then(function(res) {
            self.createDatabase();
        });
    },
    deleteDocument: function(id, rev) {
        return fetch(this.url + this.databaseName + '/' + id + '?rev=' + rev, {
            method: 'delete'
        }).then(function (res) {
            return res.json();
        });
    }
};

module.exports = api;