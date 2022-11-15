/*=======================================
         Reload Feature Product 
=======================================*/
window.addEventListener("DOMContentLoaded",() =>{
    updateFeatureSystem()
})


window.updateFeatureSystem = function systemFeature(){
    let feature_Get_All_Product = JSON.parse(localStorage.getItem("all_Product")) || []
    generate_Feature_Item(feature_Get_All_Product)
    calculateTotal(feature_Get_All_Product)
}


/*=======================================
        Feature Product System
=======================================*/
let no_Have_Product = document.querySelector(".no-have-product")
let feature_product_container = document.querySelector(".feature-product-container")

let generate_Feature_Item = (feature_Get_All_Product) =>{
    no_Have_Product.classList.remove("active")
    let all_Feature_product = feature_Get_All_Product.map((product) =>{
        let {id,item} = product
        let getDataProduct = data.find((item) =>{
            return item.id == id
        })
        totalPrice = item * getDataProduct.price
        return`
        <div class="feature-product">
          <div class="product-user">
              <div class="image"> <img src=${getDataProduct.img} alt=""></div>
              <div class="title">${getDataProduct.name}</div>
          </div>
          <div class="feature-price">$${getDataProduct.price.toFixed(2)}</div>
          <div class="feature-quantity">
           <span class="decrease" id=${id}>-</span>
              <input type="text" id=${id} value=${item} class="value-product"/>
            <span class="increase" id=${id}>+</span>
          </div>
          <div class="feature-total">$${totalPrice.toFixed(2)}</div>
          <i class='bx bxs-trash delete' id=${id}></i>
        </div>       
        `
    }).join("")
    feature_product_container.innerHTML = all_Feature_product 

// Decrease to item product
let decrease_button_feature = document.querySelectorAll(".feature-quantity .decrease")
decrease_button_feature.forEach((decrease_btn)=>{
        decrease_btn.addEventListener("click",() =>{
            let checkID = feature_Get_All_Product.find((item) =>{return item.id == decrease_btn.id})
            if(checkID.item <= 1 ){
                console.log("er")
            }
            else{
                checkID.item = checkID.item - 1
                console.log(checkID.item)             
                localStorage.setItem("all_Product",JSON.stringify(feature_Get_All_Product))
                generate_Feature_Item(feature_Get_All_Product)  
                //   Reload Navbar System in navbar.js
                reloadSystemNavbar()
                // Update calculate list of product 
                calculateTotal(feature_Get_All_Product)
            }     
    })
})

// Increase to item product
let increase_button_feature = document.querySelectorAll(".feature-quantity .increase")
increase_button_feature.forEach((increase_btn)=>{
    increase_btn.addEventListener("click",() =>{
    let checkID = feature_Get_All_Product.find((item) =>{return item.id == increase_btn.id})
    checkID.item = checkID.item + 1          
    localStorage.setItem("all_Product",JSON.stringify(feature_Get_All_Product))
    generate_Feature_Item(feature_Get_All_Product)  
    //   Reload Navbar System in navbar.js
    reloadSystemNavbar()   
    calculateTotal(feature_Get_All_Product)
})
})
 
// Check if the product is available or not.
if(feature_Get_All_Product.length !== 0){
    no_Have_Product.classList.remove("active")
}
 else{
    no_Have_Product.classList.add("active")
 }

// delete product in Storage
let delete_Product = document.querySelectorAll(".feature-product .delete")
delete_Product.forEach((delete_btn) =>{
    delete_btn.addEventListener("click",() =>{
       let delete_id =  delete_btn.id
       let checkId = feature_Get_All_Product.filter((product) =>{return product.id !== delete_id }) || []
       localStorage.setItem("all_Product",JSON.stringify(checkId))
       reloadSystemNavbar()
       updateFeatureSystem()
    //    calculateTotal(feature_Get_All_Product)
    })


// Update product in Storage
let update_Btn  =document.querySelector(".update-feature")
update_Btn.addEventListener("click",() =>{
    calculateTotal(feature_Get_All_Product)
})
})

}




function calculateTotal(feature_Get_All_Product){
    console.log(feature_Get_All_Product.length)
    let subTotal = document.querySelector(".subTotal")
    let feature_tax = document.querySelector(".feature-tax .tax")
    let feature_total = document.querySelector(".total")
    let  get_sum_Subtotal = 0

feature_Get_All_Product.map((item)=>{
    let get_Data_Product = data.find((product)=>{return product.id == item.id})
    get_sum_Subtotal =  get_sum_Subtotal + (get_Data_Product.price * item.item)
    // getSubTotalList.push(get_Data_Product.price)
})

 let get_Tax = get_sum_Subtotal * (7 / 107)
 let get_Total = get_sum_Subtotal + get_Tax
    console.log(feature_Get_All_Product)
    subTotal.innerHTML = "$" + get_sum_Subtotal.toFixed(2)
    feature_tax.innerHTML = "$" +  get_Tax.toFixed(2)
    feature_tax.innerHTML = "$" +  get_Tax.toFixed(2)
    feature_total.innerHTML = "$" +  get_Total.toFixed(2) 
}



/*=======================================
          PROCEED TO CHECKOUT
=======================================*/
let checkout = document.querySelector(".checkout")
checkout.addEventListener("click",(event) =>{
    event.preventDefault()
    let feature_Get_All_Product = JSON.parse(localStorage.getItem("all_Product")) || []
    if(feature_Get_All_Product.length ==0){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'There are no items in the cart.',
            showConfirmButton: false,
            timer: 1500
          })
    }
    else{
        Swal.fire({
            title: 'Order Confirmation',
            text: "Want to confirm your order?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff4500',
            cancelButtonColor: '#000',
            confirmButtonText: 'Confirm'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire('Successful Confirmation','','success')
              localStorage.removeItem("all_Product");
              updateFeatureSystem()
              reloadSystemNavbar()
            }  
          })
    }
})