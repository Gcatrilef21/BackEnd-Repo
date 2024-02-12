// Manejo de Modulos con ES6
import fs from 'fs'
import { promises as fsPromises} from 'fs'
import __dirname from './utils.js'
import { join } from 'path'
import { ProductManager } from './ProductManager.js'

let cartRuta = join(__dirname,'..', 'archivos','carts.json')
let ruta = join(__dirname, '..', 'archivos', 'products.json')

const prodManag = new ProductManager (ruta)

export class CartManager{
    constructor(fileCart){
        this.path=fileCart
    }
    async getCarts() {
        if(fs.existsSync(this.path)){
            return JSON.parse(await fsPromises.readFile(this.path))
        }else{
            return []
        }
    }

    async addCarts(products =[]){
        let carts = await this.getCarts()
        let id = 1;

        if(carts.length > 0  ){
            id = carts[carts.length - 1 ].id + 1;
        }

        let newCart = {
            id:id,
            products 
        }
        carts.push(newCart)
        await fsPromises.writeFile(this.path, JSON.stringify(carts, null, 4))
    }

    async getCartsId(id){
        let carts = await this.getCarts()
        let cartId = carts.find(cart=> cart.id === id)
        return cartId
            ? console.log('Este es el carrito Seleccionado',cartId)
            : console.error('Producto no encontrado')
    }

    async addProductToCart(cid, pid){
        let carts = await this.getCarts()
        let product = prodManag.getProducts()

        console.log(carts)






    }
};

const cart = new CartManager(cartRuta)

const env = async ()=>{
    try {
        console.log(await cart.getCarts()) 
        // await cart.getCartsId(1)

    } catch (error) {
        console.log('Mensaje de error:', error.massage)
    }
}

env()