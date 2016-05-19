/*!
 * jQuery Lazy - NOOP Plugin - v1.0
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2016, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
    // does not do anything, just a 'no-operation' helper ;)
    $.lazy("noop", function() {});

    // do nothing, but response a successfull loading
    $.lazy("noop-success", function(element) {
        element.load();
    });

    // do nothing, but response a failed loading
    $.lazy("noop-error", function(element) {
        element.error();
    });
})(jQuery);