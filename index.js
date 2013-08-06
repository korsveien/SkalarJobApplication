var express = require("express"),
    routes = require(__dirname + "/src/routes"),
    app = express();


//routes.init(app);
app.use(express.static(__dirname + "/public"));

app.listen(8080);
