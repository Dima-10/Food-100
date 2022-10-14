// Основа

// Создаём основной объект с продуктами
const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcal: 400,
        amount: 0,
        get Sum() {
            return this.price * this.amount;
        },
        get Kcal() {
            return this.amount * this.kcal;
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcal: 500,
        amount: 0,
        get Sum() {
            return this.amount * this.price;
        },
        get Kcal() {
            return this.amount * this.kcal;
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcal: 700,
        amount: 0,
        get Sum() {
            return this.amount * this.price;
        },
        get Kcal() {
            return this.amount * this.kcal;
        }
    }
}

// Объект с начинками
const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 500,
        kcal: 50
    },
    lettuce: {
        name: 'Салатный лист',
        price: 300,
        kcal: 10
    },
    cheese: {
        name: 'Сыр',
        price: 400,
        kcal: 30
    }
}


// Выбираем необходимые элементы из HTML

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
    checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
    addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptOut = document.querySelector('.receipt__window-out'),
    receiptWindow = document.querySelector('.receipt__window'),
    btnReceipt = document.querySelector('.receipt__window-btn');

for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener('click', function () {
        plusOrMinus(this)
    })
}


function plusOrMinus(element) {
    // closest() - метод, который подключается к родительскому элементу.
    // getAttribute() - метод, который берёт значение атрибута

    const parent = element.closest('.main__product'), // Подкючение к родителю
        parentId = parent.getAttribute('id'), // Берём данные из атрибута родителя
        out = parent.querySelector('.main__product-num'), // Подключаемя к блоку с кол-вом продуктов
        price = parent.querySelector('.main__product-price span'), // Подключаемя к цене
        kcal = parent.querySelector('.main__product-kcall span'), // Подключаемя к калориям
        elementData = element.getAttribute('data-symbol'); // Берём значение атрибута

    if (elementData == '+' && product[parentId].amount < 10) {
        product[parentId].amount++;
    } else if (elementData == '-' && product[parentId].amount > 0) {
        product[parentId].amount--;
    }

    out.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Sum;
    kcal.innerHTML = product[parentId].Kcal;
}




for (let i = 0; i < checkExtraProduct.length; i++) {
    checkExtraProduct[i].addEventListener('click', function () {
        addExtraProduct(this);
    })
}




function addExtraProduct(element) {
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        price = parent.querySelector('.main__product-price span'),
        kcal = parent.querySelector('.main__product-kcall span'),
        elAttr = element.getAttribute('data-extra');

    product[parentId][elAttr] = element.checked;

    if (product[parentId][elAttr] == true) {
        product[parentId].kcal += extraProduct[elAttr].kcal;
        product[parentId].price += extraProduct[elAttr].price;
    } else {
        product[parentId].kcal -= extraProduct[elAttr].kcal;
        product[parentId].price -= extraProduct[elAttr].price;
    }

    kcal.innerHTML = product[parentId].Kcal;
    price.innerHTML = product[parentId].Sum;
}





// таймер в логотипе





/*
const extraTimer = document.querySelector('.header__timer-extra');
let lvl = 0,
    speed = 50;


function timer() {
    for (let l = 0; l < 1; l++) {
            
        lvl++;
        extraTimer.innerHTML = `${lvl}`;
        if (lvl == 50 ?? lvl > 50) {
            speed = 75;
        } else if (lvl == 70 ?? lvl > 70) {
            speed = 120;
        } else if (lvl == 95 ?? lvl > 95) {
            speed = 250;
        } else if (lvl == 100 ) {
            break;
            
        }
        
       setTimeout(timer, speed); 
    }
    
}
timer();
*/
const extraTimer = document.querySelector('.header__timer-extra');
let lvl = 0,
    speed = 50;


function timer() {
    for (let l = 0; l < 1; l++) {

        lvl++;
        extraTimer.innerHTML = `${lvl}`;
        if (lvl == 50) {
            speed = 75;
        } else if (lvl == 70) {
            speed = 120;
        } else if (lvl == 95) {
            speed = 250;
        } else if (lvl == 100) {
            break;

        }

        setTimeout(() => timer(), speed);
    }

}
timer();








//Вывод чека


let arrayProduct = [],
    totalName = '',
    totalPrice = 0,
    totalKcal = 0;


addCart.addEventListener('click', function () {
    for(const key in product) {
        const po = product[key]; //product object
        if (po.amount > 0) {
            arrayProduct.push(po);
            for (const infoKey in po) {
                if (po[infoKey] === true) {
                    po.name += '\n' + extraProduct[infoKey].name;
                    
                    
                }
            }
        }

        po.price = po.Sum;
        po.kcal = po.Kcal;
    }

    for (let i = 0; i < arrayProduct.length; i++) {
        const el = arrayProduct[i];
        totalPrice += el.price;
        totalKcal += el.kcal;
        totalName += '\n ' + el.name + '\n';
        
    }

    receipt.style.display = 'flex';
    setTimeout(() => receipt.style.opacity = '1', 100);
    setTimeout(() => receiptWindow.style.top = '0', 200);

 


    receiptOut.innerHTML = `Вы купили: \n${totalName}\nКалорийность: ${totalKcal} ккал\nСтоимость покупки: ${totalPrice} сум`
})

btnReceipt.addEventListener('click', function () {
    location = 'https.google'
    location.reload()
})


//dblclick - двойной клик
//увеличение картинки на примере есть здесь https://codernote.ru/jquery/uvelichenie-izobrazheniya-po-kliku-new/


