$(document).ready(() => {
    if (sessionStorage.getItem("userId") == undefined) {
        window.location.href = "./";
        alert("Please Login");
    }
    $(".searchBtn").on('click', () => {
        var searchText = $("#searchText").val();
        var option = $("#option").val();
        console.log(searchText);
        window.location.href = ".?searchText=" + searchText + "&option=" + option;
    })
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
    var userId = sessionStorage.getItem("userId");
    console.log(userId);

    $.ajax({
            url: "/getfavourites/" + userId,
            method: 'get'
        })
        .done((data) => {
            loadFavourites(data);
        })
        .fail((err) => {
            console.log(err.responseText);
        })
})

function loadFavourites(data) {
    $('.favourites').empty();
    $.each(data, function (key, favourite) {
        console.log(data);
        $.ajax({
            url: 'https://api.themoviedb.org/3/movie/' + favourite.movieid + '?api_key=343f078c30e5ffe3c08cc3da703c7633&language=en-US',
            method: 'get'

        }).done((data) => {
            var title = data.title;
            var article = $("<article>");
            var h1 = $("<h1>");
            var divr = $("<divl class='divr'>");
            h1.append(data.title);
            divr.append(h1);
            divr.append(data.overview);
            divr.append("<br><a href='details?id=" + data.id + "'>View More</a>");
            article.append("<img src='https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + data.poster_path + "' />");
            article.append(divr);
            $(".favourites").append(article);
            console.log(title);
        }).fail((err) => {
            console.log(err.responseText);
        })

    })

}
