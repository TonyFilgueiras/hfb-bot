// @ts-ignore
import HaxballJS from "./core/Haxball.js"

import Room from "./core/Room";
import { AFK } from "./modules/administration/AFK";
import Game from "./modules/Game";

import Register from "./modules/administration/Register";
import Help from "./modules/administration/Help";
import { BetterChat } from "./modules/administration/BetterChat";
import { Admin } from "./modules/administration/Admin";
import Version from "./modules/administration/Version";
import Discord from "./modules/administration/Discord";
import AntiFake from "./modules/administration/AntiFake";
import Log from "./modules/administration/Log";
import Tutorial from "./modules/administration/Tutorial";

const prod = true;//process.env.MODE === "production" ? true : false;

HaxballJS.then((HBInit: any) => {
    console.log(`This process is pid ${process.pid}`); 
    
    const room = new Room(HBInit, {
        public: false,
        noPlayer: true,
        maxPlayers: 25,
        roomName: `🏈 Futebol Americano 🏈`,
        token: process.argv.slice(-1)[0]
    });

    room.setPlayerChat(false);

    if (prod) {
        room.module(AntiFake);
    }

    if (process.env.ENABLE_LOG == "true") {
        room.module(Log);
    }

    room.module(Register);
    room.module(Game);
    room.module(AFK);
    room.module(Help);
    room.module(BetterChat);
    room.module(Admin);
    room.module(Version);
    room.module(Discord);
    room.module(Tutorial);

    room.on("roomLink", (link) => console.log(link));

    console.log("%chttps://github.com/bfleague/bfl-bot", "font-size: 16px;");

    //window["room"] = room;
});