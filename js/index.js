$(document).ready(() => {
    if ($.urlParam('searchText') != null) {
        var searchText = $.urlParam('searchText');
        console.log(searchText);
        $.ajax({
            url: 'https://api.themoviedb.org/3/search/movie?api_key=343f078c30e5ffe3c08cc3da703c7633&language=en-US&query=' + searchText + '&page=1&include_adult=false',
            method: 'get',
            data: {
                searchText: $("#searchText").val()
            }

        }).done((data) => {
            //            /* same codes from lines 4 – 17. *///            var results = JSON.parse(data).results;
            loadSearch(data.results);
        }).fail((err) => {
            console.log(err.responseText);
        })
    }
    //    var socket = io.connect('http://localhost:3000');
    //    socket.on('allEvents', function (data) {
    //        $('.events').empty();
    //        $.each(data, function (key, event) {
    //            var start = new Date(event.start.date);
    //            var end = new Date(event.end.date);
    //
    //            $(".events").append("<h2><a href='/edit' id='" + event._id + "' class='eventLink'>" + event.name + "</a></h2>");
    //            var article = $("<article>");
    //            article.append(event.description);
    //            var period = $("<div>");
    //            period.append("Start: " + start.toLocaleDateString() + " " + event.start.time + "<br>");
    //            period.append("End: " + end.toLocaleDateString() + " " + event.end.time);
    //            article.append(period);
    //            $(".events").append(article);
    //        });
    //        $(".eventLink").on('click', (evt) => {
    //            var eventId = $(evt.target).attr('id');
    //            sessionStorage.setItem("eventId", eventId);
    //        });
    //
    //    });
    $(".searchBtn").on('click', () => {
        var searchText = $("#searchText").val();
        $.ajax({
            url: 'https://api.themoviedb.org/3/search/movie?api_key=343f078c30e5ffe3c08cc3da703c7633&language=en-US&query=' + searchText + '&page=1&include_adult=false',
            method: 'get',
            data: {
                searchText: $("#searchText").val()
            }

        }).done((data) => {
            //            /* same codes from lines 4 – 17. *///            var results = JSON.parse(data).results;
            loadSearch(data.results);
        }).fail((err) => {
            console.log(err.responseText);
        })

    });
})

function loadSearch(data) {
    console.log(data);
    $('.photogallery').empty();
    $.each(data, function (key, movie) {
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
        $(".photogallery").append(article);
        console.log(title);
    })
}
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results != null) {
        return results[1] || 0;
    } else {
        return null;
    }

}
