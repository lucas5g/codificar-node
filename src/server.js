import express from "express";
import path from "path";
import { projectsVersion } from "./bot/projects-version.js"
import "./services/cron.js"


const app = express()
app.use(express.static(path.resolve() + '/src/assets'))


app.get('/', (req, res) => {
    res.json({ msg: 'ola' })
})

app.get('/projects', async(req, res) => {
    const projects = await projectsVersion()
    return res.json(projects)
        // res.send('todos os painéis')
})


app.listen(process.env.PORT, () => { console.log(`Server run http://localhost:${process.env.PORT}`) })