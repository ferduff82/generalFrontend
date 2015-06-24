    var vid = document.getElementById("video");
    	vid.onended = function() {
		$("#video").removeAttr("controls");
        $("#play-button, #video").hover(function() {
          $("#video").attr('controls', '');
          $("#play").attr('style', 'display: block !important');
        }, function() {
          $("#video").removeAttr("controls");
          $("#play").attr('style', 'display: none;');
        });
        vid.onplay = function() {
          $("#play-button, #video").hover(function() {
            $("#play").attr('style', 'display: none !important');
          });
        };
    };