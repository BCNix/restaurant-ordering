import menuArray from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const cart = document.getElementById('cart')
const modal = document.getElementById('modal')
const paymentForm = document.getElementById('form')
const message = document.getElementById('message')

let cartArray = []
let formDataArray = []

document.body.addEventListener('click', (e) => {

    if (e.target.dataset.product){
        cart.classList.remove('hidden')
        addToCart(e.target.dataset.product)
        renderCart()
    } 
    
    else if(e.target.dataset.remove){
        removeToCart(e.target.dataset.remove)
        cartArray.length === 0 ? cart.classList.add('hidden') : ''
        renderCart()
    }

    else if (e.target.id === 'cmplt-btn'){
        modal.classList.remove('hidden')
    } 
    
    else if(e.target.id === 'close-btn'){
        modal.classList.add('hidden')
    }
})

paymentForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const form = new FormData(paymentForm)

    formDataArray = [Object.fromEntries(form)]

    modal.classList.add('hidden')
    cart.classList.add('hidden')
    message.classList.remove('hidden')
    setTimeout(()=> {
        message.classList.add('hidden')
        location.reload()
    }, 2000)
    renderMessage()
})

function addToCart(id){
    const product = menuArray.find(item => item.id === parseInt(id))

    product ? cartArray.push({...product, uuid: uuidv4()}) : null
}

function removeToCart(uuid){

    cartArray = cartArray.filter(item => item.uuid !== uuid)
}

function getTotaPrice(){
    return cartArray.map(item => item.price).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
}

function renderMessage(){
    
    message.classList.remove()
    if(cart.classList.contains('hidden')){
        message.innerHTML = `<div class="message">
                                <p>Thank, ${formDataArray[0].name}! Your order is on its way!</p>
                             </div>`
    }
}

function renderCart(){
    const cartContainer = document.getElementById('list-cart')
    const totalPrice = document.getElementById('total-price')
    let cartHtml = ''
    if(cartArray.length > 0){
        cartArray.forEach(item => {
            cartHtml += `<li class="cart-inner">
                            <div class="cart-content">
                                <h2>${item.name}</h2>
                                <button data-remove="${item.uuid}" class="remove-btn">remove</button>
                            </div>
                            <div id="" class="price">$${item.price}</div>
                         </li> `
        })
    }

    totalPrice.textContent = getTotaPrice()
    cartContainer.innerHTML = cartHtml
}


function renderProduct(){
    const products = document.getElementById('list-product')
    menuArray.forEach(item => {
        products.innerHTML += ` <li id="${item.id}" class="li-container">
                                <div class="inner-container">
                                    <span>${item.emoji}</span>
                                    <div class="inner-text">
                                        <h2>${item.name}</h2>
                                        <p>${item.ingredients}</p>
                                        <strong class="price">$${item.price}</strong>
                                    </div>
                                </div>
                                <button data-product="${item.id}" class="add-btn style-btn">&plus;</button>
                            </li> `
    })
}

renderProduct()



