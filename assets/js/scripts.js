/*
 * Bones Scripts File
 * Author: Eddie Machado
 *
 * This file should contain any js scripts you want to add to the site.
 * Instead of calling it in the header or throwing it inside wp_head()
 * this file will be called automatically in the footer so as not to
 * slow the page load.
 *
 * There are a lot of example functions and tools in here. If you don't
 * need any of it, just remove it. They are meant to be helpers and are
 * not required. It's your world baby, you can do whatever you want.
 */


/*
 * Get Viewport Dimensions
 * returns object with viewport dimensions to match css in width and height properties
 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
 */
function updateViewportDimensions() {
  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;
  return {
    width: x,
    height: y
  };
}
// setting the viewport width
var viewport = updateViewportDimensions();


/*
 * Throttle Resize-triggered Events
 * Wrap your actions in this function to throttle the frequency of firing them off, for better performance, esp. on mobile.
 * ( source: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed )
 */
var waitForFinalEvent = (function() {
  var timers = {};
  return function(callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout(timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

// how long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok.
var timeToWaitForLast = 100;


/*
 * Here's an example so you can see how we're using the above function
 *
 * This is commented out so it won't work, but you can copy it and
 * remove the comments.
 *
 *
 *
 * If we want to only do it on a certain page, we can setup checks so we do it
 * as efficient as possible.
 *
 * if( typeof is_home === "undefined" ) var is_home = $('body').hasClass('home');
 *
 * This once checks to see if you're on the home page based on the body class
 * We can then use that check to perform actions on the home page only
 *
 * When the window is resized, we perform this function
 * $(window).resize(function () {
 *
 *    // if we're on the home page, we wait the set amount (in function above) then fire the function
 *    if( is_home ) { waitForFinalEvent( function() {
 *
 *  // update the viewport, in case the window size has changed
 *  viewport = updateViewportDimensions();
 *
 *      // if we're above or equal to 768 fire this off
 *      if( viewport.width >= 768 ) {
 *        console.log('On home page and window sized to 768 width or more.');
 *      } else {
 *        // otherwise, let's do this instead
 *        console.log('Not on home page, or window sized to less than 768.');
 *      }
 *
 *    }, timeToWaitForLast, "your-function-identifier-string"); }
 * });
 *
 * Pretty cool huh? You can create functions like this to conditionally load
 * content and other stuff dependent on the viewport.
 * Remember that mobile devices and javascript aren't the best of friends.
 * Keep it light and always make sure the larger viewports are doing the heavy lifting.
 *
 */

/*
 * We're going to swap out the gravatars.
 * In the functions.php file, you can see we're not loading the gravatar
 * images on mobile to save bandwidth. Once we hit an acceptable viewport
 * then we can swap out those images since they are located in a data attribute.
 */
function loadGravatars() {
  // set the viewport using the function above
  viewport = updateViewportDimensions();
  // if the viewport is tablet or larger, we load in the gravatars
  if (viewport.width >= 768) {
    jQuery('.comment img[data-gravatar]').each(function() {
      jQuery(this).attr('src', jQuery(this).attr('data-gravatar'));
    });
  }
} // end function


// Convert hex to RGB
function rgb2hex(rgb) {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? "#" +
    ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}

/*
 * Put all your regular jQuery in here.
 */
jQuery(function($) {

  /**
   * Hide and show nav items
   */
  $("#nav-btn-show, #nav-btn-hide").click(function() {

    $("#nav-btn-show ~ #nav-menu").toggle();

  });

  $("#nav-menu a.hideshow_link").click(function(e) {

    e.preventDefault();

    if ($(this).children("span").text() == "+") {

      $(this).children("span").text("-");

      $(this).parent("p").next("div.hideshow_subnav").removeClass("hide");

    } else {

      $(this).children("span").text("+");

      $(this).parent("p").next("div.hideshow_subnav").addClass("hide");

    }

  });

  // Hide nav menu when clicking or tapping off it
  $(document).on('click', function(event) {
    if (!$(event.target).closest('#nav-btn-show, #nav-btn-show img, #nav-btn-hide img, #nav-menu').length) {
      $('#nav-menu').hide();
    }
  });

  // Hide mission when clicking on arrow
  $(".mission_hide a").click(function(e) {

    e.preventDefault();
    $("#sf-fed-mission").hide();
    // $("#below_mission, .footer").show();
    $("body").scrollTop(0);

  });

  // call on window resize
  // $(window).resize(function() {

  // if mission is hidden on a large screen, show all content below
  // if ( $("#sf-fed-mission").is(":hidden") ) {

  //     $("#below_mission, .footer").show();

  // };

  // });

  // toggle abstract on Research pub indices
  $('.tog').click(function(e) {
    e.preventDefault();
    $(this).parent().next('.collapsible').toggle();
    var toggleState = ( $(this).children('span').text() === '+' ) ? "-" : "+";
    $(this).children('span').text(toggleState);
  });

  if (window.innerWidth > 768) {

    $(window).scroll(function() {

      if ($(window).scrollTop() > 0 && $("#sf-fed-mission").is(":visible")) {

        $("#sf-fed-mission").slideUp("slow");
        // $("#below_mission, .footer").show();

      }

    });

  }

  $(".economic-research #bio-container-bottom a.tog.abs").click(function(e) {

    e.preventDefault();
    $(this).next(".collapsible").toggle();

  });

  // affix gray section header to top of page when scrolling to its top
  var sectionHeader = $("#content > header.section-header").offset().top;

  var nav_menu_width = $("#nav-menu").width();

  $(window).on("load resize scroll", function() {

    if (window.innerWidth > 768) {

      // if not the site homepage, append .fixed to header
      if (!$("body").hasClass("federal-reserve-bank-of-san-francisco page-home")) {

        // prevent user from not seeing all of nav menu if screen isn't tall enough
        // var height = $("#nav-menu").outerHeight() + 20;
        // var pageHeight = $(window).height();

        // if ( $(window).scrollTop() > sectionHeader && height < pageHeight ) {
        if ($(window).scrollTop() > sectionHeader) {

          $("#content > header.section-header").addClass("fixed");
          $("header.header .header-img .inner-header-wrap #inner-header .desktop #nav-btn").addClass("fixed");
          $("header.header .header-img .inner-header-wrap #inner-header #search-site").addClass("fixed");

          // Ensure that nav menu remains constant width when fixed and not
          $(".fixed #nav-menu").width(nav_menu_width);

        } else {

          $("#content > header.section-header").removeClass("fixed");
          $("header.header .header-img .inner-header-wrap #inner-header .desktop #nav-btn").removeClass("fixed");
          $("header.header .header-img .inner-header-wrap #inner-header #search-site").removeClass("fixed");

        }

      }

    } else {

      $("#content > header.section-header").removeClass("fixed");
      $("header.header .header-img .inner-header-wrap #inner-header .desktop #nav-btn").removeClass("fixed");
      $("header.header .header-img .inner-header-wrap #inner-header #search-site").removeClass("fixed");

    }

  });

  /*
  hide / show caption for galleria.io
  */

  jQuery('.plusminus').click(function() {
    jQuery('.gallery-caption p').slideToggle();
  });


  /**
   * Cash diary quiz
   */

   var cashDiaryQuiz = function() {

     var num_questions = $(".cash-game-container .cg-question").length;

     // Show answers
     $(".cash-game-container .answer").click(function() {

       $(this).parent(".cg-buttons").children(".answer").removeClass("selected").addClass("not-selected");
       $(this).removeClass("not-selected").addClass("selected");
       $(this).parent(".cg-buttons").next(".answer-result").show();

       var num_answers_selected = $(".cash-game-container .cg-buttons .answer.selected").length;

       if (num_questions === num_answers_selected) {

         $(".cg-results").show();

         // Calculate results
         var total_cash = $(".cg-buttons .answer.cash.selected").length;
         var total_debit = $(".cg-buttons .answer.debit.selected").length;
         var total_credit = $(".cg-buttons .answer.credit.selected").length;
         var total_check = $(".cg-buttons .answer.check.selected").length;
         var total_electronic = $(".cg-buttons .answer.electronic.selected").length;

         $(".cg-results .cash-result").text(((total_cash / num_questions) * 100) + "%");
         $(".cg-results .debit-result").text(((total_debit / num_questions) * 100) + "%");
         $(".cg-results .credit-result").text(((total_credit / num_questions) * 100) + "%");
         $(".cg-results .check-result").text(((total_check / num_questions) * 100) + "%");
         $(".cg-results .electronic-result").text(((total_electronic / num_questions) * 100) + "%");

       }

     });

   };

   cashDiaryQuiz();

  /**
   * Code for JW's Easter Egg quiz
   */

  var easterEggQuiz = function() {

    var parent_selector = ".game-container.easter-egg";
    var num_questions = $(parent_selector + " .cg-question").length;
    var correct_count = 0;
    var incorrect_count = 0;

    // Show answers
    $(parent_selector + " .answer").click(function() {

      // If correct, add "correct-highlight" class
      if ( $(this).hasClass("correct-answer") ) {

        // If no siblings have either .correct-highlight or .incorrect-highlight class,
        // increment correct_count
        if($(this).siblings('.correct-highlight, .incorrect-highlight').length === 0){
          correct_count++;
        }

        // Initially remove correct and incorrect classes from all answer choices
        $(this).parent(".cg-buttons").children(".answer").removeClass("correct-highlight incorrect-highlight");

        $(this).addClass("correct-highlight");
        $(this).parent(".cg-buttons").siblings(".answer-result-correct").show();
        $(this).parent(".cg-buttons").siblings(".answer-result-incorrect").hide();
      }
      // If incorrect, add "incorrect-highlight" class
      else {

        // If no siblings have either .correct-highlight or .incorrect-highlight class,
        // increment incorrect_count
        if($(this).siblings('.correct-highlight, .incorrect-highlight').length === 0){
          incorrect_count++;
        }

        // Initially remove correct and incorrect classes from all answer choices
        $(this).parent(".cg-buttons").children(".answer").removeClass("correct-highlight incorrect-highlight");

        $(this).addClass("incorrect-highlight");
        $(this).parent(".cg-buttons").siblings(".answer-result-incorrect").show();
        $(this).parent(".cg-buttons").siblings(".answer-result-correct").hide();
      }

      // Get number of correct answers
      var num_correct_highlights = $(".cg-buttons .answer.correct-highlight").length;
      // Get number of incorrect answers
      var num_incorrect_highlights = $(".cg-buttons .answer.incorrect-highlight").length;
      // Total correct and incorrect answers
      var num_total_highlights = num_correct_highlights + num_incorrect_highlights;

      // Initialize score text
      var score_text;

      // Show score When all answers have been selected.
      if (num_questions === num_total_highlights) {

        // Show quiz result
        $(".cg-results").show();

        // If perfect score, congratulate user.
        if ( correct_count === num_questions ) {

          score_text = '<div class="m-all t-6of12 d-7of12"><h2 class="h1">' + correct_count + '/' + num_questions + ' Perfect score!</h2><h5 class="padding-top-add" style="color:#ff00ff">You found all the SF Fed President&apos;s Speech Easter eggs!</h5></div>';
          score_text += '<div class="m-all t-6of12 d-5of12 aligncenter" id="perfect-score"><img class="margin-bottom-none" src="/files/egg_chick_animation.gif" width="191" height="380" alt="Congrats!"></div>';
          score_text += '<audio src="/files/A-chord-10sec-96kbps.mp3" autoplay><p>Unfortunately, your browser does not support the <code>audio</code> element.</p></audio>';

        }
        else if ( correct_count >= 4 && correct_count <= 6 ) {
          score_text = '<h2 class="h1">' + correct_count + '/' + num_questions + ' Easter eggs!</h2>';
          score_text += '<p>Awesome! You know your ultimate rock classics, even in economic and monetary policy speeches.</p>';
        }
        // If imperfect score, notify user.
        else {
          score_text = '<h2 class="h1">' + correct_count + '/' + num_questions + ' Easter eggs!</h2>';
          score_text += '<p>Thanks for giving it your best shot. Looks like a few of those Led Zeppelin, The Clash, and Elvis Costello Easter eggs are staying hidden in SF Fed President\'s Speeches for now.</p>';
        }

        // Show quiz score
        $(".cg-results #score").html(score_text);

        // Set social link code
        var social_link_code = '<h4>Share the fun</h4><div id="share-links"><p><a href="http://www.facebook.com/sharer.php?u=http://www.frbsf.org%2Four-district%2Fabout%2Fsf-fed-blog%2Fpresidents-speech-easter-eggs%2F%3Futm_source%3Dfrbsf-home-sffedblog-hero%26utm_medium%3Dfrbsf%26utm_campaign%3Dsffedblog&amp;utm_source=sharebutton&amp;utm_medium=frbsf&amp;utm_campaign=facebook" title="Share on Facebook" target="_blank"><img src="/wp-content/themes/sf_fed_rebrand_2015/library/images/icons/icon-facebook.png" width="44" height="44" alt="Share on Facebook"></a><a href="http://twitter.com/share?text=President&apos;s Speech Easter Eggs&amp;url=http://www.frbsf.org%2Four-district%2Fabout%2Fsf-fed-blog%2Fpresidents-speech-easter-eggs%2F%3Futm_source%3Dfrbsf-home-sffedblog-hero%26utm_medium%3Dfrbsf%26utm_campaign%3Dsffedblog&amp;utm_source=sharebutton&amp;utm_medium=frbsf&amp;utm_campaign=twitter" title="Share on Twitter" target="_blank"><img src="/wp-content/themes/sf_fed_rebrand_2015/library/images/icons/icon-twitter.png" width="44" height="44" alt="Share on Twitter"></a></p></div>';

        // Show social links
        $(".cg-results #social").html(social_link_code);

      }

    });

  };

  easterEggQuiz();

  /**
   * Code for Facts and Myths About Cash quiz
   */

  var factsMythsCashQuiz = function() {

    var parent_selector = ".game-container.facts-myths-cash";
    var num_questions = $(parent_selector + " .cg-question").length;

    // Initialize user answers object to capture chosen answers
    var user_answers = {};

    // Show answers
    $(parent_selector + " .answer").click(function() {

      // Get current question index
      var current_index = $(this).parent().parent(".cg-question").index();

      // If correct, add "correct-highlight" class
      if ( $(this).hasClass("correct-answer") ) {

        // If user_answers object does not contain a key representing the current index,
        // set the key to the current index and value to 1 (or, correct)
        // This prevents changing one's answer
        if ( !user_answers.hasOwnProperty(current_index) ) {
          user_answers[current_index] = 1;
        }

        // Initially remove correct and incorrect classes from all answer choices
        $(this).parent(".cg-buttons").children(".answer").removeClass("correct-highlight incorrect-highlight");

        $(this).addClass("correct-highlight");
        $(this).parent(".cg-buttons").siblings(".answer-result-correct").show();
        $(this).parent(".cg-buttons").siblings(".answer-result-incorrect").hide();
      }

      // If incorrect, add "incorrect-highlight" class
      else {

        // If user_answers object does not contain a key representing the current index,
        // set the key to the current index and value to 0 (or, incorrect)
        // This prevents changing one's answer
        if ( !user_answers.hasOwnProperty(current_index) ) {
          user_answers[current_index] = 0;
        }

        // Initially remove correct and incorrect classes from all answer choices
        $(this).parent(".cg-buttons").children(".answer").removeClass("correct-highlight incorrect-highlight");

        $(this).addClass("incorrect-highlight");
        $(this).parent(".cg-buttons").siblings(".answer-result-incorrect").show();
        $(this).parent(".cg-buttons").siblings(".answer-result-correct").hide();
      }

      // Get number of correct answers
      var num_correct_highlights = $(".cg-buttons .answer.correct-highlight").length;
      // Get number of incorrect answers
      var num_incorrect_highlights = $(".cg-buttons .answer.incorrect-highlight").length;
      // Total correct and incorrect answers
      var num_total_highlights = num_correct_highlights + num_incorrect_highlights;

      // Initialize score text
      var score_text;

      // Show score when all answers have been selected.
      if (num_questions === num_total_highlights) {

        // Sum correct answers
        var sum_answers = 0;
        for (var index in user_answers) {
          if (user_answers.hasOwnProperty(index)) {
            sum_answers += parseInt( user_answers[index] );
          }
        }

        // Show quiz result
        $(".cg-results").show();

        // If perfect score, congratulate user.
        if ( sum_answers === num_questions ) {
          score_text = '<h2 class="h1">' + sum_answers + '/' + num_questions + ' You got a perfect score!</h2><p>Congratulations! You have your cash facts straight.</p>';
        }
        else if ( sum_answers >= 4 && sum_answers <= 6 ) {
          score_text = '<h2 class="h1">' + sum_answers + '/' + num_questions + ' Correct</h2><p>Excellent! You gave other quiz-takers a run for their money.</p>';
        }
        // If imperfect score, notify user.
        else {
          score_text = '<h2 class="h1">' + sum_answers + '/' + num_questions + ' Correct</h2><p>Nice try, but looks like you took a few too many cash myths at face value.</p>';
        }

        // Show quiz score
        $(".cg-results #score").html(score_text);

        // Set social link code
        var social_link_code = '<h4>Share this quiz</h4><div id="share-links"><p><a href="http://www.facebook.com/sharer.php?u=http://www.frbsf.org%2Fcash%2Fcash-how-we-use-it%2Fcash-myths-facts-quiz%2F%3Futm_source%3Dfrbsf-home-sffedblog-hero%26utm_medium%3Dfrbsf%26utm_campaign%3Dsffedblog&amp;utm_source=sharebutton&amp;utm_medium=frbsf&amp;utm_campaign=facebook" title="Share on Facebook" target="_blank"><img src="/wp-content/themes/sf_fed_rebrand_2015/library/images/icons/icon-facebook.png" width="44" height="44" alt="Share on Facebook"></a><a href="http://twitter.com/share?text=Facts%20and%20Myths%20About%20Cash&#58;%20Test%20Your%20Knowledge&amp;http://www.frbsf.org%2Fcash%2Fcash-how-we-use-it%2Fcash-myths-facts-quiz%2F%3Futm_source%3Dfrbsf-home-sffedblog-hero%26utm_medium%3Dfrbsf%26utm_campaign%3Dsffedblog&amp;utm_source=sharebutton&amp;utm_medium=frbsf&amp;utm_campaign=twitter" title="Share on Twitter" target="_blank"><img src="/wp-content/themes/sf_fed_rebrand_2015/library/images/icons/icon-twitter.png" width="44" height="44" alt="Share on Twitter"></a></p></div>';

        // Show social links
        $(".cg-results #social").html(social_link_code);

      }

    });

  };

  factsMythsCashQuiz();

  /**
   * Enable share links to appear on Research publication EOLs
   */

  $(".single-frbsf_publications.economic-research a.share").click(function(e) {

    e.preventDefault();

    $(".single-frbsf_publications.economic-research #share-links-er").toggle();

  });

  /**
   * Hide Fancybox images if <p> contains id of "figure*",
   * as opposed to <img id="figure*"...
   */
  $("p[id*=figure]").hide();

  /**
   * Handle hash
   */

  $("img.hideshow").click(function(e) {
    e.preventDefault();
    $(this).parent().parent().siblings("article").slideToggle("fast");

    // toggle plus and minus category icons
    var src = $("img.hideshow").attr("src");

    if ($(this).attr("src").match(/\-minus/)) {
      $(this).attr("src", src.replace(/\-minus/, "-plus"));
    } else {
      $(this).attr("src", src.replace(/\-plus/, "-minus"));
    }
  });

  $("img.hideshow").hover(function() {
    $(this).css('cursor', 'pointer');
  });

  /**
   * Force anchor links to adjust for the height of the section header.
   */

  function offsetAnchor() {
    if (location.hash.length !== 0) {
      var x = $(window).scrollLeft();
      var y = $(window).scrollTop();
      window.scrollTo(x, y - 183);
    }
  }

  // Capture hash change while on page
  $(window).on("hashchange", function() {
    if ( hideshow_clicked === false ) {
      offsetAnchor();
    }
  });

  // Capture hash change on page load
  window.setTimeout(function() {
    offsetAnchor();
  }, 1);

});
/* end of as page load scripts */
