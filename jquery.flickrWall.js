/*!
 * jQuery flickrWall
 * https://github.com/Pandalab/jquery-flickr-wall
 * 
 * Copyright (c) 2011 "Pandalab" - Paolo Sangregorio
 * Licensed under the MIT license.
 * 
 */
 
(function($) {
  $.fn.extend({
    
    flickrWall: function(options) {
      
      var _this = this;
      
      var defaults = {
        apiKey: '',
        perPage: 6,
        userId: ''
      };
      
      this.options = $.extend(defaults, options);
      
      this.page = 1;
      
      this.load_page = function(page) {
        
        window.location.hash = '#page=' + page;
        _this.spinner.show();
        _this.page = parseInt(page);
        _this.photosetsWrap.html('');

        $.getJSON('http://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=' + _this.options.apiKey + '&user_id=' + _this.options.userId + '&format=json&per_page=' + _this.options.perPage + '&page=' + page + '&jsoncallback=?', function(data) {

          _this.spinner.fadeOut();

          $(_this).find(".page-number").html("Pag " + data.photosets.page + " di " + data.photosets.pages);
          if (parseInt(data.photosets.page) < parseInt(data.photosets.pages)) {
            $(_this).find(".next-page").show();
          } else {
            $(_this).find(".next-page").hide();
          }
          if (parseInt(data.photosets.page) > 1) {
            $(_this).find(".prev-page").show();
          } else {
            $(_this).find(".prev-page").hide();
          }
          for (i in data.photosets.photoset) {

            var setContainer = $("<div class='set-container'></div>");
            var setBox = $("<a class='set-box' style='display:none' id='primary-" + data.photosets.photoset[i].primary + "'></a>");
            setBox.attr('href', 'http://www.flickr.com/photos/' + _this.options.userId + '/sets/' + data.photosets.photoset[i].id);

            if (i % 3 == 0) {
              setContainer.css('margin-left', '0px');
            }

            var titleContainer = $("<div class='set-title'>" + data.photosets.photoset[i].title._content + "</div>");
            var photosNumber = $("<div class='set-photos-number'>" + data.photosets.photoset[i].photos + " foto</div>");
            var description = $("<div class='set-description'>" +data.photosets.photoset[i].description._content + "</div>");
            var clearer = $("<div class='clear'></div>");

            setBox.append(titleContainer);
            setBox.append(photosNumber);
            setBox.append(clearer);
            setBox.append(description);

            _this._get_cover(setBox, data.photosets.photoset[i].primary);

            setContainer.append(setBox);
            _this.photosetsWrap.append(setContainer);

            if (i % 3 == 2) {
              _this.photosetsWrap.append(clearer.clone());
            }
          }
        });
      };
      
      this.goToNextPage = function() {
        _this.load_page(_this.page + 1);
      };
      
      this.goToPrevPage = function() {
        _this.load_page(_this.page - 1);
      };
      
      this._get_cover = function(setBox, photoId) {
        $.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + _this.options.apiKey + '&photo_id=' + photoId + '&format=json&jsoncallback=?', function(data) {
          var cover = $('<img src="http://farm' + data.photo.farm + '.static.flickr.com/' + data.photo.server + '/' + data.photo.id + '_' + data.photo.secret + '_m.jpg" />');
          cover.load(function() {
            setBox.fadeIn();
          });
          setBox.prepend(cover);
        });
      };
      
      this.parseHashVars = function() {
        var vars = {}, hash;
        var hashes = window.location.hash.replace('#', '').split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars[hash[0]] = hash[1];
        }
        return vars;
      };
      
      this.spinner = $('<div class="photosets-spinner"></div>');
      $(_this).addClass('flickr-wall');
      $(_this).html('<div class="photosets-wrap" style="height:' + ((_this.options.perPage/3) * 320) + 'px"></div><div class="paginator"><div class="page-number"></div><div class="page-buttons"><div class="next-page">Avanti</div><div class="prev-page">Indietro</div></div></div>');
      $(_this).prepend(this.spinner);
      _this.photosetsWrap = $(_this).find('.photosets-wrap');
      _this.nextButton = $(_this).find('.next-page');
      _this.prevButton = $(_this).find('.prev-page');
      _this.nextButton.click(function() {
        _this.goToNextPage();
      });
      _this.prevButton.click(function() {
        _this.goToPrevPage();
      });
      
      var hashVars = _this.parseHashVars();
      if (hashVars.page) {
        _this.load_page(parseInt(hashVars.page));
      } else {
        this.load_page(1);
      }
      
    }
    
  });
}(jQuery));