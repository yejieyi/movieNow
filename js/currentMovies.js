$(document).ready(() => {
    if (sessionStorage.getItem("userId") != null) {
        $(".session").empty();
        $(".session").append("<a href='/profile'>Profile</a>");
        $(".session1").empty();
        $(".session1").append("<a href='/' class='logout'>Logout</a>");
        $(".session2").empty();
        $(".session2").append("<a href='/reviews'>Reviews</a>");
        $(".session3").empty();
        $(".session3").append("<a href='/favourites'>Favourites</a>");
        $(".session4").empty();
        $(".session4").append("<a href='/watchlist'>Watch List</a>");
        $(".logout").on('click', () => {
            sessionStorage.removeItem("userId");
            alert("Log out successfully");
        });
    }
    $.ajax({
        url: '/currentMovies',
        method: 'get'
    }).done((data) => {
        console.log(data);
        loadMovies(data);
    }).fail((err) => {
        console.log(err.responseText);
    })

    function loadMovies(data) {
        $('.photogallery').empty();
        $.each(data, function (key, current) {
            $.ajax({
                url: 'https://api.themoviedb.org/3/movie/' + current.movieid + '?api_key=343f078c30e5ffe3c08cc3da703c7633&language=en-US',
                method: 'get',
                data: {
                    searchText: $("#searchText").val()
                }

            }).done((data) => {
                load(data);
                //                var cm = data;
                //                var timeid = current.timingid;
                //                //for timings
                //                $.ajax({
                //                    url: '/timing/' + timeid,
                //                    method: 'get',
                //                }).done((data) => {
                //                    var timing = data;
                //                    var cinemaid = current.cinemaid;
                //                    //for cinemas
                //                    $.ajax({
                //                        url: '/cinema/' + cinemaid,
                //                        method: 'get',
                //
                //
                //                    }).done((data) => {
                //                        var cinema = data;
                //                        console.log(data);
                //                        load(cm, timing, cinema);
                //
                //                    }).fail((err) => {
                //                        console.log(err.responseText);
                //                    })
                //
                //
                //                }).fail((err) => {
                //                    console.log(err.responseText);
                //                })




            }).fail((err) => {
                console.log(err.responseText);
            })





        })

    }
})

function load(cm) {
    var title = cm.title;
    var article = $("<article>");
    var h1 = $("<h1>");
    var divr = $("<divl class='divr'>");
    h1.append(cm.title);
    divr.append(h1);
    divr.append(cm.overview);
    divr.append("<br><a href='details?id=" + cm.id + "'>View More</a>");
    article.append("<img src='https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + cm.poster_path + "' />");
    article.append(divr);
    $(".photogallery").append(article);
    console.log(title);
}
//
//function load(cm, timing, cinema) {
//    var title = cm.title;
//    var article = $("<article>");
//    var h1 = $("<h1>");
//    var divr = $("<divl class='divr'>");
//    h1.append(cm.title);
//    divr.append(h1);
//    divr.append(cm.overview);
//    divr.append("<br><a href='details?id=" + cm.id + "'>View More</a>");
//    $(".divr").append("<br>" + timing.time);
//    $(".divr").append(cinema.name);
//    $(".divr").append(cinema.location);
//    article.append("<img src='https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + cm.poster_path + "' />");
//    article.append(divr);
//    $(".photogallery").append(article);
//    console.log(title);
//}
