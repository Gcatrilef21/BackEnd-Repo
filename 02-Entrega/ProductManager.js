
//C:\Users\Gonzalo\OneDrive\Coder\Back-End\Entregas\Entregas

const fs = require('fs')

class ProductManager {
    static id = 0
    constructor(filepath) {
        this.path = filepath
    }
    // Obtener Productos
    getProducts() {
        if (fs.existsSync(this.path)) {
            return JSON.parse(fs.readFileSync(this.path))
        } else {
            return []
        }
    }

    addProduct(title, description, price, code, thumbnail, stock) {
        let products = this.getProducts()
        ProductManager.id++

        //Validar los campos solicitados
        if (!title || !description || !price || !code || !thumbnail || !stock) {
            return console.error('Producto no Agregado, completar todos los campos');
        }

        // Validar si Existe el producto
        let exist = products.find(prod => prod.code === code)
        if (exist) {
            console.error(`Producto ya existe con el codigo ${code} en BBDD`)
            return
        }

        let newProduct = {
            id: ProductManager.id,
            title,
            description,
            price,
            code,
            thumbnail,
            stock
        }
        //Agregar el producto
        products.push(newProduct)

        //Generar el archivo JSON
        fs.writeFileSync(this.path, JSON.stringify(products, null, 4))

    }

    //Buscar Producto por ID
    getProductById(id) {
        let products = this.getProducts()

        let idProduct = products.find(prod => prod.id === id)
        return idProduct
            ? console.log(idProduct)
            : console.error('Producto no encontrado ❌')
    }

    updateProduct(id, object) {
        let products = this.getProducts()

        //Buscar el ID previamente
        let index = products.findIndex(prod => prod.id === id)
        if (index === -1) {
            console.log(`Producto con el ID ${id}. No se ha encontrado!`)
            return
        }

        products[index]={
            ...products[index],
            ...object,
            id
        }
        fs.writeFileSync(this.path, JSON.stringify(products, null, 4))
    }


    //Elimina el producto
    deleteProduct(id) {
        let products = this.getProducts()

        //Buscar el ID previamente
        let deltProduct = products.findIndex(prod => prod.id === id)
        if (deltProduct === -1) {
            console.log(`Producto con el ID ${id} no encontrado`)
            return
        }
        // Eliminar el producto y Reescribir el JSON
        products.splice(deltProduct,1)
        fs.writeFileSync(this.path, JSON.stringify(products, null, 4))

        console.log(`Producto con el ID ${id}, eliminado corractamente.`)
    }
}

const product = new ProductManager('./Archivo/products.json')

// console.log(product.getProducts())

// product.addProduct('Feta','es un queso Turco',200,'asd123','img',10)
// product.addProduct('Shtilton','es un queso Ingles',5990,'qwe123','img',8)
// product.addProduct('Camembert', 'es un queso de origen francés',7557, 'zxc321', 'img', 231 )
// product.addProduct('Maasdam', 'es un queso de origen suizo-holandés',10990, 'poi0981', 'img', 15 )
// product.addProduct('Brie', 'es un queso de origen frances',19990, '', 'img', 15 )    // mensaje de error por falta de campos


// console.log(product.getProducts())

// product.getProductById(4)
// product.deleteProduct(2)
product.updateProduct(1,{title:'Stilton'})

// console.log(product.getProducts())