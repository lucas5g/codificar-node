import express from "express";
import path from "path";
import fs from 'fs'
import { projectsVersion } from "./bot/projects-version.js"
import "./services/cron.js"


const app = express()
app.use(express.static(path.resolve() + '/src/assets'))


app.get('/', (req, res) => {
    res.json({ msg: 'ola' })
})

app.get('/projects', async(req, res) => {
    await projectsVersion()
        // console.log(projects)

    const projects = await fs.readFileSync('data/projects.json', 'utf8')

    return res.json(JSON.parse(projects))
        // res.send('todos os painéis')
})


app.listen(process.env.PORT, () => { console.log(`Server run http://localhost:${process.env.PORT}`) })