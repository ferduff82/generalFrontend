
/* El patron singleton permite instanciar solo 1 objeto de la clase */
/* En javascript se utiliza para definir objetos globales con propiedades como configuración de la app */
/* Otro caso de uso es en los lenguajes multi thread si se hacen llamadas en distintas colas para evitar que se traigan múltiples objetos */
/* También es considerado un antipatrón ya que cualquier definición global es mala */
/* Es difícil encontrar casos de uso de este patrón */


var Singleton = (function () {
    var instance;
 
    function createInstance() {
        var object = new Object("I am the instance");
        return object;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
 
function run() {
 
    var instance1 = Singleton.getInstance();
    var instance2 = Singleton.getInstance();

    alert("Same instance? " + (instance1 === instance2));  
}

run()
