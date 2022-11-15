// -------------------Register btn-------------------------
let RegisterBtn = document.querySelector('.register-color')
let loginBtn = document.querySelector('.login-color')
let systemBtn = document.querySelector('.register-btn')
let changeBtn = document.querySelector('.change-btn')
let registerCart = document.querySelector('.register-cart')
let loginCart = document.querySelector('.login-cart')
let clickLogin = document.querySelector('.clickLogin')
let clickRegister = document.querySelector('.clickRegister')

systemBtn.addEventListener('click',()=>{
    systemBtn.classList.toggle('active')

    if(systemBtn.classList.contains('active')){
        loginBtn.style.color= 'white'
        RegisterBtn.style.color= 'black'
        loginCart.style.left = "0"
        registerCart.style.left="-900px"
    }
    else{
        loginBtn.style.color= 'black'
        RegisterBtn.style.color= 'white'
        loginCart.style.left = "900px"
        registerCart.style.left="0%"
    }
})

clickLogin.addEventListener('click',() =>{
    systemBtn.classList.add('active')
    loginBtn.style.color= 'white'
    RegisterBtn.style.color= 'black'
    loginCart.style.left = "0"
    registerCart.style.left="-1000px"
})
clickRegister.addEventListener('click',() =>{
    systemBtn.classList.remove('active')
    loginBtn.style.color= 'black'
    RegisterBtn.style.color= 'white'
    loginCart.style.left = "1000px"
    registerCart.style.left="0"
})


// ----------Show register and animation ------------------- 
let register = document.querySelector('.register')
let loginNavbar = document.querySelector('#loginBtn')
let registerRow = document.querySelector('.register-row')
let closeBtn = document.querySelector('.closeBtn')

let getLocationFile = window.location.href
if ( getLocationFile == 'http://127.0.0.1:5500/index.html'){

setTimeout(()=>{
    register.classList.add('active')
    setTimeout(()=>{
        registerRow.classList.add('active')
    },500)
},2000)
}

loginNavbar.addEventListener('click',() =>{
    register.classList.add('active')
    setTimeout(()=>{
        registerRow.classList.add('active')
    },100)
})

closeBtn.addEventListener('click',() =>{
    register.classList.remove('active')
        registerRow.classList.remove('active')
})