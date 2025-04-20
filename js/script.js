/*
Author       : Code-Theme
Template Name: Find Houses - HTML5 Template
Version      : 1.0
*/

console.log("Script.js is running on this page.");

"use strict";

jQuery(document).on('ready', function ($) {

    /*---------------------------------
     //------ PRELOADER ------//
     ----------------------------------*/
    $('#status').fadeOut();
    $('#preloader').delay(200).fadeOut('slow');

    /*---------------------------------
     //------ ANIMATE HEADER ------//
     ----------------------------------*/
    /*$(window).on('scroll', function () {
        var sticky = $(".sticky-header");
        var scroll = $(window).scrollTop();
        if (scroll < 265) {
            sticky.removeClass("sticky");
        } else {
            sticky.addClass("sticky");
        }
    });*/
    

    /*$(window).on('scroll', function () {
        var sticky = $("#header-container");
        var scroll = $(window).scrollTop();
        if (scroll < 265) {
            sticky.removeClass("sticky");
        } else {
            sticky.addClass("sticky");
        }
    }); */
    $(document).ready(function () {
        console.log("Script.js loaded on: " + window.location.pathname);
    
        // Check if the current page is index.html (home page)
        if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
            console.log("Home page detected. Sticky navbar script is disabled.");
            return; // Exit script early to avoid duplication on home page
        }
    
        $(window).on('scroll', function () {
            var sticky = $("#header-container"); // Target the header container
            var scroll = $(window).scrollTop();
    
            console.log("Scroll position: " + scroll); // Debugging
    
            if (scroll > 50) {  // Change navbar when scrolling down 50px
                if (!sticky.hasClass("sticky")) {
                    sticky.addClass("sticky");
                    console.log("Sticky class added.");
                }
            } else {
                if (sticky.hasClass("sticky")) {
                    sticky.removeClass("sticky");
                    console.log("Sticky class removed.");
                }
            }
        });
    });
    
    /*---------------------------------
     //------ Rev Slider ------//
     ----------------------------------*/
    var tpj = jQuery;
    var revapi18;
    if (tpj("#rev_slider_18_1").revolution === undefined) {
        revslider_showDoubleJqueryError("#rev_slider_18_1");
    } else {
        revapi18 = tpj("#rev_slider_18_1").show().revolution({
            sliderType: "carousel",
            jsFileLocation: "revolution/js/",
            sliderLayout: "fullwidth",
            dottedOverlay: "none",
            delay: 9000,
            navigation: {
                keyboardNavigation: "off",
                keyboard_direction: "horizontal",
                mouseScrollNavigation: "off",
                mouseScrollReverse: "default",
                onHoverStop: "on",
                thumbnails: {
                    style: "gyges",
                    enable: true,
                    width: 50,
                    height: 50,
                    min_width: 50,
                    wrapper_padding: 5,
                    wrapper_color: "transparent",
                    tmp: '<span class="tp-thumb-img-wrap">  <span class="tp-thumb-image"></span></span>',
                    visibleAmount: 5,
                    hide_onmobile: false,
                    hide_over: 1240,
                    hide_onleave: false,
                    direction: "horizontal",
                    span: false,
                    position: "inner",
                    space: 5,
                    h_align: "center",
                    v_align: "top",
                    h_offset: 0,
                    v_offset: 20
                },
                tabs: {
                    style: "gyges",
                    enable: true,
                    width: 220,
                    height: 80,
                    min_width: 220,
                    wrapper_padding: 0,
                    wrapper_color: "transparent",
                    tmp: '<div class="tp-tab-content">  <span class="tp-tab-date">{{param1}}</span>  <span class="tp-tab-title">{{title}}</span></div><div class="tp-tab-image"></div>',
                    visibleAmount: 6,
                    hide_onmobile: true,
                    hide_under: 1240,
                    hide_onleave: false,
                    hide_delay: 200,
                    direction: "vertical",
                    span: true,
                    position: "inner",
                    space: 0,
                    h_align: "left",
                    v_align: "center",
                    h_offset: 0,
                    v_offset: 0
                }
            },
            carousel: {
                horizontal_align: "center",
                vertical_align: "center",
                fadeout: "off",
                maxVisibleItems: 5,
                infinity: "on",
                space: 0,
                stretch: "off",
                showLayersAllTime: "off",
                easing: "Power3.easeInOut",
                speed: "800"
            },
            responsiveLevels: [1240, 1024, 778, 480],
            visibilityLevels: [1240, 1024, 778, 480],
            gridwidth: [800, 700, 400, 300],
            gridheight: [600, 600, 500, 400],
            lazyType: "single",
            shadow: 0,
            spinner: "off",
            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,
            shuffle: "off",
            autoHeight: "off",
            hideThumbsOnMobile: "off",
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            debugMode: false,
            fallbacks: {
                simplifyAll: "off",
                nextSlideOnWindowFocus: "off",
                disableFocusListener: false,
            }
        });
    }

    /*----------------------------------
    //------ SMOOTHSCROLL ------//
    -----------------------------------*/
    smoothScroll.init({
        speed: 1000, // Integer. How fast to complete the scroll in milliseconds
        offset: 200, // Integer. How far to offset the scrolling anchor location in pixels

    });

    /*----------------------------------
    //------ LIGHTCASE ------//
    -----------------------------------*/
    $('a[data-rel^=lightcase]').lightcase();


    /*----------------------------------
    //------ ISOTOPE GALLERY ------//
    -----------------------------------*/
    /* activate jquery isotope */
    $(window).on('load', function () {
        var $container = $('.portfolio-items').isotope({
            itemSelector: '.item',
            masonry: {
                columnWidth: '.col-xs-12'
            }
        });
    });
    // init Isotope
    var $grid = $('.portfolio-items').isotope({
        // options...
    });
    // layout Isotope after each image loads
    $grid.imagesLoaded().progress(function () {
        $grid.isotope('layout');
    });
    // bind filter button click
    var filters = $('.filters-group ul li');
    filters.on('click', function () {
        filters.removeClass('active');
        $(this).addClass('active');
        var filterValue = $(this).attr('data-filter');
        // use filterFn if matches value
        $('.portfolio-items').isotope({
            filter: filterValue
        });
    });

    /*----------------------------------
    //------ OWL CAROUSEL ------//
    -----------------------------------*/
    $('.style1').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 1,
                margin: 20
            },
            500: {
                items: 1,
                margin: 20
            },
            768: {
                items: 2,
                margin: 20
            },
            991: {
                items: 2,
                margin: 20
            },
            1025: {
                items: 3,
                margin: 20
            }
        }
    });

    $('.style2').owlCarousel({
        loop: true,
        margin: 0,
        dots: false,
        autoWidth: false,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
            0: {
                items: 2,
                margin: 20
            },
            400: {
                items: 2,
                margin: 20
            },
            500: {
                items: 3,
                margin: 20
            },
            768: {
                items: 4,
                margin: 20
            },
            992: {
                items: 5,
                margin: 20
            },
            1000: {
                items: 6,
                margin: 20
            }
        }
    });

    $('.style3').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 1,
                margin: 20
            },
            500: {
                items: 1,
                margin: 20
            },
            768: {
                items: 2,
                margin: 20
            },
            991: {
                items: 2,
                margin: 20
            },
            1000: {
                items: 5,
                margin: 20
            }
        }
    });

    $('.carousel4').owlCarousel({
        autoPlay: false,
        navigation: true,
        slideSpeed: 600,
        items: 3,
        itemsDesktop: [1239, 3],
        itemsTablet: [991, 2],
        itemsMobile: [767, 1]
    });

    /*----------------------------------
    //------ TOP LOCATION ------//
    -----------------------------------*/
    if ($('#tp-carousel').length) {
        $('#tp-carousel').owlCarousel({
            loop: true,
            margin: 2,
            dots: false,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                600: {
                    items: 2,
                    nav: true
                },
                1024: {
                    items: 3,
                    nav: true
                },
                1025: {
                    items: 5,
                    nav: true,
                    loop: false
                }
            }
        })
    }

    /*----------------------------------
    //------ JQUERY SCROOLTOP ------//
    -----------------------------------*/
    var go = $(".go-up");
    $(window).on('scroll', function () {
        var scrolltop = $(this).scrollTop();
        if (scrolltop >= 50) {
            go.fadeIn();
        } else {
            go.fadeOut();
        }
    });

    /*----------------------------------
    //----- JQUERY COUNTER UP -----//
    -----------------------------------*/
    $('.counter').counterUp({
        delay: 10,
        time: 5000,
        offset: 100,
        beginAt: 0,
        formatter: function (n) {
            return n.replace(/,/g, '.');
        }
    });

    /*----------------------------------
    //------ MAGNIFIC POPUP ------//
    -----------------------------------*/
    /*$(document).ready(function () {
        $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    });

    

    /*----------------------------------------------
    //------ FILTER TOGGLE (ON GOOGLE MAPS) ------//
    ----------------------------------------------*/
    $('.filter-toggle').on('click', function () {
        $(this).parent().find('form').stop(true, true).slideToggle();
    });

    /*----------------------------------
    //------ RANGE SLIDER ------//
    -----------------------------------*/
    $(".slider-range").slider({
        range: true,
        min: 5000,
        max: 200000,
        step: 1000,
        values: [60000, 130000],
        slide: function (event, ui) {
            $(".slider_amount").val("$" + ui.values[0].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " - $" + ui.values[1].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
        }
    });
    $(".slider_amount").val("Price Range: $" + $(".slider-range").slider("values", 0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " - $" + $(".slider-range").slider("values", 1).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    
    /*----------------------------------
    //------ MODAL ------//
    -----------------------------------*/
    var modal = {};
    modal.hide = function () {
        $('.modal').fadeOut();
        $("html, body").removeClass("hid-body");
    };
    $('.modal-open').on("click", function (e) {
        e.preventDefault();
        $('.modal').fadeIn();
        $("html, body").addClass("hid-body");
    });
    $('.close-reg').on("click", function () {
        modal.hide();
    });
    
    /*----------------------------------
    //------ TABS ------//
    -----------------------------------*/
    $(".tabs-menu a").on("click", function (a) {
        a.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var b = $(this).attr("href");
        $(".tab-contents").not(b).css("display", "none");
        $(b).fadeIn();
    });

// Login form submission (for modal login)
$('#login-form').submit(function(e) {
    e.preventDefault();

    const $form = $(this);
    const $btn = $form.find('button[type="submit"]');
    $btn.prop('disabled', true).text('Logging in...');

    $.ajax({
        type: "POST",
        url: "login-process.php",
        data: $form.serialize(),
        success: function(response) {
            $btn.prop('disabled', false).text('Log In');

            if (response.trim() === "success") {
                $('#registration-success').hide(); // Just in case
                $('<div class="text-success mb-3">Login successful! Redirecting...</div>').insertBefore($btn);
                setTimeout(() => window.location.href = "user-profile.html", 1500);
            } else {
                $('<div class="text-danger mb-3">Login failed: ' + response + '</div>').insertBefore($btn);
            }
        },
        error: function(xhr) {
            $btn.prop('disabled', false).text('Log In');
            $('<div class="text-danger mb-3">Server error. Please try again later.</div>').
            insertBefore($btn);
        }
    });
});
    
 // Registration form submission
$('#main-register-form2').submit(function(e) {
    e.preventDefault();

    const $form = $(this);
    const $btn = $form.find('button[type="submit"]');

    // Clear any existing messages
    $('.text-danger, .text-success').remove();

    $btn.prop('disabled', true).text('Registering...');

    $.ajax({
        type: "POST",
        url: "register-process.php",
        data: $form.serialize(),
        success: function(response) {
            $btn.prop('disabled', false).text('Register');

            // Clear again just in case of race condition
            $('.text-danger, .text-success').remove();

            if (response.trim() === "success") {
                $('<div class="text-success mb-3">Registration successful! Redirecting to login...</div>')
                    .insertBefore($btn);
                setTimeout(() => window.location.href = "login.html", 2000);
            } else {
                $('<div class="text-danger mb-3">Registration failed: ' + response + '</div>')
                    .insertBefore($btn);
            }
        },
        error: function(xhr) {
            $btn.prop('disabled', false).text('Register');
            $('.text-danger, .text-success').remove();
            $('<div class="text-danger mb-3">Server error. Please try again later.</div>')
                .insertBefore($btn);
        }
    });
});

    
}(jQuery));
