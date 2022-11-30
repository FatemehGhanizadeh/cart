let container = document.querySelector('#products');
let cartItems = document.querySelector('.cart-items');
let cartBox = document.querySelector('.cart');
let cartHeader = document.querySelector('.cart-header');
let toatalpriceEl=document.querySelector('.toatalOfprice');
let toatalNumbersEl=document.querySelector('.toatalOfNumbers');


function showAllProducts()
{
for(let i=0; i < products.length ; i++)
{
 container.innerHTML+= ` <div class="product-item">
 <div class="product-image"><img src="`+products[i].imgSrc+`" alt=""></div>
 <div class="product-title">`+products[i].name +`</div>
<div class="product-instock">تعداد موجود:`+products[i].instock+`</div>
 <div class="product-data">
     <div class="product-price">`+commafy(products[i].price)+`</div>
     <div class="add-to-cart" onclick="AddToCart(`+products[i].id+`)":><i class="fa-solid fa-cart-shopping"></i></div>
 </div>
</div>`
}};

showAllProducts();

let n = 0;
cartHeader.addEventListener('click',function(){

    if(n==0)
    {
        cartBox.style.bottom = '-10px';
        n++;
        
    }

    else
    {
        cartBox.style.bottom = '-365px';
        n=0;
    }

});




let cart = [];
function AddToCart(id)
{let itemId=cart.some(function(item){
   return item.id==id;
});

if(itemId)
{
    changeNumberOfunits('plus',id);
}

else

{let item =products.find(function(n){
 return n.id==id;
});

item.NumberOfunits=1;
cart.push(item);

renderCartItems();
renderTotal();


}};

function renderCartItems()
{   cartItems.innerHTML='';
    for (let i=0 ; i < cart.length ; i++)
    { 
     cartItems.innerHTML+=` <li class="cart-item">
     <div class="p-name" onclick="deletfromcart(`+cart[i].id+`)">`+cart[i].name+`</div>
     <div class="p-price">`+commafy(cart[i].price)+`</div>
     <div class="p-unit">
         <span class="plus" onclick="changeNumberOfunits('plus',`+cart[i].id+`)"><i class="fa-solid fa-plus"></i></span>
         <span class="unit">`+cart[i].NumberOfunits+`</span>
         <span class="minus" onclick="changeNumberOfunits('minus',`+cart[i].id+`)"><i class="fa-solid fa-minus"></i></span>
     </div>
 </li>`
    }
};

function changeNumberOfunits(action,id)
{  cart= cart.map(function(item){
    let oldNumberOfunits = item.NumberOfunits;

    if(item.id==id)
    {
        if(action=='plus'&& oldNumberOfunits<item.instock)
        {
            oldNumberOfunits++;
        }

        else if(action=='minus'&& oldNumberOfunits>1)
        {
            oldNumberOfunits--
        }
    
    }
 
    item.NumberOfunits=oldNumberOfunits;
    return item;

});

renderCartItems();
renderTotal();

}

function renderTotal()
{let toatalNumber= 0;
 let toatalprice=0;
 for(let i=0 ; i<cart.length ; i++)
 {
    toatalNumber+=cart[i].NumberOfunits;
    toatalprice+=cart[i].NumberOfunits*cart[i].price
 }

 toatalNumbersEl.innerHTML=toatalNumber;
 toatalpriceEl.innerHTML=commafy(toatalprice);
}


function deletfromcart(id)
{
    cart=cart.filter(function(item){
        return item.id!=id;

    })
    renderCartItems();
}

function commafy( num ) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}