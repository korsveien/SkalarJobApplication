var express = require("express"),
    consolidate = require("consolidate"),
    swig = require("swig"),
    routes = require(__dirname + "/src/routes"),
    app = express();


app.engine(".html", consolidate.swig);
app.set("view engine", "html");

swig.init({
    root: __dirname + "/views/",
    allowErrors: true
});
app.set("views", __dirname + "/views/");

routes.init(app);
app.use(express.static(__dirname + "/public"));

app.listen(8080);
