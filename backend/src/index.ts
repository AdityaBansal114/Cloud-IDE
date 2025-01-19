import dotenv from 'dotenv'
import express  from "express";
import routes from './routes'

dotenv.config()
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());

app.use("/api", routes);

app.listen(PORT, ()=>{
    console.log(`server running on PORT : ${PORT}`);
})
