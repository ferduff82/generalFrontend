$(function () {


  /* Initial Call */

  $.ajax({
    type: "GET",
    url: "assets/config/config.json",
    success: function (data) {
      var apiData = data.api_call,
          apiUrl = data.api_url,
          manualInput = data.manual_input,
          manualInputLength = manualInput.length;

      if (apiData) {
        apiCall(apiUrl);
      } else {
        templateParse(manualInput, manualInputLength);
      }
    }
  });

  /* Calling API if JSON config is set to false */

  function apiCall(apiUrl) {
    $.ajax({
      type: "GET",
      url: apiUrl,
      success: function (data) {
        var dataLength = Object.keys(data).length;
        templateParse(data, dataLength);
      }
    });
  }

  /* Mapping the data into the DOM */

  function templateParse(data, length) {

    var promises = [];

    for (let index = 0; index < length; index++) {

      var keyObject = Object.keys(data)[index],
          currentObject = data[keyObject],
          deviceImg = currentObject.image;

      var productTemplate = "<article class='product-container'><div class='top-bar'><h2>" +
          currentObject.name + "</h2><img src='" +
          currentObject.tech_spec.processor_thumbnail + "' alt='" +
          currentObject.tech_spec.processor + " image' class='intel-badge'></div><div class='content'><div class='device'><img src='" +
          deviceImg + "' alt=' Device (" +
          currentObject.name + ") image ' class='device-img'></div><div class='specs'><h3 class='title'>" +
          currentObject.tech_spec.processor + "</h3><ul class='info'><li> Graphics: " +
          currentObject.tech_spec.display + "</li><li> Storage: " +
          currentObject.tech_spec.hdd + " </li><li> Memory:  " +
          currentObject.tech_spec.ram + " </li><li> Operating System: " +
          currentObject.tech_spec.sop + " </li></ul> <h4 class='price'>$" +
          currentObject.price + "</h4><a href='" +
          currentObject.link + "' class='cta' target='_blank' > Shop now › </a></div></div></article>";

      $('.wrapper').append(productTemplate);


      /* Return promises of Images to be Loaded */

      promises.push(function () {
        return $.Deferred(function (res) {
          $('.device-img').imagesLoaded(function() {
            res.resolve();
          })
        }).promise();
      })

    }

    /* All function for Promises */

    var all = function (array) {
      var deferred = $.Deferred(),
          fulfilled = 0,
          length = array.length,
          results = [];

      if (length === 0) {
        deferred.resolve();
      } else {
        array.forEach(function (promise) {
          $.when(promise()).then(function () {
            fulfilled++;
            if (fulfilled === length) {
              deferred.resolve();
            }
          });
        });
      }
      return deferred.promise();
    };


    /* Hide Loader on Images Loaded */

    $.when(all(promises)).then(function () {
      $('.modal').hide();
    });

  }

});