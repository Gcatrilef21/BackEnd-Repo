
class ProductManger {
    constructor (){
        this.products=[]
    }


/* --> El método getProducts funciona correctamente, devuelve todos.✅ */

    getProduct(){    
        let product = this.products
        return console.log(product)
    }
    
/* --> AddProduct: 
    Se debe validar que no exista un producto con el mismo code. ✅
    El code no es el mismo campo que id, el id debe ser autoincrementable y el code es otro campo distinto. ✅
    Falta validar que todos los campos sean obligatorios. ✅ */

    addProduct(title, description, price, code, thumbnail, stock){

        if(!title || !description || ! price || !code || !thumbnail || !stock){
            console.log('All fields are required ')
        }else{
            let id = 1
        if(this.products.length>0){
            id=this.products[this.products.length-1].id + 1
        }

        let newProduct = {
            id, 
            title, 
            description,
            price, 
            code,
            thumbnail,
            stock
        }

        this.products.some(product => product.code === newProduct.code)
            ? console.error(`This Product already exists name: ${newProduct.title} / code: ${newProduct.code}`)
            : this.products.push(newProduct)

        }
    
        
    }

/*     -->  getProductById: 
    Se debe buscar por id no por code. ✅
    En caso de que exista se tiene que devolver el producto completo, no un mensaje de que si existe.  */ 

    getProductById(id){
        let idProduct = this.products.find(product => product.id === id)
        return idProduct 
            ? console.log(idProduct) 
            : console.error('Not Found ❌') 
    }
}

let productManager = new ProductManger()


productManager.addProduct('Feta','Turco',200,12,'img',10)

productManager.addProduct('stilton','Ingles',5990,1,'img',8)

productManager.addProduct('Feta','Turco',5990,53,'img',5)
//productManager.addProduct()
productManager.getProduct()
productManager.getProductById(5)
