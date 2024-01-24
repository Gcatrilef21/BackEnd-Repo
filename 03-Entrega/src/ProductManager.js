const fs = require('fs');
const fsPromesas = require('fs').promises;



class ProductManager{
    // static id = 0;
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
        let id = 1;
        

        if (products.length > 0) {
            id = products[products.length - 1].id + 1;
        }

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
            id: id,
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

module.exports = ProductManager