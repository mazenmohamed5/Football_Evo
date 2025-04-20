// Api token from https://scorebat.com
const scoreBatToken=`MjAzMDc0XzE3NDQ5OTU2MzNfMDgyZTg1NjJmMTBiMDQwYjAxYWRkODE4Zjk1ODA5YjdiZTRmMGMzMA==`;

// common function for all leagues html output
function getLeagueNews(matches, containerId) {
    let container = "";

    for (let news of matches) {
        container += `
            <div class="col-md-4 mt-5">
                <div class="card card-home w-100" style="max-width: 400px;">
                    <img src="${news.thumbnail}" class="card-img-top">
                    <div class="card-body card-body-home">
                        <h5 class="card-title card-title-home">${news.title}</h5>
                        <p class="card-text card-text-home">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto qui ut rem impedit enim quisquam!</p>
                        <a href="${news.matchviewUrl}" target="_blank" class="btn btn-primary">Highlights</a>
                    </div>
                </div>
            </div>
        `;
    }

    document.getElementById(containerId).innerHTML = container;
}

// get news function
function getFeed(){
    let apiUrl = `https://www.scorebat.com/video-api/v3/feed/?token=${scoreBatToken}`;

    axios.get(apiUrl, {
        headers: { 'X-Auth-Token': scoreBatToken }
    })
    .then((response) => {
        const data = response.data.response;

        getLeagueNews(data.filter(match => match.competition.includes("Champions League")), "news-row");
        getLeagueNews(data.filter(match => match.competition.includes("ENGLAND: Premier Leagu")), "plnews-row");
        getLeagueNews(data.filter(match => match.competition.includes("SPAIN: La Liga")), "laliga-row");
        getLeagueNews(data.filter(match => match.competition.includes("Serie A")), "sa-row");
        getLeagueNews(data.filter(match => match.competition.includes("Bundesliga")), "bundesliga-row"); 
    });
}

getFeed();
