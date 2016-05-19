/*!
 * jQuery Lazy - Script Plugin - v1.0
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2016, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
    // loads javascript files for script tags, like:
    // <script data-loader="script" data-src="file.js" type="text/javascript"></script>
    $.lazy(["js", "javascript", "script"], function(element) {
        if( element[0].tagName.toLowerCase() == "script" ) {
            element.attr("src", element.attr("data-src")).removeAttr("data-src");
        }
        else {
            element.error();
        }
    });
})(jQuery);