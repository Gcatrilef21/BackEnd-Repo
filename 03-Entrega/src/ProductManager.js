const path = require('path');
const fs = require('fs');
const fsPromesas = require('fs').promises;

let ruta=path.join(__dirname,'..','productos','products.json') 


class ProductManager{
    static id = 0;
    constructor(pathFile){
        this.path = pathFile
    }
    
    // -----> Validar si existen productos
    async getProducts() {
        if (fs.existsSync(this.path)) {
            return JSON.parse( await fsPromesas.readFile(this.path))
        } else {
            return []
        }
    }

    // ----->  Agregar Producto 
    async addProduct(title, description, price, code, thumbnail, stock) {
        let products = await this.getProducts()
        ProductManager.id++

        //Validar los campos solicitados
        if (!title || !description || !price || !code || !thumbnail || !stock) {
            return console.error('Producto no Agregado, completar todos los campos');
        }

        // Validar si Existe el producto
        let exist = await products.find(prod => prod.code === code)
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
        await fsPromesas.writeFile(this.path, JSON.stringify(products, null, 4))

    }

    // -----> Buscar Producto x ID
    async getProductById(id) {
        let products = await this.getProducts()

        let idProduct = products.find(prod => prod.id === id)
        return idProduct
            ? console.log(idProduct)
            : console.error('Producto no encontrado ❌')
    }

    // -----> Actualizar Producto
    async updateProduct(id, object) {
        let products = await this.getProducts()

        //Buscar el ID previamente
        let index = products.findIndex(prod => prod.id === id)

        if (index === -1) {
            console.log(`Producto con el ID ${id}no encontrado`)
            return
        }

        // Validar que en object no manden bananas con object.value y object.key
        // Tambien se puede intentar con object.entrie()

    /*  let validateObject = Object.keys(object)
    
        if (validateObject === undefined){
            console.error(error,'test')
            return
        } */
        

        // index es el array en su posicion 
        products[index]={
            ...products[index],
            ...object,
            id
        }
        fsPromesas.writeFile(await this.path, JSON.stringify(products, null, 4))
    }

    // -----> Eliminar Producto
    async deleteProduct(id) {
        let products = await this.getProducts()

        //Buscar el ID previamente
        let deltProduct = products.findIndex(prod => prod.id === id)
        if (deltProduct === -1) {
            console.log(`Producto con el ID ${id}. No encontrado!!`)
            return
        }
        // Eliminar el producto y Reescribir el JSON
        products.splice(deltProduct,1)
        fsPromesas.writeFile(await this.path, JSON.stringify(products, null, 4))

        console.log(`Producto con el ID ${id} fue eliminado corractamente `)
    }
}

    //Pasar este codigo al app. 
const produc = new ProductManager (ruta)

const test = async() =>{
    try{
        // console.log(await produc.getProducts())
        // await produc.addProduct('feta','frances',300,'123asd','image',2)
        // await produc.addProduct('Shtilton','es un queso Ingles',5990,'qwe123','img',8)
        // await produc.addProduct('Camembert', 'es un queso de origen francés',7557, 'zxc321', 'img', 231 )
        // await produc.addProduct('Maasdam', 'es un queso de origen suizo-holandés',10990, 'poi0981', 'img', 15 )
        // await produc.addProduct('Brie', 'es un queso de origen frances',19990, '', 'img', 15 )    
        // console.log(await produc.getProducts())
        // await produc.getProductById(1)
        // await produc.deleteProduct(1)
        // console.log(await produc.getProducts())
        await produc.updateProduct(2,{title:'test',price:'free'})
        // console.log(await produc.getProducts())
    }catch{
        console.error(error.massage)
    }
}


test()