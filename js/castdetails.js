$(document).ready(() => {
    $(".searchBtn").on('click', () => {
        var searchText = $("#searchText").val();
        console.log(searchText);
        window.location.href = ".?searchText=" + searchText;
    })
    var id = $.urlParam('id');
    console.log(id);
    $.ajax({
        url: 'https://api.themoviedb.org/3/person/' + id + '?api_key=343f078c30e5ffe3c08cc3da703c7633&language=en-U',
        method: 'get',
        data: {
            searchText: $("#searchText").val()
        }

    }).done((data) => {
        var old = data;
        //        console.log(old);
        loadSearch(old);
        //        $.ajax({
        //            url: 'https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=343f078c30e5ffe3c08cc3da703c7633&language=en-US',
        //            method: 'get',
        //            data: {
        //                searchText: $("#searchText").val()
        //            }
        //
        //        }).done((data) => {
        //            var key = data.results[0].key;
        //            $.ajax({
        //                url: 'https://api.themoviedb.org/3/movie/' + id + '/recommendations?api_key=343f078c30e5ffe3c08cc3da703c7633&language=en-US&page=1',
        //                method: 'get',
        //                data: {
        //                    searchText: $("#searchText").val()
        //                }
        //
        //            }).done((data) => {
        //                var list = data.results;
        //                $.ajax({
        //                    url: 'https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=343f078c30e5ffe3c08cc3da703c7633',
        //                    method: 'get',
        //                    data: {
        //                        searchText: $("#searchText").val()
        //                    }
        //
        //                }).done((data) => {
        //                    loadSearch(old, key, list, data.cast);
        //                })
        //
        //            })

        //        })
        //            /* same codes from lines 4 – 17. *///            var results = JSON.parse(data).results;

    }).fail((err) => {
        console.log(err.responseText);
    })
})

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

function loadSearch(person) {
    console.log(person);
    var article = $("<article>");
    if (person.profile_path != null) {
        var i = "<img src = 'https://image.tmdb.org/t/p/w138_and_h175_face" + person.profile_path;
    } else {
        var i = "<img width='138' height='175' src ='../images/profile.jpg' ";
    }
    article.append(i + "' />");
    var divr = $("<divl class='divr'>");
    divr.append("<h1>" + person.name + "</h1>");
    divr.append("<h4>" + person.birthday + "</h4>");
    divr.append("<p>" + person.biography + "</p>");
    article.append(divr);
    $(".photogallery").append(article);

}
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}
