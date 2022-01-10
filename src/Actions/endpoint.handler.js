const urldecode = (url) => {
    return decodeURIComponent(url.replace(/\+/g, ' '));
};

module.exports = {
    player: {
        name: 'player',
        map: (row) => {
            let cells = row.split(',');
            return {
                id: Number(cells[0]),
                name: urldecode(cells[1]),
                tribe_id: Number(cells[2]),
                villages: Number(cells[3]),
                points: Number(cells[4]),
                rank: Number(cells[5]),
                created: new Date(),
            };
        },
        filter: (item) => {
            return item.points > 100;
        },
    },
    village: {
        name: 'village',
        map: (row) => {
            let cells = row.split(',');
            return {
                id: Number(cells[0]),
                name: urldecode(cells[1]),
                x: Number(cells[2]),
                y: Number(cells[3]),
                owner: Number(cells[4]),
                points: Number(cells[5]),
                created: new Date(),
            };
        },
        filter: (item) => {
            return true;
        },
    },
    ally: {
        name: 'ally',
        map: (row) => {
            let cells = row.split(',');
            return {
                id: Number(cells[0]),
                name: urldecode(cells[1]),
                tag: urldecode(cells[2]),
                members: Number(cells[3]),
                villages: Number(cells[4]),
                points: Number(cells[5]),
                allpoints: Number(cells[6]),
                rank: Number(cells[7]),
                created: new Date(),
            };
        },
        filter: () => {
            return true;
        },
    },
    kill_all: {
        name: 'kill_all',
        map: (row) => {
            let cells = row.split(',');
            return {
                player: Number(cells[1]),
                score: Number(cells[2]),
                created: new Date(),
            };
        },
        filter: () => {
            return true;
        },
    },
    kill_att: {
        name: 'kill_att',
        map: (row) => {
            let cells = row.split(',');
            return {
                player: Number(cells[1]),
                score: Number(cells[2]),
                created: new Date(),
            };
        },
        filter: () => {
            return true;
        },
    },
    kill_def: {
        name: 'kill_def',
        map: (row) => {
            let cells = row.split(',');
            return {
                player: Number(cells[1]),
                score: Number(cells[2]),
                created: new Date(),
            };
        },
        filter: () => {
            return true;
        },
    },
};
