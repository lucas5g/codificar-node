import cron from 'node-cron'
import dotenv from "dotenv";
import { projectsVersion } from '../bot/projects-version.js'


dotenv.config();

import { pointRecord } from '../bot/point-record.js'

// cron.schedule('* * * * *', () => {
//     console.log('running a task every minute')
// });


cron.schedule('20 9-14 * * *', () => {
    console.log('Running report ponto')
    pointRecord();
});

(async() => {
    // pointRecord();
    console.log(await projectsVersion())

    // const date = new Date()
    // console.log(date)
    // console.log('test')
})()

/**
 *  Point Record
 */