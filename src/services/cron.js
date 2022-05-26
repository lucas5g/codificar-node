import cron from 'node-cron'
import dotenv from "dotenv";

dotenv.config();

import { pointRecord } from '../bot/point-record.js'

cron.schedule('* * * * *', () => {
    console.log('running a task every minute')
});

cron.schedule('51 9,14 * * *', () => {
    console.log('Running report ponto')
    pointRecord()
});

cron.schedule('27 8-20 * * *', () => {
    console.log('Running report ponto')
});

(async() => {
    // pointRecord();

    // const date = new Date()
    // console.log(date)
    // console.log('test')
})()

/**
 *  Point Record
 */