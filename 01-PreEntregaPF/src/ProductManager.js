//Manejo de modulos con ES6

import { promises as fsPromesas } from 'fs'
import fs from 'fs'

let ruta = join(__dirname, '..', 'archivos', 'products.json')
import { join } from 'path'
import __dirname from './utils.js'

export class ProductManager {
    constructor(pathFile) {
        this.path = pathFile
    }

    // -----> Validar si existen productos
    async getProducts() {
        if (fs.existsSync(this.path)) {
            return JSON.parse(await fsPromesas.readFile(this.path))
        } else {
            return []
        }
    }

    // ----->  Agregar Producto //
    async addProduct(title, description, code, price,status=true,stock, category,thumbnail=[]) {
        let products = await this.getProducts()
        let id = 1;
        

        if (products.length > 0) {
            id = products[products.length - 1].id + 1;
        }

        //Validar los campos solicitados
        if (!title || !description || !code || !price || !status || !stock || !category ) {
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
            code,
            price,
            status:status,
            stock,
            category,
            thumbnail
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
        products[index] = {
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
        products.splice(deltProduct, 1)
        fsPromesas.writeFile(await this.path, JSON.stringify(products, null, 4))

        console.log(`Producto con el ID ${id} fue eliminado corractamente `)
    }
}

/* const testProduct = new ProductManager(ruta)

const env = async () => {
    try {
        // console.log(ruta)
        // console.log(await testProduct.getProducts())import {join} from 'path'
        // await testProduct.addProduct({
        //     title: 'Edam',
        //     description: 'Queso originario de los Países Bajos',
        //     price: 21990,
        //     code: 'plm031',
        //     stock: 8,
        //     category: 'prueba',
        //     // status: true
        // })

    } catch (error) {
        console.log('error:', error.message)
    }
}
env() */