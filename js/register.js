$(document).ready(() => {
    $(".searchBtn").on('click', () => {
        var searchText = $("#searchText").val();
        console.log(searchText);
        window.location.href = ".?searchText=" + searchText;
    })
    $("#login").on('submit', () => {
        var user = {
            name: $("#name").val(),
            password: $("#psw").val(),
            email: $("#email").val(),
            phoneNumber: $("#phoneNumber").val()
        };
        $.ajax({
            url: '/users',
            method: 'post',
            data: user
        }).done((data) => {
            $(".statusMessage").text("User added successfully!");
            alert("Register successfully");
            window.location.href = "./";
        }).fail((err) => {
            alert("error register user");
            console.log("hello");
            $(".statusMessage").text(err.responseText);
        });

    })
})
