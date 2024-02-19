import express from 'express';
import { engine } from 'express-handlebars';
import __dirname from './utils.js'
import {join} from 'path'
import { router as routerViews } from './routes/vistasRouter.js';

const PORT = 8082;

const app = express();

let rutaV = join(__dirname,'views')
let rutaP = join(__dirname, 'public')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(rutaP))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', rutaV)

app.use('/', routerViews )


const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});
