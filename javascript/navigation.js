$(document).ready(function () {
    $(window).scroll(function () {
        var scrollVal = $(this).scrollTop();
        var viewportWidth = $(window).width();
		var viewportHeight = $(window).height();

        //look at the width of the window and place nav bar accordingly
        if (window.innerWidth > 850) {
        	if (scrollVal > 350) {
                $(document).ready(function(){
        		    $('#nav').css({ 'position': 'fixed', 'top': '0px' });
                    $("#fabID").fadeIn(250);
                });
        	} else {
                $(document).ready(function(){
            		$('#nav').css({ 'position': 'absolute', 'top': '350px' });
                    $("#fabID").fadeOut(250);
                });
        	}
        }

        if (window.innerWidth <= 850) {
        	if (scrollVal > 290) {
                $(document).ready(function(){
                	$('#nav').css({ 'position': 'fixed', 'top': '0px' });
                    $("#fabID").fadeIn(250);
                });
        	} else {
            	$(document).ready(function(){
                    $('#nav').css({ 'position': 'absolute', 'top': '295px' });
                    $("#fabID").fadeOut(250);
                });
        	}
        }

        if (window.innerWidth <=480) {
        	if (scrollVal > 290) {
                $(document).ready(function(){
                    $('#nav').css({ 'position': 'fixed', 'top': '0px' });
                    $("#fabID").fadeIn(250);
                });
        	} else {
            	$(document).ready(function(){
                    $('#nav').css({ 'position': 'absolute', 'top': '290px' });
                    $("#fabID").fadeOut(250);
                });
        	}
        }

        if (window.innerWidth <= 373) {
        	if (scrollVal > 290) {
                $(document).ready(function(){
                    $('#nav').css({ 'position': 'fixed', 'top': '0px' });
                    $("#fabID").fadeIn(250);
                });
        	} else {
            	$(document).ready(function(){
                    $('#nav').css({ 'position': 'absolute', 'top': '290px' });
                    $("#fabID").fadeOut(250);
                });
        	}
        }
    });
});

