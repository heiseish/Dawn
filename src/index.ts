import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') dotenv.load()
import { PORT } from './main/environment'
import App from './App'
const app = new App(PORT)
