const { MongoClient } = require('mongodb');
const config = require('../config.json');
const { player, ally, kill_def, kill_att, kill_all } = require('./endpoint.handler');
const client = new MongoClient(config.DB.URL);

module.exports = async () => {
    let TimeStamp = new Date().toLocaleString();
    try {
        console.group(`Clear Old Data ${TimeStamp}`);
        console.time(`Clear Old Data ${TimeStamp}`);
        await client.connect();
        const collections = {
            ally: client.db(config.DB.Name).collection(ally.name),
            player: client.db(config.DB.Name).collection(player.name),
            RAA: client.db(config.DB.Name).collection(kill_all.name),
            RA: client.db(config.DB.Name).collection(kill_att.name),
            RD: client.db(config.DB.Name).collection(kill_def.name),
        };

        let result = await collections.ally.deleteMany({
            created: { $le: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14) },
        });
        console.log(`Deleted ${result.deletedCount} allies`);
        await collections.player.deleteMany({
            created: { $le: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14) },
        });
        console.log(`Deleted ${result.deletedCount} players`);
        await collections.RAA.deleteMany({
            created: { $le: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14) },
        });
        console.log(`Deleted ${result.deletedCount} RAA`);
        await collections.RA.deleteMany({
            created: { $le: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14) },
        });
        console.log(`Deleted ${result.deletedCount} RA`);
        await collections.RD.deleteMany({
            created: { $le: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14) },
        });
        console.log(`Deleted ${result.deletedCount} RD`);
    } catch (Exception) {
        console.error('Clear DB', Exception);
    } finally {
        console.timeEnd(`Clear Old Data ${TimeStamp}`);
        console.groupEnd(`Clear Old Data ${TimeStamp}`);
        await client.close();
    }
};
