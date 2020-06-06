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
    $(".searchBtn").on('click', () => {
        var searchText = $("#searchText").val();
        var option = $("#option").val();
        console.log(searchText);
        window.location.href = ".?searchText=" + searchText + "&option=" + option;
    })
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
                load(data, current);
            }).fail((err) => {
                console.log(err.responseText);
            })





        })

    }
    $("#searchBTN").on('click', () => {
        $.ajax({
                url: "/getmovietime",
                method: 'post',
                data: {
                    timeId: $("#time").val()
                }
            })
            .done((data) => {
                $('.photogallery').empty();
                if (data.length) {
                    $.each(data, function (key, movieid) {
                        var id = movieid.movieid;
                        var cinemaId = movieid.cinema;
                        $.ajax({
                                url: 'https://api.themoviedb.org/3/movie/' + id + '?api_key=343f078c30e5ffe3c08cc3da703c7633&language=en-US',
                                method: 'get',
                                data: {
                                    searchText: $("#searchText").val()
                                }

                            }).done((data) => {
                                loadSearch(data, cinemaId);
                            })
                            .fail((err) => {
                                console.log(err.responseText);
                            })
                    })
                } else {
                    $(".photogallery").append("No movie avaiable at this timing");
                }
            })
            .fail((err) => {
                console.log(err.responseText);
            })
    })
    var userId = sessionStorage.getItem("userId");
    $.ajax({
            url: "/getmovietime",
            method: 'get'
        })
        .done((data) => {
            loadTime(data);
        })
        .fail((err) => {
            console.log(err.responseText);
        })
})

function loadTime(data) {
    $("#time").empty();
    $.each(data, function (key, time) {
        $("#time").append("<option value=" + time._id + ">" + time.time + "</option>");
    })
}

function loadSearch(movie, Id) {
    var Id = Id;
    $.ajax({
            url: '/getCinema',
            method: 'post',
            data: {
                cinemaId: Id
            }

        }).done((data) => {
            console.log(data);
            var title = movie.title;
            var article = $("<article>");
            var h1 = $("<h1>");
            var divr = $("<divl class='divr'>");
            h1.append(movie.title);
            divr.append(h1);
            divr.append(movie.overview);
            divr.append("<br><a href='details?id=" + movie.id + "'>View More</a>");
            article.append("<img src='https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + movie.poster_path + "' />");
            divr.append("<h3>Cinema:" + data.name + "</h3>");
            divr.append("<h3>Location:" + data.location + "</h3>");
            article.append(divr);
            $(".photogallery").append(article);
            console.log(title);
        })
        .fail((err) => {
            console.log(err.responseText);
        })

    //    })
}

function load(cm, c) {
    var title = cm.title;
    var article = $("<article>");
    var h1 = $("<h1>");
    var divr = $("<divl class='divr'>");
    h1.append(cm.title);
    divr.append(h1);
    divr.append(cm.overview);
    divr.append("<br><a href='details?id=" + cm.id + "'>View More</a>");
    divr.append("<h5> Time:" + c.timing.time + "</h5>");
    divr.append("<h5> Cinema:" + c.cinema.name + "</h5>");
    divr.append("Location:" + c.cinema.location);
    article.append("<img src='https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + cm.poster_path + "' />");
    article.append(divr);
    $(".photogallery").append(article);
    console.log(title);
}
