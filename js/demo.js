$(function () {
    'use strict';

    var IMAGE_JSON = "js/images.js";

    $.getJSON(IMAGE_JSON, function (json) {
        // Get a reference to the div anchor in the main DOM.
        var linksContainer = document.getElementById('links'), baseUrl="";

        // loop through the results in the json object
        $.each(json.photos, function (i, photo) {
            if (photo.active === true) {


                /*

                 <div class="col-lg-3 col-md-4 col-xs-6 thumb">
                 <a class="thumbnail" href="#">
                 <img class="img-responsive" src="http://placehold.it/400x300" alt="">
                 </a>
                 </div>


                 */
                $('<div/>')
                    .append($('<a/>')
                        .append($('<img>').prop('src', photo.srcthumb).prop('class','img-responsive'))
                        .prop('href', "#").prop('title', photo.title).prop('class','thumbnail'))
                    .prop('class','col-lg-3 col-md-4 col-xs-6 thumb')
                    .appendTo(linksContainer);
            }
        });
    }).success(function(){
        var $container = $('.row');
        // init
        $container.packery({
            itemSelector: 'div[class*="col-"',
        });
    });

});/**
 * Created by ryanfurness on 2/12/16.
 */
