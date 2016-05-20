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

/*!
 * jQuery Lazy - AV Plugin - v1.1
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2016, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
    // loads audio and video tags including tracks by two ways, like:
    // <audio data-loader="audio">
    //   <data-src src="audio.ogg" type="video/ogg"></data-src>
    //   <data-src src="audio.mp3" type="video/mp3"></data-src>
    // </audio>
    // <video data-loader="video" data-poster="poster.jpg">
    //   <data-src src="video.ogv" type="video/ogv"></data-src>
    //   <data-src src="video.webm" type="video/webm"></data-src>
    //   <data-src src="video.mp4" type="video/mp4"></data-src>
    //   <data-track kind="captions" src="captions.vtt" srclang="en"></data-track>
    //   <data-track kind="descriptions" src="descriptions.vtt" srclang="en"></data-track>
    //   <data-track kind="subtitles" src="subtitles.vtt" srclang="de"></data-track>
    // </video>
    //
    // or:
    // <audio data-loader="audio" data-src="audio.ogg|video/ogg,video.mp3|video/mp3"></video>
    // <video data-loader="video" data-poster="poster.jpg" data-src="video.ogv|video/ogv,video.webm|video/webm,video.mp4|video/mp4">
    //   <data-track kind="captions" src="captions.vtt" srclang="en"></data-track>
    //   <data-track kind="descriptions" src="descriptions.vtt" srclang="en"></data-track>
    //   <data-track kind="subtitles" src="subtitles.vtt" srclang="de"></data-track>
    // </video>
    $.lazy(["av", "audio", "video"], function(element, response) {
        var elementTagName = element[0].tagName.toLowerCase();

        if( elementTagName == "audio" || elementTagName == "video" ) {
            var srcAttr = "data-src",
                sources = element.find(srcAttr),
                tracks = element.find("data-track"),
                sourcesInError = 0,

            // create on error callback for sources
            onError = function() {
                if( ++sourcesInError == sources.length )
                    response(false);
            },

            // create callback to handle a source or track entry
            handleSource = function() {
                var source = $(this),
                    type = source[0].tagName.toLowerCase(),
                    attributes = source.prop("attributes"),
                    target = $(type == srcAttr ? "<source>" : "<track>");

                if( type == srcAttr )
                    target.one("error", onError);

                $.each(attributes, function(index, attribute) {
                    target.attr(attribute.name, attribute.value);
                });

                source.replaceWith(target);
            };

            // create event for successfull load
            element.one("loadedmetadata", function() {
                response(true);
            })

            // remove default callbacks to ignore loading poster image
            .off("load error")

            // load poster image
            .attr("poster", element.attr("data-poster"));

            // load by child tags
            if( sources.length ) {
                sources.each(handleSource);
            }

            // load by attribute
            else if( element.attr(srcAttr) ) {
                // split for every entry by comma
                $.each(element.attr(srcAttr).split(","), function(index, value) {
                    // split again for file and file type
                    var parts = value.split("|");

                    // create a source entry
                    element.append($("<source>")
                        .one("error", onError)
                        .attr({src: parts[0].trim(), type: parts[1].trim()}));
                });

                // remove now obsolete attribute
                element.removeAttr(srcAttr);
            }

            // pass error state
            else {
                response(false);
            }

            // load optional tracks
            if( tracks.length ) {
                tracks.each(handleSource);
            }
        }

        // pass error state
        else {
            response(false);
        }
    });
})(jQuery);

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

/*!
 * jQuery Lazy - YouTube Plugin - v1.0
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
    // <iframe data-loader="yt" data-src="1AYGnw6MwFM" width="560" height="315" frameborder="0" allowfullscreen></iframe>
    $.lazy(["yt", "youtube"], function(element) {
        if( element[0].tagName.toLowerCase() == "iframe" ) {
            // pass source to iframe
            element.attr("src", "https://www.youtube.com/embed/" + element.attr("data-src") + "?rel=0&amp;showinfo=0")

            // remove attribute
            .removeAttr("data-src");
        }

        // pass error state
        else {
            element.error();
        }
    });
})(jQuery);