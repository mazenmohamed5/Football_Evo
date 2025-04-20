// Api token from https://www.football-data.org/
const token= "1aae93def8b94229af9d9e52c2c4db21";


// Functions
function getStandings(leagueId) {
    const url = `https://api.football-data.org/v4/competitions/${leagueId}/standings`;

    axios.get(url, {
        headers: {
            'X-Auth-Token': token
        }
    }).then((response) => {
        const standings = response.data.standings;
        let output = "";

        for (let standing of standings) {
            let tableContent = "";

            for (let row of standing.table) {
                tableContent += `
                <li class="list-group-item">
                    <div class="row">
                        <div class="col-md-2 text-center"><b>${row.position}</b></div>
                        <div class="col-md-2 d-flex justify-content-center align-items-center">
                            
                            <img class="flag-img rounded-circle me-1" src="${row.team.crest}" alt="${row.team.tla}" width="24">
                            
                            
                            <h5 class="ms-2 pt-2"><b>${row.team.tla}</b></h5>
                        </div>
                       
                        <div class="col-md-2 text-center">${row.won}</div>
                        <div class="col-md-2 text-center">${row.lost}</div>
                        <div class="col-md-2 text-center">${row.draw}</div>
                        <div class="col-md-2 text-center"><b>${row.points}</b></div>
                    </div>    
                </li>`;
            }

            output += `
            <div class="col-md-12 mb-3">
                <div class="card edit-card">
                    <div class="card-header text-center bg-primary text-white">
                        ${standing.group || "Standings"}
                    </div>
                    <div class="row stats m-0 border-0 text-white text-center py-2">
                        <div class="col-md-2"><h6>Position</h6></div>
                        <div class="col-md-2"><h6>Team</h6></div>
                        <div class="col-md-2"><h6>W</h6></div>
                        <div class="col-md-2"><h6>L</h6></div>
                        <div class="col-md-2"><h6>D</h6></div>
                        <div class="col-md-2"><h6>Pts</h6></div>
                    </div>
                    <ul class="list-group list-group-flush">
                        ${tableContent}
                    </ul>
                </div>
            </div>`;
        }

        document.getElementById("standings").innerHTML = output;
        document.getElementById("teams").innerHTML = ""; 
        document.getElementById("matches").innerHTML="";
        document.getElementById("scorer").innerHTML="";
    });
}


function getMatches(matchId){
    const url = `https://api.football-data.org/v4/competitions/${matchId}/matches`

    axios.get(url,{
        headers: { 'X-Auth-Token' : token }
    })

    .then(response => {
        const matches = response.data.matches;
        let matchContainer="";

        for(let match of matches){
            
            matchContainer +=`
                <div class="col-12 col-md-4 col-lg-4">

                  <div class="card text-center match-card edit-card">
                    <div class="card-header">
                      ${match.stage}
                    </div>
                    <div class="card-body row">
                      <div class="col-md-8">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                          <div>
                            <img src="${match.homeTeam.crest}" class="image">
                            ${match.homeTeam.shortName}
                          </div>
                          <div>${match.score.fullTime.home ?? "TBD" }</div>
                        </div>
                      
                        <div class="d-flex justify-content-between align-items-center">
                          <div>
                            <img src="${match.awayTeam.crest}" class="image">
                            ${match.awayTeam.shortName}
                          </div>
                          <div>${match.score.fullTime.away ?? "TBD"}</div>
                        </div>
                      </div>
                    </div>
                    <div class="card-footer text-body-secondary">
                      ${match.status}
                      <br>
                      ${match.utcDate}
                    </div>
                  </div>

                </div>
            `
        }

        document.getElementById("matches").innerHTML=matchContainer;
        document.getElementById("standings").innerHTML="";
        document.getElementById("teams").innerHTML="";
        document.getElementById("scorer").innerHTML="";
        
    })
}


function getTeams(teamId) {
    

    const url = `https://api.football-data.org/v4/competitions/${teamId}/teams`;

    axios.get(url, {
        headers: { 'X-Auth-Token': token }
    })
    .then((response) => {
        const teams = response.data.teams;
        let teamsContent = ""; 

        for (let team of teams) {
            teamsContent += `
                <div class="col-12 col-md-4 col-lg-4">
                    <div class="card team-card edit-card">
                        <img
                            src="${team.crest}"
                            class="card-img-left"
                            alt="${team.shortName} Logo"
                            
                        />
                        <div class="card-body d-flex justify-content-between">
                            <h5 class="card-title">${team.shortName}</h5>
                            <a href="${team.website}" class="btn d-block">
                                
                                <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }

       
        document.getElementById("teams").innerHTML = teamsContent;
        document.getElementById("standings").innerHTML = "";
        document.getElementById("matches").innerHTML="";
        document.getElementById("scorer").innerHTML="";
        

    });

}


function getTopScorer(scorerId) {
    const url = `https://api.football-data.org/v4/competitions/${scorerId}/scorers`;

    axios.get(url, {
        headers: { 'X-Auth-Token': token }
    })
    .then((response) => {
        const topScorer = response.data.scorers;
        const competition = response.data.competition;

        let scorerContainer = "";

        for (let [index, scorer] of topScorer.entries()) {
            scorerContainer += `
                <li class="list-group-item">
                    <div class="row">
                        <div class="col-md-1 text-center"><b>${index + 1}</b></div>
                        <div class="col-md-4 d-flex justify-content-center align-items-center text-center">
                            <div class="block">
                                <p class="text-dark"><b>${scorer.player.name}</b></p>
                                <p class="team-color"><b>${scorer.team.name}</b></p>
                            </div>
                        </div>
                        <div class="col-md-2 text-center"><b>${scorer.player.nationality}</b></div>
                        <div class="col-md-2 text-center"><div class="circle"><b>${scorer.playedMatches}</b></div></div>
                        <div class="col-md-1 text-center"><div class="circle"><b>${scorer.goals}</b></div></div>
                        <div class="col-md-1 text-center"><div class="circle"><b>${scorer.assists || 0}</b></div></div>
                        <div class="col-md-1 text-center"><div class="circle"><b>${scorer.penalties || 0}</b></div></div>
                    </div>
                </li>
            `;
        }

        const topScorerContent = `
            <div class="col-md-12 mb-3">
                <div class="card">
                    <div class="scoreSheet-card">
                        <div class="card-header text-center text-white">
                            ${competition.name} players stats
                        </div>
                        <div class="stats row m-0 border-0 text-white text-center py-2">
                            <div class="col-md-1"><h6>#</h6></div>
                            <div class="col-md-4"><h6>Player,Team</h6></div>
                            <div class="col-md-2"><h6>Nationality</h6></div>
                            <div class="col-md-2"><h6>Played-Matches</h6></div>
                            <div class="col-md-1"><h6>Goals</h6></div>
                            <div class="col-md-1"><h6>Assists</h6></div>
                            <div class="col-md-1"><h6>Penalties</h6></div>
                        </div>
                    </div>
                    <ul class="list-group list-group-flush">
                        ${scorerContainer}
                    </ul>
                </div>
            </div>
        `;

        document.getElementById("scorer").innerHTML = topScorerContent;
        document.getElementById("teams").innerHTML = "";
        document.getElementById("standings").innerHTML = "";
        document.getElementById("matches").innerHTML = "";
    });
}

//CSS CONTROL and call getStandings automatically when you click any league

document.querySelectorAll(".rounded-circle").forEach(function(button) {
    button.addEventListener("click", function (e) {
        
        document.querySelectorAll(".rounded-circle").forEach(function(btn) {
            btn.classList.remove("active");
        });

        const parentLink = e.target.closest("a");
        parentLink.classList.add("active");

        const currentLeague = parentLink.getAttribute("data-league");
        getStandings(currentLeague);  
    });
});


//CSS Control for League-Logos
document.querySelectorAll('.options-1 a').forEach(link =>{
    link.addEventListener('click',function(e){
        e.preventDefault();
        document.querySelectorAll('.options-1 a').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
    })
})


// CSS control for every league options [ #Standings, #Matches, #Teams and Top-Scorer ]
document.querySelectorAll('.options a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.options a').forEach(el => el.classList.remove('active'));
      this.classList.add('active');
     
    });
});


// Functions Calling  
document.getElementById("teamsBtn").addEventListener('click', function() {
    const currentLeague = document.querySelector('a[data-league].active').getAttribute('data-league'); 
    getTeams(currentLeague);  
});

document.getElementById("standingsBtn").addEventListener('click', function() {
    const currentLeague = document.querySelector('a[data-league].active').getAttribute('data-league'); 
    getStandings(currentLeague);  
    
});

document.getElementById("matchesBtn").addEventListener('click',function(){
    const currentLeague = document.querySelector("a[data-league].active").getAttribute("data-league");
    getMatches(currentLeague);
    
})

document.getElementById("topScorerBtn").addEventListener('click',function(){
    const currentLeague = document.querySelector("a[data-league].active").getAttribute("data-league");
    getTopScorer(currentLeague);
    
})

// when heading to leagues it automatically fetch PL standings and mark the logo and word Standings

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const league = urlParams.get('league');

        getStandings('PL');
        document.querySelectorAll('.options-1 a').forEach(el => el.classList.remove('active'));
        const plLink = document.querySelector('a[data-league="PL"]');
        if (plLink) {
            plLink.classList.add('active');
        }
        document.querySelectorAll('.options a').forEach(el => el.classList.remove('active'));
        const standingsLink = document.getElementById('standingsBtn');
        if (standingsLink) {
            standingsLink.classList.add('active');
        }
});












