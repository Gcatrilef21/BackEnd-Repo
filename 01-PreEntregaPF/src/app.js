//Manejo de Modulos con ES6
import express from 'express';
import { router as routerUsuarios } from './routes/product.router.js';


const app = express();
const PORT = 8080;


app.use(express.json())
app.use(express.urlencoded({extended:true}))


const server=app.listen(PORT,()=>{
    console.log(`Servidor Express con el puerto ${PORT}`);
});

const env = async ()=>{
    try {
        
        app.use('/api/products', routerUsuarios)
    
        app.get('/', (req,res)=>{
            res.setHeader('Content-Type', 'text/plain');
            res.status(200).send('Primera PreEntrega BackEnd');
        })

    } catch (error) {
        console.log('Se ha encontrado el siguiente error' , error.message)
    }
}

env()