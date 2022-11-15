// Header 
var swiper = new Swiper(".myHeader", {
    grabCursor:true,
    loop:true,
    centeredSlides:true,
    autoplay: {
        delay: 8000,
        disableOnInteraction: false,
      },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    });


//********************* SHOP POPULAR PRODUCT***********************
    let shopProduct = [
      {
          name:"Esprit Ruffle Shirt",
          img:"/shopImage/product-01.jpg",
          price:65.25,
          title:"Nullar eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
      },
      {
          name:"Herschel supply",
          img:"/shopImage/product-02.jpg",
          price:45.25,
          title:"Nullar eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
      },
      {
          name:"Only Check Trouser",
          img:"/shopImage/product-03.jpg",
          price:89.50,
          title:"Nullar eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
      },
      {
          name:"Classic Trench Coat",
          img:"/shopImage/product-04.jpg",
          price:58.79,
          title:"Nullar eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
      },
      {
          name:"Front Pocket Jumper",
          img:"/shopImage/product-05.jpg",
          price:68.00,
          title:"Nullar eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
      },
      {
          name:"Vintage Inspired Classic",
          img:"/shopImage/product-06.jpg",
          price:45.25,
          title:"Nullar eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
      },
      {
          name:"Shirt in Stretch Cotton",
          img:"/shopImage/product-07.jpg",
          price:150.65,
          title:"Nullar eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
      },
      {
          name:"Pieces Metallic Printed",
          img:"/shopImage/product-08.jpg",
          price:100.35,
          title:"Nullar eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
      }]

let popularRow = document.querySelector('.popular-row')

// console.log(shopProduct[0].img)


popularRow.innerHTML  = shopProduct.map((item)=>{
  let {name,price,img} = item


  return `
         <div class="popular-col">
            <div class="image">
            <img src=${img} alt="">
            <a href="shop.html" class="viewPD">View Product</a>
            </div>
             <div class="content">
                  <h4 class="popular-name">${name}</h4>
                  <p class="popular-price">$${price}</p>
              </div>
          </div>
  `

}).join("")




// register.addEventListener('click',() =>{
//     register.classList.remove('active')
//     registerRow.classList.remove('active')
// })




