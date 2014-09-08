### jQuery Lazy - Delayed Image and Background Loader

---

## About jQuery.Lazy();
Lazy is a fast and lightweight delayed image and background loading plugin for jQuery. It is designed to speed up page loading times and decrease traffic to your users and customers by only loading the content in view. You can use Lazy in both vertical scroll ways, from `top-to-bottom` and `bottom-to-top`. It does not only support images in `<img/>` tags, even backgrounds, supplied with css like `background-image` or other methods, are supported.


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

#### Bower Package Manager
Lazy is even available through [Bower](http://bower.io). Just use `$ bower install jquery-lazy`.


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


## Bugs / Feature request
Please [report](http://github.com/eisbehr-/jquery.lazy/issues) bugs and feel free to [ask](http://github.com/eisbehr-/jquery.lazy/issues) for new features directly on GitHub.


## License
Lazy is dual-licensed under [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL-2.0](http://www.gnu.org/licenses/gpl-2.0.html) license.
