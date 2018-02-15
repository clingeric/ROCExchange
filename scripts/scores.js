$(document).ready(function () {
    $("#nbaSubmit").click(function (e) {
        e.preventDefault();
        var teamsForward = {
            'ATL': 'Atlanta Hawks',
            'BKN': 'Brooklyn Nets',
            'BOS': 'Boston Celtics',
            'CHA': 'Charlotte Hornets',
            'CHI': 'Chicago Bulls',
            'CLE': 'Cleveland Cavaliers',
            'DAL': 'Dallas Mavericks',
            'DEN': 'Denver Broncos',
            'DET': 'Detroit Pistons',
            'GSW': 'Golden State Warriors',
            'HOU': 'Houston Rockets',
            'IND': 'Indiana Pacers',
            'LAC': 'Los Angeles Clippers',
            'LAL': 'Los Angeles Lakers',
            'MEM': 'Memphis Grizzlies',
            'MIA': 'Miami Heat',
            'MIL': 'Milwaukee Bucks',
            'MIN': 'Minnesota Timberwolves',
            'NOP': 'New Orleans Pelicans',
            'NYK': 'New York Knicks',
            'OKC': 'Oklahoma City Thunder',
            'ORL': 'Orlando Magic',
            'PHI': 'Philadelphia 76ers',
            'PHX': 'Phoenix Suns',
            'POR': 'Portland Trail Blazers',
            'SAC': 'Sacramento Kings',
            'SAS': 'San Antonio Spurs',
            'TOR': 'Toronto Raptors',
            'UTA': 'Utah Jazz',
            'WAS': 'Washington Wizards'
        }
        var teamsReverse = {
            'ATLANTA HAWKS': 'ATL',
            'BROOKLYN NETS': 'BKN',
            'BOSTON CELTICS': 'BOS',
            'CHARLOTTE HORNETS': 'CHA',
            'CHICAGO BULLS': 'CHI',
            'CLEVELAND CAVALIERS': 'CLE',
            'DALLAS MAVERICKS': 'DAL',
            'DENVER BRONCOS': 'DEN',
            'DETROIT PISTONS': 'DET',
            'GOLDEN STATE WARRIORS': 'GSW',
            'HOUSTON ROCKETS': 'HOU',
            'INDIANA PACERS': 'IND',
            'LOS ANGELES CLIPPERS': 'LAC',
            'LOS ANGELES LAKERS': 'LAL',
            'MEMPHIS GRIZZLIES': 'MEM',
            'MIAMI HEAT': 'MIA',
            'MILWAUKEE BUCKS': 'MIL',
            'MINNESOTA TIMBERWOLVES': 'MIN',
            'NEW ORLEANS PELICANS': 'NOP',
            'NEW YORK KNICKS': 'NYK',
            'OKLAHOMA CITY THUNDER': 'OKC',
            'ORLANDO MAGIC': 'ORL',
            'PHILADELPHIA 76ERS': 'PHI',
            'PHOENIX SUNS': 'PHX',
            'PORTLAND TRAIL BLAZERS': 'POR',
            'SACRAMENTO KINGS': 'SAC',
            'SAN ANTONIO SPURS': 'SAS',
            'TORONTO RAPTORS': 'TOR',
            'UTAH JAZZ': 'UTA',
            'WASHINGTON WIZARDS': 'WAS'
        }
        var value = $("#nbaInput").val();
        var year = $("#yearInput").val();
        value = value.toUpperCase();
        if (teamsReverse[value] !== undefined) {
            value = teamsReverse[value];
        }
        console.log(value);
        var myurl = "http://api.suredbits.com/nba/v0/games/" + value + "/" + year;
        $.ajax({
            url: myurl,
            dataType: "json",
            jsonCallback: "logResults",
            success: function (json) {
                json = json.sort((a, b) => Number(b.gameId) - Number(a.gameId));
                var results = "";
                var wins = 0;
                var losses = 0;
                if (json.length > 0) {
                    results += "<h2><strong>" + teamsForward[value] + "'s 2018 Current Record</strong></h2><p><em>Sorted by most recent date</em></p>"
                    for (let i = 0; i < json.length; i++) {
                        if(json[i].homeTeam.finalScore > json[i].awayTeam.finalScore) {
                            wins++;
                        }
                        else if(json[i].homeTeam.finalScore < json[i].awayTeam.finalScore) {
                            losses++
                        }   
                    }
                    results += "<h5><strong><em>Wins:</em> " + wins + " <em>Losses:</em> " + losses + "</strong></h5><hr><br>"
                    for (var i = 0; i < json.length; i++) {
                        if (json[i].finished) {
                            var wins;
                            var losses;
                            console.log(json[i]);
                            if (json[i].homeTeam.finalScore > json[i].awayTeam.finalScore) {
                                results += "<h3><span class='winner'>" + teamsForward[json[i].homeTeam.teamID] + "</span> vs. <span class='loser'>" + teamsForward[json[i].awayTeam.teamID] + "</span></h3>"
                            }
                            else if (json[i].homeTeam.finalScore < json[i].awayTeam.finalScore) {
                                results += "<h3><span class='loser'>" + teamsForward[json[i].homeTeam.teamID] + "</span> vs. <span class='winner'>" + teamsForward[json[i].awayTeam.teamID] + "</span></h3>"
                            }
                            else {
                                results += "<h4>TIE</h4>"
                            }
                            results += "<hr style='width: 50%'>"
                            results += "<h4><strong>" + json[i].homeTeam.finalScore + "</strong> - <strong>" + json[i].awayTeam.finalScore + "</strong></h4>"
                            results += "<h5>" + json[i].startTime.slice(4, 6) + '/' + json[i].startTime.slice(6, 8) + '/' + json[i].startTime.slice(0, 4) + "</h5>"
                            results += "<h6><em>" + json[i].seasonPhase + " Season</em></h6>"
                            results += '<br>'
                        }
                    }
                }
                else {
                    results += "Sorry, no results were found. Please try enter a valid team name."
                }
                $("#nbaScores").html(results);
            },
            error: function() {
                console.log("error")
                var results = "Sorry, no results were found. Please ensure that the team name and year are entered correctly."
                alert(results);
            }
        });
    });
});

