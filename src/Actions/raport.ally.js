const { MongoClient } = require('mongodb');
const config = require('../config.json');
const Render = require('./canvas');
const { player, ally, kill_def, kill_att, kill_all } = require('./endpoint.handler')
const client = new MongoClient(config.DB.URL);
module.exports = async () => {
    try {
        await client.connect();

        const collections = {
            ally: client.db(config.DB.Name).collection(ally.name),
            player: client.db(config.DB.Name).collection(player.name),
            RAA: client.db(config.DB.Name).collection(kill_all.name),
            RA: client.db(config.DB.Name).collection(kill_att.name),
            RD: client.db(config.DB.Name).collection(kill_def.name),
        }
        const filters = {
            created: {
                latest: { "created": { $gte: new Date(Date.now() - (1000 * 60 * 30)) } },
                last_week: { "created": { $gte: new Date(Date.now() - (1000 * 60 * 60 * 24 * 7)) } }
            }
        }

        let allyList = await collections.ally.find(filters.created.latest).toArray();
        allyList = allyList.filter((item, index, array) => { return item.rank <= 40 && array.map(x => x.id).indexOf(item.id) == index; });
        for (var allyIndex = 0; allyIndex < allyList.length; allyIndex++) {
            let allyItem = allyList[allyIndex];
            console.group(`Ally ${allyItem.name}`);
            console.time(`Ally ${allyItem.name}`)
            try {
                let players = await collections.player.find({ "tribe_id": allyItem.id, ...filters.created.latest }).toArray();
                players = players.sort((a, b) => { return a.created = b.created }).filter((item, index, array) => { return array.map(x => x.id).indexOf(item.id) == index; })
                let playersCollection = [];
                for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
                    let player = players[playerIndex];
                    try {
                        let playerData = await collections.player.find({ "id": player.id, ...filters.created.last_week }).toArray();
                        let playerRAA = await collections.RAA.find({ "player": player.id, ...filters.created.last_week }).toArray();
                        let playerRA = await collections.RA.find({ "player": player.id, ...filters.created.last_week }).toArray();
                        let playerRD = await collections.RD.find({ "player": player.id, ...filters.created.last_week }).toArray();
                        let Filter24h = (item) => { return item.created > new Date(Date.now() - (1000 * 60 * 60 * 24)) }
                        let SortDescending = (a, b) => { return a.created - b.created }
                        let SortAscending = (a, b) => { return b.created - a.created }
                        let isEmpty = (arg) => { return typeof arg == "undefined" || arg == null || arg.length == 0 };
                        playersCollection.push({
                            name: player.name,
                            points: {
                                now: player.points,
                                h24: playerData.filter(Filter24h).sort(SortAscending)[0].points,
                                d7: playerData.sort((a, b) => { b.created - a.created })[0].points
                            },
                            villages: {
                                now: player.villages,
                                h24: playerData.filter(Filter24h).sort(SortAscending)[0].villages,
                                d7: playerData.sort((a, b) => { b.created - a.created })[0].villages
                            },
                            RA: {
                                now: isEmpty(playerRA) ? 0 : playerRA.sort(SortDescending)[0].score,
                                h24: isEmpty(playerRA) ? 0 : playerRA.filter(Filter24h).sort(SortAscending)[0].score,
                                d7: isEmpty(playerRA) ? 0 : playerRA.sort(SortAscending)[0].score,
                            },
                            RAA: {
                                now: isEmpty(playerRAA) ? 0 : playerRAA.sort(SortDescending)[0].score,
                                h24: isEmpty(playerRAA) ? 0 : playerRAA.filter(Filter24h).sort(SortAscending)[0].score,
                                d7: isEmpty(playerRAA) ? 0 : playerRAA.sort(SortAscending)[0].score,
                            },
                            RD: {
                                now: isEmpty(playerRD) ? 0 : playerRD.sort(SortDescending)[0].score,
                                h24: isEmpty(playerRD) ? 0 : playerRD.filter(Filter24h).sort(SortAscending)[0].score,
                                d7: isEmpty(playerRD) ? 0 : playerRD.sort(SortAscending)[0].score,
                            }
                        });
                    } catch (Exception) {
                        console.error(`Player failed: ${player.name} ${player.id}`, Exception)
                    }

                };
                Render(allyItem.name, allyItem.id, playersCollection)
            } catch (Exception) {
                console.error(`Ally ${allyItem.name} failed`, Exception);
            } finally {
                console.timeEnd(`Ally ${allyItem.name}`)
                console.groupEnd(`Ally ${allyItem.name}`);
            }
        }
    } catch (Exception) {
        console.log(Exception);
    } finally {
        await client.close();
    }
}