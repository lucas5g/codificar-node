import puppeteer from 'puppeteer';


const projects = [{
        name: 'molde'
    },
    {
        name: 'medicol'
    },
    {
        name: 'mariamariabox'
    },
    {
        name: 'pedenobairro'
    },
    {
        name: 'achelocal'
    },
    {
        name: 'puppy'
    }
]


export async function projectsVersion() {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
        ]
    });

    const page = await browser.newPage()
        // await page.goto(`https://app.${projects[0].web}.appmarketplace.com.br`);

    projects.map(async(project, index) => {
        setTimeout(async() => {
            const url = `https://app.${project.name}.appmarketplace.com.br`
            await page.goto(url)

            const info = await page.evaluate(() => {
                return {
                    version: document.querySelector('div.text-version >  p > strong').textContent

                }
            })
            projects[index] = {
                    name: project.name,
                    url,
                    version: info.version

                }
                // await page.waitForTimeout(1000)
                // await page.goto();

        }, 3000 * index)
    })


    await page.waitForTimeout(projects.length * 3000)
    console.log(projects)

    await browser.close();
    return projects
}