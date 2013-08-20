// Just keep the list in-memory
// Would've used a proper database for a real web-app
var topTen = [];

exports.getTopTen = function(req, res) {
    res.send({
        topTen: topTen
    });
};

exports.registerScore = function(req, res) {
    var scoreDescriptor = {
        name: req.params.name,
        score: req.params.score
    };

    topTen.push(scoreDescriptor);

    topTen.sort(function(a, b) {
        return b.score - a.score;
    });

    if (topTen.length > 10) {
        topTen.length = 10;
    }

    res.send(201);
};
