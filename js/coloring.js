/**
 * Created by uzich on 05.05.14.
 */

(function( $ ) {

    // Create plugin jquery
    jQuery.fn.coloring = function(options) {

         var defaultOptions = {
            width: 600,
            height: 600,
            canvasId: this
        }

        var o = $.extend(defaultOptions,options);

        var ctx   = o.canvasId[0].getContext('2d');

        o.canvasId.on('click', function(event) {
            console.log(event)
            }
        );

    };

})(jQuery);