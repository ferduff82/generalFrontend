/*jshint browser: true, bitwise: true, curly: true, eqeqeq: true, immed: true, indent: 4, latedef: true, newcap: true, noarg: true, undef: true, unused: true, strict: false, trailing: true */
/*globals $, tccc */

tccc.initComponent('.image-asset', ['jqJSONP'], function (instances, tccc, jsonP) {
    instances.each(function () {
        var $this = $(this);
            launchAsset =  $this.find('.launch-asset-download');
            downloadButton = $this.find('#download-button');
            closeButton =  $this.find('.close')
            context = {
                section: "press_center",
                permalink: "",
                download_link: launchAsset.data('link'),
                asset_type: "image/jpeg",
                subscribe_url: launchAsset.data('subscribe'),
                needs_download_challenge: true
            };

        launchAsset.on('click', function(){
            var download_link = $(this).data('link'),
                data_type = $(this).data('type'),
                download_modal = $('#download-modal');

            download_modal.find('input[name="download_link"]').val(download_link);
            download_modal.find('h3').html('<span class="icon"></span>' + data_type);

            download_modal.fadeIn('slow');

            closeButton.on('click',function(){
                download_modal.fadeOut('slow');
            });
        });

        downloadButton.on("click", function(e) {

            var e = window.event || e;
                e.preventDefault();
                e.stopPropagation();

            download_link = $("#download-modal").find('input[name="download_link"]').val(),
            email_address = $("#download-modal").find('input[name="email"]').val(),
            media_outlet = $("#download-modal").find('input[name="company"]').val();    

            if (download_link !== "") {

                // validate the email/media inputs
                var valid = true;

                // email validation
                if (email_address === "" || (! /(.+)@(.+){2,}\.(.+){2,}/.test(email_address))) {
                    $(".error.email_address").css("color","#f90").text("Please provide a valid email address");
                    valid = false;
                } else {
                    $(".error.email_address").css("color","#fff");
                };

                // media outlet validation
                if (media_outlet === '' || media_outlet === 'Media Outlet') {
                    $(".error.media_outlet").css("color","#f90").text("Please provide a media outlet");
                    valid = false;
                } else {
                    $(".error.media_outlet").css("color","#fff");
                };

                // If no validation is necessary, then always make it valid
                if (!context.needs_download_challenge) {
                    //window.open(download_link, "_blank");
                    var a = document.createElement('a');
                        a.setAttribute("href", download_link);
                        a.setAttribute("target", "_self");

                    var dispatch = document.createEvent("HTMLEvents");
                        dispatch.initEvent("click", true, true);
                        a.dispatchEvent(dispatch);
                    $("#download-modal").fadeOut();
                    return;
                }

                if (valid) {
                    var formData = form2object('asset_download_challenge'),
                    json_submission = JSON.stringify(formData);

                    $.ajax({
                        type: "POST",
                        contentType:"application/json; charset=utf-8",
                        dataType:"json",
                        url: context.subscribe_url,
                        data: json_submission
                    })
                    .done(function( response ) {

                        var browserChrome = /chrome/.test(navigator.userAgent.toLowerCase());
                        var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                        var is_IE = navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0;

                        if(browserChrome || is_firefox || is_IE) {   

                            window.open(download_link,"new");
                            /*
                            var a = document.createElement('a');
                                a.setAttribute("href", download_link);
                                a.setAttribute("target", "_blank");

                            var event = new MouseEvent('click', {
                                'view': window,
                                'bubbles': true,
                                'cancelable': true
                            });
                            $.browser.safari = false;
                            a.dispatchEvent(event);
                            */
                        }

                        if($.browser.safari) {                         
                            var a = document.createElement('a');
                            a.setAttribute("href", download_link);
                            a.setAttribute("target", "_self");

                            var dispatch = document.createEvent("HTMLEvents");
                            dispatch.initEvent("click", true, true);
                            a.dispatchEvent(dispatch);
                        }

                        $("#download-modal").fadeOut();
                    });
                }

            } else {
                console.error("Download link is not set");
                $("#download-modal").fadeOut();
                return false;
            }
        });
    });
});