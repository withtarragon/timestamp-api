var express = require('express');
var strftime = require('strftime');
var app = express();

app.get('/:time', function(req, res) {
    var time = req.params.time;
    var result;
    var date;
    var unixTm;
    try {

        if (time.toString().match(/^[0-9]+$/)) {
            unixTm = time;
            date = strftime('%B %d, %Y', new Date(unixTm * 1000));
        }
        else {
            unixTm = Date.parse(time);
            if (isNaN(unixTm)) {
                unixTm = null;
                date = null;
            }
            else {
                date = strftime('%B %d, %Y', new Date(unixTm));
                unixTm = unixTm / 1000;
            }
        }

        result = {
            "unix": unixTm,
            "natural": date
        };

    }
    catch (ex) {
        result = {
            "unix": null,
            "natural": null
        };

    }
    res.send(result);
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
})
