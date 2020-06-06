$(document).ready(() => {
    $(".searchBtn").on('click', () => {
        var searchText = $("#searchText").val();
        console.log(searchText);
        window.location.href = ".?searchText=" + searchText;
    })
    var id = $.urlParam('id');
    console.log(id);
    $.ajax({
        url: 'https://api.themoviedb.org/3/movie/' + id + '?api_key=343f078c30e5ffe3c08cc3da703c7633&language=en-US',
        method: 'get',
        data: {
            searchText: $("#searchText").val()
        }

    }).done((data) => {
        var old = data;
        $.ajax({
            url: 'https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=343f078c30e5ffe3c08cc3da703c7633&language=en-US',
            method: 'get',
            data: {
                searchText: $("#searchText").val()
            }

        }).done((data) => {
            if (data.results.length > 0) {
                if (data.results[0].key != null) {
                    var key = data.results[0].key;
                } else {
                    var key = null;
                }

            }
            $.ajax({
                url: 'https://api.themoviedb.org/3/movie/' + id + '/recommendations?api_key=343f078c30e5ffe3c08cc3da703c7633&language=en-US&page=1',
                method: 'get',
                data: {
                    searchText: $("#searchText").val()
                }

            }).done((data) => {
                var list = data.results;
                $.ajax({
                    url: 'https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=343f078c30e5ffe3c08cc3da703c7633',
                    method: 'get',
                    data: {
                        searchText: $("#searchText").val()
                    }

                }).done((data) => {
                    loadSearch(old, key, list, data.cast);
                })

            })

        })
        //            /* same codes from lines 4 – 17. *///            var results = JSON.parse(data).results;

    }).fail((err) => {
        console.log(err.responseText);
    })
})

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

function loadSearch(movie, key, recs, cast) {
    console.log(movie);
    $('.photogallery').empty();
    var title = movie.title;
    var article = $("<article>");
    var h1 = $("<h1>");
    var h3 = $("<h3>");
    var h5 = $("<h5>");
    var rate = $("<h5>");
    var divr = $("<divl class='divr'>");
    h1.append(movie.title);
    h3.append(movie.tagline);
    h5.append("Released Date: " + movie.release_date);
    rate.append("Rating: " + movie.vote_average);
    divr.append(h1);
    divr.append(h3);
    divr.append(h5);
    divr.append(rate);
    divr.append(movie.overview);
    article.append("<img src='https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + movie.poster_path + "' />");
    article.append(divr);
    if (key != null) {
        article.append("<iframe width='600' height='400' src='https://www.youtube.com/embed/" + key + "'></iframe>");
    }
    var castlist = $("<div>");
    var castmin = Math.min(cast.length, 5);
    if (castmin > 0) {
        castlist.append("<h2>Cast:</h2>");
    }
    for (var c = 0; c < castmin; c++) {
        if (cast[c].profile_path != null) {
            var i = "<img src = 'https://image.tmdb.org/t/p/w138_and_h175_face" + cast[c].profile_path;
        } else {
            var i = "<img width='138' height='175' src ='../images/profile.jpg' ";
        }
        castlist.append("<div class='cimages'><a href='castdetails?id=" +
            cast[c].id + "'>" +
            cast[c].name + "</a><br>" + i + "' /></div>");
    }
    console.log(castmin);
    var rec = $("<div>");
    var min = Math.min(recs.length, 3);
    if (min > 0) {
        rec.append("<h2>Recommendations</h2>");
    }
    for (var i = 0; i < min; i++) {
        rec.append("<div class='images'><a href='details?id=" + recs[i].id + "'>" + recs[i].title + "</a><br><img src='https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + recs[i].poster_path + "' /></div>");
    }

    console.log(min);


    $(".photogallery").append(article);
    $(".photogallery").append(castlist);
    $(".photogallery").append("<div class='nofloat'></div>");
    $(".photogallery").append(rec);
    console.log(title);

}
