# jQuery Flickr Wall #
This jQuery plugin retrieves sets from Flickr and displays them on a paginated grid

## Examples ##
To get your sets on the page just call the plugin on a div element like this:

    <script type="text/javascript" charset="utf-8">
      $(document).ready(function() {
        $('#photosets-container').flickrWall({ apiKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', userId: 'AAAAAAAAAA@BBB', perPage: 6 });
      });
    </script>

Just replace XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX with your api key obtained from Flickr and AAAAAAAAAA@BBB with the Flickr user id you want to display sets from.