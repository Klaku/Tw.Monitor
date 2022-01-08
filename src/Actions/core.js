const Get = require('./data.extractor')
const { player, village, ally, kill_all, kill_att, kill_def } = require('./endpoint.handler')
module.exports = async () => {
    await Get(player.name, player.map, player.filter);
    await Get(village.name, village.map, village.filter);
    await Get(ally.name, ally.map, ally.filter);
    await Get(kill_all.name, kill_all.map, kill_all.filter);
    await Get(kill_att.name, kill_att.map, kill_att.filter);
    await Get(kill_def.name, kill_def.map, kill_def.filter);
}