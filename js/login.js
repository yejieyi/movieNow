$(document).ready(() => {
    $(".searchBtn").on('click', () => {
        var searchText = $("#searchText").val();
        console.log(searchText);
        window.location.href = ".?searchText=" + searchText;
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
            if (data.length) {
                alert("Login successfully");
                window.location.href = "./";
                console.log("hi");
            } else {
                console.log("null");
                alert("Login failed, please check your username and password");
            }
        }).fail((err) => {
            console.log("login falied");
            $(".statusMessage").text(err.responseText);
        });

    })
})
