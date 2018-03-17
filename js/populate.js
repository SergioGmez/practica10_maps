"use strick";

function createObjects(sh){
    
   var cat1 = new Category(data.categories[0].title);
   cat1.description = data.categories[0].description;

   var cat2 = new Category(data.categories[1].title);
   cat2.description = data.categories[1].description;

   var cat3 = new Category(data.categories[2].title);
   cat3.description = data.categories[2].description;

    
   var pro1 = new Product(data.products[0].serialNumber, data.products[0].name, data.products[0].price);
   pro1.description = data.products[0].description;
   pro1.tax = data.products[0].tax;
   pro1.images.push(data.products[0].images[0]);
   
   var pro2 = new Product(data.products[1].serialNumber, data.products[1].name, data.products[1].price);
   pro2.description = data.products[1].description;
   pro2.tax = data.products[1].tax;
   pro2.images.push(data.products[1].images[0]);
    
   var pro3 = new Product(data.products[2].serialNumber, data.products[2].name, data.products[2].price);
   pro3.description = data.products[2].description;
   pro3.tax = data.products[2].tax;
   pro3.images.push(data.products[2].images[0]); 
    
   var pro4 = new Product(data.products[3].serialNumber, data.products[3].name, data.products[3].price);
   pro4.description = data.products[3].description;
   pro4.tax = data.products[3].tax;
   pro4.images.push(data.products[3].images[0]); 
    
   var pro5 = new Product(data.products[4].serialNumber, data.products[4].name, data.products[4].price);
   pro5.description = data.products[4].description;
   pro5.tax = data.products[4].tax;
   pro5.images.push(data.products[4].images[0]);
    
   var book = new Book(data.products[5].serialNumber, data.products[5].name, data.products[5].price, data.products[5].pages);
   book.description = data.products[5].description;
   book.tax = data.products[5].tax;
   book.images.push(data.products[5].images[0]);
    
   var tv = new TV(data.products[6].serialNumber, data.products[6].name, data.products[6].price, data.products[6].inches);
   tv.description = data.products[6].description;
   tv.tax = data.products[6].tax;
   tv.images.push(data.products[6].images[0]);    


    
   var coor1 = new Coords(data.coords[0].longitude, data.coords[0].latitude);
   var coor2 = new Coords(data.coords[1].longitude, data.coords[1].latitude);
   var coor3 = new Coords(data.coords[2].longitude, data.coords[2].latitude);
    
   var shop1 = new Shop(data.shops[0].cif, data.shops[0].name, coor1);
   shop1.direction = data.shops[0].direction;
   shop1.phone = data.shops[0].phone;
    
   var shop2 = new Shop(data.shops[1].cif, data.shops[1].name, coor2);
   shop2.direction = data.shops[1].direction;
   shop2.phone = data.shops[1].phone;  

   var shop3 = new Shop(data.shops[2].cif, data.shops[2].name, coor3);
   shop3.direction = data.shops[2].direction;
   shop3.phone = data.shops[2].phone;

   sh.addProduct(pro1, cat1);
   sh.addProduct(pro3, cat1);
   sh.addProduct(pro4, cat1);
   sh.addProduct(pro2, cat2);
   sh.addProduct(pro5, cat2);
   sh.addProduct(book, cat3);
   sh.addProduct(tv, cat2);
    
   sh.addProductInShop(pro1, shop1, 32);
   sh.addProductInShop(pro1, shop2, 44);
   sh.addProductInShop(pro2, shop1, 55);
   sh.addProductInShop(pro2, shop2, 66);
   sh.addProductInShop(pro3, shop3, 32);
   sh.addProductInShop(pro3, shop1, 23);
   sh.addProductInShop(pro4, shop1, 34);
   sh.addProductInShop(pro4, shop2, 11);
   sh.addProductInShop(pro4, shop3, 13);
   sh.addProductInShop(pro5, shop2, 61);  
   sh.addProductInShop(book, shop1, 31);  
   sh.addProductInShop(tv, shop1, 11);  
   sh.addProductInShop(tv, shop2, 4);

}

function init(sh){
    setTimeout(function() {
        var initPop = initPopulate(sh);
        initPop();
        shopsMenusPopulate(sh);
        menuForms();
        initMap();
    }, 1000); 
}

function initPopulate(sh){
    return function(){
        var shops = sh.shops;
        var shop = shops.next();
        var divSct1 = document.getElementById("sct1");
        var cat = document.getElementById("listCategories");
        var ul = document.getElementById("navShop");
        
        document.getElementById("catMenu").style.visibility = "hidden";
        
        removeChildsElement(ul);
        shopsMenusPopulate(sh);
        
        removeChildsElement(divSct1);
        menuForms();
        
        initMap();
        
        while (!shop.done){
            var divCol = document.createElement("div");
            divCol.setAttribute("class", "col-sm-4 col-lg-4 col-md-4");

            var divThumb = document.createElement("div");
            divThumb.setAttribute("class", "thumbnail");

            var img = document.createElement("img");
            img.setAttribute("src", "http://placehold.it/320x150");
            divThumb.appendChild(img);

            var divCap = document.createElement("div");
            divCap.setAttribute("class", "caption");

            var h4 = document.createElement("h4");
            var a = document.createElement("a");
            a.setAttribute("href", "#");
            a.appendChild(document.createTextNode(shop.value.name));
            h4.appendChild(a);
            divCap.appendChild(h4);

            var p = document.createElement("p");
            p.appendChild(document.createTextNode("Dirección: "+shop.value.direction));
            divCap.appendChild(p);

            p = document.createElement("p");
            p.appendChild(document.createTextNode("Teléfono: "+shop.value.phone));
            divCap.appendChild(p);

            var button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("class", "btn btn-primary pull-right");
            button.appendChild(document.createTextNode("Ver Productos"));
            button.addEventListener("click", shopPopulate(shop.value, sh));
            divCap.appendChild(button);

            divThumb.appendChild(divCap);
            divCol.appendChild(divThumb);
            divSct1.appendChild(divCol);

            shop = shops.next();
        }
    }    
}

function shopsMenusPopulate (erp){
    
    var ini = document.getElementsByClassName("navbar-header");
    var ul = document.getElementById("navShop");   
    var shops = erp.shops;
    var shop = shops.next();
    
    removeChildsElement(ul);
    
    ini[0].addEventListener("click", initPopulate(erp));
    
    while (shop.done !== true){
        var li = document.createElement("li");
        
        var a = document.createElement("a");
        a.setAttribute("href", "#");
        a.addEventListener("click", shopPopulate(shop.value, erp));
        a.appendChild(document.createTextNode(shop.value.name));
        
        li.appendChild(a);
        ul.appendChild(li);

        shop = shops.next();
    }
}

function removeChildsElement(element){

    for(var i=element.children.length-1; i>-1; i--){
        element.removeChild(element.children[i]);
    }
}

function shopPopulate(shop, erp){
    return function(){
        var divSct1 = document.getElementById("sct1");
        removeChildsElement(divSct1);
        
        for(var i=0; i<shop.products.length; i++){
           productShopPopulate(divSct1, shop.products[i]); 
        }
        
        var divCol = document.createElement("div");
        divCol.setAttribute("class", "col-sm-4 col-lg-4 col-md-4");
        divCol.setAttribute("style", "position:fixed; bottom:0; right:0;");
        divCol.setAttribute("ondrop", paperbin(event));
        
        var img = document.createElement("img");
        img.setAttribute("src", "imagenes/papelera.png");
        img.setAttribute("style", "width: 20%; max-width: 100%;");
        img.setAttribute("class", "pull-right");
        divCol.appendChild(img);
        divSct1.appendChild(divCol);
        
        menuCategoryShopPopulate(shop, erp);
   }
}

function menuCategoryShopPopulate(shop, erp){
    
    function compareCategories(element){
			return (element.title === category.title)
	}
    
    var categoriesShop = [];
    var category;
    var cat = document.getElementById("listCategories");
    var categoryRep;
    
    removeChildsElement(cat);
    
    document.getElementById("catMenu").style.visibility = "visible";
       
    for (var i=0; i<shop.products.length; i++){
        category = productCategory(shop.products[i], erp);
        categoryRep = categoriesShop.findIndex(compareCategories);
        
        if (category != -1 && categoryRep == -1){
            categoriesShop.push(category);
        }
    }
    
    for (i=0; i<categoriesShop.length; i++){
        var a = document.createElement("a");
        a.setAttribute("href", "#");
        a.setAttribute("class", "list-group-item");
        a.appendChild(document.createTextNode(categoriesShop[i].title));
        a.addEventListener("click", productsCategoryShopPopulate(erp, shop, categoriesShop[i]));
        cat.appendChild(a);
    }
      
}

function menuForms(){
    
    function liForm(name, func){
        var a = document.createElement("a");
        a.setAttribute("href", "#");
        a.setAttribute("class", "list-group-item");
        a.appendChild(document.createTextNode(name));
        a.addEventListener("click", func());
        cat.appendChild(a);
    }
    
    var cat = document.getElementById("listCategories");
    
    removeChildsElement(cat);
    
    if (!document.cookie){
        var p = document.createElement("p");
        p.setAttribute("class", "h3"); p.appendChild(document.createTextNode("Autenticación"));
        cat.appendChild(p);
        liForm("Iniciar Sesión", sesionForm);
    }else{
        var reg = /[^=][a-z]*$/;
        var p = document.createElement("p");
        p.setAttribute("class", "h3"); p.appendChild(document.createTextNode("User: "+reg.exec(document.cookie)));
        cat.appendChild(p);
        liForm("Cerrar Sesión", closeSesion);
    }
   
    
    p = document.createElement("p");
    p.setAttribute("class", "h3"); p.appendChild(document.createTextNode("Categorias"));
    cat.appendChild(p);
    
    liForm("Añadir categoria", addCategoryForm);
    liForm("Modificar categoria", updCategoryForm);
    liForm("Eliminar categoria", delCategoryForm);
    
    p = document.createElement("p");
    p.setAttribute("class", "h3");
    p.appendChild(document.createTextNode("Tiendas"));
    cat.appendChild(p);
    
    liForm("Añadir tienda", addShopForm);
    liForm("Modificar tienda", updShopForm);
    liForm("Eliminar tienda", delShopForm);
    
    if (document.cookie){
       p = document.createElement("p");
       p.setAttribute("class", "h3");
       p.appendChild(document.createTextNode("Productos"));
       cat.appendChild(p);
       liForm("Añadir producto", addProForm);
       liForm("Eliminar producto", delProForm);
        
       p = document.createElement("p");
       p.setAttribute("class", "h3");
       p.appendChild(document.createTextNode("Otros"));
       cat.appendChild(p);
       liForm("Guardar archivo Json", saveObjects); 
    }  
}

function productCategory(product){
    
        function compareElements(element){
			return (element.serialNumber === product.serialNumber)
		}
    
        var categories = sh.categories;
        var category = categories.next();
        var index = -1;
        
        while (category.done !== true && index == -1 ){
            
           index = category.value.products.findIndex(compareElements);          
           if (index != -1){
                return category.value;
           }
            category = categories.next();
        }
    
        return -1;
}

function productsCategoryShopPopulate(erp, shop, category){
    return function(){
        function compareElements(element){
                return (element.serialNumber === shop.products[i].serialNumber)
        }

        var productsCategory = [];
        var index;

        for (var i=0; i<shop.products.length; i++){
            index = category.products.findIndex(compareElements);

            if (index != -1){
                productsCategory.push(shop.products[i]);
            }
        }

        var divSct1 = document.getElementById("sct1");
        removeChildsElement(divSct1);

        for(i=0; i<productsCategory.length; i++){
            productShopPopulate(divSct1, productsCategory[i]);
        } 
    }
}

function productShopPopulate(element, product){
    
        var divCol = document.createElement("div");
        divCol.setAttribute("class", "col-sm-4 col-lg-4 col-md-4");

        var divThumb = document.createElement("div");
        divThumb.setAttribute("class", "thumbnail");
        divCol.setAttribute("draggable", "true");
        divCol.setAttribute("ondragstar", dragstart(event));

        var img = document.createElement("img");
        img.setAttribute("src", product.product.images[0]);
        divThumb.appendChild(img);

        var divCap = document.createElement("div");
        divCap.setAttribute("class", "caption");

        var h4 = document.createElement("h4");
        h4.appendChild(document.createTextNode(product.product.name));
        divCap.appendChild(h4);

        var h4price = document.createElement("h4");
        h4price.setAttribute("class", "pull-right");
        h4price.appendChild(document.createTextNode(product.product.price+" €"));
        divCap.appendChild(h4price);

        var p = document.createElement("p");
        p.appendChild(document.createTextNode(product.product.description));
        divCap.appendChild(p);

        p = document.createElement("p");
        p.appendChild(document.createTextNode("Tax: "+product.product.tax));
        divCap.appendChild(p);

        var a = document.createElement("a");
        a.appendChild(document.createTextNode("Ver info general"));
        a.setAttribute("class", "pull-right");
        a.addEventListener("click", openWindows(product.product));
        divCap.appendChild(a);

        p = document.createElement("p");
        p.appendChild(document.createTextNode("Stock: "+product.stock));
        divCap.appendChild(p);

        divThumb.appendChild(divCap);
        divCol.appendChild(divThumb);
        element.appendChild(divCol); 
}

   
function openWindows(product){
    
    function compareElements(element) {
        return (element.serialNumber === product.serialNumber)
    }
				
    var productShop = sh.products[sh.products.findIndex(compareElements)];
    var ventana;
    var inter;
 
    
    function closeWindows(){
        return function (){

           for (var i=0; i < listWindows.length; i++){
             listWindows[i].close();
           }
            
           var cat = document.getElementById("closeWindows");
           removeChildsElement(cat);
        }
    }
    
    function globalProductPopulate (){
        var long = listWindows.length-1;
        
        var divSct1 = listWindows[long].document.getElementById("sct");
        
        var divCol = listWindows[long].document.createElement("div");
        divCol.setAttribute("class", "col-sm-4 col-lg-4 col-md-4");

        var divThumb = listWindows[long].document.createElement("div");
        divThumb.setAttribute("class", "thumbnail");

        var divCap = listWindows[long].document.createElement("div");
        divCap.setAttribute("class", "caption");

        var h4 = listWindows[long].document.createElement("h4");
        h4.appendChild(listWindows[long].document.createTextNode(productShop.name));
        divCap.appendChild(h4);

        var h4price = listWindows[long].document.createElement("h4");
        h4price.setAttribute("class", "pull-right");
        h4price.appendChild(listWindows[long].document.createTextNode(productShop.price+" €"));
        divCap.appendChild(h4price);

        var p = listWindows[long].document.createElement("p");
        p.appendChild(document.createTextNode(productShop.description));
        divCap.appendChild(p);

        p = listWindows[long].document.createElement("p");
        p.appendChild(document.createTextNode("Tax: "+productShop.tax));
        divCap.appendChild(p);

        p = listWindows[long].document.createElement("p");
        p.appendChild(document.createTextNode("Stock General: "+productShop.stockGen));
        divCap.appendChild(p);
        
        divThumb.appendChild(divCap);
        divCol.appendChild(divThumb);
        divSct1.appendChild(divCol);
        
        var cat = document.getElementById("closeWindows");
        var a = document.createElement("a");
        
        removeChildsElement(cat);
        a.setAttribute("href", "#");
        a.setAttribute("class", "list-group-item");
        a.appendChild(document.createTextNode("Cerrar Ventana"));
        a.addEventListener("click", closeWindows());
        cat.appendChild(a);
        
        clearInterval(inter);
    }
    
    return function (){
       listWindows.push(window.open("newWindows.html","_blank","toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400"));
        
       inter = setInterval(globalProductPopulate, 500);
    }
}

function initMap(){

    var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
    });
    
    var infoWindow = new google.maps.InfoWindow({map: map});
    
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
           var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
     } else {
          handleLocationError(false, infoWindow, map.getCenter());
     }
    
    var shops = sh.shops;
    var shop = shops.next();

    while (shop.done !== true){

        var marker = new google.maps.Marker({
            position: {lat: shop.value.coords.latitude, lng: shop.value.coords.longitude},
            map: map,
            title: shop.value.toString()
        });
        shop = shops.next();
    }
}

function paperbin(event){
  return function(){
     event.preventDefault();
     var data =event.dataTransfer.getData("text");
     event.target.appendChild(document.getElementById(data));
     console.log("a"); 
  } 
    
}

function dragstart(event){
    return function(){
        console.log("a");
     event.dataTransfer.setData("text", event.target.id);
        console.log("a");
  } 
        

}


 var listWindows = [];
 var sh = new StoreHouse();
 sh.name = "Test";

 window.onload = init(sh);