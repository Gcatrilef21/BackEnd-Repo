// Manejo de Modulos con ES6
import fs from 'fs'
import { promises as fsPromises} from 'fs'
import __dirname from './utils.js'
import { join } from 'path'

let ruta = join(__dirname,'..', 'archivos','carts.json')

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

        // let exist = carts.find(cart => cart.id === id)
        // if(!exist){
        //     return console.error(`Producto con ${id} ya existe`)
        // }

        let newCart = {
            id:id,
            products 
        }
        carts.push(newCart)
        await fsPromises.writeFile(this.path, JSON.stringify(carts, null, 4))
    }
};

const cart = new CartManager(ruta)

const env = async ()=>{
    try {
        console.log(await cart.getCarts())
    } catch (error) {
        console.log('Mensaje de error:', error.massage)
    }
}

env()