# jQuery Flickr Wall #
This jQuery plugin retrieves sets from Flickr and displays them on a paginated grid

## Examples ##
To get your sets on the page just embed jQuery and the plugin files in your HTML document

    <link rel="stylesheet" href="jquery.flickrWall.css" type="text/css" charset="utf-8" />
    <script type="text/javascript" charset="utf-8" src="jquery.js"></script>
    <script type="text/javascript" charset="utf-8" src="jquery.flickrWall.js"></script>
    
and call the plugin on a div element like this:

    <div id="photosets-container"></div>
    <script type="text/javascript" charset="utf-8">
      $(document).ready(function() {
        $('#photosets-container').flickrWall({ apiKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', userId: 'AAAAAAAAAA@BBB', perPage: 6 });
      });
    </script>

Just replace XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX with your api key obtained from Flickr and AAAAAAAAAA@BBB with the Flickr user id you want to display sets from.