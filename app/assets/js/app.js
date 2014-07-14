
// Ajax goes here
//////////////////////////////////////////////////////////////////////

$(document).ready(function(){
 
    ajaxCall('nav a', '#container', '#guts', 200);
 
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
            mainContent.hide().load(href + " " + guts, function() {
                mainContent.fadeIn(speed, function() {
                });
            });
        });
        checkBack();
    }
 
};

// Global variables go below here
//////////////////////////////////////////////////////////////////////

var sectionIntro    = $('#intro'),
    sliderWrap      = $('#slider'),
    mainLogo        = $('#intro .logo'),
    scrollTopId     = $('#top'),
    pageLoader      = $('.loading'),
    body        = $('body'),
    mainContentWrapper  = $('#content-primary');

var pathArray       = window.location.pathname.split( '/' ),
  currentLocation   = pathArray[1];    

// Document ready elements go in here
//////////////////////////////////////////////////////////////////////

$(document).ready(function(){

  hideElement(scrollTopId);
  hideAllImagesButFirst();

  scrollToTop(scrollTopId, mainContentWrapper, 1000);
  fullPageSlider();
  logoPositionOnScroll();

  fadeInTopButton(); 


  var page = {
    container: $('#content-primary'),
    nav: $('#menu')
  }

  var menu = {
    isClosed: true
  }

  $('#menu-trigger, #menu-close').on('click', function(e){
    OpenAndCloseMenu(e);
  });

  $('.page-links a').on('click', function(e){
    OpenAndCloseMenu(e);
  });

 
});

// Window on load
//////////////////////////////////////////////////////////////////////

$(window).load(function(){
  welcomeLoading('.loading', 1000);
  changeTitleBasedOnPage(body, 'home', 'header h2.title', 'New Collection');
  addCurrentLoction(mainContentWrapper);
});

// Window load & resize
//////////////////////////////////////////////////////////////////////

$(window).on('load resize', function(){
  
  var   wHeight = $(this).height(),
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

  $('.home #ghost').css({
   'top': (wHeight / 2)
  });

  $('div#full-width-slider').css({
   'height': (wHeight - 150),
   'max-width': wWidth
  });

  $('.rsContent').css({
   'height': (wHeight - 150),
   'max-width': wWidth
  });

  loadMasonary();

});

// Functions Go Below Here
//////////////////////////////////////////////////////////////////////

function l(o){ console.log(o) }

function hideElement(selectorName) {
  $(selectorName).hide();
}

function hideAllImagesButFirst() {   
    var listOfImages = $('.images > div');
    var firstImage = listOfImages.first(); 
    if($(firstImage).is(':first-child')) {
      $(firstImage).addClass('active');
    } 
}

function scrollToTop(clickThis, animateThis, speed) {
  $('#top').click(function(){
    $('#content-primary').animate({
      'scrollTop' : 0
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

        if(userHasScrolled > magicPoint) {
          $('#top').fadeIn();
        } else {
          $('#top').fadeOut();
          // $(mainLogo).fadeOut();
        }

    });


}

function welcomeLoading(elementToHideAfterLoad, speed) {
   setTimeout(function() {
    $(elementToHideAfterLoad).addClass('hidden');
    }, speed);
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
  $(selectorName).addClass(currentLocation);
}


function changeTitleBasedOnPage(mainSelector, ifHasClass, editThisSelector, titleName) {
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
    "background-size": "cover"
  });
      
  div.html();

  img.replaceWith(div);
  $(div).parent().hover(function(){
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
        "background-position": "center",
        "width" : '100%' 
      });
          
      div.html();
      div.addClass('sliderBg');
      img.replaceWith(div);

    });

  }
}


function imageTitleHover() {
   $('.imageTitles a').hover(function(){
    var listOfImages     = $('.images > div');
    var photoTitleAttr   = $(this).attr('class').split(' ')[0];
     $('.images > div.active').removeClass('active');
     $("." + photoTitleAttr).addClass('active');
  });
}

function logoPostion() {
  $('#content-primary').on('scroll',function(){
    if ($('#content-primary').hasClass('home')) {
         var scrollTop = $(this).scrollTop(),
          logo = $(mainLogo).offset().top,
          dist = (logo - scrollTop);
        }
  });
}


function logoPositionOnScroll() {
  $(mainContentWrapper).scroll(function(e){
    var scrolled = $(this).scrollTop();
    $(sectionIntro).css('top',-(scrolled*0.0315)+'em');
    $(mainLogo).css('top',-(scrolled*-0.005)+'em');
    $(mainLogo).css('opacity',1-(scrolled*.00175));
  });
}


function OpenAndCloseMenu(e) {
  e.preventDefault();
  if ( menu.isClosed ) {
    page.nav.addClass('active');
    page.container.addClass('active');
    menu.isClosed = false;
  } else {
    page.nav.removeClass('active');
    page.container.removeClass('active');
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

// Plugin Functions Go Below Here
//////////////////////////////////////////////////////////////////////


function fullPageSlider() {


  if ($('#content-primary').hasClass('home')) {
    $('#full-width-slider').royalSlider({
    arrowsNav: true,
    loop: true,
    keyboardNavEnabled: true,

    controlsInside: false,
    imageScaleMode: 'fill',
    arrowsNavAutoHide: false,
    // autoScaleSlider: true, 
    autoScaleSliderWidth: 960,     
    // autoScaleSliderHeight: 424,
    controlNavigation: 'bullets',
    thumbsFitInViewport: false,
    navigateByClick: true,
    startSlideId: 0,
    autoPlay: false,
    transitionType:'fade',
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
    loop: false,
    keyboardNavEnabled: true,

    controlsInside: false,
    imageScaleMode: 'fill',
    arrowsNavAutoHide: false,
    autoScaleSlider: true, 
    autoScaleSliderWidth: 960,     
    autoScaleSliderHeight: 446,
    controlNavigation: 'bullets',
    thumbsFitInViewport: false,
    navigateByClick: true,
    startSlideId: 0,
    autoPlay: false,
    transitionType:'move',
    globalCaption: false,
    deeplinking: {
      enabled: true,
      change: false
    },    
    imgWidth: 1400,
    imgHeight: 650
  });

  }


}





