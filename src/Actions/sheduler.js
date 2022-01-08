const shedule = require('node-schedule');
const fetchData = require('./core');
const allyRaport = require('./raport.ally');
const clean = require('./cleaner');
module.exports = async () => {
    shedule.scheduleJob("0 0 * * * *", async () => {
        await fetchData();
        await allyRaport();
    });
    shedule.scheduleJob("0 0 0 * * *", async () => {
        await clean();
    })
}