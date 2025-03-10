import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:5173', '*'],  
    // methods: ['GET', 'POST', 'PUT', 'PATCH' , 'DELETE'],
    credentials: true, 
  })
);

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
