const path = require('path');
const express = require('express');
const ProductManager = require("./ProductManager");
const { clearScreenDown } = require('readline');

const PORT = 8080;

const app = express();


let ruta=path.join(__dirname,'..','productos','products.json') 


app.use(express.json())
app.use(express.urlencoded({extended:true}))

const product = new ProductManager (ruta)


const env = async () =>{

    try{

        let productos = await product.getProducts()
        
        app.get('/', (req,res)=>{
            res.setHeader('Content-Type', 'text/HTML');
            res.status(200).send('<h2> Tercera entrega Servidor Express</h2>');
            
        })
        
        // Mostrar productos cargados desde ProductManager
        app.get('/products', (req,res)=>{
        
            if(productos.length === 0){
                    return res.status(400).json({message:'Productos No Encontrados ❌'});
            }
                
            res.status(200).json({message:'Estos son los productos', productos});
        })

        // Muestra los productos con query y un limite
        app.get('/products/lm', (req,res)=>{

            let product = productos
    
            if(req.query.limit){
                product = product.slice(0,req.query.limit)
            }

            res.status(200).json({Message:'Estos son los productos filtrado', product });
        })

        // Filtro de req.params 
        app.get('/products/:id', (req,res)=>{
            let product = productos
            let {id} = req.params

            id = parseInt(id)

            if(isNaN(id)) return res.setHeader('Content-Type', 'application/json')

            let productId = product.find(producto => producto.id === id)
            if(!productId) return res.status(400).json({Error:`El producto con ID ${id}, no se encuentra en la BBDD`});

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({Message:'Este es su producto seleccionado', productId});
        })
        
        const server=app.listen(PORT,()=>{
            console.log(`Server escuchando en puerto ${PORT}`);
        });

    }catch(error){
        console.log('Se ha encontrado el siguiente error :', error.message)

    }
}

env()
