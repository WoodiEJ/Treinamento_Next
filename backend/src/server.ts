import express  from "express";
import cors from 'cors'
import { authRoutes } from "./routes/authRoutes";
import { carroRoutes } from "./routes/carroRoutes";
import clienteRoutes from "./routes/clienteRoutes";
import empregadoRoutes from "./routes/empregadoRoutes";
import vendasRoutes from "./routes/vendaRoutes";

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())
app.use('/auth', authRoutes())
app.use('/carros', carroRoutes())
app.use('/clientes', clienteRoutes())
app.use('/empregados', empregadoRoutes())
app.use('/vendas', vendasRoutes())

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})