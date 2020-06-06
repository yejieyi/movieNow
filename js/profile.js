$(document).ready(() => {
    if (sessionStorage.getItem("userId") == undefined) {
        window.location.href = "./";
        alert("Please Login");
    }
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
    var userId = sessionStorage.getItem("userId");
    console.log(userId);

    $.ajax({
            url: "/users/" + userId,
            method: 'get'
        })
        .done((data) => {
            loadUser(data);
        })
        .fail((err) => {
            console.log(err.responseText);
        })
})

function loadUser(data) {
    $('.users').empty();
    //    $(".users").append("User ID: " + data._id + "<br/>");
    $(".users").append("Name: " + data.name + "<br/>");
    $(".users").append("Password: " + data.password + "<br/>");
    $(".users").append("Email: " + data.email + "<br/>");
    $(".users").append("Phone Number: " + data.phoneNumber + "<br/>");
}
