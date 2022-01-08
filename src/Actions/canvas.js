const { createCanvas } = require('canvas')
const fs = require('fs');
const config = require('../config.json');
module.exports = function (TribeName, TribeId, data) {
    let width = 1700;
    let span = 40;
    let height = 200 + (data.length * span);
    let offset = 95;
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    context.fillStyle = '#000'
    context.strokeStyle = "#333"
    context.fillRect(0, 0, width, height)

    context.font = 'bold 36px sans-serif';
    context.textAlign = 'center';
    context.fillStyle = "#fff"
    context.fillText(TribeName, width / 2, 50);
    context.font = 'bold 14px sans-serif';
    context.textAlign = 'left';
    let iterator = 0;

    context.textAlign = 'center';
    context.fillText("Punkty", 350, offset + span * iterator);
    context.fillText("Wioski", 650, offset + span * iterator);
    context.fillText("Agresor", 950, offset + span * iterator);
    context.fillText("Sumarycznie", 1250, offset + span * iterator);
    context.fillText("Obrońca", 1550, offset + span * iterator);
    context.textAlign = 'left';
    iterator++;

    context.fillText("Nazwa gracza", 15, offset + span * iterator);

    for (var i = 0; i < 5; i++) {
        context.textAlign = 'left';
        context.fillText("Aktualnie", 200 + (300 * i), offset + span * iterator);
        context.fillText("24h", 320 + (300 * i), offset + span * iterator);
        context.fillText("7d", 400 + (300 * i), offset + span * iterator);
    }


    context.moveTo(0, 110 + span * iterator)
    context.lineTo(width, 110 + span * iterator)
    iterator++;
    context.font = "normal 14px sans-serif";
    data.sort((a, b) => { return b.points.now - a.points.now }).forEach(player => {
        if (iterator % 2 == 0) {
            context.fillStyle = "#111";
            context.fillRect(0, 110 + span * (iterator - 1), width, span);
        }
        context.moveTo(0, 110 + span * iterator)
        context.lineTo(width, 110 + span * iterator)
        context.stroke();
        context.textAlign = 'left';
        context.fillStyle = "#fff"
        context.fillText(player.name, 15, offset + span * iterator);
        context.fillText(player.points.now.toLocaleString(), 200, offset + span * iterator);
        context.fillStyle = player.points.now < player.points.h24 ? "#f00" : "#0f0";
        context.fillText((player.points.now > player.points.h24 ? "+" : "") + (player.points.now - player.points.h24).toLocaleString(), 320, offset + span * iterator);
        context.fillStyle = player.points.now < player.points.d7 ? "#f00" : "#0f0";
        context.fillText((player.points.now > player.points.d7 ? "+" : "") + (player.points.now - player.points.d7).toLocaleString(), 400, offset + span * iterator);

        context.fillStyle = "#fff"
        context.fillText(player.villages.now.toLocaleString(), 500, offset + span * iterator);
        context.fillStyle = player.villages.now < player.villages.h24 ? "#f00" : "#0f0";
        context.fillText((player.villages.now > player.villages.h24 ? "+" : "") + (player.villages.now - player.villages.h24).toLocaleString(), 620, offset + span * iterator);
        context.fillStyle = player.villages.now < player.villages.d7 ? "#f00" : "#0f0";
        context.fillText((player.villages.now > player.villages.d7 ? "+" : "") + (player.villages.now - player.villages.d7).toLocaleString(), 700, offset + span * iterator);

        context.fillStyle = "#fff"
        context.textAlign = 'left';
        context.fillText(player.RA.now.toLocaleString(), 800, offset + span * iterator);
        context.fillStyle = player.RA.now < player.RA.h24 ? "#f00" : "#0f0";
        context.fillText((player.RA.now > player.RA.h24 ? "+" : "") + (player.RA.now - player.RA.h24).toLocaleString(), 920, offset + span * iterator);
        context.fillStyle = player.RA.now < player.RA.d7 ? "#f00" : "#0f0";
        context.fillText((player.RA.now > player.RA.d7 ? "+" : "") + (player.RA.now - player.RA.d7).toLocaleString(), 1000, offset + span * iterator);

        context.fillStyle = "#fff"
        context.textAlign = 'left';
        context.fillText(player.RAA.now.toLocaleString(), 1100, offset + span * iterator);
        context.fillStyle = player.RAA.now < player.RAA.h24 ? "#f00" : "#0f0";
        context.fillText((player.RAA.now > player.RAA.h24 ? "+" : "") + (player.RAA.now - player.RAA.h24).toLocaleString(), 1220, offset + span * iterator);
        context.fillStyle = player.RAA.now < player.RAA.d7 ? "#f00" : "#0f0";
        context.fillText((player.RAA.now > player.RAA.d7 ? "+" : "") + (player.RAA.now - player.RAA.d7).toLocaleString(), 1300, offset + span * iterator);

        context.fillStyle = "#fff"
        context.textAlign = 'left';
        context.fillText(player.RD.now.toLocaleString(), 1400, offset + span * iterator);
        context.fillStyle = player.RD.now < player.RD.h24 ? "#f00" : "#0f0";
        context.fillText((player.RD.now > player.RD.h24 ? "+" : "") + (player.RD.now - player.RD.h24).toLocaleString(), 1520, offset + span * iterator);
        context.fillStyle = player.RD.now < player.RD.d7 ? "#f00" : "#0f0";
        context.fillText((player.RD.now > player.RD.d7 ? "+" : "") + (player.RD.now - player.RD.d7).toLocaleString(), 1600, offset + span * iterator);
        iterator++;
    })
    for (var i = 0; i < 5; i++) {
        context.moveTo(190 + (300 * i), 110)
        context.lineTo(190 + (300 * i), 110 + span * (iterator - 1))
        context.stroke();
    }

    context.moveTo(190, 110)
    context.lineTo(width, 110)
    context.stroke();

    context.textAlign = "center";
    context.font = "bold 16px sans-serif";
    context.fillStyle = "#fff";
    context.fillText(config.Canvas.Description, width / 2, height - span / 2)

    context.font = "normal 12px sans-serif";
    context.fillStyle = "#0ff";
    context.textAlign = "left";
    context.fillText(new Date().toLocaleString("pl"), 10, height - 10)

    const buffer = canvas.toBuffer("image/jpeg");
    fs.writeFileSync(`${config.API.ContentPath}/raports/ally/${TribeId}.jpeg`, buffer);
}

