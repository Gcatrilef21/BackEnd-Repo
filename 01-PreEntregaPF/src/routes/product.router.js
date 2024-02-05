// Manejo de Modulos con ES6
import Router from 'express';
import { join } from 'path'
import { ProductManager } from '../ProductManager.js';
import __dirname from '../utils.js'

let ruta = join(__dirname, '..', 'archivos', 'products.json')

const product = new ProductManager(ruta)

export const router = Router()


const env = async () => {
    try {
        let products = await product.getProducts()
        // Metodo GET con con Query Limit / listado de Productos
        router.get('/', (req, res) => {
            let product = products

            if (req.query.limit) {
                product = product.slice(0, req.query.limit)
                return res.status(200).json({ Message: 'Estos son los productos filtrado', product });
            }

            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ Message: 'Estos son los productos', products });
        });

        // Metodo GET con filtro de ID
        router.get('/:pid', (req, res) => {
            let product = products
            let { pid } = req.params

            pid = parseInt(pid)

            if (isNaN(pid)) return res.json({ Message: 'Error, ingrese un argumento id numerico' })

            let productId = product.find(producto => producto.id === pid)
            if (!productId) return res.status(400).json({ Error: `El producto con ID ${pid}, no se encuentra en la BBDD` });

            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ Message: 'Este es su producto seleccionado', productId });
        });

        // Metodo POST 

        router.post('/', async (req, res) => {

            let prods = products

            let {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnail=[]
            } = req.body;

            let existProd = prods.find(prod => prod.title === title && prod.code === code)
            if (existProd) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({ Error: `El Producto con Nombre: ${title} y Codigo: ${code} ya se encuentra registrado` });
            }

            if (!title || !description || !code || !price || !status || !stock || !category ) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({ Error: 'Estos son Campos Obligatorios : Titulo, Descripcion, Codigo, Precio, Estatus, Stock, Categoria' });
            }

            let newProduct = await product.addProduct(title, description, code, price,status, stock, category)

            res.setHeader('Content-Type', 'application/json');
            res.status(201).json({ Message: `Nuevo Producto creado correctamente, Nombre : ${title} / Codigo :  ${code}` });
        })


        // Metodo PUT 
        router.put('/:pid', async (req, res) => {
            // let product = products

            let { pid } = req.params;
            pid = parseInt(pid)

            if (isNaN(pid)) return res.json({ Error: 'Ingrese un id numerico' })

            // let indexProduct = product.findIndex()



            res.setHeader('Content-Type', 'application/json');
            res.status(200).send('FUUUUAP, Acuestate');
        })

    } catch (error) {
        console.log('Se ha encontrado el siguiente error', error.message)
    }
}
env()

let cofidence = true
if (!cofidence) {


}