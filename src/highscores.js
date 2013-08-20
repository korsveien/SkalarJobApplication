exports.getTopTen = function(req, res) {
    var sampleList = [
        {name: "RHH", score: 12},
        {name: "KHH", score: 10},
        {name: "LAS", score: 8},
        {name: "JHA", score: 7}
    ]

    res.send({
        topTen: sampleList
    });
};

exports.registerScore = function(req, res) {
    console.log(req.params["name"]);
    console.log(req.params["score"]);

    res.send(201);
};
