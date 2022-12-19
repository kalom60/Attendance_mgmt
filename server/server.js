import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import router from "./routes/index.js";

const PORT = 5000
const app = express()

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())
app.use(router)

app.listen(PORT, () => {
    console.log(`App running at port ${PORT}`)
})