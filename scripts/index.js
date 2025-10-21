import menuArray from './data.js'


const cartArray = []


document.body.addEventListener('click', (e) => {
    if(e.target.id){
        document.getElementById('cart').classList.remove('hidden')
        addToCart(parseInt(e.target.id))
        renderCart()
    }
})


function addToCart(id){
    const product = menuArray.find(item => item.id === id)
    cartArray.push(product)
}

function getTotaPrice(){
    return cartArray.map(item => item.price).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
}

function renderCart(){
    const cart = document.getElementById('list-cart')
    const totalPrice = document.getElementById('total-price')
    let cartHtml = ``
    if(cartArray.length > 0){
        cartArray.forEach(item => {
            cartHtml += `<li class="cart-inner">
                            <div class="cart-content">
                                <h2>${item.name}</h2>
                                <button class="remove-btn">remove</button>
                            </div>
                            <div id="" class="price">$${item.price}</div>
                         </li> `
        })
    }

    totalPrice.textContent = getTotaPrice()
    cart.innerHTML = cartHtml
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
                                <button id="${item.id}" class="add-btn style-btn">&plus;</button>
                            </li> `
    })
}

renderProduct()



