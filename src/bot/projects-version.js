import puppeteer from 'puppeteer';
import fs from 'fs'

const projects = [{
        name: 'achelocal',
        ios: 'https://apps.apple.com/us/app/ache-local/id1504708811?l=pt&ls=1'
    },
    {
        name: 'ajudaai',
    },
    {
        name: 'dusha',
    },
    {
        name: 'freefood',
    },
    {
        name: 'mariamariabox',
    },
    {
        name: 'medicol',
    },
    {
        name: 'molde',
    },
    {
        name: 'pedeme',
    },
    {
        name: 'pedenobairro',
    },
    {
        name: 'pidao'
    },
    {
        name: 'puppy',
    },
]


export async function projectsVersion() {


    // await page.goto(`https://app.${projects[0].web}.appmarketplace.com.br`);

    projects.sort((a, b) => a.name > b.name && 1 || -1);
    // console.log(test)
    // projects.map(project => {
    //     console.log({ project })
    // })

    // return
    console.log('atualizando lista...')
    projects.map(async(project, index) => {
        setTimeout(async() => {

            const { portal, info } = await verfiyVersion({ project: project.name })

            projects[index] = {
                ...project,
                portal,
                versionWeb: info.versionWeb
            }

            // console.log(project)


        }, 1000 * index)
    })


    // fs.writeFile('./data/projects.json', '', err => {
    //     if (err) {
    //         console.log({ err })
    //     }
    // })

    setTimeout(() => {
        console.log(projects)
        fs.writeFile('./data/projects.json', JSON.stringify(projects, 0, 2), err => {
            if (err) {
                console.log({ err })
            }
        })
        console.log('Lista atualizada.')

        // return projects
    }, 3000 * projects.length)
}

projectsVersion()

async function verfiyVersion({ project }) {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
        ]
    });

    const page = await browser.newPage()


    const portal = `https://app.${project}.appmarketplace.com.br`
    await page.goto(portal)

    const info = await page.evaluate(() => {
        return {
            versionWeb: document.querySelector('div.text-version >  p > strong').textContent,

        }
    })
    await browser.close();

    return { info, portal }

}