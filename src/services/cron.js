import cron from 'node-cron'
import dotenv from "dotenv";
import { projectsVersion } from '../bot/projects-version.js'


dotenv.config();

import { pointRecord } from '../bot/point-record.js'

cron.schedule('*/30 * * * *', () => {
    console.log('Update version projects')
    projectsVersion()
});


cron.schedule('20 9-14 * * *', () => {
    console.log('Running report ponto')
    pointRecord();
});



(async() => {
    // pointRecord();
    // console.log(await projectsVersion())

    // const date = new Date()
    // console.log(date)
    // console.log('test')
})()

/**
 *  Point Record
 */