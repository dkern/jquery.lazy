/*!
 * jQuery Lazy - AV Plugin - v1.0
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2016, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
    // loads audio and video tags by two ways, like:
    // <audio data-loader="audio">
    //     <data-src src="audio.ogg" type="video/ogg"></data-src>
    //     <data-src src="audio.mp3" type="video/mp3"></data-src>
    // </audio>
    // <video data-loader="video">
    //     <data-src src="video.ogv" type="video/ogv"></data-src>
    //     <data-src src="video.webm" type="video/webm"></data-src>
    //     <data-src src="video.mp4" type="video/mp4"></data-src>
    // </video>
    // 
    // or:
    // <audio data-loader="audio" data-src="audio.ogg|video/ogg,video.mp3|video/mp3"></video>
    // <video data-loader="video" data-src="video.ogv|video/ogv,video.webm|video/webm,video.mp4|video/mp4"></video>
    $.lazy(["audio", "video"], function(element) {
        if( element[0].tagName.toLowerCase() == "video" ) {
            var sources = element.find("data-src"),
                sourcesInError = 0,

            // create on error callback for sources
            onError = function() {
                if( ++sourcesInError == sources.length )
                    element.error();
            };

            // create event for successfull load
            element.one("loadedmetadata", function() {
                element.load();
            });

            // load by child tags
            if( sources.length ) {
                sources.each(function() {
                    var e = $(this);

                    // create a source tag for every found entry
                    element.append($('<source>')
                           .one("error", onError)
                           .attr({src: e.attr('src'), type: e.attr('type')}));

                    // remove now obsolete tag
                    e.remove();
                });
            }

            // load by attribute
            else if( element.attr("data-src") ) {
                // split for every entry by comma
                $.each(element.attr("data-src").split(","), function(index, value) {
                    // split again for file and file type
                    var parts = value.split("|");

                    // create a source entry
                    element.append($("<source>")
                           .one("error", onError)
                           .attr({src: parts[0].trim(), type: parts[1].trim()}));
                });

                // remove now obsolete attribute
                element.removeAttr("data-src");
            }

            // pass error state
            else {
                element.error();
            }
        }

        // pass error state
        else {
            element.error();
        }
    });
})(jQuery);