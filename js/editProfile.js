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
            url: "/users/" + userId,
            method: 'get'
        })
        .done((data) => {
            $('#name').val(data.name);
            $('#email').val(data.email);
            $('#phoneNumber').val(data.phoneNumber);
            $('#password').val(data.password);
        })
        .fail((err) => {
            console.log(err.responseText);
        })


    $(".editProfileBtn").on('click', () => {
        var user = {
            id: userId,
            name: $("#name").val(),
            email: $("#email").val(),
            phoneNumber: $("#phoneNumber").val(),
            password: $("#password").val()
        };
        $.ajax({
            url: '/users',
            method: 'put',
            data: user
        }).done((data) => {
            $(".statusMessage").text(data);
        }).fail((err) => {
            $(".statusMessage").text(err.responseText);
        });
    })
})
