/* Modelo de Login */

function getValuesLogin( login ) {

  this.userLogin = document.getElementById('userLogin').value;
  this.passLogin = document.getElementById('passLogin').value;

  var a = this.userLogin;
  var b = this.passLogin;

  if (a === "" || b === "") {
    alert("User or pass can't be empty");
    return false;
  } else {
 
    this.getInfoUser = function () {
      return this.userLogin;
    };

    this.getInfoPass = function () {
      return this.passLogin;
    };
  }
}

/* Modelo de Creación de Compra */

function getValues( product ) {

  this.price = document.getElementById('price').value;
  this.kilos = document.getElementById('kilos').value;
  this.product = document.getElementById('product').value;
  this.date = document.getElementById('date').value;
  this.brand = document.getElementById('brand').value;
  this.category = document.getElementById('category').value;

  var a = isNaN(this.price);
  var b = isNaN(this.kilos);

  if (a === true && b === true) {
    alert("Price and kilos must be numbers");
    return false;
  } else {
 
    this.getInfoProduct = function () {
      return "<p>" + this.product + "  </p>";
    };

    this.getInfoDate = function () {
      return "<p>" + this.date + "  </p>";
    };

    this.getInfoPrice = function () {
      return "<p>$" + this.price + "  </p>";
    };

    this.getInfoKilos = function () {
      return "<p>Cantidad:" + this.kilos + "  </p>";
    };

    this.getInfoBrand = function () {
      return "<p>" + this.brand + "  </p>";
    };

    this.getInfoCategory = function () {
      return "<p>" + this.category + "  </p>";
    };
  }
}

/* Instancias del Modelo de Compra*/
/* Comienzo de la construcción de la compra *//////////////////////////////////////////////////////////////////////////////////////////

function newProduct (){

  var nuevoGasto = new getValues(product);

    /* Validación de Campos vacíos */

    if(nuevoGasto.getInfoCategory() == "<p>  </p>"){
      alert('Debe ingresar una categoría de compra')
      return false
    } else if (nuevoGasto.getInfoProduct() == "<p>  </p>"){
      alert('Debe ingresar un producto')
      return false
    } else if (nuevoGasto.getInfoDate() == "<p>  </p>"){
      alert('Debe ingresar una fecha')
      return false
    } else if (nuevoGasto.getInfoPrice() == "<p>$  </p>"){
      alert('Debe ingresar un precio')
      return false
    }

    /* Push into array */

    var objects = [];

        objects.push(nuevoGasto.getInfoProduct())
        objects.push(nuevoGasto.getInfoDate())
        objects.push(nuevoGasto.getInfoPrice())

        /* Don't push if empty values */

        if (nuevoGasto.getInfoKilos() != "<p>Cantidad:  </p>") {
          objects.push(nuevoGasto.getInfoKilos())
        }
        if (nuevoGasto.getInfoBrand() != "<p>  </p>") {
          objects.push(nuevoGasto.getInfoBrand())
        };

        objects.push(nuevoGasto.getInfoCategory())
        alert("Su producto ha sido ingresado con éxito");
        console.log(objects);

        /* Re-search on array to asign color */

        if (nuevoGasto.getInfoKilos() == "Cantidad:   " && nuevoGasto.getInfoBrand() == "  ") {
          var getCategoryValue = objects[3];
        }else if (nuevoGasto.getInfoKilos() == "Cantidad:   " && nuevoGasto.getInfoBrand() != "  ") {
          var getCategoryValue = objects[4];
        }else if (nuevoGasto.getInfoKilos() != "Cantidad:   " && nuevoGasto.getInfoBrand() == "  ") {
          var getCategoryValue = objects[4];
        }else{
          var getCategoryValue = objects[5];
        }

        var getProductIndex = objects.indexOf(nuevoGasto.getInfoProduct());

        var createUl = document.createElement('ul');
        var getDemo = document.getElementById("demo");
        var createRemovePurchaseButton = document.createElement('input');
            createRemovePurchaseButton.setAttribute("type","button");
            createRemovePurchaseButton.setAttribute("value","Borrar Compra");
        var randomId = makeid();
            createRemovePurchaseButton.setAttribute("id",randomId);
            createRemovePurchaseButton.setAttribute("class","borrarCompra");
        var getNumber = makeid();
            createUl.setAttribute("id",getNumber);
            getDemo.appendChild(createUl);
            createUl.appendChild(createRemovePurchaseButton);

        var selectUL = document.getElementById(getNumber);

        /* Loop array with for with background color change on category select */

        text = "";

        for (var i = 0; i < objects.length; i++) {

        var newElem = document.createElement("li");
            newElem.innerHTML = text = objects[i];
        var createEditItem = document.createElement('input');
            createEditItem.setAttribute("type","button");
            createEditItem.setAttribute("value","Editar");
            createEditItem.setAttribute("class","edit");
            newElem.appendChild(createEditItem);
        
          if (getCategoryValue == "<p>Supermercado  </p>"){
                selectUL.classList.add('coral');
                selectUL.appendChild(newElem);
          } else if (getCategoryValue == "<p>Impuestos  </p>"){
                selectUL.classList.add('aquamarine');
                selectUL.appendChild(newElem);
          } else if (getCategoryValue == "<p>Salidas  </p>"){
                selectUL.classList.add('chocolate');
                selectUL.appendChild(newElem);
          } else if (getCategoryValue == "<p>Varios  </p>"){
                selectUL.classList.add('crimson');
                selectUL.appendChild(newElem);
          } else {
                selectUL.classList.add('personalizados')
                selectUL.appendChild(newElem);
          }
        }

        $(selectUL).find("li:last-child p").addClass("mainCategoryClass");
        $(selectUL).addClass("newPurchase");

        /* Remueve los datos del input */

        document.getElementById('product').value=null;
        document.getElementById('date').value=null;
        document.getElementById('price').value=null;
        document.getElementById('kilos').value=null;
        document.getElementById('brand').value=null;

  /* Eventos dentro de final de función */

  /* Editar Items */

  $('ul#'+getNumber+'>li>input.edit').click(function(){
    var edit = prompt("Ingrese el cambio de valor");
    if (edit != null) {
      $(this).prev().empty();
      var getIndex = $(this).parent().index();
      objects[getIndex] = edit;
      $(this).prev().prepend(objects[getIndex]);
      alert("Valor " + objects[getIndex] + " cambiado con éxito");
    }

  });

  /* Borrar Compra */

  var borrarCompra = document.getElementById(randomId);
  borrarCompra.addEventListener("click", remove, false);

  function remove(event){
    console.dir(event);
    debugger
    $(this).parent("ul").remove();
    objects.splice(getProductIndex,7);
    console.log(objects);
    alert("Compra borrada");
    $("#alert").text("Element removido");
    setTimeout(function(){
      document.getElementById('alert').innerHTML="";
    }, 3000);
  }

  /* Tools *////////////////////////////

  /* Genera String aleatorias de 5 caracteres */

  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

}

/* Fin de la construcción de la compra *//////////////////////////////////////////////////////////////////////////////////////////

/* Agregar categorías */

function createCategories (){

  var getCategorieValue = document.getElementById('categories').value;

  if (getCategorieValue.length<3) {
      alert("Es necesario ingresar 3 letras por categoría por lo menos");
      return false;
  } else {

  var newElem = document.createElement ("option");
  newElem.innerHTML = getCategorieValue;
  var container = document.getElementById ("category");
  container.appendChild (newElem);
  alert("Su categoría "+ getCategorieValue +" se ha ingresado con éxito");

  /* Remueve los datos del input */
  document.getElementById('categories').value=null;
  }
}

/* Remover categorías */

function removeCategories () {

  function readAllCategories() {
    var txt="";
    var c = document.getElementById('category');
    var selectId = document.getElementById('removeCategoriesContent');

    for (i=1; i<c.length; i++){
      txt = txt + "<li>" + c[i].childNodes[0].nodeValue + "</li>";
    };
    selectId.innerHTML = "<ul id='newUl'>" + txt + "</ul>";
    remove();
  }
  readAllCategories();

  function remove(){
    $("li").click(function(){

      var getClickValue = $(this).text();
      var getIndex = $(this).index()+1;

      if (confirm("Desea borrar también el contenido de las categorías") == true) {
        removeCat();
        removeContent();
        alert("Categoría y contenido borrados con éxito");
      } else {
        removeCat();
        alert("Categoría borrada con éxito");
      }

      function removeCat(){
        var select = document.getElementById('category');
        select.removeChild(select[getIndex]);
        $('#newUl').remove(); 
        readAllCategories();
      }

      function removeContent(){
          var getCategoryName = $(".mainCategoryClass").text();
          var getCategoryNameTrimed = $.trim(getCategoryName);

          if(getClickValue == getCategoryNameTrimed){
              $(".borrarCompra").parent().remove();
          }
      }

    });
  }
  
}

/* Evaluar OnBlur si son números o no */

function showFocus(elem) {
  var age = elem.value;
  if (isNaN(age)) {
    alert('Debe ingresar solo números');
    elem.style.backgroundColor = 'red';
  }
}

/* Eventos */

document.getElementById('get-values').onclick = newProduct;
document.getElementById('get-categories').onclick = createCategories;
document.getElementById('get-users').onclick = newLogin;
document.getElementById('removeCategories').onclick = removeCategories;

/* Evento datepicker */

$( function() {
  $( "#date" ).datepicker();
});