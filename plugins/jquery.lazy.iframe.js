/*!
 * jQuery Lazy - iFrame Plugin - v1.1
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2016, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
    // load youtube video iframe, like:
    // <iframe data-loader="iframe" data-src="iframe.html"></iframe>
    //
    // enable content error check with:
    // <iframe data-loader="iframe" data-src="iframe.html" data-error-detect="true"></iframe>
    $.lazy(["iframe"], function(element) {
        if( element[0].tagName.toLowerCase() == "iframe" ) {
            var srcAttr = "data-src",
                errorDetectAttr = "data-error-detect", 
                errorDetect = element.attr(errorDetectAttr);

            // default way, just replace the 'src' attribute
            if( errorDetect != "true" && errorDetect != "1" ) {
                // set iframe source
                element.attr("src", element.attr(srcAttr))

                // remove attributes
                .removeAttr(srcAttr + " " + errorDetectAttr);
            }

            // extended way, even check if the document is available
            else {
                $.ajax({
                    url: element.attr(srcAttr),
                    dataType: "html",

                    /**
                     * success callback
                     * @access private
                     * @param {*} response
                     * @return {void}
                     */
                    success: function(response) {
                        // set responded data to element's inner html
                        element.html(response)
                        
                        // change iframe src
                        .attr("src", element.attr(srcAttr))

                        // remove attributes
                        .removeAttr(srcAttr + " " + errorDetectAttr);
                    },

                    /**
                     * error callback
                     * @access private
                     * @return {void}
                     */
                    error: function() {
                        // pass error state to lazy
                        element.error();
                    }
                });
            }
        }

        // pass error state to lazy
        else {
            element.error();
        }
    });
})(jQuery);