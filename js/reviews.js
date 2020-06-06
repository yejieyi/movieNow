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
            url: "/getreviews/" + userId,
            method: 'get'
        })
        .done((data) => {
            loadReviews(data);
        })
        .fail((err) => {
            console.log(err.responseText);
        })
})

function loadReviews(data) {
    $('.users').empty();
    $.each(data, function (key, review) {
        $.ajax({
            url: 'https://api.themoviedb.org/3/movie/' + review.movieid + '?api_key=343f078c30e5ffe3c08cc3da703c7633&language=en-US',
            method: 'get',
            data: {
                searchText: $("#searchText").val()
            }

        }).done((data) => {
            //            /* same codes from lines 4 – 17. *///            var results = JSON.parse(data).results;
            //            loadSearch(data.results);
            //    $(".users").append("User ID: " + data._id + "<br/>");
            $(".users").append("Movie Name: <a href='details?id=" + data.id + "'>" + data.title + "</a><br/>");
            $(".users").append("Rank: " + review.rank + "<br/>");
            $(".users").append("Review: " + review.review + "<br/><br>");
        }).fail((err) => {
            console.log(err.responseText);
        })

    })

}
