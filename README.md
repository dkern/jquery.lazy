jQuery.Lazy();
==============
Lazy is a delayed image loading plugin for jQuery. It is designed to speed up page loading times and decrease traffic to your users and customers. It does not only support images in `<img/>` tags, even backgrounds supplied with css like `background-image` or other methods are supported.

Documentation / Examples
========================
For documentation, examples and other information take a look on the project page:
[http://jquery.eisbehr.de/lazy](http://jquery.eisbehr.de/lazy/)

Basic Usage
===========
The basic usage is quite simple. Just change the image tags and add Lazy to all images you want to lazy load.
```HTML
<img class="lazy" data-src="path/to/image_to_load.jpg" src="" />
```
```HTML
<script type="text/javascript">
jQuery("img.lazy").Lazy();
</script>
```
