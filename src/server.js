// Modules
const apiai = require('apiai')
const Discord  = require('discord.js');
const express = require('express');
const http = require('http');
const fs = require('fs');
const uuid = require('uuid')
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
console.log(__dirname)
const cmd_files = fs.readdirSync(__dirname + '\\commands').filter(file => file.endsWith('.js'));
for (var file of cmd_files) {
    var cmd = require(__dirname + `\\commands/${file}`);
    state.commands.set(cmd.name, cmd)
}

const client = new Discord.Client();
const chatApp = apiai(process.env.APIAI)

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setPresence({ status: 'online', game: {name: "the kids", type: 3} })
})

client.on('message', message => {
    if(message.isMentioned(client.user)) {
        const session_id = uuid.v4();
        var request = chatApp.textRequest(message.content, {
            sessionId: session_id
        });
        request.on('response', function(response) {
            message.reply(response.result.fulfillment.speech)
        })

        request.on('error', (error) => {
            console.log(error)
        })
        request.end()
    }
})

client.login(token);