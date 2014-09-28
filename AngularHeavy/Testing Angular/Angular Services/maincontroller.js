'use strict';

angular.module('MyTutorialApp')
    .service('DataProcess', function(){
        return {
            process: function (ar) {
                return ar.map(function (el){
                    return el = 10;
                });
            }
        }
    });