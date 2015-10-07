var getUrl = window.location.href,
    urlCut = '/content' + getUrl.split('/content').slice(1),
    urlLanguage = urlCut.split('/').slice(1,5).join('/'),
    slashUrl = '/' + urlLanguage;
console.log(slashUrl);