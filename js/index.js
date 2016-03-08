// external js: isotope.pkgd.js, packery-mode.pkgd.js

$( function()
{
  var $grid;
  var IMAGE_JSON = "js/images.js";

  $.getJSON(IMAGE_JSON, function (json) {
    // Get a reference to the div anchor in the main DOM.
    var linksContainer = document.getElementById('grid'), baseUrl="";

    // loop through the results in the json object
    $.each(json.photos, function (i, photo) {
      if (photo.active === true) {
        /*

         <div class="grid-item">
            <a href="#" title="Trees Without Shadows" class="">
                <img src="img/portfolio-thumb/Trees_Without_Shadows.jpg" class="">


            </a>
         </div>
        */
        $('<div/>')
            .prop('class','grid-item '+ photo.category + '')
            .append($('<a/>')
                .append($('<img>').prop('src', photo.srcthumb))
                .prop('href', photo.srcfull).prop('title', photo.title).prop('class','data-lightbox').attr('data-lightbox',photo.active))
            .append($('<div/>').html(photo.title))
            .append($('<div/>').html(photo.media))
            .append($('<div/>').html(photo.size))

            .appendTo(linksContainer);
      }
    });
  }).success(function(){


      // init Isotope
      $grid = $('.grid').isotope({
          layoutMode: 'packery',
          itemSelector: '.grid-item',
          packery: {
              gutter: '.gutter-sizer'
          },

      });

      // layout Isotope after each image loads
      $grid.imagesLoaded().progress( function() {
          $grid.isotope('layout');
      });


      $(".data-lightbox").fancybox();


      // filter functions
      var filterFns = {
          // show if number is greater than 50
          numberGreaterThan50: function() {
              var number = $(this).find('.number').text();
              return parseInt( number, 10 ) > 50;
          },
          // show if name ends with -ium
          ium: function() {
              var name = $(this).find('.name').text();
              return name.match( /ium$/ );
          }
      };

      // bind filter button click
      $('.filters-button-group').on( 'click', 'button', function() {
          var filterValue = $( this ).attr('data-filter');
          // use filterFn if matches value
          filterValue = filterFns[ filterValue ] || filterValue;
          $grid.isotope({ filter: filterValue });
      });
      // change is-checked class on buttons
      $('.button-group').each( function( i, buttonGroup ) {
          var $buttonGroup = $( buttonGroup );
          $buttonGroup.on( 'click', 'button', function() {
              $buttonGroup.find('.is-checked').removeClass('is-checked');
              $( this ).addClass('is-checked');
          });
      });
  });
  

  
});