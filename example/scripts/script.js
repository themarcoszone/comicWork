
$(document).ready(function () {
    //si es el primer ingreso populo la lista de usuarios
    if (localStorage.getItem("usersList") == null) {
        localStorage.setItem("usersList", JSON.stringify([
        { "username": "test", "firstname": "John", "lastName": "Snow", "type": "user", "password": "123" },
        { "username": "admin", "firstname": "anakin", "lastName": "skywalker", "type": "admin", "password": "123" }]));
    }
    if (localStorage.getItem("comicsList") == null) {
        localStorage.setItem("comicsList", JSON.stringify([
        { "character": "batman", "publisher": "DC", "genre": "superhero", "rating": "4", "edition": "standard", "title": "knightfall", "number": "622", "cover": "Batman_Knightfall_Broken_Bat_2002_Edition.jpg", "available": "true", "id": "0" },
        { "character": "batman", "publisher": "DC", "genre": "superhero", "rating": "5", "edition": "standard", "title": "Death in the family", "number": "305", "cover": "Batman_Death_in_the_Family.jpg", "available": "true", "id": "1" },
        { "character": "spiderman", "publisher": "Marvel", "genre": "superhero", "rating": "3", "edition": "standard", "title": "avenging spiderman", "number": "1", "cover": "Avenging_SpiderMan_1_Cover.jpg", "available": "true", "id": "2" },
        { "character": "x-men", "publisher": "Marvel", "genre": "superhero", "rating": "5", "edition": "collector", "title": "A legend reborn", "number": "1", "cover": "X-Men_Vol_2_1_Magneto_Variant.jpg", "available": "true", "id": "3" },
        { "character": "spawn", "publisher": "Image Comics", "genre": "superhero", "rating": "3", "edition": "collector", "title": "Milestone", "number": "100", "cover": "2171682-spawn__117__2002_.jpg", "available": "false", "id": "4" },
        { "character": "creepy comics", "publisher": "Dark Horse", "genre": "horror", "rating": "2", "edition": "standard", "title": "Family values", "number": "4", "cover": "4802806-04.jpg", "available": "true", "id": "5" },
        { "character": "How to pass as human being", "publisher": "Dark Horse", "genre": "non-fiction", "rating": "2", "edition": "standard", "title": "How to pass as human being", "number": "1", "cover": "4802031-01.jpg", "available": "true", "id": "6" }]));
    }

    /*TODO: verificar si hay un usuario loguado en la sesion*/

    document.getElementById('btnLogin').onclick = function () {
        var user = $('#txtLogUser').val(), pass = $('#txtLogPass').val();
        var users = JSON.parse(localStorage.getItem('usersList'));
        if (user == '' || pass == '') {
            if (user == '') {
                $("#lblLogUser").text("Campo requerido");
                document.getElementById("lblLogUser").style.display = 'block';
            }
            if (pass == '') {
                $("#lblLogPass").text("Campo requerido");
                document.getElementById("lblLogPass").style.display = 'block';
            }
            return false;
        }
        else {
            if (users != null) {
                for (i = 0; i < users.length; i++) {
                    if (users[i].username == user && users[i].password == pass) {
                        sessionStorage.setItem("logged_user", JSON.stringify(users[i]));
                        $("#log_anchor").text('Welcome ' + user);
                        document.getElementById('log_anchor').onclick = null;
                        $('#out_anchor').css('display', 'block');
                        closePopup('loginPopUp');
                        if (users[i].type == 'admin') {
                            $('.admin').css('display', 'block');
                        }
                        $('#_profile').css('display', 'block');
                        return true;
                    }
                }
                $("#lblError").text("Usuario o contraseña incorrectos");
                document.getElementById("lblError").style.display = 'block';
                return false;
            }
            else {
                $("#lblError").text("Usuario o contraseña incorrectos");
                document.getElementById("lblError").style.display = 'block';
                return false;
            }
        }
    }

    document.getElementById('btnRegister').onclick = function () {
        var name = $('#txtName').val(), last = $('#txtLastName').val(), user = $('#txtUser').val(), pass = $('#txtPass').val(), pass2 = $('#txtPass2').val(), admin = $('chkAdmin').is(':checked') == true ? "admin" : "user";
        var users = JSON.parse(localStorage.getItem('usersList'));
        var error = 0;
        if (users != null) {
            for (i = 0; i < users.length; i++) {
                if (users[i].username == user) {
                    $('#lblErrorUser').text("Lo sentimos el username ya existe");
                    document.getElementById("lblErrorUser").style.display = 'block';
                    error++;
                }
            }
        }
        else {
            users = [];
        }
        if (user == '') {
            $('#lblErrorUser').text("Campo requerido");
            document.getElementById("lblErrorUser").style.display = 'block';
            error++;
        }
        if (name == '') {
            $('#lblErrorName').text("Campo requerido");
            document.getElementById("lblErrorName").style.display = 'block';
            error++;
        }
        if (last == '') {
            $('#lblErrorLast').text("Campo requerido");
            document.getElementById("lblErrorLast").style.display = 'block';
            error++;
        }
        if (pass == '') {
            $('#lblErrorPass').text("Campo requerido");
            document.getElementById("lblErrorPass").style.display = 'block';
            error++;
        }
        if (pass2 == '') {
            $('#lblErrorPass2').text("Campo requerido");
            document.getElementById("lblErrorPass2").style.display = 'block';
            error++;
        }
        if (pass != pass2) {
            $('#lblError').text("Las contraseñas no coinciden");
            document.getElementById("lblError").style.display = 'block';
            error++;
        }
        if (!/^[a-zA-Z0-9]{7,}$/i.test(pass)) {
            $('#lblErrorPass').text("Formato invalido");
            document.getElementById("lblErrorPass").style.display = 'block';
            error++;
        }
        if (!/^[\w{.,'}+:?®©-]+$/i.test(user)) {
            $('#lblErrorUser').text("Formato invalido");
            document.getElementById("lblErrorUser").style.display = 'block';
            error++;
        }
        if (error == 0) {
            cleanSignUpErrors();
            users.push({ "username": user, "firstname": name, "lastName": last, "type": admin, "password": pass });
            localStorage.setItem("usersList", JSON.stringify(users));
            sessionStorage.setItem("logged_user", JSON.stringify(users[users.length - 1]));
            $("#log_anchor").text('Welcome ' + user);
            document.getElementById('log_anchor').onclick = null;
            $('#out_anchor').css('display', 'block');
            if (admin == 'admin') {
                $('.admin').css('display', 'block');
                $('#_profile').css('display', 'block');
            }
            closePopup('loginPopUp');
            return true;
        }
    }

    document.getElementById('btnLoan').onclick = function () {
        //TODO: levantar popup de login si no hay user registrado
        if (sessionStorage.getItem('logged_user') == null) {
            showPopup('loginPopUp');
            closePopup('detailsPopUp');
            showPopup('exitoPopUp');
        }
        else {
            var comics = JSON.parse(localStorage.getItem("comicsList"));
            var id = $('#lblHiddenID').text();
            for (i = 0; i < comics.length; i++) {
                if (comics[i].id == id && comics[i].available == "true") {
                    comics[i].available = "false";
                    localStorage.setItem("comicsList", JSON.stringify(comics));
                    closePopup('detailsPopUp');
                    showPopup('exitoPopUp');
                    return true;
                }
            }
        }
    }

    $('.popup').find('input, textarea').on('keyup blur focus', function (e) {

        var $this = $(this),
            label = $this.prev('label'),
            error = label.next().next();

        if (e.type === 'keyup') {
            if ($this.val() === '') {
                label.removeClass('active highlight');
            } else {
                label.addClass('active highlight');
                error.css('display', 'none');
            }
        } else if (e.type === 'blur') {
            if ($this.val() === '') {
                label.removeClass('active highlight');
            } else {
                label.removeClass('highlight');
            }
        } else if (e.type === 'focus') {

            if ($this.val() === '') {
                label.removeClass('highlight');
            }
            else if ($this.val() !== '') {
                label.addClass('highlight');
            }
        }

    });

    $('.tab a').on('click', function (e) {

        e.preventDefault();

        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');

        target = $(this).attr('href');

        $('.tab-content > div').not(target).hide();

        $(target).fadeIn(600);
        $("#lblError").text("");

    });

    $('.sort').click(function (e) {
        populate(e.target.text, e.target.parentElement.parentElement.parentElement.firstChild.title);
    });

    populate('', '');
});




function showPopup(popup) {
    document.getElementById(popup).style.display = 'block';
    $("#" + popup + "").fadeIn(500);
    $(".cover").fadeTo(500, 0.5).css('display', 'block');
}

function closePopup(popup) {
    document.getElementById(popup).style.display = 'none';
    $(".cover").css('display', 'none');
    cleanSignUp();
}

$(function () {
    $('.banner').unslider();
});

function populate(sort, category) {
    var comics = JSON.parse(localStorage.getItem("comicsList"));
    var parent = $('#latest');
    parent.empty();
    if (sort == '') {
        for (i = 0; i < comics.length; i++) {
            if (i == (comics.length - 1)) {
                a = '<article class="one_quarter lastbox"><figure onclick="showDetails(' + comics[i].id + ')"><img src="images/' + comics[i].cover + '" width="215" height="315" alt=""><figcaption>' + comics[i].character + ' - ' + comics[i].title + '</figcaption> </figure> </article>';
                parent.append(a);
            }
            else {
                a = '<article class="one_quarter"><figure onclick="showDetails(' + comics[i].id + ')"><img src="images/' + comics[i].cover + '" width="215" height="315" alt=""><figcaption>' + comics[i].character + ' - ' + comics[i].title + '</figcaption> </figure></article>';
                parent.append(a);
            }
        }
    }
    else {
        var filter = [];
        for (i = 0; i < comics.length; i++) {
            if (comics[i][category.toLowerCase()] == sort.toLowerCase()) {
                filter.push(comics[i]);
            }
        }
        for (i = 0; i < filter.length; i++) {
            if (i == (filter.length - 1)) {
                a = '<article class="one_quarter lastbox"><figure onclick="showDetails(' + filter[i].id + ')"><img src="images/' + filter[i].cover + '" width="215" height="315" alt=""><figcaption>' + filter[i].character + ' - ' + filter[i].title + '</figcaption> </figure></article>';
                parent.append(a);
            }
            else {
                a = '<article class="one_quarter"><figure onclick="showDetails(' + filter[i].id + ')"><img src="images/' + filter[i].cover + '" width="215" height="315" alt=""><figcaption>' + filter[i].character + ' - ' + filter[i].title + '</figcaption> </figure></article>';
                parent.append(a);
            }
        }
    }
}

function showDetails(id) {
    var comics = JSON.parse(localStorage.getItem("comicsList"));
    var a = comics[parseInt(id)];
    $('#detailsPopUp').css('display', 'block');
    //$(".popup").fadeIn(500);
    $(".cover").fadeTo(500, 0.5).css('display', 'block');
    $('#lblCharacter').text(a.character);
    $('#lblTitle').text(a.title);
    $('#lblGenre').text(a.genre);
    $('#lblNumber').text(a.number);
    $('#lblPublisher').text(a.publisher);
    $('#lblHiddenID').text(a.id);
    $("#details_img").attr("src", 'images/' + a.cover);
    $('span.stars').stars(parseInt(a.rating));
    $('#btnLoan').prop('disabled', a.available != 'true' ? true : false);
    a.available != 'true' ? $('#lblAvailable').css('display', 'block') : $('#lblAvailable').css('display', 'none');
    if (a.available != 'true') {
        $('#btnLoan').removeClass('button');
        $('#btnLoan').addClass('button_disabled');
    }
    else {
        if ($('#btnLoan').hasClass('button_disabled')) {
            $('#btnLoan').addClass('button');
            $('#btnLoan').removeClass('button_disabled');
        }
    }
}

function cleanSignUpErrors() {
    document.getElementById("lblErrorUser").style.display = 'none';
    document.getElementById("lblErrorPass").style.display = 'none';
    document.getElementById("lblError").style.display = 'none';
    document.getElementById("lblErrorLast").style.display = 'none';
    document.getElementById("lblErrorPass2").style.display = 'none';
    document.getElementById("lblErrorName").style.display = 'none';
}

function cleanSignUp() {
    $('#txtName').val("");
    $('#txtLastName').val("");
    $('#txtUser').val("");
    $('#txtPass').val("");
    $('#txtPass2').val("");
    $('chkAdmin').is(':checked') == false;
    cleanSignUpErrors();
}

function logout() {
    sessionStorage.removeItem("logged_user");
    location.reload();
}

function showProfile() {
    var u = JSON.parse(sessionStorage.getItem("logged_user"));
    $('#profilePopUp').css('display', 'block');
    //$(".popup").fadeIn(500);
    $(".cover").fadeTo(500, 0.5).css('display', 'block');
    $('#profchkAdmin').prop('disabled', false);
    $('#lblprofUser').text(u.username);
    $('#lblprofLast').text(u.lastName);
    $('#lblprofFirst').text(u.firstname);
    $('#profchkAdmin').prop('checked', u.type == 'admin' ? true : false);
    $('#profchkAdmin').prop('disabled', true);
}

$.fn.stars = function () {
    return $(this).each(function () {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, (Math.min(5, val))) * 16;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
}


