import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') dotenv.load()
import App from './App'
import { PORT } from './main/environment'
const app = new App()
app.configureExpress(PORT)
app.startServer()