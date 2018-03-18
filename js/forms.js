function removeChildsElement(element){

        for(var i=element.children.length-1; i>-1; i--){
                element.removeChild(element.children[i]);
            }
}

function createInput(labelIn, inputName, form){
        var dv = document.createElement("div");
        dv.setAttribute("class", "form-group");
        
        var label = document.createElement("label");
        label.setAttribute("class", "control-label col-sm-2");
        label.appendChild(document.createTextNode(labelIn));
        dv.appendChild(label);
                
        var dv1 = document.createElement("div");
        dv1.setAttribute("class", "col-sm-4");
                
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "form-control");
        input.setAttribute("name", inputName);
                
        dv1.appendChild(input);
        dv.appendChild(dv1);
        form.appendChild(dv);
}
        
 function textArea(form){
        
        dv = document.createElement("div");
        dv.setAttribute("class", "form-group");
                
        label = document.createElement("label");
        label.setAttribute("class", "control-label col-sm-2");
        label.appendChild(document.createTextNode("Descripción"));
        dv.appendChild(label);
                
        dv1 = document.createElement("div");
        dv1.setAttribute("class", "col-sm-4");
                
        input = document.createElement("textarea");
        input.setAttribute("rows", "5");
        input.setAttribute("class", "form-control");
        input.setAttribute("name", "description");
                
        dv1.appendChild(input);
        dv.appendChild(dv1);
        form.appendChild(dv);
}

function createButton(func, form){
        dv = document.createElement("div");
        dv.setAttribute("class", "form-group");

        dv1 = document.createElement("div");
        dv1.setAttribute("class", "col-sm-offset-5");

        var a = document.createElement("a");
        a.appendChild(document.createTextNode("Enviar"));
        a.setAttribute("class", "btn btn-default");
        a.addEventListener("click", func());   

        dv1.appendChild(a);
        dv.appendChild(dv1);
        form.appendChild(dv);
}

function createSelect(form, type, name, lab){
    var div = document.createElement("div");
    div.setAttribute("class", "form-group");
    
    var dv1 = document.createElement("div");
    dv1.setAttribute("class", "col-sm-4");
    
    var label = document.createElement("label");
    label.appendChild(document.createTextNode(lab));
    label.setAttribute("class", "control-label col-sm-2");
    div.appendChild(label);
    
    var select = document.createElement("select");
    select.setAttribute("class", "form-control");
    select.setAttribute("name", name);
    
    if (type == "Categories"){
        var categories = sh.categories;
        var category = categories.next();
        
        category = categories.next();
        
        while (category.done !== true){
             option = document.createElement("option");
             option.appendChild(document.createTextNode(category.value.title));
             option.setAttribute("value", category.value.title);
             select.appendChild(option);
            
             category = categories.next();
        }
   
    }
    
    if (type == "Shops"){
        
        var shops = sh.shops;
        var shop = shops.next();
        
        shop = shops.next();
        
        while (shop.done !== true){
             option = document.createElement("option");
             option.appendChild(document.createTextNode(shop.value.name));
             option.setAttribute("value", shop.value.cif);
             select.appendChild(option);
            
             shop = shops.next();
        }
    }
    
    if (type == "Products"){
        
        for(var i=0; i<sh.products.length; i++){
             option = document.createElement("option");
             option.appendChild(document.createTextNode("("+sh.products[i].serialNumber+") "+ sh.products[i].name));
             option.setAttribute("value", sh.products[i].serialNumber);
             select.appendChild(option);
        }

    }
    
    dv1.appendChild(select)
    div.appendChild(dv1);
    form.appendChild(div);
}

function resultForm(result){
    var p = document.getElementById("result");
    
    if (result){
        p.setAttribute("style", "color:green");
        p.innerHTML = "Consulta realizada correctamente.";
    }else{
        p.setAttribute("style", "color:red");
        p.innerHTML = "Ha ocurrido un error.";
    }
}
        
function addCategoryForm(){
        function addCategory(){
              return function (){
                  var name = document.forms["catForm"]["title"].value;
                  var description = document.forms["catForm"]["description"].value;
                  
                  try{
                      if (name == "" || description == ""){
                         throw new EmptyValueException();
                       } else {
                             var cat = new Category(name);
                             sh.addCategory(cat);
                             cat.description = description;
                           
                             init = initPopulate(sh);
                             init();
                        } 
                   }catch(e){
                       console.log(e);
                       resultForm(false);
                   } 
              }
        }
        
       return function (){
            var divForm = document.getElementById("sct1");
                
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
           
            var label = document.createElement("label");
            label.appendChild(document.createTextNode("Añadir categoria"));
            label.setAttribute("class", "h2");
            form.appendChild(label);
               
            createInput("Title", "title", form);
            textArea(form);
            createButton(addCategory, form);
           
            var p = document.createElement("p");
            p.setAttribute("id", "result");
            p.setAttribute("class", "h2");
            form.appendChild(p);
                
            divForm.appendChild(form);
      }
}
    
function updCategoryForm(){
        
        function updCategory(){
              return function (){
                     var titleId = document.forms["catForm"]["selectPrin"].value;
                     var title = document.forms["catForm"]["title"].value;
                     var description = document.forms["catForm"]["description"].value;
                  
                     try{
                         if (title == "" || titleId == ""){
                          resultForm(false);
                          throw new EmptyValueException();
                         } else {
                              var cs = sh.categories;
                              var category = cs.next();
                              var aux = -1;

                              while (category.done !== true){
                                if (category.value.title === titleId ){
                                    aux = category.value;
                                }
                                category = cs.next();
                              } 

                             if (aux !== -1){
                                    aux.title = title;
                                    aux.description = description;
                                 
                                    init = initPopulate(sh);
                                    init();
                             } else {
                                    throw new CategoryNoExistsException();
                             }
                         }
                     } catch (e){
                         console.log(e);
                         resultForm(false);
                     }
              }  
        }
        
        return function (){
            var divForm = document.getElementById("sct1");
                
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
            
            var label = document.createElement("label");
            label.appendChild(document.createTextNode("Actualizar categoria"));
            label.setAttribute("class", "h2");
            form.appendChild(label);
            
            createSelect(form, "Categories", "selectPrin", "Categories List");
            
            label = document.createElement("label");
            label.appendChild(document.createTextNode("Datos a actualizar: "));
            label.setAttribute("class", "h2");
            form.appendChild(label);
            
            createInput("Titulo", "title", form);
            textArea(form);
            createButton(updCategory, form);
            
            p = document.createElement("p");
            p.setAttribute("id", "result");
            p.setAttribute("class", "h2");
            form.appendChild(p);
                
            divForm.appendChild(form);
        }
}
            
function delCategoryForm(){
    
        function delCategory(){
            return function (){
                
                var titleId = document.forms["catForm"]["selectPrin"].value;
                
                try{
                    if (titleId == ""){
                        throw new EmptyValueException();
                    } else {
                        var cs = sh.categories;
                        var category = cs.next();
                        var aux = -1;

                        while (category.done !== true){
                            if (category.value.title === titleId ){
                                aux = category.value;
                            }
                            category = cs.next();
                        } 

                        if (aux !== -1){
                            sh.removeCategory(aux);
                            
                            init = initPopulate(sh);
                            init();
                        } else {  
                             throw new CategoryNoExistsException();
                        }
                    }
                } catch (e) {
                    console.log(e);
                    resultForm(false);
                }
            }   
        }

        return function (){
            var divForm = document.getElementById("sct1");

            removeChildsElement(divForm);

            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
            
            var label = document.createElement("label");
            label.appendChild(document.createTextNode("Eliminar categoria"));
            label.setAttribute("class", "h2");
            form.appendChild(label);
            
            createSelect(form, "Categories", "selectPrin", "Categories List"); 
            createButton(delCategory, form);
            
            var p = document.createElement("p");
            p.setAttribute("id", "result");
            p.setAttribute("class", "h2");
            form.appendChild(p);

            divForm.appendChild(form);
        }
}
        
    

function addShopForm(){
        function addShop(){
              return function (){
                    var cif = document.forms["catForm"]["CIF"].value;
                    var name = document.forms["catForm"]["Name"].value;
                    var direction = document.forms["catForm"]["Direction"].value;
                    var phone = document.forms["catForm"]["Phone"].value;
                    
                  try{
                        if (cif == "" || name == ""){
                             throw new EmptyValueException();
                        } else {
                             var coord = new Coords(lat, lng);
                             var shop = new Shop(cif, name, coord);
                             sh.addShop(shop);
                             shop.direction = direction;
                             shop.phone = phone;
                            
                             init = initPopulate(sh);
                             init(); 
                        }
                  } catch(e) {
                      resultForm(false);
                      console.log(e);
                  }
                    
              }
        }
        
       return function (){
            var divForm = document.getElementById("sct1");
            var elements = ["CIF", "Name", "Direction", "Phone"];
                
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
           
            var label = document.createElement("label");
            label.appendChild(document.createTextNode("Añadir tienda"));
            label.setAttribute("class", "h2");
            form.appendChild(label);
           
            createInput("CIF", "CIF", form);
            createInput("Name", "Name", form); 
            createInput("Direction", "Direction", form); 
            createInput("Phone", "Phone", form);
            
            var dv = document.createElement("div");
            dv.setAttribute("class", "form-group");
            var label = document.createElement("label");
            label.setAttribute("class", "control-label col-sm-2");
            label.appendChild(document.createTextNode("Ubicación: "));
            dv.appendChild(label);
           
            var map = document.createElement("div");
            map.setAttribute("style", "height: 300px");
            dv.appendChild(map);
            form.appendChild(dv);
            mapForm(map);
            
            createButton(addShop, form);
           
            var p = document.createElement("p");
            p.setAttribute("id", "result");
            p.setAttribute("class", "h2");
            form.appendChild(p);
           
            divForm.appendChild(form);
      }
}


function updShopForm(){
      function updShop(){
          return function (){
                 
                 var cifId = document.forms["catForm"]["selectPrin"].value;
                 var cif = document.forms["catForm"]["CIF"].value;
                 var name = document.forms["catForm"]["Name"].value;
                 var direction = document.forms["catForm"]["Direction"].value;
                 var phone = document.forms["catForm"]["Phone"].value;
              
                 try{
                     if (cif == "" || cifId == ""){
                          throw new EmptyValueException();
                     } else {
                          var sp = sh.shops;
                          var shop = sp.next();
                          var aux = -1;

                          while (shop.done !== true){
                             if (shop.value.cif == cifId ){
                                 aux = shop.value;
                              }
                              shop = sp.next();
                          }

                          if (aux !== -1){
                                aux.cif = cif;
                                aux.name = name;
                                aux.direction = direction;
                                aux.phone = phone;
                                aux.coords.latitude = lat;
                                aux.coords.longitude = lng;
                              
                                init = initPopulate(sh);
                                init(); 
                          } else {
                                throw new ShopNotExistsException();
                          }
                 }
                 } catch (e) {
                     resultForm(false);
                     console.log(e);
                 }
          }  
    }    
        
      return function (){
            var divForm = document.getElementById("sct1");
            var elements = ["CIF", "Name", "Direction", "Phone"];
          
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
          
            var label = document.createElement("label");
            label.appendChild(document.createTextNode("Modificar tienda"));
            label.setAttribute("class", "h2");
            form.appendChild(label);
            
            createSelect(form, "Shops", "selectPrin", "Shops List");
          
            label = document.createElement("label");
            label.appendChild(document.createTextNode("Datos a actualizar: "));
            label.setAttribute("class", "h2");
            form.appendChild(label);
          
            createInput("CIF", "CIF", form);
            createInput("Name", "Name", form); 
            createInput("Direction", "Direction", form); 
            createInput("Phone", "Phone", form);
          
            var dv = document.createElement("div");
            dv.setAttribute("class", "form-group");
            var label = document.createElement("label");
            label.setAttribute("class", "control-label col-sm-2");
            label.appendChild(document.createTextNode("Ubicación: "));
            dv.appendChild(label);
          
            var map = document.createElement("div");
            map.setAttribute("style", "height: 300px");
            dv.appendChild(map);
            form.appendChild(dv);
            mapForm(map);
          
            createButton(updShop, form);
          
            var p = document.createElement("p");
            p.setAttribute("id", "result");
            p.setAttribute("class", "h2");
            form.appendChild(p);
                
            divForm.appendChild(form);
        }  
}




function delShopForm(){
    
        function delShop(){
            return function (){
                var cifId = document.forms["catForm"]["selectPrin"].value;
                
                try{
                   if (cifId == ""){
                        throw new EmptyValueException();
                    } else {
                        var sp = sh.shops;
                        var shop = sp.next();
                        var aux = -1;

                        while (shop.done !== true){
                            if (shop.value.cif == cifId ){
                                aux = shop.value;
                            }
                             shop = sp.next();
                        }

                        if (aux !== -1){
                            sh.removeShop(aux);
                            
                            init = initPopulate(sh);
                            init();
                        } else {
                             throw new ShopNotExistsException();
                        }
                    } 
                } catch (e){
                    console.log(e);
                    resultForm(false); 
                }
            }   
        }
    
        return function (){
            var divForm = document.getElementById("sct1");
          
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
            
            var label = document.createElement("label");
            label.appendChild(document.createTextNode("Eliminar tienda"));
            label.setAttribute("class", "h2");
            form.appendChild(label);
            
            createSelect(form, "Shops", "selectPrin", "Shops List");
            
            createButton(delShop, form);
            
            var p = document.createElement("p");
            p.setAttribute("id", "result");
            p.setAttribute("class", "h2");
            form.appendChild(p);
                
            divForm.appendChild(form);
        }
}

function addProForm(){
    
    function addPro(){
      return function (){
            var serial = parseInt(document.forms["catForm"]["SerialNumber"].value);
            var name = document.forms["catForm"]["Name"].value;
            var description = document.forms["catForm"]["Description"].value;
            var price = parseInt(document.forms["catForm"]["Price"].value);
            var tax = document.forms["catForm"]["Tax"].value;
            var stock = document.forms["catForm"]["Stock"].value;
            var titCat = document.forms["catForm"]["selectCat"].value;
            var cifShop = document.forms["catForm"]["selectShop"].value;
            var cat;
            var sho;

            try{
               if (serial == "" || name == ""){
                         
                     throw new EmptyValueException();
                } else {
                    var pro = new Product(serial, name, price);
                    pro.description = description;
                    pro.tax = tax;
                    
                    var categories = sh.categories;
                    var category = categories.next();
                    
                    while (category.done !== true){
                        if (category.value.title == titCat){
                            cat = category.value;
                        }

                        category = categories.next();
                   }
                    
                    aux = cat.products.findIndex(function compareElements(element){ return (element.serialNumber === pro.serialNumber) });	
                    
                    if (aux == -1){
                        sh.addProduct(pro, cat);
                        
                    }

                    var shops = sh.shops;
                    var shop = shops.next();

                    while (shop.done !== true){
                         if (shop.value.cif == cifShop){
                             sho = shop.value;
                         }
                         shop = shops.next();
                    }
                    
                    
                    sh.addProductInShop(pro, sho, parseInt(stock));
                                        
                    init = initPopulate(sh);
                    init();
                } 
            } catch (e) {
                resultForm(false);
                console.log(e);
            } 
      }
    }
    
       return function (){
            var divForm = document.getElementById("sct1");
                
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
           
            var label = document.createElement("label");
            label.appendChild(document.createTextNode("Añadir producto:"));
            label.setAttribute("class", "h2");
            form.appendChild(label);
                
            createInput("SerialNumber", "SerialNumber", form);
            createInput("Name", "Name", form); 
            createInput("Description", "Description", form); 
            createInput("Price", "Price", form);
            createInput("Tax", "Tax", form);
            createInput("Stock", "Stock", form);
           
            createSelect(form, "Categories", "selectCat", "Añadir producto a categoria");
            createSelect(form, "Shops", "selectShop", "Añadir producto a tienda");
           
            createButton(addPro, form);
           
            var p = document.createElement("p");
            p.setAttribute("id", "result");
            p.setAttribute("class", "h2");
            form.appendChild(p);
                
            divForm.appendChild(form);
      }
}



function delProForm(){
       function delPro(){
        return function (){
            function compareElements(element){
                 return (element.serialNumber == serial)
            }

            var serial = document.forms["catForm"]["selectPrin"].value;

            try{
                if (serial == ""){
                    throw new EmptyValueException();
                } else {
                    index = sh.products.findIndex(compareElements);

                    if (index != -1){
                        sh.removeProduct(sh.products[index]);
                        
                        init = initPopulate(sh);
                        init();
                    }else{
                        throw new ProductNotExistsException("Product "+serial);
                    }
                }
            } catch (e){
                console.log(e);
            }
        }   
    }     
    
    return function (){
            var divForm = document.getElementById("sct1");
          
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
        
            var label = document.createElement("label");
            label.appendChild(document.createTextNode("Eliminar producto:"));
            label.setAttribute("class", "h2");
            form.appendChild(label);
           
            createSelect(form, "Products", "selectPrin", "List Products");
           
            createButton(delPro, form);
        
            var p = document.createElement("p");
            p.setAttribute("id", "result");
            p.setAttribute("class", "h2");
            form.appendChild(p);
                
            divForm.appendChild(form);
      }
}



function sesionForm(){
     return function (){
        
            var divForm = document.getElementById("sct1");
          
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
         
            var label = document.createElement("label");
            label.appendChild(document.createTextNode("Iniciar Sesión:"));
            label.setAttribute("class", "h2");
            form.appendChild(label);
         
            createInput("Username", "user", form);
            createInput("Password", "pass", form);
         
            createButton(sesion, form);
         
            var p = document.createElement("p");
            p.setAttribute("id", "result");
            p.setAttribute("class", "h2");
            form.appendChild(p);
                
            divForm.appendChild(form);
      }
}

function sesion(){
     return function (){
          var user = document.forms["catForm"]["user"].value;
          var pass = document.forms["catForm"]["pass"].value;
          var p = document.getElementById("result");
         
          if (user === "prueba" && pass === "prueba"){
              document.cookie = "username=prueba";
              
              init = initPopulate(sh);
              init();
        }else{
              p.setAttribute("style", "color:red");
              p.innerHTML = "Usuario o contraseña incorrectos.";  
        }
    }
}

function closeSesion(){
     return function (){
          document.cookie = "username=; max-age=0";
         init = initPopulate(sh);
         init();
     }
}

function mapForm(element){
    var mapForm = new google.maps.Map(element, {
             center: {lat: 38.984573, lng: -3.927454},
          zoom: 14
    });

    var infoWindow = new google.maps.InfoWindow({map: mapForm});
    
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
           var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            mapForm.setCenter(pos);
 
          }, function() {
            handleLocationError(true, infoWindow, mapForm.getCenter());
          });
     } else {
          handleLocationError(false, infoWindow, mapForm.getCenter());
     }
    
    var marker = new google.maps.Marker({
                position: {lat: 38.984573, lng: -3.927454},
                map: mapForm,
                draggable: true,
                animation: google.maps.Animation.DROP,
                title: "Ubicacion de la tienda"
    }); 
              
    marker.addListener("click", function() {
                if (marker.getAnimation() !== null) {
                  marker.setAnimation(null);
                } else {
                  marker.setAnimation(google.maps.Animation.BOUNCE);
                }
   });
            
   google.maps.event.addListener(marker, "position_changed", function() {

         lat = marker.getPosition().lat();
         lng = marker.getPosition().lng();
   });
}

var lat;
var lng;