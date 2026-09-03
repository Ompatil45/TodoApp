import express from 'express'   //this is latest syntax to import express
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

const app = express()
const PORT = process.env.PORT || 8000

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//Middleware to configure the server to expect and send the json data
app.use(express.json())

//serves the html file from the //public directory
//tells express to serve all files from the public folder as static assets(file)
app.use(express.static(path.join(__dirname, '../public')))

//sending html file to the client
//serving up the html file from the //public directory
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public', 'index.html'))
    

})

//routes
app.use('/auth', authRoutes)
app.use('/todos', todoRoutes)



app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})