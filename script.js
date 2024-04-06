// В ЭТОМ СКРИПТЕ 24 ОШИБКИ, ЧТОБЫ ВСЁ ЗАРАБОТАЛО ИХ НАДО ИСПРАВИТЬ. ИСПОЛЬЗУЙ КОНСОЛЬ И ГУГЛ ДЛЯ НАХОЖДЕНИЯ ОШИБОК, А ТАКЖЕ ОБРАТИ ВНИМАНИЕ НА ПОДСКАЗКИ VSCODE.
const productList = {
  plainBurger: {
    name: "Гамбургер простой",
    price: 10000,
    kkal: 500,
    amount: 0,
    src: "images/product1.jpg",
    id: 'plainBurger',
    get Summa() {
      return this.price * this.amount
    },
    get Kkal() {
      return this.kkal * this.amount
    },
  },
  freshBurger:{
    name: "Гамбургер FRESH",
    price: 20500,
    kkal: 700,
    amount: 0,
    src: "images/product2.jpg",
    id: 'freshBurger',
    get Summa() {
      return this.price * this.amount
    },
    get Kkal() {
      return this.kkal * this.amount
    },
  },
  freshCombo:{
    name: "FRESH Combo",
    price: 31900,
    kkal: 1200,
    amount: 0,
    src: "images/product3.jpg",
    id: 'freshCombo',
    get Summa() {
      return this.price * this.amount
    },
    get Kkal() {
      return this.kkal * this.amount
    },
  },
}
const extraProduct = {
  doubleMayonnaise: {
    price: 2000,
    name: "Двойной майонез",
    kkal: 300,
  },
  lettuce: {
    price: 1000,
    name: "Салатный лист",
    kkal: 30,
  },
  cheese: {
    price: 3000,
    name: "Сыр",
    kkal: 350,
  },
}

const products = document.querySelectorAll(".main__product"),
  btnPlusMinus = document.querySelectorAll(".main__product-btn"),
  checkExtra =document.querySelectorAll(".main__product-checkbox"),
  addCart = document.querySelector(".addCart"),
  totalSumm = document.querySelector('.total__span'),
  totalKcall = document.querySelector('.kkcall__span');

btnPlusMinus.forEach((btn) => {
  btn.addEventListener("click", plusMinus)
})

function plusMinus() {
  const parent = this.closest(".main__product"),
    parentIndex = parent.getAttribute('id'),
    outAmount = parent.querySelector(".main__product-num"),
    outPrice = parent.querySelector(".main__product-price span"),
    outKkal = parent.querySelector(".main__product-call span"),
    btnSymbol = this.getAttribute("data-symbol")
    
  if (btnSymbol === "+" && productList[parentIndex].amount < 15) {
    productList[parentIndex].amount++
  } else if (btnSymbol === "-" && productList[parentIndex].amount > 0) {
    productList[parentIndex].amount--
  }

  const { amount, Kkal, Summa } = productList[parentIndex]

  outAmount.innerHTML = amount
  outPrice.innerHTML = Summa.toLocaleString()
  outKkal.innerHTML = Kkal.toLocaleString()
}

checkExtra.forEach((checkbox) => {
  checkbox.addEventListener("input", check)
})

function check() {
  const parent = this.closest(".main__product"),
    parentIndex = parent.getAttribute('id'),
    outPrice = parent.querySelector(".main__product-price span"),
    outKkal = parent.querySelectr(".main__product-call span"),
    attr = this.getAtribute("data-extra");


  productList[parentIndex][attr] = this.checked

  if (this.checed) {
    productList[parentIndex].price += extraProduct[attr].price
    [parentIndex].kkal += extraProduct[attr].kkal
  } else {
    productList[parentIndex].price -= extraProduct[attr].price
    productList[parentIndex].kkal -= extraProduct[attr].kkal
  }

  const { Summa, Kkal } = productList[parentIndex]
  outPrice.innerHTML = Summa.toLocaleString()
  outKkal.innerHTML = Kkal.toLocaleString()
}

const receipt = document.querySelector(".receipt"),
  receiptWO = document.querySelector(".receipt__window-out")
window.addEventListener("click", (e) => {
  e.target.classList.contains("recipt")
    ? receipt.classList.remove("active")
    : ""
  e.target.classList.contains("receipt__window-btn") ? location.reload() : ""
})
function basket() {
    const productArray = [];
    for (const key in productList) {
        let totalCount = 0;
        const po = productList[key];
        // const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
        if (po.amount) {
            productArray.push(po);
            totalCount += po.amount;
        }      
    }
    receiptWO.innerHTML = ''
    for (let i = 0; i < productArray.length; i++) {
        receiptWO.innerHTML += cardItemBurger(productArray[i])
    }
  
    totalSumm.innerHTML = totalSummProduct()
    totalKcall.innerHTML = totalKcallProduct()
    
}

addCart.addEventListener('click', function() {
    receipt.classList.add('active')
    basket()
})

function totalSummProduct() {
    let total = 0
    for(const key in productList) {
        total += productList[key].Summa
    }
    return total.toLocaleString()
}
function totalKcallProduct() {
    let total = 0
    for(const key in productList) {
        total += productList[key].Kkal
    }
    return total.toLocaleString()
}


function cardItemBurger(productData) {
    const {name, Summa: price, amount, src, id} = productData;
    return `
    <div class="wrapper__navbar-product">
        <div class="wrapper__navbar-info">
            <img class="wrapper__navbar-productImage" src="${src}" alt="">
            <div class="wrapper__navbar-infoSub">
                <p class="wrapper__navbar-infoName">${name}</p>
                <p class="wrapper__navbar-infoPrice"><span>${price.toLocaleString()}</span> сум</p>
            </div>
        </div>
        <div class="wrapper__navbar-option" id="${id}_card">
            <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
            <output class="wrapper__navbar-count">${amount}</output>
            <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
        </div>
    </div>
    `;
}

window.addEventListener('click', e => {
    const btn = e.target;
    if(btn.classList.contains('wrapper__navbar-symbol')) {
        const attr = btn.getAttribute('data-symbol')
        const parent = btn.closest('.wrapper__navbar-option')
        if(parent) {
            const idProduct = parent.getAttribute('id').split('_')[0];
            console.log(parent);
            
            if(attr == '-') productList[idProduct].amount--
            else if(attr == '+') productList[idProduct].amount++
            basket()
        }
    }
})