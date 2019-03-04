
var virtualDisco = angular.module('virtualDisco', ['ngRoute']);

virtualDisco.factory('mainClassUser', function() {

    var mainUserClass = function(username, edad, sex, email, password) {
        this.username = username;
        this.edad = edad;
        this.sex = sex;
        this.email = email;
        this.password = password;
    };
    return mainUserClass;
});

virtualDisco.factory('mainClassDiscos', function() {

    var mainDiscoClass = function(nombre, capacidad, cantBarras, reservados, freePass) {
        this.nombre = nombre;        
        this.capacidad = capacidad;
        this.cantBarras = cantBarras;
        this.reservados = reservados;
        this.freePass = freePass;
    };
    return mainDiscoClass;
});