import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') 
	dotenv.config();
import App from './App';
import { PORT } from './main/environment';
const app: Dawn.App = new App();
app.configureExpress(PORT);
app.setUpDatabase();
app.startServer();
