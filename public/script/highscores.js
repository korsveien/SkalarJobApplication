var sja = sja || {};

sja.highscores = (function() {
    "use strict";

    var highscores = null;


    return {
        populateHighscoreList: populateHighscoreList,
        registerHighscore: registerHighscore
    };


    function populateHighscoreList() {
        sja.ajax("GET", "/highscores", function(status, res) {
            var scoreList = document.getElementById("highscore-list");

            if (status != 200) {
                console.error("Failed retrieving highscores!");
                return;
            }

            while (scoreList.hasChildNodes()) {
                scoreList.removeChild(scoreList.firstChild);
            }

            res.topTen.forEach(function(scoreDescriptor) {
                var listItem = document.createElement("li");
                listItem.innerHTML = scoreDescriptor.name + " - " + scoreDescriptor.score;

                scoreList.appendChild(listItem);
            });
        });
    }

    function registerHighscore(score) {

    }
})();
