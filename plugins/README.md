### jQuery Lazy - Loader Plugins
[![GitHub version](https://badge.fury.io/gh/eisbehr-%2Fjquery.lazy.svg)](http://github.com/eisbehr-/jquery.lazy)
[![NPM version](https://badge.fury.io/js/jquery-lazy.svg)](http://www.npmjs.org/package/jquery-lazy)
[![Bower version](https://badge.fury.io/bo/jquery-lazy.svg)](http://bower.io/search/?q=jquery-lazy)
[![Dependency version](https://david-dm.org/eisbehr-/jquery.lazy.png)](https://david-dm.org/eisbehr-/jquery.lazy)

---

### Table of Contents
* [About Loader Plugins](#about-loader-plugins)
* [Create own Loader Plugin](#create-own-loader-plugin)
* [AJAX Loader](#ajax-loader)
* [Audio / Video Tag Loader](#audio--video-loader)
* [iFrame Loader](#iframe-loader)
* [NOOP Loader](#noop-loader)
* [JS / Script Loader](#js--script-loader)
* [YouTube Loader](#youtube-loader)
* [Bugs / Feature request](#bugs--feature-request)
* [License](#license)

---

## About Loader Plugins
The loader plugins for Lazy can be used whenever you want to extend the basic functionality by default or even for many instances of Lazy.
Just add one, all or a combined plugin file to your html page and all instances can use the loaders.
```HTML
<script type='text/javascript' src="jquery.lazy.min.js"></script>
<script type='text/javascript' src="plugins/jquery.lazy.ajax.min.js"></script>
<script type='text/javascript' src="plugins/jquery.lazy.iframe.min.js"></script>
<script type='text/javascript' src="plugins/jquery.lazy.noop.min.js"></script>
<script type='text/javascript' src="plugins/jquery.lazy.script.min.js"></script>
<script type='text/javascript' src="plugins/jquery.lazy.video.min.js"></script>
<script type='text/javascript' src="plugins/jquery.lazy.youtube.min.js"></script>

<!-- or: -->

<script type='text/javascript' src="jquery.lazy.min.js"></script>
<script type='text/javascript' src="jquery.lazy.plugins.min.js"></script>
```


## Create own Loader Plugin
If you want to, you can easily create own loader plugins.
Just use jQuery's public function `Lazy` to create and register them.
Best practice is to wrap everything by an [iife](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression).
```JS
;(function($) {
    $.Lazy("pluginLoaderName", function(element) {
        // add your logic here
    });
})(jQuery);
```

It is even possible to register an loader plugin with more than one name/alias by default.
Just pass an array of names as first parameter.
```JS
$.lazy(["oneName", "anotherLoaderName"], function(element) { /**/ });
```

For more examples, take a look at the [existing plugins](https://github.com/eisbehr-/jquery.lazy/tree/master/plugins).


## AJAX Loader
The AJAX loader can receive data from a given url and paste the response to the inner html of the element.
This is useful, when you want do load a bigger amount of content only whenever needed.

Use `ajax` as the loader name. There are names for specific request types `GET` and `POST` too.
```HTML
<!-- simple GET request -->
<div data-loader="ajax" data-src="ajax.html"></div>

<!-- simple post request with configurable response type -->
<div data-loader="ajax" data-src="ajax.html" data-method="post" data-type="html"></div>

<!-- GET request -->
<div data-loader="get" data-src="ajax.html"></div>

<!-- POST request-->
<div data-loader="post" data-src="ajax.html"></div>
```


## Audio / Video Loader
Loads `<audio>` and `<video>` tags and attach the sources in the right order.
There are to ways you can prepare your audio and/or video tags.
First way is to add all sources by `data-src` attribute, separated by comma and type by pipe on the element.
```HTML
<audio data-loader="audio" data-src="file.ogg|video/ogg,file.mp3|video/mp3,file.wav|audio/wav"></video>
<video data-loader="video" data-src="file.ogv|video/ogv,file.mp4|video/mp4,file.webm|video/webm"></video>
```

The other way is to add the sources like default, as child elements.
```HTML
<audio data-loader="audio">
  <data-src src="file.ogg" type="video/ogg"></data-src>
  <data-src src="file.mp3" type="video/mp3"></data-src>
  <data-src src="file.wav" type="video/wav"></data-src>
</video>

<video data-loader="video">
  <data-src src="file.ogv" type="video/ogv"></data-src>
  <data-src src="file.mp4" type="video/mp4"></data-src>
  <data-src src="file.webm" type="video/webm"></data-src>
</video>
```


## iFrame Loader
Loads `<iframe>` contents.
There are two ways the loader can to it.
The default way will return a successfull load, even if the iframe url is not reachable (_404_).
It might be the fastest and safest way to do that.
If you know the requested path is reachable every time and is not cross-domain, you should use this way.
```HTML
<iframe data-loader="iframe" data-src="iframe.html"></iframe>
```

The second way will load the content by AJAX and checks the response, and afterwards pass the html to iframe inner and set the correct url.
This is a very secure check, but would be a bit more tricky.
You should only use this on the same origin and when you know, what you doing with AJAX.

To enable this feature, set the attribute `data-error-detect` to `true` or `1`.
```HTML
<iframe data-loader="iframe" data-src="iframe.html" data-error-detect="true"></iframe>
```


## NOOP Loader
The NOOP (_or no-operations_) loader will, like the name said, do nothing.
There will even be no callbacks like `beforeLoad` or `onError` get triggered when using `noop`.
It could be useful for developers or to simple and fast disable some other loaders.
It can be used with all elements.
```HTML
<div data-loader="noop"></div>
```

There are two other NOOP loaders, helping to debug your code.
The `noop-success` and `noop-error` loaders will return the current state to Lazy and trigger the right callbacks.
```HTML
<div data-loader="noop-success"></div>
<div data-loader="noop-error"></div>
```


## JS / Script Loader
Loads javascript files the Lazy way.
Change the `<script>` tags like the example below, and the files will be loaded automatically.
```HTML
<script data-loader="script" data-src="script.js" type="text/javascript"></script>
```


## YouTube Loader
Loads youtube videos in an `<iframe>`.
This is the suggested way.
You can prepare the iframe tag as you would do without lazy loading.
Only add the youtube video id to the attribute `data-src` and add the loader name `yt` or `youtube` and it's ready.
```HTML
<iframe data-loader="youtube" data-src="1AYGnw6MwFM" width="560" height="315" frameborder="0"></iframe>
```

Please keep in mind: because this is an iframe and there is no feedback, this loader can olny return success to Lazy.
There is no way to check if the video was loaded correctly or your provided video id is existing.


## Bugs / Feature request
Please [report](http://github.com/eisbehr-/jquery.lazy/issues) bugs and feel free to [ask](http://github.com/eisbehr-/jquery.lazy/issues) for new features and loaders directly on GitHub.


## License
Lazy plugins are dual-licensed under [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL-2.0](http://www.gnu.org/licenses/gpl-2.0.html) license.