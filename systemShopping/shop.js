/*=================================================
      Show Product in shop.html from data.js
=================================================*/
// show product from data array
// show product from search array
// show product from filter array

window.addEventListener("DOMContentLoaded",() =>{
    // show first data product in the website
    generateShop(data)
    // load all btn product 
    getViewBtnProduct()
})


let allProduct = document.querySelector('.all-product')
let noHaveProduct = document.querySelector('.no-have-product')

let generateShop = (dataProduct) => {
   if(dataProduct.length == 0){
        allProduct.innerHTML = ""
        noHaveProduct.innerHTML = `
        <h1>No have product</h1>
        `
   }
   else{
    noHaveProduct.innerHTML = ``

    return allProduct.innerHTML = (
        dataProduct.map((product) => {
            let {id,name,img,price} = product

            return `
        <div class="product" id=${id}>
        <div class="image">
            <img src=${img} alt="">
            <div class="buyProduct">View Product</div>
        </div>
        <div class="content">
            <h4 class="name">${name}</h4>
            <div class="price">$${price.toFixed(2)}</div>
        </div>
    </div>
        `
        }).join("")
    )
   }
}




/*===============================
      Search Product
===============================*/
let searchProduct = document.querySelector('#search-product')

searchProduct.addEventListener('keyup',(event) =>{
 let searchInputLower = event.target.value
 let searchInputUpper = event.target.value.toUpperCase()

let searchProduct = data.filter((item) =>{
    let lowerName = item.name.toLocaleLowerCase().trim()
    let UpperName = item.name.toLocaleUpperCase().trim()
    if (lowerName.includes(searchInputLower) ){
        return item
    }
    if (UpperName.includes(searchInputUpper) ){
        return item
    }
})
generateShop(searchProduct)
getViewBtnProduct()
})




/*===============================
        Filter product
===============================*/
let buttonFilter = document.querySelectorAll('.shop-btn-filter')

buttonFilter.forEach((btn)=>{
    btn.addEventListener('click',(event)=>{
        // clear search input value
        searchProduct.value = null
        removeBtnActive()
          getNameBtn = event.target.dataset.productName;
          btn.classList.add('active')

      let filterProduct = data.filter((product)=>{
        if(getNameBtn == product.category){
            return product
        }
      })    
      
      if(getNameBtn == "all"){
        generateShop(data)
        getViewBtnProduct()
      }
      else{
        generateShop(filterProduct)
        getViewBtnProduct()
      }
    })
});

removeBtnActive = () => {
    buttonFilter.forEach((btn)=>{
       btn.classList.remove('active')
    });
}



/*====================================================================
|                Shop popup Product when user click                  |
====================================================================*/


// ----- Open Popup from btn view product -----
let product_popup_Container = document.querySelector(".shop-popup-product-container")
let shop_popup_product = document.querySelector(".shop-popup-product")
// img slide
let checkData = 0

function getViewBtnProduct(){
   let view_Product = document.querySelectorAll('.buyProduct')
   view_Product.forEach((viewBtn)=>{

    viewBtn.addEventListener('click', (event)=>{
      product_popup_Container.classList.add("active")
      shop_popup_product.classList.add("active")
      let getBtnView = event.target.parentElement
      let getProductId = getBtnView.parentElement.id
    //   find index of product in data.js and change value to index to the findIndex
     checkData  = data.findIndex(item => {
        return item.id === getProductId ;
      });
      showDataPopup()
    })  
})
}




//--------- Show Popup Product and Slide image in popup ---------
function showDataPopup(){
    // oped popup quote from data[index]
    let getDataProduct = data[checkData]
    let popupName = document.querySelector(".popup-product-name")
    let popupImage = document.querySelector(".shop-popup-product-image img")
    let popupPrice = document.querySelector(".popup-product-price")
    let popupDetails = document.querySelector(".popup-product-details")
    let shopPopupProduct = document.querySelector(".shop-popup-product")
    // use for show input value
    let shop_popup_Input= document.querySelector('.shop-popup-product .shop-popup-input')
    
    shopPopupProduct.setAttribute("id",`${getDataProduct.id}`) 
    // //------ Quantity Product ----
    shop_popup_Input .setAttribute("id",`${getDataProduct.id}`)
    shop_popup_Input.value =  1
  
    //----------------------------    
    popupName.innerHTML = getDataProduct.name
    popupImage.src = getDataProduct.img
    popupPrice.innerHTML = `$ ${getDataProduct.price.toFixed(2)} `
    popupDetails.innerHTML = getDataProduct.title
}


/*===============================
      Slide Img Popup
===============================*/
//--------------- Prev btn Image popup ---------------
let prev_Image_Popup = document.querySelector('.shop-popup-product .prev')

prev_Image_Popup.addEventListener('click',()=>{
    checkData--
    if (checkData < 0){
        checkData = data.length - 1
    }
    showDataPopup()
})

//--------------- Next btn Image popup ---------------
let next_Image_Popup = document.querySelector('.shop-popup-product .next')

next_Image_Popup.addEventListener('click',()=>{
    checkData++
    if (checkData > data.length - 1){
        checkData = 0
    }
    showDataPopup()
})




/*===============================
 Get  Quantity Product  
===============================*/
// use for change input value again
let get_input_from_Popup = document.querySelector('.shop-popup-product .shop-popup-input');
let shop_popup_quantity_decrease = document.querySelector('.shop-popup-product .shop-popup-decrease')
let shop_popup_quantity_increase = document.querySelector('.shop-popup-product .shop-popup-increase')

shop_popup_quantity_decrease.addEventListener('click',() =>{
    get_input_from_Popup.value--
    if(get_input_from_Popup.value <= 0){
        get_input_from_Popup.value = 1
    }
});

shop_popup_quantity_increase.addEventListener('click',() =>{
    get_input_from_Popup.value++
})




// -----close shop-popup-----
let closePopup = document.querySelector(".close-shop-popup")
closePopup.addEventListener('click',()=>{
    let shopPopupProduct = document.querySelector(".shop-popup-product")
    shopPopupProduct.setAttribute("id","")
    product_popup_Container.classList.remove("active")
    shop_popup_product.classList.remove("active")
} )




/*=======================================================
     ADD PRODUCT ITEM FROM POPUP  TO LOCAL STORAGE 
=========================================================*/
let product_Storage = JSON.parse(localStorage.getItem("all_Product")) || []
let popup_add_card_Btn = document.querySelector('.shop-popup-product .shop-popup-add-card')

popup_add_card_Btn.addEventListener('click',(event) =>{
    let get_ID_Product = event.target.parentElement.parentElement.parentElement.id
    
    if(get_input_from_Popup.value < 1){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Cannot specify the number of products less than 1 piece.',
            showConfirmButton: false,
            timer: 1500
          })
        get_input_from_Popup.value = 1
    }
    else if(get_input_from_Popup.value > 100){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'A maximum of 100 products can be added at a time.',
            showConfirmButton: false,
            timer: 1500
          })
        get_input_from_Popup.value = 1
    }
    else{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'The product has been added to the shopping cart.',
            showConfirmButton: false,
            timer: 1500,
          })
        let check_Id = product_Storage.find((checkId) => checkId.id == get_ID_Product)
        let change_quantity = parseInt(get_input_from_Popup.value)
      if(check_Id === undefined){
        product_Storage.push({
            id:get_ID_Product,
            item: change_quantity
           })
      }
      else{
        check_Id.item += change_quantity
      }
      localStorage.setItem("all_Product",JSON.stringify(product_Storage))
        // Set input value from popup 
      get_input_from_Popup.value = 1

    //   Reload Navbar System in navbar.js
     reloadSystemNavbar()
    }

})


