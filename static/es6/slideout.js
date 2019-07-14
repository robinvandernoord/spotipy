// used for sliding menu

function slide() {
    $('#mySidenav').toggleClass('toggled');
    $('#main').toggleClass('toggled');
}

$(() => {
    $('#navbartoggler, #mySidenav .closebtn').on('click', slide);

    if ($('#mySidenav').length) {
        $('#navbartoggler').show();
    }
});

$('.navbar-item.has-dropdown').on('click', function () {
    $(this).toggleClass('is-active')
});

$('.navbar-burger').on('click', function () {
    console.log('this', this);
    $(this).toggleClass('is-active');
    $(this).parent().siblings().toggleClass('is-active');
})