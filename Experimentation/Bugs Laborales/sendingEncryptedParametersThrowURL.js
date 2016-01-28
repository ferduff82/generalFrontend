var currentHost = window.location.hostname,
    currentHostname = window.location.host,
    currentForm = $('#notifications_form'),
    getHref = currentForm.find(".subscribe").attr('href'),
    input = currentForm.find('.email_address');

    input.val(CryptoJS.AES.encrypt(input.val(), currentHost));

    window.location.href = "http://" + currentHostname + getHref + "?email=" + input.val();