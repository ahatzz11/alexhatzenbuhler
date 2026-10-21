$(document).ready(function () {
    var $nav = $('#nav');
    var $header = $('.headerBlock');
    if (!$nav.length || !$header.length) {
        return;
    }

    var navTop = 0;     // where the nav sits before it sticks to the top

    // place the nav from the real header size instead of fixed pixel values,
    // so a wrapped name or wrapped nav links never cover the header or content
    function placeNav() {
        // drop old inline values so the css media queries give the default spot
        $nav.css({ 'position': '', 'top': '' });
        $header.css('margin-bottom', '');

        // keep the css spot, but never over the name and never below the header
        var cssTop = parseInt($nav.css('top'), 10) || 0;
        var headerBottom = $header.offset().top + $header.outerHeight();
        var h1 = $header.find('h1')[0];
        var nameBottom = 0;
        if (h1) {
            // measure the text itself, the h1 box runs to the header bottom on phones
            var range = document.createRange();
            range.selectNodeContents(h1);
            nameBottom = Math.ceil(range.getBoundingClientRect().bottom + $(window).scrollTop());
        }
        navTop = Math.round(Math.min(headerBottom, Math.max(nameBottom + 8, cssTop)));

        // keep the same gap between the nav and the first section at every size
        var cssMargin = parseInt($header.css('margin-bottom'), 10) || 0;
        var neededMargin = navTop + $nav.outerHeight() + 35 - $header.outerHeight();
        $header.css('margin-bottom', Math.max(cssMargin, neededMargin) + 'px');

        stickNav();
    }

    function stickNav() {
        if ($(window).scrollTop() > navTop) {
            $nav.css({ 'position': 'fixed', 'top': '0px' });
            $("#fabID").fadeIn(250);
        } else {
            $nav.css({ 'position': 'absolute', 'top': navTop + 'px' });
            $("#fabID").fadeOut(250);
        }
    }

    placeNav();
    $(window).on('load resize orientationchange', placeNav);
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(placeNav);
    }
    $(window).scroll(stickNav);
});
