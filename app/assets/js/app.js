// Global variables go below here
//////////////////////////////////////////////////////////////////////
var pathname = window.location.origin + '/',
    siteurl = pathname,
    sectionIntro = $('#intro'),
    sliderWrap = $('#slider'),
    mainLogo = $('#intro .logo'),
    scrollTopId = $('#top'),
    pageLoader = $('.loading'),
    body = $('body'),
    mainContentWrapper = $('#content-primary');

var pathArray = window.location.pathname.split('/'),
    currentLocation = pathArray[1];

// Ajax goes here
//////////////////////////////////////////////////////////////////////
$(document).ready(function(){
 
    ajaxCall('.ajaxCall', '#guts', '#ghost', 200);
    addBodyClassBasedOnUrl();
    determineImageSizes();
 
});
 
var ajaxCall = function(link, container, guts, speed){
 
    var mainContent = $(container);
    var contents = $(guts);
    var makeCall = $(link);
    var checkBack = function() {
        $(window).on('popstate', function(){
           _link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
           loadContent(_link);
        });
    }
 
    makeCall.on("click", function(e) {
        _link = $(this).attr("href");
        history.pushState(null, null, _link);
        loadContent(_link);     
        e.preventDefault();
 
    });
 
    function loadContent(href){
        mainContent.find(guts).fadeOut(speed, function() {

          $('#content-primary').removeClass('home');
          $(body).removeClass('home');

            mainContent.hide().load(href + " " + guts, function() {

              addCurrentLoction(mainContentWrapper);
              addBodyClassBasedOnUrl();
              changeTitleBasedOnPage(mainContentWrapper, 'currentLoction', 'header h2.title', 'currentLocation');
              determineImageSizes();

                mainContent.fadeIn(speed, function() {
                   $(window).resize();

                    $('#full-width-slider').royalSlider({
                      arrowsNav: true,
                      imageScaleMode: 'fill',
                      loop: false,
                      controlNavigation: 'none',
                    });

                });
            });
        });
        checkBack();
    }
 
};










$(document).on('click', '#menu-close a', function(e) {
    $(mainContentWrapper).removeClass('active');
    e.preventDefault();
});










// Document ready elements go in here
//////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    hideElement(scrollTopId);
    hideAllImagesButFirst();
    scrollToTop(scrollTopId, mainContentWrapper, 1000);
    fullPageSlider();
    logoPositionOnScroll();
    fadeInTopButton();
});
// Menu Trigger to open and close menu
///////////////////////////////////////////////////////////////////////////////
var page = {
    container: $('#content-primary'),
    nav: $('#menu'),
    header: $('header')
}
var menu = {
    isClosed: true
}
$('#menu-trigger, #menu-close a, a.ajaxCall').on('click', function(e) {
    console.log('click');
    // if ($(mainContentWrapper).hasClass('active')) {
    //  $(mainContentWrapper).removeClass('active');
    // } else {
    //  $(mainContentWrapper).addClass('active');
    // }
    OpenAndCloseMenu();
    // console.log(menu);
    e.preventDefault();
});
// Window on load
//////////////////////////////////////////////////////////////////////
$(window).on('load', function() {
    changeTitleBasedOnPage(mainContentWrapper, 'currentLoction', 'header h2.title', 'currentLocation');
    changeTitleBasedOnPage(body, 'home', 'header h2.title', 'New Collection');
    addCurrentLoction(mainContentWrapper);
    // console.log('this happens');
});
// Window load & resize
//////////////////////////////////////////////////////////////////////
$(window).on('load resize', function() {
    determineImageSizes();
    loadMasonary();
});
// Functions Go Below Here
//////////////////////////////////////////////////////////////////////
function l(o) {
    console.log(o)
}

function hideElement(selectorName) {
    $(selectorName).hide();
}

function hideAllImagesButFirst() {
    var listOfImages = $('.images > div');
    var firstImage = listOfImages.first();
    if ($(firstImage).is(':first-child')) {
        $(firstImage).addClass('active');
    }
}

function scrollToTop(clickThis, animateThis, speed) {
    $('#top').click(function() {
        $('#content-primary').animate({
            'scrollTop': 0
        }, 1000, 'easeOutQuad');
    });
}

function fadeInTopButton(elementOnScroll, documentHeight, elementToFadeIn) {
    $('#content-primary').scroll(function() {
        userHasScrolled = $(this).scrollTop();
        docHeight = $('#ghost').height();
        windowHeight = $(window).height();
        buffer = 60;
        magicPoint = (docHeight - (windowHeight + buffer));
        if (userHasScrolled > magicPoint) {
            $('#top').fadeIn();
        } else {
            $('#top').fadeOut();
            // $(mainLogo).fadeOut();
        }
    });
}
$('#content-primary').scroll(function() {
    userHasScrolled = $(this).scrollTop();
    headerFromTop = $('header').offset().top;
    if (headerFromTop <= 0) {
        $('.collapse').addClass('hide');
        $(mainContentWrapper).addClass('hidden');
    } else if (headerFromTop <= 300) {
        $('#menu-trigger').addClass('active');
    }
});

function welcomeLoading(elementToHideAfterLoad, speed) {
    setTimeout(function() {
        $(elementToHideAfterLoad).addClass('hidden');
    }, speed);
}

// fadeInContent('#guts > *');



function fadeInContent(elementtoHide) {
    setTimeout(function() {
    // $(elementtoHide).fadeIn();
    // $('.loading').addClass('hidden');
  }, 1000);
}


function loadMasonary() {
    $('.masonry').masonry({
        isAnimated: false,
        animationOptions: {
            duration: 0,
            easing: 'linear',
            queue: false
        },
        columnWidth: '.grid-sizer',
        gutter: '.gutter-sizer',
        itemSelector: '.item'
    });
}

function addCurrentLoction(selectorName) {
    var pathArray = window.location.pathname.split('/'),
        currentLocation = pathArray[1];
    $(selectorName).removeClass(function() {
        $(selectorName).addClass(currentLocation);
        $(selectorName).addClass('content-primary');
    });
}

function changeTitleBasedOnPage(mainSelector, ifHasClass, editThisSelector, titleName) {
    pathArray = window.location.pathname.split('/'),
        currentLocation = pathArray[1];
    if ($(mainSelector).hasClass(ifHasClass)) {
        $(editThisSelector).html(titleName);
    } else {
        $(editThisSelector).html(currentLocation);
    }
}

function replaceImgForBgImg() {
    $(".item > img").each(function(i, elem) {
        var imgTitle = $(".item > h6"),
            img = $(elem),
            div = $("<div />").css({
                "background-image": "url(" + img.attr("src") + ")",
                "background-repate": "no-repeat",
                "background-size": "cover",
                "background-position": "center center"
            });
        div.html();
        img.replaceWith(div);
        $(div).parent().hover(function() {
            $(this).addClass('active');
        }, function() {
            $(this).removeClass('active');
        });
    });
}

function replaceHomeSliderImages() {
    if ($('#content-primary').hasClass('home')) {
        $(".rsContent > img").each(function(i, elem) {
            var img = $(elem);
            div = $("<div />").css({
                "background-image": "url(" + img.attr("src") + ")",
                "background-repate": "no-repeat",
                "background-size": "cover",
                "height": '100%',
                "background-position": "center center",
                "width": '100%'
            });
            div.html();
            div.addClass('sliderBg');
            img.replaceWith(div);
        });
    }
}

function imageTitleHover() {
    $('.imageTitles a').hover(function() {
        var listOfImages = $('.images > div');
        var photoTitleAttr = $(this).attr('class').split(' ')[0];
        $('.images > div.active').removeClass('active');
        $("." + photoTitleAttr).addClass('active');
    });
}

function logoPostion() {
    $('#content-primary').on('scroll', function() {
        if ($('#content-primary').hasClass('home')) {
            var scrollTop = $(this).scrollTop(),
                logo = $(mainLogo).offset().top,
                dist = (logo - scrollTop);
        }
    });
}
$('#content-primary').on('scroll.intro', function() {
    if ($('#content-primary').hasClass('hidden')) {
        $(mainContentWrapper).scrollTop(0).off('scroll.intro');
        console.log('true');
    }
});

function logoPositionOnScroll() {
    $(mainContentWrapper).scroll(function(e) {
        var scrolled = $(this).scrollTop();
        $(sectionIntro).css('top', -(scrolled * 0.0315) + 'em');
        $(mainLogo).css('top', -(scrolled * -0.005) + 'em');
        $(mainLogo).css('opacity', 1 - (scrolled * .00175));
    });
}

function OpenAndCloseMenu() {
    if (menu.isClosed) {
        // console.log('opened menu');
        page.nav.addClass('active');
        page.container.addClass('active');
        // page.header.addClass('active');
        menu.isClosed = false;
    } else {
        // console.log('closed menu');
        page.nav.removeClass('active');
        page.container.removeClass('active');
        // page.header.removeClass('active');
        menu.isClosed = true;
    }
}

function imgSize() {
    imgHeight = $('.item ').height();
}

function changeElementHeight(elementName, desiredHeight) {
    $(elementName).css({
        'height': desiredHeight
    });
}

function addBodyClassBasedOnUrl() {
    var pathname = window.location.origin + '/',
        blogPath = window.location.origin + '/blog',
        blogPath2 = window.location.origin + '/blog/',
        siteurl = pathname;
    // console.log(pathname);
    // console.log(pathname + '  ' + siteurl + '   ' + window.location.href);
    if (window.location.href === siteurl) {
        // console.log('false')
        $('body').removeClass('not-home');
        $('body').addClass('home');
    } else if (window.location.href === blogPath || window.location.href === blogPath2) {
        // console.log('true');
        $('body').removeClass('home');
        $('body').addClass('not-home black');
        $('#content-primary').addClass('blog');
    } else {
        $('body').removeClass('black');
        $('body').addClass('not-home');
        $('#content-primary').removeClass('blog');
    }
}

function determineImageSizes() {
        var wHeight = $(this).height(),
            wWidth = $(this).width(),
            designerImagesHeight = $('.images div img').height();
        changeElementHeight('div.images', designerImagesHeight);
        changeElementHeight('div.images', designerImagesHeight);
        changeElementHeight('div.images > div', designerImagesHeight);
        replaceHomeSliderImages();
        imageTitleHover();
        imgSize();
        replaceImgForBgImg();
        $(sliderWrap).css({
            'height': (wHeight - 150),
            'max-width': wWidth
        });
        $('#intro').css({
            'left': (wWidth / 2 - 125)
        });
        $('.home #slider').css({
            'margin-top': (wHeight / 2)
        });
        $('div#full-width-slider').css({
            'height': (wHeight - 150),
            'max-width': wWidth
        });
        $('.home .rsContent').css({
            'height': (wHeight - 150),
            'max-width': wWidth
        });
    }
    // Plugin Functions Go Below Here
    //////////////////////////////////////////////////////////////////////

function fullPageSlider() {
        if ($('#content-primary').hasClass('home')) {
            $('#home-slider').royalSlider({
                arrowsNav: true,
                loop: true,
                keyboardNavEnabled: true,
                controlsInside: false,
                imageScaleMode: 'fill',
                arrowsNavAutoHide: false,
                autoScaleSliderWidth: 960,
                controlNavigation: 'none',
                thumbsFitInViewport: false,
                navigateByClick: true,
                startSlideId: 0,
                autoPlay: false,
                transitionType: 'fade',
                globalCaption: false,
                deeplinking: {
                    enabled: true,
                    change: false
                },
                imgWidth: 1400,
                imgHeight: 618
            });
        } else {
            $('#full-width-slider').royalSlider({
                arrowsNav: true,
                imageScaleMode: 'fill',
                loop: false,
                controlNavigation: 'none',
            });
        }
    }
    // Ajax Success
    /////////////////////////////////////////////////////////////////////
var pathname = window.location.origin + '/';
console.log(pathname);
$(document).ajaxComplete(function(event) {
    loadMasonary();
    fullPageSlider();
});