/**
 * Galleria SF Fed Theme based on Classic Theme 2012-08-08
 * http://galleria.io
 *
 * Licensed under the MIT license
 * https://raw.github.com/aino/galleria/master/LICENSE
 *
 */

(function($) {

Galleria.addTheme({
    name: 'sffed',
    author: 'SF Fed',
    // css: 'galleria.sffed.css',
    debug: false,
    defaults: {
        thumbnails: false,
        height: 0.5625, // setting relative height 16/9 ratio
        imageCrop: 'false',
        _toggleInfo: false // show the caption all the time:
    },
    init: function(options) {
      /*
        The init function gets called when galleria is ready.
        You have access to all public methods and events in here
        this = gallery instance
        options = gallery options (including custom options)
        */

        var gallery = this;

        Galleria.requires(1.4, 'This version of SF Fed theme requires Galleria 1.4 or later');

        // add elements to Galleria
        this.addElement("fullscreen");
        this.append({
            info: ["info-description", "fullscreen", "counter"],
        });
        this.appendChild('container','info');

        var containerHeight = 0;

        // remove the close-fullscreen class on exit
        this.bind("fullscreen_exit", function(e) {

          $(".galleria-fullscreen").removeClass("close-fullscreen");

          if ( $(window).width() <= 768) {
            var container = e.currentTarget;
          }

        });

        this.bind('image', function(e) {
          var infoHeight = e.imageTarget.parentNode.parentNode.parentNode.nextSibling.nextSibling.nextSibling.clientHeight;
          var thisContainer = e.imageTarget.parentNode.parentNode.parentNode.parentNode;
          var stageHeight = this._stageHeight;

          thisContainer.style.height = (infoHeight + stageHeight + "px");

          containerHeight = thisContainer.style.height;
            if ( $(window).width() <= 768) {
                  var navTop = ( (infoHeight + stageHeight)- infoHeight)/2; //ensure that the nav is always centered between top of container and top of infobox
                  $('.galleria-theme-sffed .galleria-image-nav').css('top', navTop);

            } else {

            }
        });


        // once image loads on smaller screen sizes, resize Galleria container
        this.bind('rescale', function(e) {
            // document.getElementsByClassName("galleria-container")[0].style.height = "410px";
            var container = e.currentTarget;

            if ( container.classList.contains("fullscreen") === false ) {

                var infoHeight = this._dom.info.clientHeight;
                var stageHeight = this._dom.stage.clientHeight;
                var containerObj = this._dom.container;
                var imageNav = this._dom["image-nav"];


                if ($(window).width() >= 768) { //window size is above the mobile size use container.style.height otherwise make it new value
                  var navTop = ( ((infoHeight + stageHeight) - infoHeight)/2);

                  imageNav = $(imageNav).css('top', navTop);

                } else {

                  containerObj.style.height = (infoHeight + stageHeight + "px");
                  var navTop = ( ((infoHeight + stageHeight) - infoHeight)/2);

                  imageNav = $(imageNav).css('top', navTop);

                }
            }
            else {
                container.style.height = "100%";
            }

        });

        /* bind fullscreen event to Galleria on click of fullscreen icon */
        this.$("fullscreen").click(function(event) {
          event.preventDefault();
          gallery.toggleFullscreen(); // toggles the fullscreen

          $(".galleria-fullscreen").toggleClass('close-fullscreen'); //this allows height to return to normal

        });

        this.bind("fullscreen_enter", function(e) {

          //placement should be 50%
          $('.galleria-theme-sffed .galleria-image-nav').css('top', '50%');
          var containerObj = e.currentTarget;
          $(containerObj)[0].style.width = "800px";
          $('.galleria-container').css("width", "100%");

       });

        // add alt text to images
        this.bind('image', function(e) {
            e.imageTarget.alt = e.galleriaData.title + " - "  + e.galleriaData.description;
            // e.imageTarget.alt = e.imageTarget.attr("alt");
        });

        // cache some stuff
        var info = this.$('info-link,info-close,info-text'),
            touch = Galleria.TOUCH;

        // toggle info
        if ( options._toggleInfo === true ) {
            info.bind( 'click:fast', function() {
                info.toggle();
            });
        } else {
            info.show();
            this.$('info-link, info-close').hide();
        }


        var activate = function(e) {
            $(e.thumbTarget).css('opacity',1).parent().siblings().children().css('opacity', 1);
        };

        this.bind('loadstart', function(e) {
            if (!e.cached) {
                this.$('loader').show().fadeTo(200, 0.4);
            }
            window.setTimeout(function() {
                activate(e);
            }, touch ? 300 : 0);
            this.$('info').toggle( this.hasInfo() );
        });

        this.bind('loadfinish', function(e) {
            this.$('loader').fadeOut(200);

        });
    }
});

if ($('.galleria').length > 0) {
  Galleria.run('.galleria');
}

}(jQuery));
