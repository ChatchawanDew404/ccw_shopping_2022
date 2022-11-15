let menuBar = document.querySelector('.menuBar');
let navList = document.querySelector('.navList');

menuBar.addEventListener('click',() =>{
    navList.classList.toggle('active')
    menuBar.classList.toggle('active')
})

// Scroll navbar
let navigationBar = document.querySelector('.navigationBar')


window.addEventListener('scroll' ,( )=>{
    navigationBar.classList.toggle('active',window.scrollY > 0)
})




// Open and close Navbar
let cartBtn = document.querySelector('#cartBtn')
let close = document.querySelector('#navbar-slide-close')
let navSlide = document.querySelector('.navbar-slide')
let slideBg = document.querySelector('.navbar-slide-bg')

cartBtn.addEventListener('click',() =>{
    navSlide.classList.add('active')
    slideBg.classList.add('active')
})

close.addEventListener('click',() =>{
    navSlide.classList.remove('active')
    slideBg.classList.remove('active')
})



/*===============================
     ALL  NAVBAR SYSTEM
===============================*/
window.addEventListener("load",()=>{
  reloadSystemNavbar()
})


window.reloadSystemNavbar = function navbarReload(){
  let get_All_Product_Storage = JSON.parse(localStorage.getItem("all_Product")) || []
  // show result amount product in icon cart navbar
  amountProduct(get_All_Product_Storage)
  // show product in navbarSlide
  updateLNavProduct(get_All_Product_Storage)
}



/*===============================================
  SHOW ALL QUANTITY PRODUCT FROM LOCAL STORAGE
===============================================*/
window.amountProduct = function updateNavbar(get_All_Product_Storage){
    let amount_Cart = document.querySelector('nav .amountCart')
    let resultProduct = get_All_Product_Storage.map((product_item)=>{return product_item.item}).reduce((x,y) =>{return x + y},0)
    amount_Cart.innerHTML = resultProduct
}




/*===============================================================
         SHOW PRODUCT FROM LOCAL STORAGE TO NAVBAR SLIDE
===============================================================*/
let shoppingCartNavbar = document.querySelector('.navbar-slide-product-container')
let navTotal = document.querySelector('.navbar-total')

window.updateLNavProduct = generateCartItems = (get_All_Product_Storage) => {
    let product_Storage = get_All_Product_Storage
    let product_from_storage = product_Storage.map((product) =>{
    let {item,id} = product
    let checkData = data.find((checkProduct) => {return checkProduct.id == id})

 return `
   <div class="navbar-slide-product">
   <div class="image"><img src=${checkData.img} alt=""></div>
      <div class="content">
        <p class="title">${checkData.name}</p>
        <div class="navbar-slide-product-sum">
           <span class="quantity">${item}</span> x <span class="price">${checkData.price}$</span>
        </div>
     </div>
       <i class='bx bxs-trash delete-product' id=${id}></i>
   </div>
   `
}).join("")

shoppingCartNavbar.innerHTML = product_from_storage
totalAmount(product_Storage)
let delete_product = document.querySelectorAll(".delete-product")
delete_product.forEach((del_Pd) =>{
  del_Pd.addEventListener("click",(event) =>{
    let getIDProduct = event.target.id
    deleteProductNavbar(getIDProduct,product_Storage )
  })
})
};




/*=======================================
         Delete product in navbar 
=======================================*/
function deleteProductNavbar(getIDProduct,product_Storage ){
  Swal.fire({
  position: 'center',
  icon: 'success',
  title: 'Your product has been delete',
  showConfirmButton: false,
  timer: 1000
})
 let checkId = product_Storage.filter((product) =>{return product.id !== getIDProduct}) || []
 localStorage.setItem("all_Product",JSON.stringify(checkId))
 reloadSystemNavbar()
//  Update feature page in feature.js
 updateFeatureSystem()
}



/*=============================================
     Total price of all product in navbar 
=============================================*/
function totalAmount(product_Storage){
    let amount = product_Storage.map((product) =>{
      let {id,item} = product
      let checkId = data.find((productID) =>{ return productID.id === id}) || []
      return (item * checkId.price);
    }).reduce((x, y) => x + y, 0);

    navTotal.innerHTML = amount.toFixed(2) + "$"
}


