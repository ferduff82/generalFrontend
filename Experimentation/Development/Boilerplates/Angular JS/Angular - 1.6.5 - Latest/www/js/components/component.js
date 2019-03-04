app.component("headerMercadolibre",{
    template: "<h3>{{menu.myName}} -</h3><h3>{{menu.buttona}} -</h3><h3>{{menu.buttonb}} -</h3><h3>{{menu.buttonc}}</h3>",
    bindings: { 
        buttona: '@',
        buttonb: '@',
        buttonc: '@'
    },
    controller: function(){
        var vm = this;
        vm.$onInit = function() {
            vm.myName = 'User';
        }
    },
    controllerAs:'menu'
});