$(document).ready(() => {
    if (sessionStorage.getItem("userId") != null) {
        alert("Already logged in. Please log out.");
        window.location.href = "./";
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
            alert("Log out successfully")

        });
    }
    $(".searchBtn").on('click', () => {
        var searchText = $("#searchText").val();
        var option = $("#option").val();
        console.log(searchText);
        window.location.href = ".?searchText=" + searchText + "&option=" + option;
    })
    $("#login").on('submit', () => {
        var user = {
            name: $("#name").val(),
            password: $("#psw").val()
        };
        $.ajax({
            url: '/login',
            method: 'post',
            data: user
        }).done((data) => {
            //            if (data.length) {
            alert("Login successfully");
            sessionStorage.setItem("userId", data._id);
            window.location.href = "./";
            console.log("hi");
            //            } else {
            //                console.log("null");
            //                alert("Login failed, please check your username and password");
            //            }
        }).fail((err) => {
            console.log("login falied");
            alert("Login falied, please try again!");
            $(".statusMessage").text(err.responseText);
        });

    })
})
