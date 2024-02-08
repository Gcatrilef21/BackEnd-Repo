//Manejo de Modulos con ES6
import Router from "express";
import {join} from "path"
import __dirname from "../utils.js";
import { ProductManager } from "../ProductManager.js";
import { CartManager } from "../ManagerCart.js"

export const router = Router()

let cartRuta = join(__dirname, '..', 'archivos', 'carts.json')

// const product = new ProductManager(ruta)
const cart = new CartManager(cartRuta)

const env = async ()=>{
    try {
        router.post('/', async (req,res)=>{

            await cart.addCarts()
        
            res.setHeader('Content-Type', 'application/json');
            res.status(201).send('Se ha creado un nuevo Carrito');
        })
        
    } catch (error) {
        console.log('Se ha encontrado el siguiente error', error.message)
    }
}
env()