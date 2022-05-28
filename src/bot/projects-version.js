import puppeteer from 'puppeteer';
import fs from 'fs'

const projects = [{
        name: 'achelocal',
        ios: 'https://apps.apple.com/us/app/ache-local/id1504708811?l=pt&ls=1'
    },
    {
        name: 'ajudaai',
        ios: 'https://apps.apple.com/us/app/ajuda-ai/id1603669928'
    },
    // {
    //     name: 'dusha',
    // },
    {
        name: 'freefood',
        ios: 'https://apps.apple.com/in/app/freefood/id1529160011'
    },
    {
        name: 'mariamariabox',
        ios: 'https://apps.apple.com/br/app/mariamariabox/id1604821083'
    },
    {
        name: 'medicol',
        ios: 'https://apps.apple.com/br/app/medicol/id1574241148'
    },
    {
        name: 'molde',
        ios: 'https://apps.apple.com/us/app/molde/id1571195191'
    },
    // {
    //     name: 'pedeme',

    // },
    {
        name: 'pedenobairro',
        ios: 'https://apps.apple.com/br/app/pede-no-bairro/id1527831739'
    },
    {
        name: 'pidao',
        ios: 'https://apps.apple.com/br/app/pid%C3%A3o/id1534631942'
    },
    // {
    //     name: 'puppy',
    //     ios: ''
    // },
]

// const projects = [{
//     name: 'pidao',
//     ios: 'https://apps.apple.com/br/app/pid%C3%A3o/id1534631942'
// }, ]

export async function projectsVersion() {



    projects.sort((a, b) => a.name > b.name && 1 || -1);

    console.log('atualizando lista...')
    projects.map(async(project, index) => {
        setTimeout(async() => {

            const { portal, infoWeb, infoIos } = await verfiyVersion({ name: project.name, ios: project.ios })
                // console.log({ infoWeb, infoIos })
            projects[index] = {
                ...project,
                portal,
                versionWeb: infoWeb.versionWeb,
                versionIos: infoIos.versionIos
            }

            // console.log(project)


        }, 2000 * index)
    })




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

// projectsVersion()

async function verfiyVersion({ name, ios }) {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
        ]
    });

    const page = await browser.newPage()


    const portal = `https://app.${name}.appmarketplace.com.br`
    await page.goto(portal)

    const infoWeb = await page.evaluate(() => {
        return {
            versionWeb: document.querySelector('div.text-version >  p > strong').textContent,

        }
    })

    await page.goto(ios)
    await page.waitForSelector('p.whats-new__latest__version')
    await page.waitForTimeout(1500)
    const infoIos = await page.evaluate(() => {
            return {
                versionIos: document.querySelector('p.whats-new__latest__version').innerText.replace('Versão ', '').replace('Version ', '')


            }
        })
        // console.log(infoIos)
        // await page.waitForTimeout(500)


    await browser.close();
    console.log({ infoIos })
    return { infoWeb, infoIos, portal }

}