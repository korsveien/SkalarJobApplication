var highscore = require(__dirname + "/highscores");

var menuItems = [
    { name: "Søknad", url: "/" },
    { name: "CV", url: "/cv" },
    { name: "Spill", url: "/spill" }
];

exports.init = function (app) {
    app.get("/", function(req, res) {
        res.render("soknad.html", {
            activeItem: "Søknad",
            menuItems: menuItems
        });
    });

    app.get("/cv", function(req, res) {
        res.render("cv.html", {
            activeItem: "CV",
            menuItems: menuItems
        });
    });

    app.get("/spill", function(req, res) {
        res.render("spill.html", {
            activeItem: "Spill",
            menuItems: menuItems
        });
    });

    app.get("/highscores", highscore.getTopTen);
    app.put("/highscores/:name/:score", highscore.registerScore);
}
