import puppeteer from 'puppeteer';

import { prisma } from '../config/prisma.js'
export async function projectsVersion() {


    const projects = await prisma.project.findMany({
        orderBy: [{
            name: 'asc'
        }]

    })

    console.log('atualizando lista...')
    projects.map(async(project, index) => {
        setTimeout(async() => {

            // console.log(project.name)
            const { infoIos } = await verifyVersionIos({ ios: project.ios, name: project.name })

            // console.log({ infoIos })
            // return
            const { infoWeb } = await verifyVersion({ name: project.name })
            await prisma.project.update({
                where: { name: project.name },
                data: {
                    versionWeb: infoWeb.versionWeb,
                    versionIos: infoIos.versionIos

                }

            })


            // console.log({ infoWeb, infoIos })

        }, 2000 * index)
    })


}

// projectsVersion()

async function verifyVersion({ name }) {
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


    await browser.close();

    return { infoWeb, portal }

}

async function verifyVersionIos({ ios, name }) {
    // console.log(name)
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
        ]
    });

    const page = await browser.newPage()


    await page.goto(ios)

    try {

        await page.waitForSelector('p.whats-new__latest__version')
        const infoIos = await page.evaluate(() => {
            return {
                versionIos: document.querySelector('p.whats-new__latest__version').textContent.replace('Versão ', '').replace('Version ', '')

            }
        })
        await browser.close();
        console.log(name)
        return { infoIos }

    } catch (err) {
        console.log(err)
        console.log(name)
        console.log(ios)
        const infoIos = {
            versionIos: 'Update'
        }
        return { infoIos }
    }
    await browser.close();
    // console.log({ ios, infoIos })


}