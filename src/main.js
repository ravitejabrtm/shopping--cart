let shop=document.getElementById('shop');


let basket=JSON.parse(localStorage.getItem("data"))||[];
console.log(basket)
let generateShop=()=>{

    return (shop.innerHTML=shopItemsData
        .map((item)=>{

        //debugger;
        let {id,name,price,desc,img}=item;      
        let search=basket.find((el)=>el.id===id)||[];
       return `
       <div id="product-id-${id}" class="item">
       <img width="220" src="${img}" alt="">
       <div class="details">
           <h2>${name}</h2>
           <p>${desc}</p>
           <div class="price-quantity">
               <h2>$ ${price}</h2>
               <div class="buttons">
                   <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                   <div id=${id} class="quantity">
                   ${search.item===undefined?0:search.item}
                   </div>
                   <i onclick="increment(${id})" class="bi bi-plus-lg"></i>  
               </div>
           </div>
            
       </div>
   
   </div>
       ` 
    }).join("")
    );
}

generateShop();

let increment=(id)=>{
   // debugger;
    let selectedItem=id;
    let search=basket.find((item)=>item.id===selectedItem.id);
    if(search===undefined){
        basket.push({
            id:selectedItem.id,
            item:1
        })
    }
    else{
        search.item+=1;
    }
   
    update(id);
    localStorage.setItem("data",JSON.stringify(basket));

}
let decrement=(id)=>{
   // debugger;
    let selectedItem=id;
    let search=basket.find((item)=>item.id===selectedItem.id);
    if(search===undefined){return}
    else if(search.item===0){
        return
    }
    else{
        search.item-=1;
    }
    update(id);
    basket=basket.filter((x)=>x.item>0);
    
    localStorage.setItem("data",JSON.stringify(basket));

}
let update=(id)=>{
   // debugger;
    let selectedItem=id;
    let quantity=document.getElementById(selectedItem.id);
    quantity.innerHTML=basket.find((x)=>x.id===selectedItem.id).item;
    calculation();

}

let calculation=()=>{
    let cartSize=document.getElementById("cartAmount");
    cartSize.innerHTML=basket.map((el)=>el.item).reduce((acc,itemsize)=>acc+itemsize,0)
}

calculation();