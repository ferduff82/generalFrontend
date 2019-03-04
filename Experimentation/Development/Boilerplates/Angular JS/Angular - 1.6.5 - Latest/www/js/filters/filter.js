app.filter('validateChar', function() {
  return function(input) {
     var validate = /[^a-zA-Z0-9\-\/]/.test(input);
     if (validate) {
       return 'Not a valida character';
     }
  }
});