var sja = sja || {};

sja.highscores = (function() {
    "use strict";

    var highscores = [],
        previousName = "AAA";


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

            if (res.topTen.length > 0) {
                highscores = res.topTen;
            }

            res.topTen.forEach(function(scoreDescriptor) {
                var listItem = document.createElement("li");
                listItem.innerHTML = scoreDescriptor.name + " - " + scoreDescriptor.score;

                scoreList.appendChild(listItem);
            });
        });
    }

    function registerHighscore(score) {
        var name = previousName;

        do {
            name = prompt("You collected " + score + " points.\n"
                          + "Enter name to register score, max three characters", name);

            if (name === null) {
                return;
            }

            name = name.toUpperCase();
        } while (name.length > 3 || name.length === 0)

        previousName = name;

        if (highscores.length <= 0 || highscores[highscores.length - 1].score >= score) {
            // No point in registering score if it didn't make the top ten
            return;
        }

        sja.ajax("PUT", "highscores/" + name + "/" + score, function(status, res) {
            if (status === 201) {
                populateHighscoreList();
            } else {
                alert("Could not save highscore!");
            }
        });
    }
})();
