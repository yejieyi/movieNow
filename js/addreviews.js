$(document).ready(() => {
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
    var id = $.urlParam('id');
    var moviename = $.urlParam('name').replaceAll("%20", " ");
    $("#moviename").append(moviename);

    $(".addReview").on('click', () => {
        if ($("#review").val() == "") {
            alert("Please enter your review!");
        } else {
            var review = {
                movieid: id,
                userid: sessionStorage.getItem("userId"),
                rank: $("#rank").val(),
                review: $("#review").val()
            };
            console.log(review);
        }
        $.ajax({
            url: '/reviews',
            method: 'post',
            data: review
        }).done((data) => {
            alert("Review added successfully!");
            window.location.href = "./reviews";
        }).fail((err) => {
            $(".statusMessage").text(err.responseText);
        });
    })
})


$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

String.prototype.replaceAll = function (searchStr, replaceStr) {
    var str = this;

    // escape regexp special characters in search string
    searchStr = searchStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    return str.replace(new RegExp(searchStr, 'gi'), replaceStr);
};
