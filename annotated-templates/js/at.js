$('.mobile-menu').click(function() {
  $('.collapse').toggle();
});

$( window ).on("load resize", function() {
  if ( $(window).width() > 650 ) {
      //only run this is larger than 650
      $('.marker').bind("click mouseenter", function(e) {
        $(this).children('.desc').show();
        $(this).children('.desc').css('z-index', "-1");
        $(this).css('z-index', "1");
      });

      $('.marker').bind("mouseleave", function(e) {
        $(this).children('.desc').hide();
        $(this).css('z-index', "auto");
      });

      //hide the description if clicked on anywhere on page
      $(document).on("mouseup", function (e) {
          var container = $(".desc");

          if (!container.is(e.target) // if the target of the click isn't the container...
              && container.has(e.target).length === 0) // ... nor a descendant of the container
          {
              container.hide();
          }
      });
  } else {
    $('.desc').show();
    $('.marker').unbind();
    $(document).off();
  }
});
