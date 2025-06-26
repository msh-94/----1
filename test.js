function getPro() {
    products = localStorage.getItem('products')
    if(products == null) {
        products = [];
    } else {
        products = JSON.parse(products)
    }
    return products;
}

function setPro(products) {
    localStorage.setItem('products' , JSON.stringify(products))
}

function proAdd() {
    const pnameInput = document.querySelector('#pnameInput')
    const ppriceInput = document.querySelector('#ppriceInput')
    const pinfoInput = document.querySelector('#pinfoInput')
    const pimgInput = document.querySelector('#pimgInput')

    const 
}

