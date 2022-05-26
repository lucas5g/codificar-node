import express from "express";
import path from "path";
import "./services/cron.js"

const app = express()
app.use(express.static(path.resolve() + '/src/assets'))


app.get('/', (req, res) => {
    res.json({ msg: 'ola' })
})



app.listen(process.env.PORT, () => { console.log(`Server run http://localhost:${process.env.PORT}`) })