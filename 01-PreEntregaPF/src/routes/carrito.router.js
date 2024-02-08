//Manejo de Modulos con ES6
import Router from "express";
import {join} from "path"
import __dirname from "../utils.js";
import { ProductManager } from "../ProductManager.js";
import { CartManager } from "../ManagerCart.js"

export const router = Router()

let cartRuta = join(__dirname, '..', 'archivos', 'carts.json')
// console.log(cartRuta)

// const product = new ProductManager(ruta)
const cart = new CartManager(cartRuta)

const env = async ()=>{
    try {
        let carts = await cart.getCarts()
        //  Metodo crea carritos
        router.post('/', async (req,res)=>{

            await cart.addCarts()
        
            res.setHeader('Content-Type', 'application/json');
            res.status(201).json('Se ha creado un nuevo Carrito');
        });

        router.get('/:cid', async (req,res)=>{
            let cart = carts
            let { cid } = req.params

            cid = parseInt(cid)

            if(isNaN(cid)) return res.json({Error: 'Ingrese un argumento id numerico'})
            
            // let cartId = await carts.getCartsId(cid)
            let cartId = cart.find(cart => cart.id === cid)
            
            if (!cartId){
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({Error: `El Carrito con ID ${cid}, no existe en BBDD`});
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({Message: `Su carrito actual`, cartId});
        })  
        
    } catch (error) {
        console.log('Se ha encontrado el siguiente error', error.message)
    }
}
env()