import puppeteer from 'puppeteer';
import fs from 'fs'

const projects = [
    'achelocal',
    'ajudaai',
    'dusha',
    'freefood',
    'mariamariabox',
    'medicol',
    'molde',
    'pedenobairro',
    'pedeme',
    'puppy',
    'pidao'

].sort()

const projectsObjToJson = []

export async function projectsVersion() {


    // await page.goto(`https://app.${projects[0].web}.appmarketplace.com.br`);

    projects.map(async(project, index) => {
        setTimeout(async() => {

            const { url, info } = await verfiyVersion({ project })

            projectsObjToJson[index] = {
                name: project,
                url,
                version: info.version
            }

            console.log({ project, url, version: info.version })


        }, 500 * index)
    })


    // fs.writeFile('./data/projects.json', '', err => {
    //     if (err) {
    //         console.log({ err })
    //     }
    // })

    setTimeout(() => {
        console.log('atualizando lista...')
        fs.writeFile('./data/projects.json', JSON.stringify(projectsObjToJson, 0, 2), err => {
            if (err) {
                console.log({ err })
            }
        })
        console.log('Lista atualizada.')

        // return projects
    }, 2000 * projects.length)
}


async function verfiyVersion({ project }) {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
        ]
    });

    const page = await browser.newPage()


    const url = `https://app.${project}.appmarketplace.com.br`
    await page.goto(url)

    const info = await page.evaluate(() => {
        return {
            version: document.querySelector('div.text-version >  p > strong').textContent,

        }
    })
    await browser.close();

    return { info, url }

}