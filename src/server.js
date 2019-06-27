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
    // Chatbot component
    if(message.isMentioned(client.user)) {
        var msg = message.content
        // If you try to get her to chirp her own name
        if (message.content.toLowerCase().includes('karen')) {
            msg = msg.toLowerCase().replace('karen', '')
        }
        
        const session_id = uuid.v4();
        var request = chatApp.textRequest(msg, {
            sessionId: session_id
        });
        request.on('response', function(response) {
            message.reply(response.result.fulfillment.speech)
        })

        request.on('error', (error) => {
            console.log(error)
            message.reply('Fuck off, can\'t be assed to think atm')
        })
        request.end()
        return;
    }

    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) { return };

    // Getting the command following the prefix
    const args = message.content.slice(prefix.length + 1).split(/ +/);
    const cmd = args.shift().toLowerCase();

    try {
        state.commands.get(cmd).execute(message, args, state)
    } catch(error) {
        console.error(error);
        message.reply(`I don't know what that means, try \`${prefix} help\``)
    }
})

client.login(token);