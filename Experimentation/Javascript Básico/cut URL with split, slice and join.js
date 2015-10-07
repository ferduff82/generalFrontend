var url = window.location.href,
    urlCut = url.split('/').slice(4, 8).join('/'),
    slashUrl = '/' + urlCut;
    console.log(slashUrl);