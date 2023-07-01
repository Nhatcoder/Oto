
let cartIcon = document.querySelector('#cart-icon');
let bgCart = document.querySelector('.bg-cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
    bgCart.classList.add('active');
}

closeCart.onclick = () => {
    bgCart.classList.remove('active');
}

// cart js
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // xóa sản phẩm trong giỏ hàng
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem)
    }

    // Thay đổi số lượng
    var quantityInput = document.getElementsByClassName('cart-quantily');
    for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i];
        input.addEventListener('change', quantityChanged)
    }

    // thêm sản phẩm vào giỏ hàng
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }

    document
        .getElementsByClassName('btn-buy')[0]
        .addEventListener("click", buyButtonClicked);

}

// mua hầng thành công
function buyButtonClicked() {
    alert("Mua hàng thành công !");

    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

// hàm xóa sản phẩm
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal()
}

// tính giá tiền xử lý
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value < 0) {
        input.value = 1;
    }

    updateTotal()
}

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addproductToCart(title, price, productImg);
    updateTotal();
}


function addproductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    var notification = document.querySelector('.alert')

    var cartItems = document.querySelector('.cart-content');

    console.log(cartItems);
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

    for (var i = 0; i < cartItemsNames.length; i++) {
        notification.classList.add('active');

        setTimeout(() => {
            notification.classList.remove('active')
        }, 800);

    }

    var cartBoxContent = `
                        <div class="cart-box">

                        <img src="${productImg}" alt="ảnh đấy đứng động" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantily">
                        </div>

                        <!-- remove cart -->
                        <i class='bx bxs-trash-alt cart-remove'></i>
                        </div>

    `;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    // Chèn thằng cartItem vào thằng shopBox
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantily')[0].addEventListener('change', quantityChanged);

    updateTotal()

}


// Làm giỏ hàng
function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxs = cartContent.getElementsByClassName('cart-box');
    var total = 0;

    for (var i = 0; i < cartBoxs.length; i++) {
        var cartBox = cartBoxs[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantily')[0];

        var price = parseFloat(priceElement.innerHTML.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = "$" + total;
}

