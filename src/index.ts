import dotenv from 'dotenv';
dotenv.config();
import App from './App';
import { PORT } from './main/environment';
const app = new App();
app.configureExpress(PORT);
app.setUpDatabase();
app.startServer();
