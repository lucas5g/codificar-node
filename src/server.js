import express from "express";
import path from "path";
import fs from 'fs'
import { projectsVersion } from "./bot/projects-version.js"
import "./services/cron.js"
import { prisma } from "./config/prisma.js";


const app = express()
app.use(express.static(path.resolve() + '/src/assets'))


app.get('/', (req, res) => {
    res.json({ msg: 'ola' })
})

app.get('/projects', async(req, res) => {

    const projects = await prisma.project.findMany({
        orderBy: [{
            name: 'asc'
        }]
    })

    return res.json(projects)
})

app.get('/projects-update-list', (req, res) => {
    projectsVersion()

    res.json({
        msg: 'Atualizando listas dos projetos via webhook'
    })
})


app.listen(process.env.PORT, () => { console.log(`Server run http://localhost:${process.env.PORT}`) })