### jQuery Lazy - Delayed Image and Background Loader
[![GitHub version](https://badge.fury.io/gh/eisbehr-%2Fjquery.lazy.svg)](http://github.com/eisbehr-/jquery.lazy)
[![Dependency version](https://david-dm.org/eisbehr-/jquery.lazy.png)](https://david-dm.org/eisbehr-/jquery.lazy)

---

## About jQuery.Lazy();
Lazy is a fast and lightweight delayed image and background loading plugin for jQuery. It is designed to speed up page loading times and decrease traffic to your users and customers by only loading the content in view. You can use Lazy in all scroll ways, from `top-to-bottom`, `bottom-to-top`, `left-to-right` and `right-to-left`. It does not only support images in `<img/>` tags, even backgrounds, supplied with css like `background-image` or other methods, are supported. Lazy can set an default image and a placeholder while loading and support retina displays.


## Compatibility
Lazy will work with a wide range of browsers and support jQuery versions for years backwards. You can pick any version since jQuery 1.3.0 or greater. There is no way to guarantee, that Lazy will work with all browsers. But all i've tested worked great. If you find any problems in specific browsers, please let me know. 

Tested in: IE 6-11, Chrome (mobile), Firefox (mobile), Safari (mobile) and Android Browser.


## Documentation / Examples
For [documentation](http://jquery.eisbehr.de/lazy/#parameter), [examples](http://jquery.eisbehr.de/lazy/#examples) and other information take a look on the [project page](http://jquery.eisbehr.de/lazy/).


## Download & Installation
First of all, you will need [jQuery](http://jquery.com) to use Lazy successfully on your project! If you get this in you can install Lazy by different ways. Some examples below:

#### Self-Hosted
Download and save one of two available files to include Lazy to your page, either the [development](http://raw.githubusercontent.com/eisbehr-/jquery.lazy/master/jquery.lazy.js) or the [minified](http://raw.githubusercontent.com/eisbehr-/jquery.lazy/master/jquery.lazy.min.js) version.
```HTML
<script type="text/javascript" src="jquery.lazy.min.js"></script>
```

#### Package Managers
Lazy is even available through [NPM](http://npmjs.org) and [Bower](http://bower.io). Just use one of the following commands below.

[![NPM version](https://badge.fury.io/js/jquery-lazy.svg)](http://www.npmjs.org/package/jquery-lazy)
[![Bower version](https://badge.fury.io/bo/jquery-lazy.svg)](http://bower.io/search/?q=jquery-lazy)

[![NPM](https://nodei.co/npm/jquery-lazy.png?compact=true)](https://nodei.co/npm/jquery-lazy/)
```
$ npm install jquery-lazy
$ bower install jquery-lazy
```


## Basic Usage
1.) The basic usage of Lazy ist pretty easy. First of all you need to add a `data-src` attribute to those images you want to load delayed and insert the image path you want to load over Lazy. Best practice is to add a blank image to the `src` attribute: 
```HTML
<img class="lazy" data-src="path/to/image_to_load.jpg" src="blank.gif" />
```

2.) Start using Lazy by calling it after page load. You don't have to specify your elements. 
But for better performance, or different options, load your images over unique classes or any other jQuery selector. 
```JS
jQuery(document).ready(function() {
    jQuery("img.lazy").Lazy();
});
```
Take a look at the [documentation](http://jquery.eisbehr.de/lazy/) to get an idea what Lazy is capable of.


## Callbacks / Events
Lazy comes with a bunch of [callbacks and events](http://jquery.eisbehr.de/lazy/index.php?c=callback) you can assign to. Just add them by initialization settings:
* `beforeLoad` - before image is about to be loaded
* `onLoad` - on time the image is loading
* `afterLoad` - after the image was loaded successfully
* `onError` - whenever an image could not be loaded
* `onFinishedAll` - after all images in selector was loaded or returned an error


## Instances and public Functions
This plugin supports multiple parallel instances. Just initialize them with different selectors on jQuery. To access an instances public functions you can initialize them in an object oriented manner or grab the instance bind to every element by default:
```JS
// object oriented way
var instance = jQuery("img.lazy").Lazy({chainable: false});

// grab from elements (only works well if you use same selectors)
jQuery("img.lazy").Lazy();
var instance = jQuery("img.lazy").data("plugin_lazy");
```

Every instance has some public available functions to control its behavior. There are currently three available:
```JS
instance.update();  // loads all images in current viewport
instance.loadAll(); // loads all remaining available images from this instance
instance.destroy(); // unbinds all events and stop execution directly
```


## Bugs / Feature request
Please [report](http://github.com/eisbehr-/jquery.lazy/issues) bugs and feel free to [ask](http://github.com/eisbehr-/jquery.lazy/issues) for new features directly on GitHub.


## License
Lazy is dual-licensed under [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL-2.0](http://www.gnu.org/licenses/gpl-2.0.html) license.
