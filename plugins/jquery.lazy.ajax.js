/*!
 * jQuery Lazy - AJAX Plugin - v1.0
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2016, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
    // load data by ajax request and pass them to elements inner html, like:
    // <div data-loader="ajax" data-src"url.html" data-method="post" data-type="html"></div>
    $.lazy("ajax", function(element) { ajaxRequest(element, element.attr("data-method")); });

    // load data by ajax get request and pass them to elements inner html, like:
    // <div data-loader="get" data-src"url.html" data-type="html"></div>
    $.lazy("get", function(element) { ajaxRequest(element, "get"); });

    // load data by ajax post request and pass them to elements inner html, like:
    // <div data-loader="post" data-src"url.html" data-type="html"></div>
    $.lazy("post", function(element) { ajaxRequest(element, "post"); });

    /**
     * execute ajax request and handle response
     * @param {jQuery|object} element
     * @param {string} [method]
     */
    function ajaxRequest(element, method) {
        $.ajax({
            url: element.attr("data-src"),
            type: method || "get",
            dataType: element.attr("data-type") || "html",

            /**
             * success callback
             * @access private
             * @param {*} response
             * @return {void}
             */
            success: function(response) {
                // set responded data to element's inner html
                element.html(response)

                // remove attributes
                .removeAttr("data-src data-method data-type")

                // pass success to lazy
                .load();
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
})(jQuery);