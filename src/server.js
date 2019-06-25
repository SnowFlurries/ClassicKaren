// Modules
const Discord  = require('discord.js');
const express = require('express');
const http = require('http');
const fs = require('fs');
require('dotenv').config();
// Data
const { prefix } = require('./assets/config.json');
const token = process.env.TOKEN;


const app = express();

// Keep bot alive by pinging every 280 seconds,
// As glitch puts projects to sleep after 5 mins of inactivity
app.get("/", (request, response) => {
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
});
app.listen(process.env.PORT);
    setInterval(() => {
        http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);


var state = {
    commands: new Discord.Collection()
}

const cmd_files = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (var file of cmd_files) {
    var cmd = require(`./src/commands/${file}`);
    state.commands.set(cmd.name, cmd)
}

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setPresence({ status: 'online', game: {name: "the kids", type: 3} })
})

client.login(token);