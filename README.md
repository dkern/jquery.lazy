### jQuery Lazy - Delayed Content, Image and Background Loader
[![GitHub version](https://badge.fury.io/gh/eisbehr-%2Fjquery.lazy.svg)](http://github.com/eisbehr-/jquery.lazy)
[![NPM version](https://badge.fury.io/js/jquery-lazy.svg)](http://www.npmjs.org/package/jquery-lazy)
[![Bower version](https://badge.fury.io/bo/jquery-lazy.svg)](http://bower.io/search/?q=jquery-lazy)
[![Dependency version](https://david-dm.org/eisbehr-/jquery.lazy.png)](https://david-dm.org/eisbehr-/jquery.lazy)

---

### Table of Contents
* [About](#about-jquerylazy)
* [Compatibility](#compatibility)
* [Documentation / Examples](#documentation--examples)
* [Installation](#installation)
  * [CDN](#cdn)
  * [Self-Hosted](#self-hosted)
  * [Package Managers](#package-managers)
* [Basic Usage](#basic-usage)
* [Callbacks / Events](#callbacks--events)
* [Instances and public Functions](#instances-and-public-functions)
* [Custom Content Loaders](#custom-content-loaders)
* [Configuration Parameters](#configuration-parameters)
* [Bugs / Feature request](#bugs--feature-request)
* [License](#license)

---

## About jQuery.Lazy();
Lazy is a fast, feature-rich and lightweight delayed content loading plugin for jQuery. 
It's designed to speed up page loading times and decrease traffic to your users by only loading the content in view. 
You can use Lazy in all vertical and horizontal scroll ways.
It supports images in `<img/>` tags and backgrounds, supplied with css like `background-image`, by default or any other content by [custom loaders](#custom-content-loaders). 
On those elements Lazy can set an default image or a placeholder while loading and supports retina displays as well.


## Compatibility
Lazy will work with a wide range of browsers and support jQuery versions for years backwards. 
You can pick any version since jQuery 1.7.0 or greater.
There is no way to guarantee, that Lazy will work with all browsers, but all I've tested worked great so far.
If you find any problems in specific browsers, please let me know. 

**Tested in:** IE 6-11, Chrome (mobile), Firefox (mobile), Safari (mobile) and Android Browser.


## Documentation / Examples
For [documentation](http://jquery.eisbehr.de/lazy/#parameter), 
[examples](http://jquery.eisbehr.de/lazy/#examples) and other information take a look on the [project page](http://jquery.eisbehr.de/lazy/).


## Installation
First of all, you will need a copy of [jQuery](http://jquery.com) to use Lazy successfully on your project. If you get this you can install Lazy by different ways. Some examples below:

#### CDN
Lazy is available over [cdnjs](http://cdnjs.com) and [jsDelivr](http://jsdelivr.com) CDN and can directly included to every page.
```HTML
<!-- cdnjs -->
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery.lazy/1.6.7/jquery.lazy.min.js"></script>

<!-- jsDeliver -->
<script type="text/javascript" src="//cdn.jsdelivr.net/jquery.lazy/1.6.7/jquery.lazy.min.js"></script>
```

#### Self-Hosted
[Download](https://github.com/eisbehr-/jquery.lazy/archive/master.zip) and save one of two available files to include Lazy to your page, either the [development](http://raw.githubusercontent.com/eisbehr-/jquery.lazy/master/jquery.lazy.js) or the [minified](http://raw.githubusercontent.com/eisbehr-/jquery.lazy/master/jquery.lazy.min.js) version.
```HTML
<script type="text/javascript" src="jquery.lazy.min.js"></script>
```

#### Package Managers
Lazy is even available through [NPM](http://npmjs.org) and [Bower](http://bower.io). Just use one of the following commands below:

[![NPM](https://nodei.co/npm/jquery-lazy.png?compact=true)](https://nodei.co/npm/jquery-lazy/)
```sh
$ npm install jquery-lazy
$ bower install jquery-lazy
```


## Basic Usage
1.) The basic usage of Lazy ist pretty easy.
First of all you need to prepare all elements you want to lazy load. 
By default add a `data-src` attribute to images containing the loadable image and/or a `data-loader` attribute to elements witch shall use [custom loaders](#custom-content-loaders).
```HTML
<img class="lazy" data-src="path/to/image_to_load.jpg" src="" />
```

2.) Start using Lazy by calling it after page load.
You don't have to specify your elements exactly, but for better performance, or different options, load your elements over unique classes or any other jQuery selector. 
```JS
$(function() {
    $("img.lazy").Lazy();
});
```
Take a look at the [documentation](http://jquery.eisbehr.de/lazy/) to get an idea what Lazy is capable of.


## Callbacks / Events
Lazy comes with a bunch of [callbacks and events](http://jquery.eisbehr.de/lazy/index.php?c=callback) you can assign to.
Just add them by initialization settings:
* `beforeLoad` - before item is about to be loaded
* `afterLoad` - after the item was loaded successfully
* `onError` - whenever an item could not be loaded
* `onFinishedAll` - after all items in instance was loaded or returned an error


## Instances and public Functions
This plugin supports multiple parallel instances.
Just initialize them with different selectors on jQuery.
To access an instances public functions you can initialize them in an object oriented manner or grab the instance bind to every element by default:
```JS
// object oriented way
var instance = $("img.lazy").Lazy({chainable: false});

// grab from elements (only works well if you use same selectors)
$("img.lazy").Lazy();
var instance = $("img.lazy").data("plugin_lazy");
```

Every instance has some public available functions to control it's behavior.
There are currently six available:
```JS
instance.config(entryName[, newValue]); // get or set an configuration entry
instance.addItems(items); // add new items to current instance
instance.getItems(); // get all unhandled items left of current instance
instance.update([useThrottle]); // loads all elements in current viewport
instance.loadAll(); // loads all remaining available elements from this instance
instance.destroy(); // unbinds all events and stop execution directly
```


## Custom Content Loaders
With the custom loaders option there is a powerful solution to load every contents the Lazy way.
The plugin will handle everything, you just create a loading method witch got triggered whenever the element hits the visibility threshold.
It is still possible to load images and custom loaders in the same Lazy instance.

To use this just define a loader function inside the Lazy initialisation and pass the loader name to the `data-loader` attribute of the elements witch should be lazy loaded.
```HTML
<div class="lazy" data-loader="customLoaderName"></div>
<img class="lazy" data-src="path/to/image_to_load.jpg" src="" />
<div class="lazy" data-loader="customLoaderName"></div>
<div class="lazy" data-loader="asyncLoader"></div>
```
```JS
$(".lazy").Lazy({
    // callback
    beforeLoad: function(element) {
        console.log("start loading " + element.prop("tagName"));
    },

    // custom loaders
    customLoaderName: function(element) {
        element.html("element handled by custom loader");
        element.load();
    },
    asyncLoader: function(element, response) {
        setTimeout(function() {
            element.html("element handled by async loader");
            response(true);
        }, 1000);
    }
});
```

## Configuration Parameters
The following configurations is available by default:

Name            | Type       | Default       | Description
--------------- | ---------- | ------------- | -----------
chainable       | *boolean*  | *true*        | By default Lazy is chainable and will return all elements. If set to `false` Lazy will return the created plugin instance itself for further use.
autoDestroy     | *boolean*  | *true*        | Will automatically destroy the instance when no further elements are available to handle.
bind            | *string*   | *load*        | If set to `load`' Lazy starts working directly after page load. If you want to use Lazy on own events set it to `event`'.
threshold       | *integer*  | *500*         | Amount of pixels below the viewport, in which all images gets loaded before the user sees them.
visibleOnly     | *boolean*  | *false*       | Determine if only visible elements should be load.
appendScroll    | *integer*  | *window*      | An element to listen on for scroll events, useful when images are stored in a container.
scrollDirection | *string*   | *both*        | Determines the handles scroll direction. Possible values are `both`, `vertical` and `horizontal`.
imageBase       | *string*   | *null*        | If defined this will be used as base path for all images loaded by this instance.
defaultImage    | *string*   | *blank image* | Base64 image string, set as default image source for every image without a predefined source attribute.
placeholder     | *string*   | *null*        | Base64 image string, set a background on every element as loading placeholder.
delay           | *integer*  | *-1*          | If you want to load all elements at once after page load, then you can specify a delay time in milliseconds.
combined        | *boolean*  | *false*       | With this parameter, Lazy will combine the event driven and delayed element loading.
**attributes**  |            |               |
attribute       | *string*   | *data-src*    | Name of the image tag attribute, where the image path is stored.
retinaAttribute | *string*   | *data-retina* | Name of the image tag attribute, where the path for optional retina image is stored.
loaderAttribute | *string*   | *data-loader* | Name or the element attribute, where the identifier of the customer loader is sored.
removeAttribute | *boolean*  | *true*        | Determine if the attribute should be removed from the element after loading.
handledName     | *string*   | *handled*     | Name of the element tag data attribute, to determine if element is already handled.
loadedName      | *string*   | *loaded*      | Name of the element tag data attribute, to determine if element is already loaded.
**effect**      |            |               |
effect          | *string*   | *show*        | Function name of the effect you want to use to show the loaded images, like `show` or `fadein`.
effectTime      | *integer*  | *0*           | Time in milliseconds the effect should use to view the image.
**throttle**    |            |               |
enableThrottle  | *boolean*  | *true*        | Throttle down the loading calls on scrolling event.
throttle        | *integer*  | *250*         | Time in milliseconds the throttle will use to limit the loading calls.
**callbacks**   |            |               |
beforeLoad      | *function* | *null*        | Callback function, which will be called before the element gets loaded. Has current element as parameter.
afterLoad       | *function* | *null*        | Callback function, which will be called after the element was loaded. Has current element as parameter.
onError         | *function* | *null*        | Callback function, which will be called if the element could not be loaded. Has current element as parameter.
onFinishedAll   | *function* | *null*        | Callback function, which will be called after all elements was loaded or returned an error. This callback has no parameter.


## Bugs / Feature request
Please [report](http://github.com/eisbehr-/jquery.lazy/issues) bugs and feel free to [ask](http://github.com/eisbehr-/jquery.lazy/issues) for new features directly on GitHub.


## License
Lazy is dual-licensed under [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL-2.0](http://www.gnu.org/licenses/gpl-2.0.html) license.
