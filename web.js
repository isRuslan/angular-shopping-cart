var express = require("express");
var app = express();
app.use(express.logger());

app.use('/', express.static('prod/'));

var port = process.env.PORT || 5000;
app.listen(port);
