import cron from 'node-cron'
import dotenv from "dotenv";
dotenv.config();

import { pointRecord } from '../bot/point-record.js'

cron.schedule('* * * * *', () => {
    console.log('running a task every minute')
});

cron.schedule('30 9,14 * * *', () => {
    console.log('Running report ponto')
    pointRecord()
});

cron.schedule('33 10 * * *', () => {
    console.log('Running report ponto')
    pointRecord()
});

(async() => {


    // console.log({ password })
})()

/**
 *  Point Record
 */