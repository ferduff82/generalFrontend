if (valid) {
    
    /* Define a var openin a window */
    var authWindow = window.open(''),
        formData = form2object('asset_download_challenge'),
        json_submission = JSON.stringify(formData);

    $.ajax({
        type: "POST",
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        url: context.subscribe_url,
        data: json_submission
    })
    .done(function( response ) {
        /* Use the var and set a location */
        authWindow.location = download_link;    

        $("#download-modal").fadeOut();
    });
}