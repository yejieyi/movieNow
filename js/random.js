$(document).ready(() => {
    $(".searchBtn").on('click', () => {
        var searchText = $("#searchText").val();
        console.log(searchText);
        window.location.href = ".?searchText=" + searchText;
    })
    var rnpage = Math.floor((Math.random() * 997) + 1);
    $.ajax({
        url: 'https://api.themoviedb.org/3/movie/popular?api_key=343f078c30e5ffe3c08cc3da703c7633&language=en-US&page=' + rnpage,
        method: 'get',
        data: {
            searchText: $("#searchText").val()
        }

    }).done((data) => {
        var list = data.results;
        var rnresult = Math.floor((Math.random() * 20) + 1);
        loadSearch(list[rnresult]);

        //        console.log(data);
        //        loadSearch(old, key, list, data.cast);
    })
})

function loadSearch(movie) {
    console.log(movie.title);
    $('.photogallery').empty();
    var title = movie.title;
    var article = $("<article>");
    var h1 = $("<h1>");
    var divr = $("<divl class='divr'>");
    h1.append(movie.title);
    divr.append(h1);
    divr.append(movie.overview);
    divr.append("<br><a href='details?id=" + movie.id + "'>View More</a>");
    article.append("<img src='https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + movie.poster_path + "' />");
    article.append(divr);
    $(".photogallery").append("<h1>Random Movie For You:</h1>");
    $(".photogallery").append(article);
}
