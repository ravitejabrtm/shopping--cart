let label=document.getElementById("label");
let shoppingcart=document.getElementById("shopping-cart");

let basket=JSON.parse(localStorage.getItem("data"))||[];

let calculation=()=>{
    let cartSize=document.getElementById("cartAmount");
    cartSize.innerHTML=basket.map((el)=>el.item).reduce((acc,itemsize)=>acc+itemsize,0)
}

calculation();

let generateCartItems=()=>{
    
    if(basket.length!=0){
        return shoppingcart.innerHTML=basket.map((x)=>{
            let {id,item}=x;
            let search=shopItemsData.find((y)=>y.id===id)||[];
            let {img,price,name}=search;
            return `
            <div class="cart-item">
                <img width="100" src=${img} alt=""/>
                <div class="details">

                    <div class="text-price-x">
                        <h4 class="text-price"> 
                            <p>${name}</p>
                            <p class="cart-item-price">$ ${price}</p>
                        </h4>
                        <i onclick="removeItem(${id})"class="bi bi-x-lg"></i>
                    </div>

                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>  
                    </div>

                <h3>$ ${item*price}</h3>
                </div>
            </div>
                    `;
    }).join('');
    }
    else{
        shoppingcart.innerHTML= ``;
        label.innerHTML= `<h2>Cart is Empty</h2> 
        <a href="index.html"> <button class="HomeBtn">Back to Home</a>`
    }

}
generateCartItems();

let increment=(id)=>{
    // debugger;
     let selectedItem=id;
     let search=basket.find((item)=>item.id===selectedItem.id);
     console.log(search);
     if(search===undefined){
         basket.push({
             id:selectedItem.id,
             item:1
         })
     }
     else{
         search.item+=1;
     }
     generateCartItems();
     update(id);
     localStorage.setItem("data",JSON.stringify(basket));
 
 }
 let decrement=(id)=>{
    // debugger;
     let selectedItem=id;
     let search=basket.find((item)=>item.id===selectedItem.id);
     console.log(search);
     if(search===undefined){return}
     else if(search.item===0){
         return
     }
     else{
         search.item-=1;
     }
     update(id);
     basket=basket.filter((x)=>x.item>0);
     generateCartItems();
     localStorage.setItem("data",JSON.stringify(basket));
 
 }
 let update=(id)=>{
    // debugger;
     let selectedItem=id;
     let quantity=document.getElementById(selectedItem.id);
     quantity.innerHTML=basket.find((x)=>x.id===selectedItem.id).item;
     calculation();
     totalAmount();
 
 }

 let removeItem=(id)=>{

    let selectedItem=id;
    basket=basket.filter((x)=>x.id!==selectedItem.id);
    console.log(basket);
    localStorage.setItem("data",JSON.stringify(basket));
    generateCartItems();
    calculation();
    totalAmount();


 }

 let clearCart=()=>{
    basket=[];
    generateCartItems();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));

 }
 let totalAmount=()=>{
    if(basket.length!==0){
        let amount=basket.map((x)=>{
            let {id,item}=x;
            let search=shopItemsData.find((y)=>y.id===id)||[];
            return item*search.price;
        }).reduce((x,y)=>x+y,0);

        label.innerHTML=`
        <h2>Total Bill : $ ${amount}</h2>
        <button class="checkout">Check Out</button>
        <button onClick="clearCart()" class="removeall">Clear Cart</button>
        `;
    }
 }
 
 totalAmount();