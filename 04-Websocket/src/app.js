import express from 'express';
const PORT = 3001;

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', (req,res)=>{


    res.setHeader('Content-Type', 'text/html');
    res.status(200).json({Message:'FUUUUAP, Acuestate'});
})

const serverHTTP=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});