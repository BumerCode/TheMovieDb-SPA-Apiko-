const basicURL = "https://api.themoviedb.org/3/",
    api_key = "?api_key=e02e113c1e8d086578caa870a138b65a",
    moviesByKeyword = "search/movie",
    trending = "trending/all/week",
    movieInfo = "movie/",
    poster_path = "http://image.tmdb.org/t/p/original",
    recomendation = `/recommendations`,
    lang_ending = `&language=en-US`;

document.addEventListener("DOMContentLoaded", ()=>{
    let url = `${basicURL}${trending}${api_key}`;
    fetch(url)
    .then((result) =>{ 
        return result.json();
    })
    .then((data) => {
        let wrapper = document.querySelector(".trending"),
            ol = document.createElement("ol");
        ol.classList.add("trend");
        wrapper.append(ol);

        data.results.forEach((element, index, array) => {
            let movieName = element.title != undefined ? element.title : element.name, movieID = element.id;
            ol.insertAdjacentHTML("beforeend", `<li><a onclick="showMovie('${movieName}', '${movieID}');" title="Click for more info">${movieName}</a></li>`);
        });
    }) 
});

let showMovie = (name, id) =>{
    let wrapper = document.querySelector(".wrapper");
    wrapper.innerHTML = null;
    wrapper.classList.remove("trending");
    wrapper.classList.add("movie");
    wrapper.insertAdjacentHTML("beforeend", `<div class="moviePoster"><img></div> 
    <div class="movieInfo">
        <div class="movieName"><h2 class="movieHeading"></h2></div>
        <div class="movieOverview"><h2 class="overviewHeading">Overview</h2></div>
        <div class="movieRecomendations"><h2 class="recomendationHeading">Recommendations</h2><ul class="recomend"></ul></div>
    </div>`);

    let url = `${basicURL}${movieInfo}${id}${api_key}${lang_ending}`;
    fetch(url)
    .then((result) =>{ 
        return result.json();
    })
    .then((data) =>{ 
        console.log(data);
        let paragraphOverview = document.createElement('p'), posterImg = `${poster_path}${data.poster_path}`;
        paragraphOverview.textContent = data.overview; 
        document.querySelector('.movieHeading').textContent = `${name} (${data.release_date.slice(0, 4)})`;
        document.querySelector('.movieOverview').append(paragraphOverview);
        document.querySelector(".moviePoster img").setAttribute("src", posterImg);
        showRecomendation(id);
    })
}

let showRecomendation = (id) => {
    let url = `${basicURL}${movieInfo}${id}${recomendation}${api_key}${lang_ending}`, recomendListNumber = 3;
    fetch(url)
    .then((result) =>{ 
        return result.json();
    })
    .then((data) =>{ 
        let moviesArray = data.results;
        if (moviesArray.length >= recomendListNumber){
            let i = 0;
            for (i; i < recomendListNumber; i++){
                let movieName = moviesArray[i].title != undefined ? moviesArray[i].title : moviesArray[i].name, movieID = moviesArray[i].id;
                document.querySelector(".movieRecomendations ul").insertAdjacentHTML("beforeend", `<li class="recommendated"><a title="Click for more info" onclick="showMovie('${movieName}', '${movieID}');">${movieName}</a></li>`);
            }
        }
        else {
            let i = 0;
            for (i; i < moviesArray.length; i++){
                let movieName = moviesArray[i].title != undefined ? moviesArray[i].title : moviesArray[i].name, movieID = moviesArray[i].id;
                document.querySelector(".movieRecomendations ul").insertAdjacentHTML("beforeend", `<li class="recommendated"><a onclick="showMovie('${movieName}', '${movieID}');">${movieName}</a></li>`);
        }
    }
})
}

let returnByKeywords = (event) =>{
    event.preventDefault();
    let keyword = document.querySelector(".keywordInput").value; 
    let url = `${basicURL}${moviesByKeyword}${api_key}${lang_ending}&query=${keyword}`;
    fetch(url)
    .then((result) =>{
        console.log("key");
        return result.json();
    })
    .then((data) =>{
        buildListByKey(data);
    })
}

 let buildListByKey = (data) =>{
    let wrapper = document.querySelector(".wrapper"), moviesArray = data.results;
    wrapper.innerHTML = null;
    wrapper.classList.remove("trending");
    wrapper.classList.remove("movie");
    wrapper.classList.add("Search");
    let ul = document.createElement("ul"); 
    wrapper.append(ul);
    let i = 0;
    for (i; i<= data.results.length; i++){
        let movieName = moviesArray[i].title != undefined ? moviesArray[i].title : moviesArray[i].name, movieID = moviesArray[i].id;
        ul.insertAdjacentHTML("beforeend", `<li><a onclick="showMovie('${movieName}', '${movieID}');">${data.results[i].title}</a></li>`);
    }
 }

